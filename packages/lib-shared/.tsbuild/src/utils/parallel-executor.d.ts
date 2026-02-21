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
    concurrency: number;
    rateLimit?: {
        maxRequestsPerMinute: number;
        provider?: string;
        useSlidingWindow?: boolean;
    };
    retryConfig?: {
        maxRetries: number;
        retryDelay: number;
        exponentialBackoff: boolean;
        maxRetryDelay?: number;
    };
    circuitBreaker?: {
        enabled: boolean;
        failureThreshold: number;
        resetTimeout: number;
    };
    priorityEnabled?: boolean;
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
    duration: number;
}
export interface TaskExecutor<T> {
    execute(item: T): Promise<ExecutionResult>;
}
/**
 * Parallel Executor with Worker Pool Pattern and Advanced Features
 */
export declare class ParallelExecutor<T extends ExecutableTask> {
    private config;
    private activeWorkers;
    private requestTimestamps;
    private circuitBreakerFailures;
    private circuitBreakerStatus;
    private circuitBreakerOpenedAt?;
    private metrics;
    private totalDuration;
    constructor(config: ParallelExecutorConfig);
    /**
     * Execute tasks in parallel with worker pool (OPTIMIZED)
     * Uses Promise.allSettled for better error handling and true parallel execution
     */
    executeParallel(tasks: T[], executor: TaskExecutor<T>, onProgress?: (completed: number, total: number, result: ExecutionResult) => void): Promise<ExecutionResult[]>;
    /**
     * Execute task with retry logic (OPTIMIZED)
     */
    private executeWithRetry;
    /**
     * Circuit Breaker: Check if execution is allowed
     */
    private canExecute;
    /**
     * Circuit Breaker: Handle successful execution
     */
    private onExecutionSuccess;
    /**
     * Circuit Breaker: Handle failed execution
     */
    private onExecutionFailure;
    /**
     * Update metrics (called on each execution)
     */
    private updateMetrics;
    /**
     * Emit metrics to callback if configured
     */
    private emitMetrics;
    /**
     * Wait if rate limit would be exceeded
     */
    private waitForRateLimit;
    /**
     * Record request timestamp for rate limiting
     */
    private recordRequest;
    /**
     * Get current status
     */
    getStatus(): {
        activeWorkers: number;
        requestsLastMinute: number;
        availableSlots: number;
        circuitBreakerStatus: 'closed' | 'open' | 'half-open';
    };
    /**
     * Get execution metrics
     */
    getMetrics(): ExecutionMetrics;
    /**
     * Reset metrics (useful for testing or new execution cycles)
     */
    resetMetrics(): void;
    /**
     * Manually reset circuit breaker (useful for recovery)
     */
    resetCircuitBreaker(): void;
}
/**
 * Execute tasks in batches/waves respecting dependencies
 */
export declare function executeInWaves<T extends ExecutableTask>(waves: T[][], executor: TaskExecutor<T>, config: ParallelExecutorConfig, onWaveComplete?: (waveIndex: number, results: ExecutionResult[]) => void, onProgress?: (completed: number, total: number, result: ExecutionResult) => void): Promise<ExecutionResult[]>;
//# sourceMappingURL=parallel-executor.d.ts.map