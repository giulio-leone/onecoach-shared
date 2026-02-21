/**
 * Logger Factories
 *
 * Factory functions for creating domain-specific loggers.
 * Following: Factory Pattern, DRY
 */
import { Logger } from './core';
import { AILogger } from './domain';
/**
 * Create general logger with prefix
 */
export declare function createLogger(prefix: string): Logger;
/**
 * Create AI logger with prefix
 */
export declare function createAILogger(prefix: string): AILogger;
/**
 * Create streaming logger
 */
export declare function createStreamingLogger(): AILogger;
/**
 * Create agent logger
 */
export declare function createAgentLogger(): AILogger;
/**
 * Create intent detection logger
 */
export declare function createIntentLogger(): AILogger;
//# sourceMappingURL=factories.d.ts.map