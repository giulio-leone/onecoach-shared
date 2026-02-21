/**
 * Performance Optimizations
 *
 * Utilities for optimizing bundle size and runtime performance
 */
import React from 'react';
/**
 * Lazy load component with React.lazy
 */
export declare function lazyLoad<T extends React.ComponentType<unknown>>(importFn: () => Promise<{
    default: T;
}>): React.LazyExoticComponent<T>;
/**
 * Debounce function for performance
 */
export declare function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttle function for performance
 */
export declare function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Memoize expensive computations
 */
export declare function memoize<Args extends unknown[], Return>(fn: (...args: Args) => Return): (...args: Args) => Return;
/**
 * Intersection Observer for lazy loading
 */
export declare function useIntersectionObserver(elementRef: React.RefObject<Element>, options?: IntersectionObserverInit): boolean;
//# sourceMappingURL=optimizations.d.ts.map