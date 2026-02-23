/**
 * Marketplace Services Contracts
 *
 * Interfacce per servizi marketplace (marketplace, coach, affiliate, promotion)
 * UNICA FONTE DI VERITÀ per i contratti dei servizi marketplace
 */

import type {
  MarketplacePlanType,
  PurchaseStatus,
  marketplace_plans,
  plan_purchases,
  plan_ratings,
  CoachVerificationStatus,
  VettingStatus,
  coach_profiles,
  coach_vetting_requests,
} from '@prisma/client';

/**
 * Marketplace Service Contract
 */
export interface CreateMarketplacePlanInput {
  coachId: string;
  planType: MarketplacePlanType;
  workoutProgramId?: string;
  nutritionPlanId?: string;
  title: string;
  description: string;
  coverImage?: string;
  price: number;
  currency?: string;
}

export interface UpdateMarketplacePlanInput {
  title?: string;
  description?: string;
  coverImage?: string;
  price?: number;
  currency?: string;
}

export interface MarketplaceFilters {
  planType?: MarketplacePlanType;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  coachId?: string;
  searchQuery?: string;
  sortBy?: 'rating' | 'price' | 'recent' | 'popular';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CreatePurchaseInput {
  userId: string;
  marketplacePlanId: string;
}

export interface RatePlanInput {
  userId: string;
  marketplacePlanId: string;
  rating: number;
  review?: string;
}

export interface MarketplacePlanDetails extends marketplace_plans {
  coach?: {
    id: string;
    userId: string;
    name: string | null;
    image: string | null;
    bio: string | null;
  };
  stats?: {
    totalPurchases: number;
    averageRating: number | null;
    totalRevenue: number;
  };
}

export interface MarketplacePlanList {
  plans: MarketplacePlanDetails[];
  total: number;
  page: number;
  limit: number;
}

export interface IMarketplaceService {
  createPlan(data: CreateMarketplacePlanInput): Promise<marketplace_plans>;
  updatePlan(planId: string, data: UpdateMarketplacePlanInput): Promise<marketplace_plans>;
  deletePlan(planId: string): Promise<void>;
  getPlan(planId: string): Promise<MarketplacePlanDetails | null>;
  listPlans(filters: MarketplaceFilters): Promise<MarketplacePlanList>;
  publishPlan(planId: string): Promise<marketplace_plans>;
  unpublishPlan(planId: string): Promise<marketplace_plans>;
  createPurchase(data: CreatePurchaseInput): Promise<plan_purchases>;
  getPurchase(purchaseId: string): Promise<plan_purchases | null>;
  getUserPurchases(userId: string): Promise<plan_purchases[]>;
  updatePurchaseStatus(purchaseId: string, status: PurchaseStatus): Promise<plan_purchases>;
  ratePlan(data: RatePlanInput): Promise<plan_ratings>;
  getPlanRatings(planId: string): Promise<plan_ratings[]>;
  updatePlanStats(planId: string): Promise<marketplace_plans>;
}

/**
 * Coach Service Contract
 */
export interface CreateCoachProfileInput {
  userId: string;
  bio?: string;
  credentials?: string;
  coachingStyle?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
}

export interface UpdateCoachProfileInput {
  bio?: string;
  credentials?: string;
  coachingStyle?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  isPubliclyVisible?: boolean;
}

export interface SubmitVettingInput {
  userId: string;
  credentialDocuments?: Record<string, unknown>;
}

export interface PublicCoachProfile {
  id: string;
  userId: string;
  bio: string | null;
  credentials: string | null;
  coachingStyle: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  websiteUrl: string | null;
  verificationStatus: CoachVerificationStatus;
  totalSales: number;
  averageRating: number | null;
}

export interface ICoachService {
  getProfile(userId: string): Promise<coach_profiles | null>;
  createProfile(data: CreateCoachProfileInput): Promise<coach_profiles>;
  updateProfile(userId: string, data: UpdateCoachProfileInput): Promise<coach_profiles>;
  getPublicProfile(userId: string): Promise<PublicCoachProfile | null>;
  submitVettingRequest(data: SubmitVettingInput): Promise<coach_vetting_requests>;
  getVettingRequest(userId: string): Promise<coach_vetting_requests | null>;
  updateVettingStatus(
    requestId: string,
    status: VettingStatus,
    reviewNotes?: string,
    reviewedBy?: string
  ): Promise<coach_vetting_requests>;
  updateCoachStats(userId: string): Promise<coach_profiles>;
}
