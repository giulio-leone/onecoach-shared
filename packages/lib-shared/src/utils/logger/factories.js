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
export function createLogger(prefix) {
    return new Logger({ prefix });
}
/**
 * Create AI logger with prefix
 */
export function createAILogger(prefix) {
    return new AILogger({ prefix });
}
/**
 * Create streaming logger
 */
export function createStreamingLogger() {
    return createAILogger('AI-Stream');
}
/**
 * Create agent logger
 */
export function createAgentLogger() {
    return createAILogger('AI-Agent');
}
/**
 * Create intent detection logger
 */
export function createIntentLogger() {
    return createAILogger('AI-Intent');
}
