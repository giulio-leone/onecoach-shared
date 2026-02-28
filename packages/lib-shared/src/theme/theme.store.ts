'use client';

/**
 * Theme Store
 *
 * Zustand store for cross-platform theming.
 * Persists to both localStorage (for Zustand) and cookies (for SSR).
 *
 * Storage keys:
 * - 'ui-storage' (JSON) - Zustand persist middleware
 * - 'onecoach-theme' (string) - For layout.tsx SSR script
 */

import { useCallback, useRef, useSyncExternalStore, useEffect } from 'react';
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import type {
    ThemePreference,
    ResolvedTheme,
    ThemeColors,
    ThemeState,
    ThemeActions,
    ThemeStore,
} from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const THEME_STORAGE_KEY = 'onecoach-theme';
const ZUSTAND_STORAGE_KEY = 'lib-theme-storage';

// ============================================================================
// COLOR PALETTES
// ============================================================================

export const lightColors: ThemeColors = {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',

    background: '#fafafa',
    surface: '#ffffff',
    card: '#ffffff',

    text: '#09090b',
    textSecondary: '#52525b',
    textTertiary: '#a1a1aa',

    border: '#e4e4e7',
    divider: '#f4f4f5',
    placeholder: '#d4d4d8',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#6366f1',

    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.08)',
};

export const darkColors: ThemeColors = {
    primary: '#818cf8',
    primaryDark: '#a5b4fc',
    primaryLight: '#6366f1',

    background: '#09090b',
    surface: '#18181b',
    card: '#27272a',

    text: '#fafafa',
    textSecondary: '#d4d4d8',
    textTertiary: '#a1a1aa',

    border: '#3f3f46',
    divider: '#27272a',
    placeholder: '#52525b',

    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#818cf8',

    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.32)',
};

// ============================================================================
// HELPERS
// ============================================================================

function getColorsForTheme(theme: ResolvedTheme): ThemeColors {
    return theme === 'dark' ? darkColors : lightColors;
}

function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(preference: ThemePreference, fallback: ResolvedTheme = 'light'): ResolvedTheme {
    if (preference === 'system') {
        return typeof window !== 'undefined' ? getSystemTheme() : fallback;
    }
    return preference;
}

/**
 * Persist theme preference to cookie and localStorage for SSR compatibility.
 * This ensures the inline script in layout.tsx can read the theme on page load.
 */
function persistThemePreference(value: ThemePreference): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
        // localStorage not available
    }

    try {
        const oneYearInSeconds = 60 * 60 * 24 * 365;
        document.cookie = `${THEME_STORAGE_KEY}=${value}; path=/; max-age=${oneYearInSeconds}; SameSite=Lax`;
    } catch {
        // cookies blocked
    }
}

/**
 * Apply theme to DOM (class on <html>, colorScheme, meta tag)
 */
function applyThemeToDOM(actualTheme: ResolvedTheme, themePreference: ThemePreference): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const root = document.documentElement;

    // Update classes
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
    root.dataset.theme = themePreference;
    root.style.colorScheme = actualTheme;

    // Update meta tag
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
        metaTag.setAttribute('content', actualTheme === 'dark' ? '#09090b' : '#ffffff');
    }
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const getInitialState = (): ThemeState => ({
    theme: 'system',
    actualTheme: 'light', // Safe default for SSR
    colors: lightColors,
    isDark: false,
});

// ============================================================================
// STORE
// ============================================================================

export const useThemeStore = create<ThemeStore>()(
    devtools(
        persist(
            (set, get) => ({
                ...getInitialState(),

                setTheme: (theme: ThemePreference) => {
                    const actualTheme = resolveTheme(theme, get().actualTheme);
                    const colors = getColorsForTheme(actualTheme);

                    set({
                        theme,
                        actualTheme,
                        colors,
                        isDark: actualTheme === 'dark',
                    });

                    // Persist for SSR and apply to DOM
                    persistThemePreference(theme);
                    applyThemeToDOM(actualTheme, theme);
                },

                setActualTheme: (actualTheme: ResolvedTheme) => {
                    const colors = getColorsForTheme(actualTheme);

                    set({
                        actualTheme,
                        colors,
                        isDark: actualTheme === 'dark',
                    });

                    applyThemeToDOM(actualTheme, get().theme);
                },

                toggleTheme: () => {
                    const { actualTheme } = get();
                    const newTheme: ThemePreference = actualTheme === 'light' ? 'dark' : 'light';
                    get().setTheme(newTheme);
                },
            }),
            {
                name: ZUSTAND_STORAGE_KEY,
                storage: createJSONStorage(() => {
                    if (typeof window !== 'undefined') {
                        return localStorage;
                    }
                    // SSR fallback
                    return {
                        getItem: () => null,
                        setItem: () => { },
                        removeItem: () => { },
                    };
                }),
                partialize: (state) => ({
                    theme: state.theme,
                }),
            }
        ),
        {
            name: 'ThemeStore',
            enabled: process.env.NODE_ENV === 'development',
        }
    )
);

// ============================================================================
// HOOKS
// ============================================================================

interface ThemeHookResult {
    theme: ThemePreference;
    actualTheme: ResolvedTheme;
    setTheme: (theme: ThemePreference) => void;
    toggleTheme: () => void;
    isDark: boolean;
    colors: ThemeColors;
}

const themeSelector = (state: ThemeStore): ThemeHookResult => ({
    theme: state.theme,
    actualTheme: state.actualTheme,
    setTheme: state.setTheme,
    toggleTheme: state.toggleTheme,
    isDark: state.isDark,
    colors: state.colors,
});

const serverSnapshot: ThemeHookResult = {
    theme: 'system',
    actualTheme: 'light',
    setTheme: () => { },
    toggleTheme: () => { },
    isDark: false,
    colors: lightColors,
};

/**
 * Hook to access theme state and actions.
 * Safe for SSR with stable server snapshot.
 */
export function useTheme(): ThemeHookResult {
    const lastSnapshotRef = useRef(serverSnapshot);

    const getSnapshot = useCallback(() => {
        const newSnapshot = themeSelector(useThemeStore.getState());
        if (shallow(lastSnapshotRef.current, newSnapshot)) {
            return lastSnapshotRef.current;
        }
        lastSnapshotRef.current = newSnapshot;
        return newSnapshot;
    }, []);

    const getServerSnapshot = useCallback(() => serverSnapshot, []);
    const subscribe = useCallback((cb: () => void) => useThemeStore.subscribe(cb), []);

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Hook to sync system theme preference changes.
 * Call this once at the app root level.
 */
export function useSystemThemeSync(): void {
    const theme = useThemeStore((s) => s.theme);
    const setActualTheme = useThemeStore((s) => s.setActualTheme);

    // Initialize from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemePreference | null;
            if (stored && ['light', 'dark', 'system'].includes(stored)) {
                useThemeStore.getState().setTheme(stored);
            }
        } catch {
            // Ignore
        }
    }, []);

    // Listen to system preference changes when theme is 'system'
    useEffect(() => {
        if (typeof window === 'undefined' || theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setActualTheme(e.matches ? 'dark' : 'light');
        };

        handleChange(mediaQuery);
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [theme, setActualTheme]);

    // Update actual theme when preference changes
    useEffect(() => {
        if (theme === 'system') {
            const systemTheme = getSystemTheme();
            setActualTheme(systemTheme);
        } else {
            setActualTheme(theme);
        }
    }, [theme, setActualTheme]);
}

// Re-export types
export type { ThemePreference, ResolvedTheme, ThemeColors, ThemeState, ThemeActions, ThemeStore };
