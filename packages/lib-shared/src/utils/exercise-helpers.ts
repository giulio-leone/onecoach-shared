/**
 * Exercise Helper Utilities
 *
 * Funzioni pure per formattazione e trasformazione dati esercizi.
 * Testabili e riutilizzabili.
 */

import type { LocalizedExercise } from '@giulio-leone/types';
import { ExerciseApprovalStatus } from '@prisma/client';

export const STATUS_LABELS: Record<ExerciseApprovalStatus, string> = {
  DRAFT: 'Bozza',
  APPROVED: 'Approvato',
  PENDING: 'In attesa',
  REJECTED: 'Rifiutato',
};

export const STATUS_BADGE_STYLES: Record<ExerciseApprovalStatus, string> = {
  DRAFT:
    'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700',
  APPROVED:
    'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
  PENDING:
    'bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
  REJECTED:
    'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800',
};

/**
 * Formatta il messaggio di feedback per operazioni batch
 */
export function formatBatchFeedback(successCount: number): string {
  return `${successCount} esercizio${successCount === 1 ? '' : 'i'} aggiornato${
    successCount === 1 ? '' : 'i'
  } con successo`;
}

/**
 * Ottiene lo stile del badge per uno stato
 */
export function getStatusBadgeStyle(status: ExerciseApprovalStatus): string {
  return STATUS_BADGE_STYLES[status];
}

/**
 * Ottiene l'etichetta per uno stato
 */
export function getStatusLabel(status: ExerciseApprovalStatus): string {
  return STATUS_LABELS[status];
}

/**
 * Formatta il nome dell'esercizio con fallback
 */
export function getExerciseName(exercise: LocalizedExercise): string {
  return exercise.translation?.name || exercise.slug || 'Esercizio senza nome';
}

/**
 * Conta i tag totali di un esercizio (muscoli + parti corpo + attrezzature + versione)
 */
export function countExerciseTags(exercise: LocalizedExercise): number {
  const musclesCount = exercise.muscles?.length || 0;
  const bodyPartsCount = exercise.bodyParts?.length || 0;
  const equipmentsCount = exercise.equipments?.length || 1; // Almeno 1 se bodyweight
  return musclesCount + bodyPartsCount + equipmentsCount + 1; // +1 per versione
}

/**
 * Verifica se un esercizio ha molti tag (> 8)
 */
export function hasManyTags(exercise: LocalizedExercise): boolean {
  return countExerciseTags(exercise) > 8;
}
