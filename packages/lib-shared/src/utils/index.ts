/**
 * Utils - Barrel Export
 *
 * Esporta tutte le utilities per importazioni pulite
 */

// ID Generator
export * from '../id-generator';

// Formatters
export * from './formatters';

// Validators
export * from './validators';

// Date Utils
export * from '../date-utils';

// Date Conversion (Prisma ↔ Domain)
export * from './date-conversion';

// Date Range Helpers (Analytics)
export * from './date-range-helpers';

// HTTP Utils
export * from './http';

// SSE Event Serializer
export * from './sse-event-serializer';

// API Client
export * from './api-client';

// Error Handling (modular) - primary exports
export * from './error';

// Logger (modular)
export * from './logger';

// Prisma Type Guards
export * from '../prisma-type-guards';

// API Error Handler (client-side) — handleApiError only (getErrorMessage comes from ./error/core)
export { handleApiError } from './api-error-handler';

// Validation (excludes isValidEmail which is already exported from validators)
export {
  validatePassword,
  type PasswordValidationResult,
  passwordsMatch,
  isRequired,
  isValidNumber,
  isValidUrl,
  type Validator,
  createValidator,
} from './validation';

// AI Agent Setup (server-only) - non riesportare nel barrel usato lato client
// export * from './ai-agent-setup';
// Import direttamente da 'lib/utils/ai-agent-setup' nei file server

// Batch Processing
export * from './batch-processing';

// URL Normalizer
export * from './url-normalizer';

// Dialog Global
// export * from './dialog-global'; // Moved to lib-stores

// Simple Cache
export * from './simple-cache';

// AI Model Mapper
export * from './ai-model-mapper';

// Weight Converter
export * from './weight-converter';

// Platform Utils
export * from './platform';

// Flight Types - SSOT for OneFlight feature
export * from './flight-types';

// DnD Helpers
export * from './dnd-helpers';

// Deep Clone
export * from './deep-clone';

// Parse Utilities
export * from './parse';
export * from './api-helpers';
