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
import { createId } from './id-generator';
import { isSetJson, isExerciseJson, isPlanMetadata, isExecutionMetadata, isCheckpointMetadata, } from '@onecoach/types';
/**
 * Type guard: verifica se un valore è un oggetto Macros valido
 *
 * @param value - Valore da verificare
 * @returns true se è un Macros valido
 */
export function isMacros(value) {
    if (!value || typeof value !== 'object')
        return false;
    const obj = value;
    return (typeof obj.calories === 'number' &&
        typeof obj.protein === 'number' &&
        typeof obj.carbs === 'number' &&
        typeof obj.fats === 'number' &&
        (obj.fiber === undefined || typeof obj.fiber === 'number'));
}
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
export function toMacros(json) {
    // Default fallback
    const defaultMacros = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
    };
    if (!json || typeof json !== 'object' || Array.isArray(json)) {
        return defaultMacros;
    }
    const obj = json;
    return {
        calories: typeof obj.calories === 'number' ? obj.calories : 0,
        protein: typeof obj.protein === 'number' ? obj.protein : 0,
        carbs: typeof obj.carbs === 'number' ? obj.carbs : 0,
        fats: typeof obj.fats === 'number' ? obj.fats : 0,
        fiber: typeof obj.fiber === 'number' ? obj.fiber : undefined,
    };
}
/**
 * Converte un array di JsonValue in array di Macros
 *
 * @param json - JsonValue array da Prisma
 * @returns Array di oggetti Macros
 */
export function toMacrosArray(json) {
    if (!json || !Array.isArray(json)) {
        return [];
    }
    return json.map(toMacros);
}
/**
 * Type guard: verifica se un valore è un Prisma Decimal
 */
export function isPrismaDecimal(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'toNumber' in value &&
        typeof value.toNumber === 'function' &&
        'toString' in value &&
        typeof value.toString === 'function');
}
/**
 * Converte Prisma Decimal in number type-safe
 *
 * @param value - Decimal o number da Prisma
 * @returns Number
 */
export function ensureDecimalNumber(value) {
    if (value === null || value === undefined)
        return 0;
    if (typeof value === 'number')
        return value;
    return 0; // Fallback for other types
}
/**
 * Converte un valore che può essere Decimal, number, string o null in number | null
 */
export function convertDecimalToNumber(value) {
    if (value === null || value === undefined)
        return null;
    if (typeof value === 'number')
        return isNaN(value) ? null : value;
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? null : parsed;
    }
    if (isPrismaDecimal(value)) {
        try {
            const num = value.toNumber();
            return isNaN(num) ? null : num;
        }
        catch (_error) {
            return null;
        }
    }
    return null;
}
/**
 * Converte un valore JSON-serializzabile in Prisma.InputJsonValue type-safe
 * Elimina la necessità di usare 'as unknown as Prisma.InputJsonValue'
 */
export function toPrismaJsonValue(value) {
    // Prisma.InputJsonValue accetta: string | number | boolean | null | JsonObject | JsonArray
    // dove JsonObject = { [x: string]: JsonValue } e JsonArray = JsonValue[]
    if (value === null ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((v) => toPrismaJsonValue(v));
    }
    if (typeof value === 'object' && value !== null) {
        const obj = {};
        for (const [key, val] of Object.entries(value)) {
            obj[key] = toPrismaJsonValue(val);
        }
        return obj;
    }
    // Fallback: serializza come string
    return JSON.stringify(value);
}
/**
 * Converte un valore nullable in Prisma.NullableJsonNullValueInput
 */
export function toNullablePrismaJsonValue(value) {
    if (value === null || value === undefined) {
        return Prisma.JsonNull;
    }
    return toPrismaJsonValue(value);
}
/**
 * Type guard: verifica se un valore è un array di oggetti Exercise valido
 *
 * @param value - Valore da verificare
 * @returns true se è un array di Exercise
 */
export function isExerciseArray(value) {
    if (!Array.isArray(value))
        return false;
    // Check at least one element has expected shape
    if (value.length === 0)
        return true;
    const first = value[0];
    return (typeof first === 'object' &&
        first !== null &&
        'exerciseId' in first &&
        typeof first.exerciseId === 'string');
}
/**
 * Converte JsonValue di Prisma in array di exercises type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array di exercise objects
 */
export function toExerciseArray(json) {
    if (!json || !Array.isArray(json)) {
        return [];
    }
    const result = [];
    for (const item of json) {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
            result.push(item);
        }
    }
    return result;
}
/**
 * Type guard: verifica se un oggetto ha proprietà setGroups valide
 * SSOT: Usa SOLO setGroups, non sets legacy
 *
 * @deprecated Usa hasValidSetGroups da @onecoach/lib-workout invece
 * @param exercise - Exercise object
 * @returns true se ha setGroups array valido
 */
