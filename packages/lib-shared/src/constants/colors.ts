/**
 * Color Constants
 *
 * Shared color palette for both web and native platforms
 * Follows Tailwind CSS color naming convention
 */

export const colors = {
  // Emerald (success)
  emerald: {
    50: '#ecfdf5',
    400: '#34d399',
    500: '#10b981',
    950: '#022c22',
  },

  // Amber (warning)
  amber: {
    50: '#fffbeb',
    400: '#fbbf24',
    500: '#f59e0b',
    950: '#451a03',
  },

  // Red (error/danger)
  red: {
    50: '#fef2f2',
    400: '#f87171',
    500: '#ef4444',
    950: '#450a0a',
  },

  // Blue (info)
  blue: {
    50: '#eff6ff',
    400: '#60a5fa',
    500: '#3b82f6',
    950: '#172554',
  },

  // Neutral (default)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    400: '#a3a3a3',
    500: '#737373',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Slate (dark mode backgrounds)
  slate: {
    900: '#0f172a',
  },

  // White & Black
  white: '#ffffff',
  black: '#000000',
} as const;

/**
 * Semantic color mapping
 */
export const semanticColors = {
  success: {
    text: colors.emerald[500],
    textDark: colors.emerald[400],
    bg: colors.emerald[50],
    bgDark: colors.emerald[950],
  },
  warning: {
    text: colors.amber[500],
    textDark: colors.amber[400],
    bg: colors.amber[50],
    bgDark: colors.amber[950],
  },
  error: {
    text: colors.red[500],
    textDark: colors.red[400],
    bg: colors.red[50],
    bgDark: colors.red[950],
  },
  info: {
    text: colors.blue[500],
    textDark: colors.blue[400],
    bg: colors.blue[50],
    bgDark: colors.blue[950],
  },
  default: {
    text: colors.neutral[500],
    textDark: colors.neutral[400],
    bg: colors.neutral[50],
    bgDark: colors.neutral[800],
  },
} as const;

/**
 * Background colors for different themes
 */
export const backgroundColors = {
  light: {
    base: colors.white,
    elevated: colors.white,
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    base: colors.slate[900],
    elevated: colors.neutral[900],
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

/**
 * Text colors for different themes
 */
export const textColors = {
  light: {
    primary: colors.neutral[900],
    secondary: colors.neutral[500],
  },
  dark: {
    primary: colors.white,
    secondary: colors.neutral[400],
  },
} as const;

/**
 * Border colors for different themes
 */
export const borderColors = {
  light: {
    base: colors.neutral[200],
  },
  dark: {
    base: colors.neutral[700],
  },
} as const;
