'use client';

/**
 * Theme Provider
 *
 * React context provider that wraps useThemeStore for SSR hydration.
 * Accepts initial values from the server to prevent hydration mismatch.
 */

import { createContext, useContext, useEffect, useMemo } from 'react';

import { useThemeStore, useSystemThemeSync, useTheme as useThemeHook } from './theme.store';
import type { ThemePreference, ResolvedTheme, ThemeProviderProps } from './types';

// ============================================================================
// CONTEXT (for SSR initial values)
// ============================================================================

interface ThemeContextValue {
    theme: ThemePreference;
    actualTheme: ResolvedTheme;
    setTheme: (theme: ThemePreference) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey: _storageKey,
    initialTheme,
    initialActualTheme,
}: ThemeProviderProps) {

    // Hydrate store with server-provided values on mount
    useEffect(() => {
        const store = useThemeStore.getState();

        // Only hydrate if initial values provided and store hasn't been hydrated yet
        if ((initialTheme || defaultTheme) && store.theme === 'system' && typeof window !== 'undefined') {
            // Check if localStorage already has a value (user has toggled before)
            try {
                const stored = localStorage.getItem('onecoach-theme');
                if (!stored) {
                    // No stored preference, use server-provided initial or default
                    store.setTheme(initialTheme ?? defaultTheme);
                }
            } catch {
                store.setTheme(initialTheme ?? defaultTheme);
            }
        }
    }, [initialTheme, initialActualTheme, defaultTheme]);

    // Enable system theme sync
    useSystemThemeSync();

    // Get current theme state
    const themeState = useThemeHook();

    const value = useMemo<ThemeContextValue>(
        () => ({
            theme: themeState.theme,
            actualTheme: themeState.actualTheme,
            setTheme: themeState.setTheme,
            toggleTheme: themeState.toggleTheme,
        }),
        [themeState.theme, themeState.actualTheme, themeState.setTheme, themeState.toggleTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ============================================================================
// CONTEXT HOOK (optional, useTheme from store is preferred)
// ============================================================================

/**
 * Hook to access theme context.
 * Prefer using `useTheme` from './theme.store' directly for better performance.
 * This hook is provided for legacy compatibility.
 */
export function useThemeContext(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
