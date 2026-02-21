/**
 * API Helpers
 *
 * Utility KISS/DRY per standardizzare handler PATCH e batch.
 * Al momento fornisce solo tipi e firme base; estendibile in futuro.
 */
import { z } from 'zod';
export type PatchValidator<T extends z.ZodObject<any>> = (schema: T, payload: unknown) => any;
export declare function validatePatch<T extends z.ZodObject<any>>(schema: T, payload: unknown): any;
export type BatchAction = 'update' | 'delete' | 'create';
export interface BatchResult {
    success: boolean;
    results: Array<{
        id: string;
        success: boolean;
        error?: string;
    }>;
    created?: number;
    updated?: number;
    deleted?: number;
}
export declare function createBatchResult(): BatchResult;
//# sourceMappingURL=api-helpers.d.ts.map