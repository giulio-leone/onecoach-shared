/**
 * Async State Components
 *
 * Reusable components for loading and error states
 * Follows DRY principle - eliminates duplicate loading/error UI
 */
export interface LoadingStateProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
/**
 * Loading state component
 */
export declare function LoadingState({ message, size, className, }: LoadingStateProps): import("react/jsx-runtime").JSX.Element;
export interface ErrorStateProps {
    error: Error | string | null;
    title?: string;
    onRetry?: () => void;
    retryLabel?: string;
    action?: React.ReactNode;
    className?: string;
}
/**
 * Error state component
 */
export declare function ErrorState({ error, title, onRetry, retryLabel, action, className, }: ErrorStateProps): import("react/jsx-runtime").JSX.Element;
export interface EmptyStateProps {
    title: string;
    message?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}
/**
 * Empty state component
 */
export declare function EmptyState({ title, message, icon, action, className }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=async-state.d.ts.map