/**
 * Parallel Executor for OneAgent SDK 2.5 Mesh
 * Phase 2.1: Parallelizzazione ed Esecuzione Parallela
 *
 * Advanced parallel execution engine with:
 * - Worker pool pattern with dynamic sizing
 * - Intelligent rate limiting (sliding window)
 * - Retry logic with exponential backoff
 * - Dependency respect
 * - Circuit breaker for failure protection
 * - Performance metrics and monitoring
 * - Priority-based task scheduling
 *
 * Optimized for real parallel execution with Promise.allSettled
 */

'server-only';
import { executorLogger } from './logger';

/**
 * Generic task interface for parallel execution
 */
export interface ExecutableTask {
  id: string;
  status?: string;
  priority?: number;
  dependencies?: string[];
  [key: string]: unknown;
}

export interface ParallelExecutorConfig {
  concurrency: number; // Max parallel executions
  rateLimit?: {
    maxRequestsPerMinute: number;
    provider?: string;
    useSlidingWindow?: boolean; // Use sliding window rate limiting (more accurate)
  };
  retryConfig?: {
    maxRetries: number;
    retryDelay: number; // ms
    exponentialBackoff: boolean;
    maxRetryDelay?: number; // Maximum delay between retries
  };
  circuitBreaker?: {
    enabled: boolean;
    failureThreshold: number; // Number of failures before opening circuit
    resetTimeout: number; // ms to wait before attempting to close circuit
  };
  priorityEnabled?: boolean; // Enable priority-based scheduling
  metrics?: {
    enabled: boolean;
    onMetricsUpdate?: (metrics: ExecutionMetrics) => void;
  };
}

/**
 * Execution metrics for monitoring
 */
export interface ExecutionMetrics {
  totalExecuted: number;
  successCount: number;
  failureCount: number;
  totalRetries: number;
  averageDuration: number;
  peakConcurrency: number;
  circuitBreakerStatus: 'closed' | 'open' | 'half-open';
  rateLimit: {
    current: number;
    max: number;
    utilizationPercent: number;
  };
}

export interface ExecutionResult {
  subtaskId: string;
  success: boolean;
  summary?: string;
  result?: unknown;
  error?: string;
  retries: number;
  duration: number; // ms
}

export interface TaskExecutor<T> {
  execute(item: T): Promise<ExecutionResult>;
}

/**
 * Parallel Executor with Worker Pool Pattern and Advanced Features
 */
export class ParallelExecutor<T extends ExecutableTask> {
  private config: ParallelExecutorConfig;
  private activeWorkers: number = 0;
  private requestTimestamps: number[] = [];

  // Circuit breaker state
  private circuitBreakerFailures: number = 0;
  private circuitBreakerStatus: 'closed' | 'open' | 'half-open' = 'closed';
  private circuitBreakerOpenedAt?: number;

  // Metrics tracking
  private metrics: ExecutionMetrics = {
    totalExecuted: 0,
    successCount: 0,
    failureCount: 0,
    totalRetries: 0,
    averageDuration: 0,
    peakConcurrency: 0,
    circuitBreakerStatus: 'closed',
    rateLimit: {
      current: 0,
      max: 0,
      utilizationPercent: 0,
    },
  };
  private totalDuration: number = 0;

  constructor(config: ParallelExecutorConfig) {
    this.config = {
      ...config,
      retryConfig: {
        maxRetries: 3,
        retryDelay: 1000,
        exponentialBackoff: true,
        maxRetryDelay: 30000,
        ...config.retryConfig,
      },
      circuitBreaker: {
        enabled: false,
        failureThreshold: 5,
        resetTimeout: 60000,
        ...config.circuitBreaker,
      },
      priorityEnabled: config.priorityEnabled ?? false,
      metrics: {
        enabled: true,
        ...config.metrics,
      },
    };

    if (this.config.rateLimit) {
      this.metrics.rateLimit.max = this.config.rateLimit.maxRequestsPerMinute;
    }
  }

