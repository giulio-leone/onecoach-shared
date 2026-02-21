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
export declare class AILogger extends Logger {
    /**
     * Log streaming event
     */
    streamEvent(event: string, data?: unknown): void;
    /**
     * Log model creation
     */
    modelCreated(provider: string, model: string, config?: Record<string, unknown>): void;
    /**
     * Log credit operation
     */
    creditOperation(operation: 'check' | 'consume', userId: string, amount: number, result: boolean): void;
    /**
     * Log AI generation start
     */
    generationStart(type: 'workout' | 'nutrition' | 'chat', userId: string, tier: string): void;
    /**
     * Log AI generation complete
     */
    generationComplete(type: 'workout' | 'nutrition' | 'chat', userId: string, duration: number): void;
}
//# sourceMappingURL=domain.d.ts.map