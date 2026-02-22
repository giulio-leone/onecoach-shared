/**
 * @giulio-leone/contracts
 *
 * OneCoach service contracts (Hexagonal Architecture ports) and validation services.
 * Single source of truth for all service interfaces and validation utilities.
 */

// Service contracts (ports)
export * from './services/ai.service.contract';
export * from './services/analytics.service.contract';
export * from './services/core.service.contract';
export * from './services/exercise.service.contract';
export * from './services/food.service.contract';
export * from './services/marketplace.service.contract';
export * from './services/nutrition.service.contract';
export * from './services/workout.service.contract';

// Validation services
export * from './validation/macro-validation.service';
