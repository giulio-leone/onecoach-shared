/**
 * useFeatureFlag Hook
 *
 * React hook for checking feature flags on the client-side
 */
interface UseFeatureFlagOptions {
    userId?: string;
    userRole?: string;
    defaultValue?: boolean;
}
export declare function useFeatureFlag(flagKey: string, options?: UseFeatureFlagOptions): [boolean, boolean];
/**
 * Track a feature flag event
 */
export declare function trackFlagEvent(flagKey: string, event: 'ENABLED' | 'DISABLED' | 'EVALUATED' | 'ERROR', metadata?: Record<string, unknown>): Promise<void>;
/**
 * Submit feedback for a feature flag
 */
export declare function submitFlagFeedback(flagKey: string, rating: number, comment?: string, metadata?: Record<string, unknown>): Promise<boolean>;
export {};
//# sourceMappingURL=use-feature-flag.d.ts.map