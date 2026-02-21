/**
 * Batch Processing Utility
 *
 * Utility condivisa per batch processing parallelo:
 * - Processa items in batch
 * - Esegue batch in gruppi paralleli per evitare rate limiting
 * - Aggiorna stato incrementale (es. existing names per duplicate prevention)
 *
 * Principi: KISS, SOLID (Single Responsibility), DRY
 */
/**
 * Opzioni per batch processing
 */
export interface BatchProcessingOptions<TItem, TResult> {
    /** Items da processare */
    items: TItem[];
    /** Dimensione di ogni batch */
    batchSize: number;
    /** Numero di batch da processare in parallelo (default: 2) */
    parallelGroups?: number;
    /** Funzione per processare un singolo batch */
    processor: (batch: TItem[], batchIndex: number) => Promise<TResult[]>;
    /** Funzione opzionale per aggiornare stato dopo ogni gruppo (es. existing names) */
    onGroupComplete?: (results: TResult[], state: unknown) => void;
    /** Stato iniziale opzionale (es. existing names array) */
    initialState?: unknown;
}
/**
 * Processa items in batch con esecuzione parallela controllata
 *
 * @param options Opzioni di batch processing
 * @returns Array di tutti i risultati
 */
export declare function processBatchesInParallel<TItem, TResult>(options: BatchProcessingOptions<TItem, TResult>): Promise<TResult[]>;
//# sourceMappingURL=batch-processing.d.ts.map