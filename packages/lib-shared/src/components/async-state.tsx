/**
 * Async State Components
 *
 * Reusable components for loading and error states
 * Follows DRY principle - eliminates duplicate loading/error UI
 */

'use client';

import { Loader2, AlertCircle, AlertTriangle } from 'lucide-react';
// Button is intentionally not imported from @giulio-leone/ui to avoid circular dependencies
// and keep lib-shared clean of heavy UI deps.
// import { Button } from '@giulio-leone/ui';

export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading state component
 */
export function LoadingState({
  message = 'Caricamento...',
  size = 'md',
  className = '',
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex min-h-screen items-center justify-center ${className}`}>
      <div className="text-center">
        <Loader2 className={`mx-auto animate-spin text-blue-500 ${sizeClasses[size]}`} />
        {message && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{message}</p>}
      </div>
    </div>
  );
}

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
export function ErrorState({
  error,
  title = 'Errore',
  onRetry,
  retryLabel = 'Riprova',
  action,
  className = '',
}: ErrorStateProps) {
  const errorMessage =
    error instanceof Error ? error.message : error || 'Si è verificato un errore';

  return (
    <div className={`flex min-h-screen items-center justify-center ${className}`}>
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        {action && <div className="mt-4">{action}</div>}
        {!action && onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

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
export function EmptyState({ title, message, icon, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex min-h-[400px] items-center justify-center ${className}`}>
      <div className="text-center">
        {icon || <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />}
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {message && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
