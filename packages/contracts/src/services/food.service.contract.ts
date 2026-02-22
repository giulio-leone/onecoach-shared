/**
 * Food Service Contract
 *
 * Interfaccia per il servizio alimenti
 * UNICA FONTE DI VERITÀ per il contratto del servizio
 */

import type { CreateFoodInput, UpdateFoodInput, FoodQueryInput } from '@giulio-leone/schemas';
import type { FoodItem } from '@giulio-leone/types';

export interface IFoodService {
  create(input: CreateFoodInput): Promise<FoodItem>;
  update(id: string, input: UpdateFoodInput): Promise<FoodItem>;
  delete(id: string): Promise<void>;
  getById(id: string, locale?: string): Promise<FoodItem | null>;
  search(query: FoodQueryInput): Promise<{
    foods: FoodItem[];
    total: number;
    page: number;
    pageSize: number;
  }>;
  matchByBarcode(barcode: string, locale?: string): Promise<FoodItem | null>;
}