export function hasValidSets(exercise) {
    return ('setGroups' in exercise && Array.isArray(exercise.setGroups) && exercise.setGroups.length > 0);
}
/**
 * Estrae il valore numerico da un set done (weight/reps)
 *
 * @param value - Valore da convertire
 * @returns Number o 0
 */
export function extractSetValue(value) {
    if (typeof value === 'number')
        return value;
    if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
}
/**
 * Converte un JsonValue generico in object type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Record object o empty object
 */
export function toJsonObject(json) {
    if (!json || typeof json !== 'object' || Array.isArray(json)) {
        return {};
    }
    return json;
}
/**
 * Converte un JsonValue in array generico type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array o empty array
 */
export function toJsonArray(json) {
    if (!json || !Array.isArray(json)) {
        return [];
    }
    return json;
}
/**
 * Type guard: verifica se un oggetto è un valid meal object
 *
 * @param value - Valore da verificare
 * @returns true se è un meal valido
 */
export function isMeal(value) {
    if (!value || typeof value !== 'object')
        return false;
    const obj = value;
    return ('name' in obj && typeof obj.name === 'string' && 'foods' in obj && Array.isArray(obj.foods));
}
/**
 * Type guard: verifica se un oggetto è un valid food object
 *
 * @param value - Valore da verificare
 * @returns true se è un food valido
 */
export function isFood(value) {
    if (!value || typeof value !== 'object')
        return false;
    const obj = value;
    return 'name' in obj && typeof obj.name === 'string' && 'quantity' in obj;
}
/**
 * Converte meals da JsonValue in array type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array di meal objects
 */
export function toMealsArray(json) {
    if (!json || !Array.isArray(json)) {
        return [];
    }
    const result = [];
    for (const item of json) {
        if (typeof item === 'object' && item !== null && !Array.isArray(item) && isMeal(item)) {
            result.push(item);
        }
    }
    return result;
}
/**
 * Estrae totalMacros da un meal object con fallback
 *
 * @param meal - Meal object
 * @returns Macros object
 */
export function getMealMacros(meal) {
    // Try totalMacros first
    // STRICT: solo totalMacros, nessun fallback
    if ('totalMacros' in meal && isMacros(meal.totalMacros)) {
        return meal.totalMacros;
    }
    // Se totalMacros non è presente, ritorna default (non fallback a vecchi campi)
    return {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
    };
}
/**
 * Estrae macros da un food object con fallback
 *
 * @param food - Food object
 * @returns Macros object
 */
export function getFoodMacros(food) {
    // Try macros property first
    if ('macros' in food && isMacros(food.macros)) {
        return food.macros;
    }
    // Fallback: build from individual properties
    return {
        calories: typeof food.calories === 'number' ? food.calories : 0,
        protein: typeof food.protein === 'number' ? food.protein : 0,
        carbs: typeof food.carbs === 'number' ? food.carbs : 0,
        fats: typeof food.fats === 'number' ? food.fats : 0,
    };
}
/**
 * Verifica se un JsonValue contiene dati validi (non null, non empty)
 *
 * @param json - JsonValue da verificare
 * @returns true se contiene dati
 */
export function hasJsonData(json) {
    if (!json)
        return false;
    if (Array.isArray(json))
        return json.length > 0;
    if (typeof json === 'object')
        return Object.keys(json).length > 0;
    return true;
}
/**
 * Converte JsonValue in SetJson type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns SetJson o null se non valido
 */
export function toSetJson(json) {
    if (!json || typeof json !== 'object' || Array.isArray(json))
        return null;
    if (isSetJson(json))
        return json;
    return null;
}
/**
 * Converte JsonValue in ExerciseJson type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns ExerciseJson o null se non valido
 */
export function toExerciseJson(json) {
    if (!json || typeof json !== 'object' || Array.isArray(json))
        return null;
    if (isExerciseJson(json))
        return json;
    return null;
}
/**
 * Converte SetJson in ExerciseSet type-safe
 *
 * @param setJson - SetJson da convertire
 * @returns ExerciseSet
 */
export function setJsonToExerciseSet(setJson) {
    return {
        reps: setJson.reps ?? undefined,
        duration: setJson.duration ?? undefined,
        weight: setJson.weight,
        weightLbs: setJson.weightLbs,
        rest: setJson.rest,
        intensityPercent: setJson.intensityPercent,
        rpe: setJson.rpe,
        done: setJson.done,
        repsDone: setJson.repsDone,
        durationDone: setJson.durationDone,
        weightDone: setJson.weightDone,
        weightDoneLbs: setJson.weightDoneLbs,
        notes: setJson.notes,
    };
}
/**
 * Converte ExerciseSet in SetJson type-safe
 *
 * @param set - ExerciseSet da convertire
 * @returns SetJson
 */
