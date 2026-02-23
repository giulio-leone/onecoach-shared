/**
 * Vitest setup: register CJS mock for lazily-required logger module.
 *
 * The source code uses `require('../logger')` (CJS) inside functions.
 * Node's native require cannot resolve .ts files, so we pre-register
 * the module in Module._cache so the require() call finds it.
 */
import { vi } from 'vitest';
import Module from 'node:module';
import path from 'node:path';

const loggerDir = path.resolve(__dirname, 'src/utils/logger');

// Resolve the path that require('../logger') from src/utils/error/api.ts would look for
const loggerIndexPath = path.join(loggerDir, 'index.ts');

// Create a mock module and inject it into Node's require cache
const mockModule = new Module(loggerIndexPath);
mockModule.filename = loggerIndexPath;
mockModule.loaded = true;
mockModule.exports = {
  logError: vi.fn(),
  logWarning: vi.fn(),
  logInfo: vi.fn(),
};

// Register under all possible resolution paths
require.cache[loggerIndexPath] = mockModule;

// Also patch _resolveFilename so require('../logger') from the error/ dir finds our mock
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request: string, parent: Module, ...rest: unknown[]) {
  if (
    request === '../logger' &&
    parent?.filename?.includes(path.join('utils', 'error'))
  ) {
    return loggerIndexPath;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (origResolve as any).call(this, request, parent, ...rest);
};