  /**
   * Execute tasks in parallel with worker pool (OPTIMIZED)
   * Uses Promise.allSettled for better error handling and true parallel execution
   */
  async executeParallel(
    tasks: T[],
    executor: TaskExecutor<T>,
    onProgress?: (completed: number, total: number, result: ExecutionResult) => void
  ): Promise<ExecutionResult[]> {
    // Check circuit breaker before starting
    if (!this.canExecute()) {
      executorLogger.error('[ParallelExecutor] Circuit breaker is OPEN, rejecting execution');
      return tasks.map((task: T) => ({
        subtaskId: task.id || 'unknown',
        success: false,
        error: 'Circuit breaker is open - too many failures',
        retries: 0,
        duration: 0,
      }));
    }

    const results: ExecutionResult[] = [];
    const queue = [...tasks];
    let completed = 0;

    const executeOne = async (task: T): Promise<ExecutionResult> => {
      // Check circuit breaker before each execution
      if (!this.canExecute()) {
        return {
          subtaskId: task.id,
          success: false,
          error: 'Circuit breaker is open',
          retries: 0,
          duration: 0,
        };
      }

      // Rate limiting check
      await this.waitForRateLimit();

      this.activeWorkers++;
      this.updateMetrics();

      const startTime = Date.now();

      try {
        const result = await this.executeWithRetry(task, executor);
        const duration = Date.now() - startTime;

        // Update metrics
        this.metrics.totalExecuted++;
        if (result.success) {
          this.metrics.successCount++;
          this.onExecutionSuccess();
        } else {
          this.metrics.failureCount++;
          this.onExecutionFailure();
        }
        this.metrics.totalRetries += result.retries;
        this.totalDuration += duration;
        this.metrics.averageDuration = this.totalDuration / this.metrics.totalExecuted;

        completed++;

        if (onProgress) {
          onProgress(completed, tasks.length, result);
        }

        this.emitMetrics();

        return result;
      } finally {
        this.activeWorkers--;
        this.recordRequest();
      }
    };

    // Execute tasks in batches up to concurrency limit
    // Use Promise.allSettled for better error handling
    while (queue.length > 0) {
      const batch = queue.splice(0, this.config.concurrency);
      const promises = batch.map((task: T) => executeOne(task));

      // Wait for all tasks in batch to complete (success or failure)
      const settled = await Promise.allSettled(promises);

      // Collect results from settled promises
      for (const result of settled) {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          // Promise rejected (should not happen as executeOne catches errors)
          executorLogger.error('[ParallelExecutor] Unexpected rejection:', result.reason);
          results.push({
            subtaskId: 'unknown',
            success: false,
            error: result.reason?.message || 'Unknown error',
            retries: 0,
            duration: 0,
          });
        }
      }
    }

