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
    primary: '#2563EB',
    primaryDark: '#1E40AF',
    primaryLight: '#60A5FA',

    background: '#F9FAFB',
    surface: '#FFFFFF',
    card: '#FFFFFF',

    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',

    border: '#E5E7EB',
    divider: '#F3F4F6',
    placeholder: '#D1D5DB',

    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
};

export const darkColors: ThemeColors = {
    primary: '#3B82F6',
    primaryDark: '#60A5FA',
    primaryLight: '#2563EB',

    background: '#111827',
    surface: '#1F2937',
    card: '#374151',

    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',

    border: '#4B5563',
    divider: '#374151',
    placeholder: '#6B7280',

    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',

    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
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
        metaTag.setAttribute('content', actualTheme === 'dark' ? '#0f172a' : '#ffffff');
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
