/**
 * AI Model Mapper
 *
 * Utility functions for mapping between different AI model and operation representations.
 * Follows KISS, DRY, SOLID principles.
 */
/**
 * Map domain and operation to OperationType enum
 *
 * @param domain - Domain: 'nutrition' | 'workout' | 'exercise' | 'analytics'
 * @param operation - Operation: 'planning' | 'execution' | 'modification'
 * @returns OperationType enum value
 */
export function mapOperationToEnum(domain, operation) {
    // Planning operations
    if (operation === 'planning') {
        if (domain === 'exercise') {
            return 'EXERCISE_GENERATION';
        }
        // For nutrition and workout, planning maps to PLAN_GENERATION
        return 'PLAN_GENERATION';
    }
    // Modification operations
    if (operation === 'modification') {
        return 'PLAN_MODIFICATION';
    }
    // Execution operations
    if (operation === 'execution') {
        if (domain === 'analytics') {
            return 'ANALYTICS_INSIGHTS';
        }
        // For nutrition and workout, execution maps to PLAN_RECALCULATION
        return 'PLAN_RECALCULATION';
    }
    // Fallback to PLAN_GENERATION
    return 'PLAN_GENERATION';
}
