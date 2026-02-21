/**
 * Exercise Helper Utilities
 *
 * Funzioni pure per formattazione e trasformazione dati esercizi.
 * Testabili e riutilizzabili.
 */
import type { LocalizedExercise } from '@onecoach/types';
import { ExerciseApprovalStatus } from '@prisma/client';
export declare const STATUS_LABELS: Record<ExerciseApprovalStatus, string>;
export declare const STATUS_BADGE_STYLES: Record<ExerciseApprovalStatus, string>;
/**
 * Formatta il messaggio di feedback per operazioni batch
 */
export declare function formatBatchFeedback(successCount: number): string;
/**
 * Ottiene lo stile del badge per uno stato
 */
export declare function getStatusBadgeStyle(status: ExerciseApprovalStatus): string;
/**
 * Ottiene l'etichetta per uno stato
 */
export declare function getStatusLabel(status: ExerciseApprovalStatus): string;
/**
 * Formatta il nome dell'esercizio con fallback
 */
export declare function getExerciseName(exercise: LocalizedExercise): string;
/**
 * Conta i tag totali di un esercizio (muscoli + parti corpo + attrezzature + versione)
 */
export declare function countExerciseTags(exercise: LocalizedExercise): number;
/**
 * Verifica se un esercizio ha molti tag (> 8)
 */
export declare function hasManyTags(exercise: LocalizedExercise): boolean;
//# sourceMappingURL=exercise-helpers.d.ts.map