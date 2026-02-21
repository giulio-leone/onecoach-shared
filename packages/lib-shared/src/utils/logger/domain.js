/**
 * Domain-Specific Logger Extensions
 *
 * Specialized logging methods for AI, streaming, and other domains.
 * Following: Separation of Concerns, Single Responsibility
 */
import { Logger } from './core';
/**
 * AI-specific logger with domain methods
 */
export class AILogger extends Logger {
    /**
     * Log streaming event
     */
    streamEvent(event, data) {
        this.debug(`Stream event: ${event}`, data);
    }
    /**
     * Log model creation
     */
    modelCreated(provider, model, config) {
        this.debug('Model created', { provider, model, ...(config || {}) });
    }
    /**
     * Log credit operation
     */
    creditOperation(operation, userId, amount, result) {
        this.info(`Credit ${operation}`, {
            userId,
            amount,
            success: result,
        });
    }
    /**
     * Log AI generation start
     */
    generationStart(type, userId, tier) {
        this.info(`${type} generation started`, {
            userId,
            tier,
        });
    }
    /**
     * Log AI generation complete
     */
    generationComplete(type, userId, duration) {
        this.info(`${type} generation completed`, {
            userId,
            duration: `${duration.toFixed(2)}ms`,
        });
    }
}
