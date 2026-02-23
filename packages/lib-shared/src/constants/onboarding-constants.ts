/**
 * Onboarding constants extracted from service for client use
 * This file contains only data, no server operations
 */

/**
 * Onboarding step configuration
 * Definisce i 15 step del wizard
 */
export const ONBOARDING_STEPS = {
  PROFILE_SETUP: 1, // Step 1: Setup profilo base (nome, email, avatar)
  GOALS_SETUP: 2, // Step 2: Obiettivi fitness e nutrition
  DASHBOARD_TOUR: 3, // Step 3: Tour della dashboard
  LIVE_COACH_INTRO: 4, // Step 4: Introduzione al Live Coach
  ANALYTICS_INTRO: 5, // Step 5: Introduzione agli Analytics
  CHAT_INTRO: 6, // Step 6: Introduzione alla Chat AI
  CALENDAR_INTRO: 7, // Step 7: Introduzione al Calendar
  CREATION_INTRO: 8, // Step 8: Creazione workout/nutrition
  PROFILE_COMPLETE: 9, // Step 9: Completamento profilo dettagliato
  CREDITS_INTRO: 10, // Step 10: Sistema crediti AI
  MARKETPLACE_INTRO: 11, // Step 11: Marketplace plans
  AFFILIATES_INTRO: 12, // Step 12: Sistema affiliazione
  COACH_OPTION: 13, // Step 13: Opzione per diventare coach
  SUBSCRIPTION_OFFER: 14, // Step 14: Offerta subscription
  COMPLETION: 15, // Step 15: Completamento onboarding
} as const;

export const TOTAL_STEPS = 15;

// Steps that MUST be completed in the initial Welcome Wizard
export const WELCOME_STEPS = [
  ONBOARDING_STEPS.PROFILE_SETUP,
  ONBOARDING_STEPS.GOALS_SETUP,
  ONBOARDING_STEPS.SUBSCRIPTION_OFFER, // Offer subscription early? Or maybe at the end of welcome? Let's keep it here for now.
];

// Mapping of routes to contextual tour steps
export const ROUTE_TO_TOUR_STEP: Record<string, number> = {
  '/dashboard': ONBOARDING_STEPS.DASHBOARD_TOUR,
  '/coach': ONBOARDING_STEPS.LIVE_COACH_INTRO,
  '/analytics': ONBOARDING_STEPS.ANALYTICS_INTRO,
  '/chat': ONBOARDING_STEPS.CHAT_INTRO,
  '/calendar': ONBOARDING_STEPS.CALENDAR_INTRO,
  '/workouts': ONBOARDING_STEPS.CREATION_INTRO,
  '/nutrition': ONBOARDING_STEPS.CREATION_INTRO,
  '/profile': ONBOARDING_STEPS.PROFILE_COMPLETE,
  '/marketplace': ONBOARDING_STEPS.MARKETPLACE_INTRO,
  '/affiliates': ONBOARDING_STEPS.AFFILIATES_INTRO,
};

export type OnboardingStep = (typeof ONBOARDING_STEPS)[keyof typeof ONBOARDING_STEPS];

/**
 * Onboarding Progress Type
 * Extracted from service for client use
 */
export interface OnboardingProgress {
  id: string;
  userId: string;
  isCompleted: boolean;
  currentStep: number;
  completedSteps: Record<number, boolean>;
  skippedSteps: Record<number, boolean>;
  metadata?: Record<string, unknown>;
  startedAt: Date;
  completedAt: Date | null;
  lastInteraction: Date;
}

export interface StepCompletionInput {
  stepNumber: number;
  skipped?: boolean;
  metadata?: Record<string, unknown>;
}
