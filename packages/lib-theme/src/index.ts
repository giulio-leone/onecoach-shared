/**
 * @giulio-leone/lib-theme
 *
 * Cross-platform theming system with Zustand store and React provider.
 */

// Store and hooks
export {
    useThemeStore,
    useTheme,
    useSystemThemeSync,
    lightColors,
    darkColors,
    THEME_STORAGE_KEY,
} from './theme.store';

// Provider
export { ThemeProvider, useThemeContext } from './theme-provider';

// Utilities
export { cn, darkModeClasses } from './dark-mode-classes';

// Types
export type {
    ThemePreference,
    ResolvedTheme,
    ThemeColors,
    ThemeState,
    ThemeActions,
    ThemeStore,
    ThemeProviderProps,
} from './types';
