/**
 * Supported Locales for Food Items
 *
 * List of all languages that must have translations for food items.
 * When creating a new food item, translations MUST be created for ALL these locales.
 */

export const SUPPORTED_FOOD_LOCALES = [
  'en', // English (mandatory)
  'it', // Italian (mandatory)
  'es', // Spanish
  'fr', // French
  'de', // German
  'pt', // Portuguese
  'nl', // Dutch
  'pl', // Polish
  'ja', // Japanese
  'zh', // Chinese (Simplified)
] as const;

export type SupportedFoodLocale = (typeof SUPPORTED_FOOD_LOCALES)[number];

/**
 * Locale names in their native language
 */
export const LOCALE_NAMES: Record<SupportedFoodLocale, string> = {
  en: 'English',
  it: 'Italiano',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  ja: '日本語',
  zh: '中文',
};

/**
 * Default locale for food items (always English)
 */
export const DEFAULT_FOOD_LOCALE: SupportedFoodLocale = 'en';

/**
 * Validate if a locale is supported
 */
export function isSupportedFoodLocale(locale: string): locale is SupportedFoodLocale {
  return SUPPORTED_FOOD_LOCALES.includes(locale as SupportedFoodLocale);
}

/**
 * Get all supported locales as array
 */
export function getAllSupportedFoodLocales(): readonly SupportedFoodLocale[] {
  return SUPPORTED_FOOD_LOCALES;
}
