/**
 * Deep Clone Utilities
 *
 * Centralized deep cloning functions.
 * Provides generic clone, clone with ID regeneration, selective clone,
 * and circular-reference detection.
 *
 * Performance Note: Uses structuredClone (native, faster) with JSON fallback.
 */

import { createId } from '../id-generator';

/**
 * Creates a deep clone of an object.
 * Uses structuredClone for better performance, with JSON fallback for older environments.
 */
export function deepClone<T>(obj: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Deep clones an object, replacing all 'id' string fields with new IDs.
 * Useful for duplicating entities without ID conflicts.
 */
export function deepCloneWithNewIds(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => deepCloneWithNewIds(item));
  }

  if (typeof obj === 'object') {
    const cloned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (key === 'id' && typeof value === 'string') {
        cloned[key] = createId();
      } else {
        cloned[key] = deepCloneWithNewIds(value);
      }
    }
    return cloned;
  }

  return obj;
}

/**
 * Creates a shallow clone with specific nested paths deep cloned.
 * More efficient when only certain paths need deep cloning.
 */
export function selectiveDeepClone<T extends Record<string, unknown>>(
  obj: T,
  deepPaths: string[]
): T {
  const result = { ...obj };

  for (const path of deepPaths) {
    if (path in result && result[path] !== undefined) {
      result[path as keyof T] = deepClone(result[path as keyof T]) as T[keyof T];
    }
  }

  return result;
}

/**
 * Checks if an object has any circular references.
 * Useful for debugging when JSON.stringify fails.
 */
export function hasCircularReference(obj: unknown): boolean {
  const seen = new WeakSet();

  function detect(value: unknown): boolean {
    if (value !== null && typeof value === 'object') {
      if (seen.has(value)) {
        return true;
      }
      seen.add(value);

      if (Array.isArray(value)) {
        return value.some(detect);
      }

      return Object.values(value).some(detect);
    }
    return false;
  }

  return detect(obj);
}
