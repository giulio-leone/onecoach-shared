/**
 * Simple in-memory cache with optional TTL and basic LRU eviction.
 * Avoids external dependencies (e.g. lru-cache) that can cause bundler issues.
 */
export interface SimpleCacheOptions {
    max: number;
    ttl?: number;
}
export declare class SimpleCache<K, V> {
    private readonly store;
    private readonly max;
    private readonly ttl;
    constructor(options: SimpleCacheOptions);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    delete(key: K): void;
    clear(): void;
    private enforceLimit;
}
//# sourceMappingURL=simple-cache.d.ts.map