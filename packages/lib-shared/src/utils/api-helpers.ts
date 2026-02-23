/**
 * API Helpers
 *
 * Utility KISS/DRY per standardizzare handler PATCH e batch.
 * Al momento fornisce solo tipi e firme base; estendibile in futuro.
 */

import { z } from 'zod';

export type PatchValidator<T extends z.ZodObject<z.ZodRawShape>> = (
  schema: T,
  payload: unknown
) => z.infer<ReturnType<T['partial']>>;

export function validatePatch<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  payload: unknown
): z.infer<ReturnType<T['partial']>> {
  return schema.partial().parse(payload) as z.infer<ReturnType<T['partial']>>;
}

export type BatchAction = 'update' | 'delete' | 'create';

export interface BatchResult {
  success: boolean;
  results: Array<{ id: string; success: boolean; error?: string }>;
  created?: number;
  updated?: number;
  deleted?: number;
}

// Placeholder per futuri handler factory (non usato ancora per evitare breaking change).
export function createBatchResult(): BatchResult {
  return { success: true, results: [] };
}

/* ───────────────────── Pagination ───────────────────── */

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginationDefaults {
  page?: number;
  limit?: number;
  maxLimit?: number;
}

/**
 * Parse pagination from URLSearchParams.
 *
 * Reads `page`, `pageSize` (or `limit`) and `offset` params,
 * clamps them to safe ranges and returns a normalized object.
 *
 * @example
 * const { page, limit, offset } = parsePagination(
 *   new URL(req.url).searchParams,
 *   { limit: 20, maxLimit: 100 }
 * );
 */
export function parsePagination(
  searchParams: URLSearchParams,
  defaults?: PaginationDefaults
): PaginationParams {
  const { page: defaultPage = 1, limit: defaultLimit = 20, maxLimit = 100 } = defaults ?? {};

  const rawPage = parseInt(searchParams.get('page') ?? String(defaultPage), 10);
  const page = Math.max(1, Number.isNaN(rawPage) ? defaultPage : rawPage);

  const rawLimit = parseInt(
    searchParams.get('limit') ?? searchParams.get('pageSize') ?? String(defaultLimit),
    10
  );
  const limit = Math.min(maxLimit, Math.max(1, Number.isNaN(rawLimit) ? defaultLimit : rawLimit));

  const rawOffset = searchParams.get('offset');
  const offset = rawOffset != null ? Math.max(0, parseInt(rawOffset, 10) || 0) : (page - 1) * limit;

  return { page, limit, offset };
}