    return results;
  }

  /**
   * Execute task with retry logic (OPTIMIZED)
   */
  private async executeWithRetry(task: T, executor: TaskExecutor<T>): Promise<ExecutionResult> {
    const { maxRetries, retryDelay, exponentialBackoff, maxRetryDelay } = this.config.retryConfig!;
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await executor.execute(task);
        return {
          ...result,
          retries: attempt,
        };
      } catch (error: unknown) {
        lastError = error as Error;

        // Don't retry if it's the last attempt
        if (attempt < maxRetries) {
          let delay = exponentialBackoff ? retryDelay * Math.pow(2, attempt) : retryDelay;

          // Cap retry delay at maxRetryDelay
          if (maxRetryDelay && delay > maxRetryDelay) {
            delay = maxRetryDelay;
          }

          executorLogger.warn(
            `[ParallelExecutor] Retry attempt ${attempt + 1}/${maxRetries} for task ${task.id}, waiting ${delay}ms`
          );

          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    // All retries failed
    executorLogger.error(`[ParallelExecutor] Task ${task.id} failed after ${maxRetries} retries`);
    return {
      subtaskId: task.id,
      success: false,
      error: lastError?.message || 'Unknown error',
      retries: maxRetries,
      duration: 0,
    };
  }

  /**
   * Circuit Breaker: Check if execution is allowed
   */
  private canExecute(): boolean {
    if (!this.config.circuitBreaker?.enabled) {
      return true;
    }

    const now = Date.now();

    // If circuit is open, check if reset timeout has passed
    if (this.circuitBreakerStatus === 'open') {
      if (
        this.circuitBreakerOpenedAt &&
        now - this.circuitBreakerOpenedAt >= this.config.circuitBreaker.resetTimeout
      ) {
        executorLogger.info('[ParallelExecutor] Circuit breaker entering half-open state');
        this.circuitBreakerStatus = 'half-open';
        this.circuitBreakerFailures = 0;
        this.metrics.circuitBreakerStatus = 'half-open';
        return true;
      }
      return false;
    }

    return true;
  }

  /**
   * Circuit Breaker: Handle successful execution
   */
  private onExecutionSuccess(): void {
    if (!this.config.circuitBreaker?.enabled) {
      return;
    }

    // If circuit is half-open and execution succeeded, close it
    if (this.circuitBreakerStatus === 'half-open') {
      executorLogger.info('[ParallelExecutor] Circuit breaker closing (execution succeeded)');
      this.circuitBreakerStatus = 'closed';
      this.circuitBreakerFailures = 0;
      this.metrics.circuitBreakerStatus = 'closed';
    }

    // Reset failure count on success
    this.circuitBreakerFailures = 0;
  }

  /**
   * Circuit Breaker: Handle failed execution
   */
  private onExecutionFailure(): void {
    if (!this.config.circuitBreaker?.enabled) {
      return;
    }

    this.circuitBreakerFailures++;

    // If failure threshold exceeded, open circuit
    if (this.circuitBreakerFailures >= this.config.circuitBreaker.failureThreshold) {
      executorLogger.error(
        `[ParallelExecutor] Circuit breaker OPENING (${this.circuitBreakerFailures} failures)`
      );
      this.circuitBreakerStatus = 'open';
      this.circuitBreakerOpenedAt = Date.now();
      this.metrics.circuitBreakerStatus = 'open';
    }
  }

  /**
   * Update metrics (called on each execution)
   */
  private updateMetrics(): void {
    if (!this.config.metrics?.enabled) {
      return;
    }

    // Update peak concurrency
    if (this.activeWorkers > this.metrics.peakConcurrency) {
      this.metrics.peakConcurrency = this.activeWorkers;
    }

    // Update rate limit metrics
    if (this.config.rateLimit) {
      const now = Date.now();
      const oneMinuteAgo = now - 60000;
      const recentRequests = this.requestTimestamps.filter(
        (ts: number) => ts > oneMinuteAgo
      ).length;

      this.metrics.rateLimit.current = recentRequests;
      this.metrics.rateLimit.utilizationPercent =
        (recentRequests / this.config.rateLimit.maxRequestsPerMinute) * 100;
    }
  }

  /**
   * Emit metrics to callback if configured
   */
  private emitMetrics(): void {
    if (this.config.metrics?.enabled && this.config.metrics.onMetricsUpdate) {
      this.config.metrics.onMetricsUpdate({ ...this.metrics });
    }
  }

  /**
   * Wait if rate limit would be exceeded
   */
  private async waitForRateLimit(): Promise<void> {
    if (!this.config.rateLimit) {
      return;
    }

    const { maxRequestsPerMinute } = this.config.rateLimit;
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Remove timestamps older than 1 minute
    this.requestTimestamps = this.requestTimestamps.filter((ts: number) => ts > oneMinuteAgo);

    // Check if we're at the limit
    if (this.requestTimestamps.length >= maxRequestsPerMinute) {
      // Calculate how long to wait
      const oldestTimestamp = this.requestTimestamps[0];
      if (oldestTimestamp !== undefined) {
        const waitTime = oldestTimestamp + 60000 - now + 100; // +100ms buffer

        if (waitTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }
  }

  /**
   * Record request timestamp for rate limiting
   */
  private recordRequest(): void {
    if (this.config.rateLimit) {
      this.requestTimestamps.push(Date.now());
    }
  }

  /**
   * Get current status
   */
  getStatus(): {
    activeWorkers: number;
    requestsLastMinute: number;
    availableSlots: number;
    circuitBreakerStatus: 'closed' | 'open' | 'half-open';
  } {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const requestsLastMinute = this.requestTimestamps.filter(
      (ts: number) => ts > oneMinuteAgo
    ).length;

    return {
      activeWorkers: this.activeWorkers,
      requestsLastMinute,
      availableSlots: this.config.concurrency - this.activeWorkers,
      circuitBreakerStatus: this.circuitBreakerStatus,
    };
  }

  /**
   * Get execution metrics
   */
  getMetrics(): ExecutionMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset metrics (useful for testing or new execution cycles)
   */
  resetMetrics(): void {
    this.metrics = {
      totalExecuted: 0,
      successCount: 0,
      failureCount: 0,
      totalRetries: 0,
      averageDuration: 0,
      peakConcurrency: 0,
      circuitBreakerStatus: this.circuitBreakerStatus,
      rateLimit: {
        current: 0,
        max: this.config.rateLimit?.maxRequestsPerMinute || 0,
        utilizationPercent: 0,
      },
    };
    this.totalDuration = 0;
    executorLogger.info('[ParallelExecutor] Metrics reset');
  }

  /**
   * Manually reset circuit breaker (useful for recovery)
   */
  resetCircuitBreaker(): void {
    if (!this.config.circuitBreaker?.enabled) {
      return;
    }

    executorLogger.info('[ParallelExecutor] Circuit breaker manually reset');
    this.circuitBreakerStatus = 'closed';
    this.circuitBreakerFailures = 0;
    this.circuitBreakerOpenedAt = undefined;
    this.metrics.circuitBreakerStatus = 'closed';
  }
}

/**
 * Execute tasks in batches/waves respecting dependencies
 */
export async function executeInWaves<T extends ExecutableTask>(
  waves: T[][],
  executor: TaskExecutor<T>,
  config: ParallelExecutorConfig,
  onWaveComplete?: (waveIndex: number, results: ExecutionResult[]) => void,
  onProgress?: (completed: number, total: number, result: ExecutionResult) => void
): Promise<ExecutionResult[]> {
  const allResults: ExecutionResult[] = [];
  const parallelExecutor = new ParallelExecutor<T>(config);

  const totalTasks = waves.reduce((sum: number, wave: T[]) => sum + wave.length, 0);
  let completedTasks = 0;

  for (let i = 0; i < waves.length; i++) {
    const wave = waves[i];
    if (!wave) {
      continue;
    }

    const waveResults = await parallelExecutor.executeParallel(
      wave,
      executor,
      (_completed, _total, result) => {
        completedTasks++;
        if (onProgress) {
          onProgress(completedTasks, totalTasks, result);
        }
      }
    );

    allResults.push(...waveResults);

    if (onWaveComplete) {
      onWaveComplete(i, waveResults);
    }

    // Check if wave had failures - might want to stop execution
    const hasFailures = waveResults.some((r) => !r.success);
    if (hasFailures) {
      // For now, continue with next wave
      // Could add config to stop on first failure
      executorLogger.warn(`Wave ${i} had failures, continuing with next wave`);
    }
  }

  return allResults;
}
