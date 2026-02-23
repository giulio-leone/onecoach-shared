/**
 * In-App Purchase Configuration
 * Product IDs must match exactly with App Store Connect and Google Play Console
 */

/**
 * Product ID type
 */
export type ProductId =
  | 'coach_one_pro_monthly'
  | 'coach_one_pro_yearly'
  | 'coach_one_coach_monthly'
  | 'coach_one_coach_yearly';

/**
 * Product IDs for iOS and Android
 * IMPORTANT: These must be configured in:
 * - App Store Connect (iOS)
 * - Google Play Console (Android)
 */
export const PRODUCT_IDS: Record<string, ProductId> = {
  PRO_MONTHLY: 'coach_one_pro_monthly',
  PRO_YEARLY: 'coach_one_pro_yearly',
  COACH_MONTHLY: 'coach_one_coach_monthly',
  COACH_YEARLY: 'coach_one_coach_yearly',
} as const;

/**
 * All subscription product IDs
 */
export const ALL_PRODUCT_IDS: ProductId[] = Object.values(PRODUCT_IDS);

/**
 * Product mapping to internal plan IDs
 */
export const PRODUCT_TO_PLAN_MAP = {
  coach_one_pro_monthly: { planId: 'pro', cycle: 'monthly' },
  coach_one_pro_yearly: { planId: 'pro', cycle: 'yearly' },
  coach_one_coach_monthly: { planId: 'coach', cycle: 'monthly' },
  coach_one_coach_yearly: { planId: 'coach', cycle: 'yearly' },
} as const satisfies Record<ProductId, { planId: string; cycle: string }>;

/**
 * Shared secret for iOS receipt validation
 * Should be stored in environment variables
 */
export const IOS_SHARED_SECRET = process.env.EXPO_PUBLIC_IOS_SHARED_SECRET || '';

/**
 * Google Play public key for Android receipt validation
 * Should be stored in environment variables
 */
export const ANDROID_PUBLIC_KEY = process.env.EXPO_PUBLIC_ANDROID_PUBLIC_KEY || '';

/**
 * Backend API endpoints for IAP
 */
export const IAP_ENDPOINTS = {
  VERIFY_RECEIPT: '/api/iap/verify-receipt',
  SYNC_SUBSCRIPTION: '/api/iap/sync-subscription',
  RESTORE_PURCHASES: '/api/iap/restore-purchases',
  GET_SUBSCRIPTION_STATUS: '/api/iap/subscription-status',
} as const;
