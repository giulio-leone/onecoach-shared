/**
 * Nutrition Goal Mapper
 *
 * Centralizza la logica di mapping tra nutrition goals (CUIDs da DB)
 * e formati usati in UI/AI (stringhe leggibili).
 *
 * Principi:
 * - DRY: Una singola source of truth per tutti i mapping
 * - KISS: Funzioni semplici e dirette
 * - Future-proof: Supporto per goals multipli
 */
/**
 * Type per goal form strings
 */
export type NutritionGoalForm = 'weight_loss' | 'muscle_gain' | 'performance' | 'maintenance';
/**
 * Converte un array di CUID goals in array di form goals
 *
 * @param goalCuids - Array di CUID goals dal database
 * @returns Array di form goal strings
 *
 * @example
 * mapNutritionGoalsToForm(['clx_ngoal_weightloss', 'clx_ngoal_performance'])
 * // Returns: ['weight_loss', 'performance']
 */
export declare function mapNutritionGoalsToForm(goalCuids?: string[]): NutritionGoalForm[];
/**
 * Converte un singolo CUID goal in form goal
 *
 * @param goalCuid - CUID goal dal database
 * @returns Form goal string
 *
 * @example
 * mapNutritionGoalToForm('clx_ngoal_weightloss') // Returns: 'weight_loss'
 */
export declare function mapNutritionGoalToForm(goalCuid?: string): NutritionGoalForm;
/**
 * Converte un array di form goals in array di CUID goals
 *
 * @param formGoals - Array di form goal strings
 * @returns Array di CUID goals per il database
 *
 * @example
 * mapFormGoalsToIds(['weight_loss', 'performance'])
 * // Returns: ['clx_ngoal_weightloss', 'clx_ngoal_performance']
 */
export declare function mapFormGoalsToIds(formGoals: string[]): string[];
/**
 * Converte un singolo form goal in CUID
 *
 * @param formGoal - Form goal string
 * @returns CUID goal per il database
 *
 * @example
 * mapFormGoalToId('weight_loss') // Returns: 'clx_ngoal_weightloss'
 */
export declare function mapFormGoalToId(formGoal: string): string;
/**
 * Ottiene il display name di un goal per UI
 *
 * @param formGoal - Form goal string
 * @returns Display name localizzato
 *
 * @example
 * getGoalDisplayName('weight_loss') // Returns: 'Perdita di Peso'
 */
export declare function getGoalDisplayName(formGoal: string): string;
/**
 * Ottiene i display names per goals multipli
 *
 * @param goalCuids - Array di CUID goals dal database
 * @returns Array di display names localizzati
 *
 * @example
 * getNutritionGoalsDisplay(['clx_ngoal_weightloss', 'clx_ngoal_performance'])
 * // Returns: ['Perdita di Peso', 'Performance']
 */
export declare function getNutritionGoalsDisplay(goalCuids?: string[]): string[];
/**
 * Formatta goals multipli per il prompt AI con priorità
 *
 * @param goalCuids - Array di CUID goals dal database
 * @returns Stringa formattata per prompt (es: "Primary: Weight Loss, Secondary: Performance")
 *
 * @example
 * formatGoalsForPrompt(['clx_ngoal_weightloss', 'clx_ngoal_performance'])
 * // Returns: "Primary: Weight Loss, Secondary: Performance"
 */
export declare function formatGoalsForPrompt(goalCuids?: string[]): string;
/**
 * Verifica se un CUID è un goal valido
 *
 * @param cuid - CUID da verificare
 * @returns true se valido
 */
export declare function isValidGoalCuid(cuid: string): boolean;
/**
 * Verifica se un form goal è valido
 *
 * @param formGoal - Form goal da verificare
 * @returns true se valido
 */
export declare function isValidFormGoal(formGoal: string): boolean;
//# sourceMappingURL=nutrition-goal-mapper.d.ts.map