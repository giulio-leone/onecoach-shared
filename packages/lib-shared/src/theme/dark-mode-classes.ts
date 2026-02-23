/**
 * Dark Mode Classes Utility
 *
 * Centralized dark mode class strings following DRY principle.
 * These constants can be reused across components to maintain consistency.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Core dark mode classes for different surface levels and states
 */
export const darkModeClasses = {
    // Backgrounds
    bg: {
        base: 'bg-white dark:bg-neutral-900',
        elevated: 'bg-white dark:bg-neutral-800',
        subtle: 'bg-neutral-50 dark:bg-neutral-800/50',
        muted: 'bg-neutral-100 dark:bg-neutral-800',
        hover: 'hover:bg-neutral-50 dark:hover:bg-neutral-800',
        active: 'bg-blue-50 dark:bg-blue-900/20',
        selected: 'bg-primary-50 dark:bg-primary-900/20',
        overlay: 'bg-black/40 dark:bg-black/60',
        backdrop: 'bg-black/50 dark:bg-black/70 backdrop-blur-sm',
        disabled: 'bg-neutral-100 dark:bg-neutral-800/50 cursor-not-allowed',
    },

    // Text colors
    text: {
        primary: 'text-neutral-900 dark:text-neutral-100',
        secondary: 'text-neutral-700 dark:text-neutral-300',
        tertiary: 'text-neutral-600 dark:text-neutral-400',
        muted: 'text-neutral-500 dark:text-neutral-500',
        disabled: 'text-neutral-400 dark:text-neutral-600',
        inverse: 'text-white dark:text-neutral-900',
        link: 'text-primary-600 dark:text-primary-400',
        brand: 'text-primary-600 dark:text-primary-400',
    },

    // Borders
    border: {
        base: 'border-neutral-200 dark:border-neutral-700',
        strong: 'border-neutral-300 dark:border-neutral-600',
        subtle: 'border-neutral-100 dark:border-neutral-800',
        focus: 'focus:border-primary-500 dark:focus:border-primary-400',
        hover: 'hover:border-neutral-300 dark:hover:border-neutral-600',
        error: 'border-red-300 dark:border-red-700',
        success: 'border-green-300 dark:border-green-700',
    },

    // Interactive elements
    interactive: {
        hover: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        active: 'active:bg-neutral-200 dark:active:bg-neutral-700',
        focus: 'focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
        focusVisible:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900',
        disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    },

    // Cards and containers
    card: {
        base: 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700',
        elevated: 'bg-white dark:bg-neutral-800 shadow-lg dark:shadow-2xl dark:shadow-neutral-950/50',
        hover: 'hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200',
        interactive:
            'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg transition-all duration-300',
        glass:
            'bg-white dark:bg-neutral-900/80 dark:bg-neutral-800/80 backdrop-blur-md border-neutral-200 dark:border-neutral-700',
    },

    // Input elements
    input: {
        base: 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100',
        placeholder: 'placeholder-neutral-400 dark:placeholder-neutral-500',
        disabled:
            'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-600 cursor-not-allowed',
        error: 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500',
    },

    // Navigation
    nav: {
        link: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200',
        active:
            'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium',
        icon: 'text-neutral-500 dark:text-neutral-400',
        iconActive: 'text-primary-600 dark:text-primary-400',
    },

    // Semantic colors
    semantic: {
        success: {
            bg: 'bg-green-50 dark:bg-green-900/20',
            text: 'text-green-700 dark:text-green-400',
            border: 'border-green-200 dark:border-green-800',
        },
        warning: {
            bg: 'bg-yellow-50 dark:bg-yellow-900/20',
            text: 'text-yellow-700 dark:text-yellow-400',
            border: 'border-yellow-200 dark:border-yellow-800',
        },
        error: {
            bg: 'bg-red-50 dark:bg-red-900/20',
            text: 'text-red-700 dark:text-red-400',
            border: 'border-red-200 dark:border-red-800',
        },
        info: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-700 dark:text-blue-400',
            border: 'border-blue-200 dark:border-blue-800',
        },
    },

    // Shadows
    shadow: {
        sm: 'shadow-sm dark:shadow-neutral-900/20',
        md: 'shadow-md dark:shadow-neutral-900/30',
        lg: 'shadow-lg dark:shadow-neutral-900/40',
        xl: 'shadow-xl dark:shadow-neutral-900/50',
    },

    // Divider
    divider: {
        base: 'border-neutral-200 dark:border-neutral-700',
        strong: 'border-neutral-300 dark:border-neutral-600',
        subtle: 'border-neutral-100 dark:border-neutral-800',
    },
} as const;

/**
 * Helper function to combine classes with stable ordering.
 * Uses clsx for conditional classes and tailwind-merge for deduplication.
 */
export function cn(...classes: ClassValue[]): string {
    return twMerge(clsx(classes));
}

export type DarkModeClasses = typeof darkModeClasses;
