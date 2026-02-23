/**
 * @onecoach/lib-shared
 *
 * Utilities condivise tra tutti i package
 */

export * from './id-generator';
export * from './storage.service';
export * from './date-utils';
export * from './prisma-type-guards';
export * from './macro-calculations';
// calculateMainMacro and MainMacro were removed or renamed to calculateMacros/Macros

// Export from sub-directories
export * from './utils';
export * from './performance';
export * from './components';

// Explicitly export key utilities for cleaner access
export * from './utils/logger';
export * from './utils/error';
export * from './utils/formatters';
export * from './utils/validators';
export * from './utils/http';
export * from './utils/api-client';
export * from './utils/batch-processing';
export * from './utils/ai-model-mapper';
export * from './utils/weight-converter';
export * from './utils/flight-types';
export * from './utils/dnd-helpers';
export * from './utils/main-macro-calculator';
export * from './utils/nutrition-plan-helpers';
export * from './utils/image-url-sanitizer';
// parseJsonResponse is likely in formatters or validators, using wildcard export from utils
export * from './utils/app-logger';

// Contracts (merged from @giulio-leone/contracts)
export * from './contracts';

// Constants (merged from @giulio-leone/constants)
export * from './constants';
