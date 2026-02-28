/**
 * Deep Clone Utilities
 *
 * Generic deep cloning functions with ID regeneration.
 */

import { createId } from '../id-generator';

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
