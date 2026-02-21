/**
 * Prisma Type Guards
 *
 * Type guards e converters per gestire JsonValue da Prisma in modo type-safe.
 * Elimina la necessità di usare 'as unknown' in tutto il codebase.
 *
 * Principi:
 * - Type Safety: Validazione runtime + type narrowing
 * - DRY: Funzioni riusabili per conversioni comuni
 * - SOLID: Single responsibility per ogni funzione
 */
import { Prisma } from '@prisma/client';
import type { Macros, Exercise, ExerciseSet, SetJson, ExerciseJson, PlanMetadata, ExecutionMetadata, CheckpointMetadata, WorkoutProgram, WorkoutWeek, WorkoutSession, NutritionPlan } from '@onecoach/types';
/**
 * Type guard: verifica se un valore è un oggetto Macros valido
 *
 * @param value - Valore da verificare
 * @returns true se è un Macros valido
 */
export declare function isMacros(value: unknown): value is Macros;
/**
 * Converte un JsonValue di Prisma in oggetto Macros type-safe
 *
 * @param json - JsonValue da Prisma (può essere null, object, array, etc)
 * @returns Oggetto Macros con fallback a valori zero
 *
 * @example
 * const macros = toMacros(nutritionLog.actualDailyMacros);
 * // No need for 'as unknown'!
 */
export declare function toMacros(json: Prisma.JsonValue | null | undefined): Macros;
/**
 * Converte un array di JsonValue in array di Macros
 *
 * @param json - JsonValue array da Prisma
 * @returns Array di oggetti Macros
 */
export declare function toMacrosArray(json: Prisma.JsonValue | null | undefined): Macros[];
/**
 * Type guard: verifica se un valore è un Prisma Decimal
 */
export declare function isPrismaDecimal(value: unknown): value is {
    toNumber: () => number;
    toString: () => string;
};
/**
 * Converte Prisma Decimal in number type-safe
 *
 * @param value - Decimal o number da Prisma
 * @returns Number
 */
export declare function ensureDecimalNumber(value: number | null | undefined): number;
/**
 * Converte un valore che può essere Decimal, number, string o null in number | null
 */
export declare function convertDecimalToNumber(value: number | string | {
    toNumber: () => number;
} | null | undefined): number | null;
/**
 * Converte un valore JSON-serializzabile in Prisma.InputJsonValue type-safe.
 *
 * Questa è l'UNICA boundary tra i tipi di dominio e il type system di Prisma.
 * Elimina la necessità di usare 'as unknown as Prisma.InputJsonValue' in tutto il codebase.
 *
 * @param value - Valore JSON-serializzabile
 * @returns Prisma.InputJsonValue type-safe
 */
export declare function toPrismaJsonValue(value: unknown): Prisma.InputJsonValue;
/**
 * Converte un valore nullable in Prisma.NullableJsonNullValueInput.
 * Usa Prisma.JsonNull per rappresentare null nel database.
 */
export declare function toNullablePrismaJsonValue(value: string | number | boolean | null | Record<string, unknown> | unknown[] | undefined): Prisma.InputJsonValue | typeof Prisma.JsonNull;
/**
 * Type guard: verifica se un valore è un array di oggetti Exercise valido
 *
 * @param value - Valore da verificare
 * @returns true se è un array di Exercise
 */
export declare function isExerciseArray(value: unknown): value is Array<Record<string, unknown>>;
/**
 * Converte JsonValue di Prisma in array di exercises type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array di exercise objects
 */
export declare function toExerciseArray(json: Prisma.JsonValue | null | undefined): Array<Record<string, unknown>>;
/**
 * Estrae il valore numerico da un set done (weight/reps)
 *
 * @param value - Valore da convertire
 * @returns Number o 0
 */
export declare function extractSetValue(value: unknown): number;
/**
 * Converte un JsonValue generico in object type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Record object o empty object
 */
export declare function toJsonObject(json: Prisma.JsonValue | null | undefined): Record<string, unknown>;
/**
 * Converte un JsonValue in array generico type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array o empty array
 */
export declare function toJsonArray(json: Prisma.JsonValue | null | undefined): unknown[];
/**
 * Type guard: verifica se un oggetto è un valid meal object
 *
 * @param value - Valore da verificare
 * @returns true se è un meal valido
 */
export declare function isMeal(value: unknown): value is Record<string, unknown>;
/**
 * Type guard: verifica se un oggetto è un valid food object
 *
 * @param value - Valore da verificare
 * @returns true se è un food valido
 */
export declare function isFood(value: unknown): value is Record<string, unknown>;
/**
 * Converte meals da JsonValue in array type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array di meal objects
 */
export declare function toMealsArray(json: Prisma.JsonValue | null | undefined): Array<Record<string, unknown>>;
/**
 * Estrae totalMacros da un meal object con fallback
 *
 * @param meal - Meal object
 * @returns Macros object
 */
