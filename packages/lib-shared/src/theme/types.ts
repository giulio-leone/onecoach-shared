/**
 * Theme Types
 *
 * Centralized type definitions for the theming system.
 * Cross-platform: works on Next.js, React Native, and any React app.
 */

/**
 * Theme preference stored by the user
 */
export type ThemePreference = 'light' | 'dark' | 'system';

/**
 * Resolved theme (what's actually applied)
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme colors interface for programmatic access
 */
export interface ThemeColors {
    // Primary
    primary: string;
    primaryDark: string;
    primaryLight: string;

    // Background
    background: string;
    surface: string;
    card: string;

    // Text
    text: string;
    textSecondary: string;
    textTertiary: string;

    // UI Elements
    border: string;
    divider: string;
    placeholder: string;

    // Status
    success: string;
    warning: string;
    error: string;
    info: string;

    // Special
    overlay: string;
    shadow: string;
}

/**
 * Theme state interface
 */
export interface ThemeState {
    /** User's theme preference */
    theme: ThemePreference;
    /** Resolved theme (light or dark) */
    actualTheme: ResolvedTheme;
    /** Color palette for current theme */
    colors: ThemeColors;
    /** Convenience boolean for dark mode checks */
    isDark: boolean;
}

/**
 * Theme actions interface
 */
export interface ThemeActions {
    /** Set theme preference */
    setTheme: (theme: ThemePreference) => void;
    /** Toggle between light and dark */
    toggleTheme: () => void;
    /** Set resolved theme (internal use) */
    setActualTheme: (theme: ResolvedTheme) => void;
}

/**
 * Combined store type
 */
export type ThemeStore = ThemeState & ThemeActions;

/**
 * ThemeProvider props
 */
export interface ThemeProviderProps {
    children: React.ReactNode;
    /** Default theme if none stored */
    defaultTheme?: ThemePreference;
    /** Storage key for persistence */
    storageKey?: string;
    /** Initial theme from server (SSR) */
    initialTheme?: ThemePreference;
    /** Initial resolved theme from server (SSR) */
    initialActualTheme?: ResolvedTheme;
}
