/**
 * AI Models Configuration
 *
 * Configurazioni per i modelli AI di Claude
 */

/**
 * Type for AI model identifiers
 */
export type AiModel = string;

/**
 * Modelli AI disponibili
 */
export const AI_MODELS = {
  SONNET_4_5: 'claude-sonnet-4-5' as AiModel,
  HAIKU_4_5: 'claude-haiku-4-5' as AiModel,
  SONNET_3_5: 'claude-sonnet-3-5' as AiModel,
} as const;

/**
 * Modello di default
 */
export const DEFAULT_MODEL: AiModel = AI_MODELS.SONNET_4_5;

/**
 * Token limits - Single Source of Truth (SSOT)
 */
export const TOKEN_LIMITS = {
  MAX_INPUT: 1000000,
  MAX_OUTPUT: 65000,
  DEFAULT_OUTPUT: 65000,
  /** Default max tokens for model generation (uses MAX_OUTPUT) */
  DEFAULT_MAX_TOKENS: 65000,
} as const;

/**
 * Configurazione modelli
 */
export const MODEL_CONFIG = {
  [AI_MODELS.SONNET_4_5]: {
    name: 'Claude Sonnet 4.5',
    maxTokens: TOKEN_LIMITS.MAX_OUTPUT,
    defaultTemperature: 1,
    supportExtendedThinking: true,
    description: 'Modello bilanciato con ragionamento esteso',
  },
  [AI_MODELS.HAIKU_4_5]: {
    name: 'Claude Haiku 4.5',
    maxTokens: TOKEN_LIMITS.MAX_OUTPUT,
    defaultTemperature: 1,
    supportExtendedThinking: false,
    description: 'Modello veloce per risposte rapide',
  },
  [AI_MODELS.SONNET_3_5]: {
    name: 'Claude Sonnet 3.5',
    maxTokens: TOKEN_LIMITS.MAX_OUTPUT,
    defaultTemperature: 1,
    supportExtendedThinking: false,
    description: 'Modello precedente, affidabile',
  },
} as const;

/**
 * Temperature presets
 */
export const TEMPERATURE_PRESETS = {
  PRECISE: 0.3,
  BALANCED: 1.0,
  CREATIVE: 1.0,
} as const;

/**
 * AI Reasoning Configuration - Single Source of Truth (SSOT)
 */
export const AI_REASONING_CONFIG = {
  /** Default thinking budget for AI operations */
  DEFAULT_THINKING_BUDGET: 32000,
  /** Default reasoning effort level */
  DEFAULT_REASONING_EFFORT: 'high' as const,
} as const;
