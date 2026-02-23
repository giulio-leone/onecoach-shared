/**
 * Exercise Service Contract
 *
 * Interfaccia per il servizio esercizi
 * UNICA FONTE DI VERITÀ per il contratto del servizio
 */

import type {
  CreateExerciseInput,
  UpdateExerciseInput,
  ExerciseQueryParams,
  ExerciseDetailQueryParams,
} from '@giulio-leone/schemas';
import type { Exercise } from '@giulio-leone/types';

export interface IExerciseService {
  create(input: CreateExerciseInput): Promise<Exercise>;
  update(id: string, input: UpdateExerciseInput): Promise<Exercise>;
  delete(id: string): Promise<void>;
  getById(id: string, query?: ExerciseDetailQueryParams): Promise<Exercise | null>;
  list(query: ExerciseQueryParams): Promise<{
    exercises: Exercise[];
    total: number;
    page: number;
    pageSize: number;
  }>;
  search(searchTerm: string, locale?: string, limit?: number): Promise<Exercise[]>;
}
