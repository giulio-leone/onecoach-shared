/**
 * AI Model Mapper
 *
 * Utility functions for mapping between different AI model and operation representations.
 * Follows KISS, DRY, SOLID principles.
 */
import type { OperationType } from '@onecoach/types';
/**
 * Map domain and operation to OperationType enum
 *
 * @param domain - Domain: 'nutrition' | 'workout' | 'exercise' | 'analytics'
 * @param operation - Operation: 'planning' | 'execution' | 'modification'
 * @returns OperationType enum value
 */
export declare function mapOperationToEnum(domain: 'nutrition' | 'workout' | 'exercise' | 'analytics', operation: 'planning' | 'execution' | 'modification'): OperationType;
//# sourceMappingURL=ai-model-mapper.d.ts.map