export function exerciseSetToSetJson(set) {
    return {
        reps: set.reps ?? null,
        duration: set.duration ?? null,
        weight: set.weight,
        weightLbs: set.weightLbs,
        rest: set.rest,
        intensityPercent: set.intensityPercent,
        rpe: set.rpe,
        done: set.done,
        repsDone: set.repsDone,
        durationDone: set.durationDone,
        weightDone: set.weightDone,
        weightDoneLbs: set.weightDoneLbs,
        notes: set.notes,
    };
}
/**
 * Converte JsonValue in array di ExerciseSet type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns Array di ExerciseSet
 */
export function toSetArrayTyped(json) {
    if (!json || !Array.isArray(json))
        return [];
    const result = [];
    for (const item of json) {
        const setJson = toSetJson(item);
        if (setJson) {
            result.push(setJsonToExerciseSet(setJson));
        }
    }
    return result;
}
/**
 * Converte JsonValue in array di Exercise type-safe
 * SSOT: setGroups è l'unica fonte di verità
 *
 * @param json - JsonValue da Prisma
 * @returns Array di Exercise
 */
export function toExerciseArrayTyped(json) {
    if (!json || !Array.isArray(json))
        return [];
    const result = [];
    for (const item of json) {
        const exerciseJson = toExerciseJson(item);
        if (exerciseJson) {
            // SSOT: Usa setGroups come unica fonte di verità
            let setGroups = [];
            if (exerciseJson.setGroups &&
                Array.isArray(exerciseJson.setGroups) &&
                exerciseJson.setGroups.length > 0) {
                // setGroups già presente - usa direttamente
                setGroups = exerciseJson.setGroups;
            }
            else if (exerciseJson.sets &&
                Array.isArray(exerciseJson.sets) &&
                exerciseJson.sets.length > 0) {
                // Migrazione legacy: converti sets flat in un singolo SetGroup
                const legacySets = exerciseJson.sets.map((set) => setJsonToExerciseSet(set));
                const baseSet = legacySets[0] || {
                    reps: undefined,
                    weight: null,
                    weightLbs: null,
                    rest: 90,
                    intensityPercent: null,
                    rpe: null,
                };
                setGroups = [
                    {
                        id: createId(),
                        count: legacySets.length,
                        baseSet,
                        sets: legacySets,
                    },
                ];
            }
            result.push({
                id: exerciseJson.id || '',
                name: exerciseJson.name,
                description: exerciseJson.description || '',
                category: exerciseJson.category || 'strength',
                muscleGroups: exerciseJson.muscleGroups || [],
                setGroups,
                notes: exerciseJson.notes || '',
                typeLabel: exerciseJson.typeLabel || '',
                repRange: exerciseJson.repRange || '',
                formCues: exerciseJson.formCues || [],
                equipment: exerciseJson.equipment || [],
                catalogExerciseId: exerciseJson.exerciseId || exerciseJson.catalogExerciseId || '',
                videoUrl: exerciseJson.videoUrl,
                variation: exerciseJson.variation,
            });
        }
    }
    return result;
}
/**
 * Converte JsonValue in PlanMetadata type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns PlanMetadata o null se non valido
 */
export function toPlanMetadata(json) {
    if (!json || typeof json !== 'object' || Array.isArray(json))
        return null;
    if (isPlanMetadata(json))
        return json;
    return null;
}
/**
 * Converte JsonValue in ExecutionMetadata type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns ExecutionMetadata o null se non valido
 */
export function toExecutionMetadata(json) {
    if (!json || typeof json !== 'object' || Array.isArray(json))
        return null;
    if (isExecutionMetadata(json))
        return json;
    return null;
}
/**
 * Converte JsonValue in CheckpointMetadata type-safe
 *
 * @param json - JsonValue da Prisma
 * @returns CheckpointMetadata o null se non valido
 */
export function toCheckpointMetadata(json) {
    if (!json || typeof json !== 'object' || Array.isArray(json))
        return null;
    if (isCheckpointMetadata(json))
        return json;
    return null;
}
/**
 * Calcola il volume di un set (reps * weight)
 *
 * @param set - ExerciseSet da cui calcolare il volume
 * @returns Volume in kg (reps * weight) o 0 se dati mancanti
 */
export function calculateSetVolume(set) {
    const reps = set.repsDone ?? set.reps ?? 0;
    const weight = set.weightDone ?? set.weight ?? 0;
    return reps * weight;
}
