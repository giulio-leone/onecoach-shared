/**
 * Core Services Contracts
 *
 * Interfacce per servizi core (auth, credit, subscription, profile, payment, onboarding)
 * UNICA FONTE DI VERITÀ per i contratti dei servizi core
 */

import type {
  TransactionType,
  ActivityLevel,
  Sex,
  WeightUnit,
  DietType,
  user_profiles,
} from '@prisma/client';
import type Stripe from 'stripe';
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';
import type { OnboardingProgress, StepCompletionInput } from '@giulio-leone/types';

/**
 * Credit Service Contract
 */
export interface ICreditService {
  getCreditBalance(userId: string): Promise<number>;
  checkCredits(userId: string, amount: number): Promise<boolean>;
  consumeCredits(params: {
    userId: string;
    amount: number;
    type: TransactionType;
    description: string;
    metadata?: Record<string, unknown>;
  }): Promise<boolean>;
  addCredits(params: {
    userId: string;
    amount: number;
    type: TransactionType;
    description: string;
    metadata?: Record<string, unknown>;
  }): Promise<void>;
  getTransactionHistory(
    userId: string,
    limit?: number
  ): Promise<
    Array<{
      id: string;
      userId: string;
      amount: number;
      type: TransactionType;
      description: string;
      createdAt: Date;
    }>
  >;
}

/**
 * Subscription Service Contract
 */
export interface ISubscriptionService {
  createSetupIntent(
    userId: string,
    plan: SubscriptionPlan,
    promoCode?: string,
    referralCode?: string
  ): Promise<Stripe.SetupIntent>;
  createSubscription(
    userId: string,
    setupIntentId: string,
    plan: SubscriptionPlan,
    promoCode?: string,
    referralCode?: string
  ): Promise<Stripe.Subscription>;
  getSubscription(userId: string): Promise<{
    id: string;
    status: SubscriptionStatus;
    plan: SubscriptionPlan;
    currentPeriodEnd: Date;
  } | null>;
  cancelSubscription(userId: string): Promise<void>;
  updateSubscription(userId: string, plan: SubscriptionPlan): Promise<Stripe.Subscription>;
}

/**
 * User Profile Service Contract
 */
export interface UserProfileInput {
  age?: number | null;
  sex?: Sex | null;
  heightCm?: number | null;
  weightKg?: number | null;
  weightUnit?: WeightUnit;
  weightIncrement?: number | null;
  activityLevel?: ActivityLevel | null;
  trainingFrequency?: number | null;
  sessionDurationMinutes?: number | null;
  dailyCalories?: number | null;
  nutritionGoals?: string[] | null;
  workoutGoals?: string[] | null;
  equipment?: string[] | null;
  dietaryRestrictions?: string[] | null;
  dietaryPreferences?: string[] | null;
  dietType?: DietType | null;
  healthNotes?: string | null;
}

export interface IUserProfileService {
  getOrCreate(userId: string): Promise<user_profiles>;
  getSerialized(
    userId: string
  ): Promise<Omit<user_profiles, 'weightKg'> & { weightKg: number | null }>;
  update(userId: string, input: UserProfileInput): Promise<user_profiles>;
}

/**
 * Payment Service Contract
 */
export interface CreatePaymentIntentParams {
  userId: string;
  amount: number;
  currency: string;
  type: 'credits' | 'marketplace' | 'cart';
  metadata: Record<string, string>;
  description?: string;
}

export interface ConfirmPaymentIntentParams {
  paymentIntentId: string;
  paymentMethodId: string;
}

export interface IPaymentService {
  createPaymentIntent(params: CreatePaymentIntentParams): Promise<Stripe.PaymentIntent>;
  confirmPaymentIntent(params: ConfirmPaymentIntentParams): Promise<Stripe.PaymentIntent>;
  retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
}

/**
 * Onboarding Service Contract
 */
export interface IOnboardingService {
  getOrCreate(userId: string): Promise<OnboardingProgress>;
  getProgress(userId: string): Promise<OnboardingProgress | null>;
  completeStep(userId: string, input: StepCompletionInput): Promise<OnboardingProgress>;
  goToStep(userId: string, stepNumber: number): Promise<OnboardingProgress>;
  reset(userId: string): Promise<OnboardingProgress>;
  completeAll(userId: string): Promise<OnboardingProgress>;
  isCompleted(userId: string): Promise<boolean>;
}