export declare function getMealMacros(meal: Record<string, unknown>): Macros;
/**
 * Estrae macros da un food object con fallback
 *
 * @param food - Food object
 * @returns Macros object
 */
export declare function getFoodMacros(food: Record<string, unknown>): Macros;
/**
 * Verifica se un JsonValue contiene dati validi (non null, non empty)
 *
 * @param json - JsonValue da verificare
 * @returns true se contiene dati
 */
export declare function hasJsonData(json: Prisma.JsonValue | null | undefined): boolean;
/**
 * Converte JsonValue in SetJson type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns SetJson o null se non valido
 */
export declare function toSetJson(json: Prisma.JsonValue | null | undefined): SetJson | null;
/**
 * Converte JsonValue in ExerciseJson type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns ExerciseJson o null se non valido
 */
export declare function toExerciseJson(json: Prisma.JsonValue | null | undefined): ExerciseJson | null;
/**
 * Converte SetJson in ExerciseSet type-safe
 *
 * @param setJson - SetJson da convertire
 * @returns ExerciseSet
 */
export declare function setJsonToExerciseSet(setJson: SetJson): ExerciseSet;
/**
 * Converte ExerciseSet in SetJson type-safe
 *
 * @param set - ExerciseSet da convertire
 * @returns SetJson
 */
export declare function exerciseSetToSetJson(set: ExerciseSet): SetJson;
/**
 * Converte JsonValue in array di ExerciseSet type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array di ExerciseSet
 */
export declare function toSetArrayTyped(json: Prisma.JsonValue | null | undefined): ExerciseSet[];
/**
 * Converte JsonValue in array di Exercise type-safe
 * SSOT: setGroups è l'unica fonte di verità
 *
 * @param json - JsonValue da Prisma
 * @returns Array di Exercise
 */
export declare function toExerciseArrayTyped(json: Prisma.JsonValue | null | undefined): Exercise[];
/**
 * Converte JsonValue in PlanMetadata type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns PlanMetadata o null se non valido
 */
export declare function toPlanMetadata(json: Prisma.JsonValue | null | undefined): PlanMetadata | null;
/**
 * Converte JsonValue in ExecutionMetadata type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns ExecutionMetadata o null se non valido
 */
export declare function toExecutionMetadata(json: Prisma.JsonValue | null | undefined): ExecutionMetadata | null;
/**
 * Converte JsonValue in CheckpointMetadata type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns CheckpointMetadata o null se non valido
 */
export declare function toCheckpointMetadata(json: Prisma.JsonValue | null | undefined): CheckpointMetadata | null;
/**
 * Calcola il volume di un set (reps * weight)
 *
 * @param set - ExerciseSet da cui calcolare il volume
 * @returns Volume in kg (reps * weight) o 0 se dati mancanti
 */
export declare function calculateSetVolume(set: ExerciseSet): number;
/**
 * Type guard: verifica se un valore è un WorkoutWeek valido
 */
export declare function isWorkoutWeek(value: unknown): value is WorkoutWeek;
/**
 * Type guard: verifica se un valore è un WorkoutProgram valido
 */
export declare function isWorkoutProgram(value: unknown): value is WorkoutProgram;
/**
 * Converte JsonValue in WorkoutProgram type-safe.
 * Usa runtime validation per evitare `as unknown as WorkoutProgram`.
 *
 * @param json - JsonValue da Prisma o Record<string, unknown>
 * @returns WorkoutProgram o null se non valido
 */
export declare function toWorkoutProgram(json: Prisma.JsonValue | Record<string, unknown> | null | undefined): WorkoutProgram | null;
/**
 * Type guard: verifica se un valore è un WorkoutSession valido
 */
export declare function isWorkoutSession(value: unknown): value is WorkoutSession;
/**
 * Converte JsonValue in WorkoutSession type-safe.
 *
 * @param json - JsonValue da Prisma o Record<string, unknown>
 * @returns WorkoutSession o null se non valido
 */
export declare function toWorkoutSession(json: Prisma.JsonValue | Record<string, unknown> | null | undefined): WorkoutSession | null;
/**
 * Type guard: verifica se un valore è un NutritionPlan valido
 */
export declare function isNutritionPlan(value: unknown): value is NutritionPlan;
/**
 * Converte JsonValue in NutritionPlan type-safe.
 *
 * @param json - JsonValue da Prisma o Record<string, unknown>
 * @returns NutritionPlan o null se non valido
 */
export declare function toNutritionPlan(json: Prisma.JsonValue | Record<string, unknown> | null | undefined): NutritionPlan | null;
/**
 * Converte JsonValue in WorkoutWeek[] type-safe.
 *
 * @param json - JsonValue da Prisma
 * @returns Array di WorkoutWeek
 */
export declare function toWorkoutWeeks(json: Prisma.JsonValue | null | undefined): WorkoutWeek[];
//# sourceMappingURL=prisma-type-guards.d.ts.map