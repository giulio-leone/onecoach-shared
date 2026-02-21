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
 * Processa items in batch con esecuzione parallela controllata
 *
 * @param options Opzioni di batch processing
 * @returns Array di tutti i risultati
 */
export async function processBatchesInParallel(options) {
    const { items, batchSize, parallelGroups = 2, processor, onGroupComplete, initialState, } = options;
    const batches = Math.ceil(items.length / batchSize);
    const allResults = [];
    const state = initialState;
    // Process batches in parallel groups
    for (let groupStart = 0; groupStart < batches; groupStart += parallelGroups) {
        const batchGroup = [];
        for (let i = groupStart; i < Math.min(groupStart + parallelGroups, batches); i++) {
            const batchStart = i * batchSize;
            const batchEnd = Math.min(batchStart + batchSize, items.length);
            const batch = items.slice(batchStart, batchEnd);
            if (batch.length === 0)
                continue;
            batchGroup.push(processor(batch, i).catch((error) => {
                // Log error but return empty array to continue processing
                console.error(`[BatchProcessing] Error processing batch ${i}:`, error);
                return [];
            }));
        }
        // Wait for all batches in this group to complete
        const groupResults = await Promise.all(batchGroup);
        const flatResults = groupResults.flat();
        // Update state after group completes (avoid race conditions)
        if (onGroupComplete && state !== undefined) {
            onGroupComplete(flatResults, state);
        }
        allResults.push(...flatResults);
    }
    return allResults;
}
