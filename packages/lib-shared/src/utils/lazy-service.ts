/**
 * Lazy Service Factory
 *
 * Encapsulates the repeated lazy-initialization pattern used by generation services.
 * Each service has a basePath and a one-time setup function; this factory
 * eliminates the boilerplate while keeping the same runtime behaviour.
 */

import { resolve } from 'path';

export interface LazyServiceOptions {
  /** Human-readable name (used in logs) */
  name: string;
  /** Default submodule path relative to monorepo root (e.g. 'submodules/one-workout/src') */
  defaultSubpath: string;
  /** One-time setup callback (e.g. register schemas) */
  setup: () => void;
}

export interface LazyService {
  /** Run setup (if not already done) and return the resolved basePath */
  ensureInitialized: (options?: { basePath?: string }) => string;
  /** Whether setup has already run */
  isInitialized: () => boolean;
  /** Current basePath (empty string before first init) */
  getBasePath: () => string;
  /** Reset state – useful in tests */
  reset: () => void;
}

export function createLazyService(opts: LazyServiceOptions): LazyService {
  let initialized = false;
  let basePath = '';

  return {
    ensureInitialized(options: { basePath?: string } = {}): string {
      if (initialized) return basePath;
      opts.setup();
      basePath = options.basePath ?? resolve(process.cwd(), `../../${opts.defaultSubpath}`);
      initialized = true;
      return basePath;
    },
    isInitialized: () => initialized,
    getBasePath: () => basePath,
    reset() {
      initialized = false;
      basePath = '';
    },
  };
}
