/**
 * Nutrition Service Contract
 *
 * Interfaccia per il servizio nutrizione
 * UNICA FONTE DI VERITÀ per il contratto del servizio
 */

import type { NutritionPlan, ApiResponse } from '@giulio-leone/types';

export interface INutritionService {
  create(plan: Omit<NutritionPlan, 'id' | 'createdAt' | 'updatedAt'>): ApiResponse<NutritionPlan>;
  update(id: string, plan: Partial<NutritionPlan>): ApiResponse<NutritionPlan>;
  delete(id: string): ApiResponse<void>;
  get(id: string): ApiResponse<NutritionPlan>;
  getAll(): ApiResponse<NutritionPlan[]>;
  getByGoal(goalId: string): ApiResponse<NutritionPlan[]>;
  getByPlanId(planId: string): ApiResponse<NutritionPlan | null>;
}
