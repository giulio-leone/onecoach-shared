/**
 * Intelligent Cache System for AI Agents
 *
 * Advanced caching system with:
 * - TTL (Time To Live) support
 * - LRU (Least Recently Used) eviction
 * - Memory limits
 * - Cache statistics
 * - Automatic cleanup
 * - Serialization support
 *
 * Usage:
 * ```ts
 * const cache = new IntelligentCache({ maxSize: 100, ttl: 60000 });
 * await cache.set('key', value);
 * const value = await cache.get('key');
 * ```
 */
export interface CacheConfig {
    maxSize?: number;
    ttl?: number;
    evictionPolicy?: 'lru' | 'fifo';
    enableStats?: boolean;
    cleanupInterval?: number;
}
export interface CacheEntry<T> {
    value: T;
    expiresAt: number;
    accessCount: number;
    lastAccessed: number;
    createdAt: number;
    size?: number;
}
export interface CacheStats {
    size: number;
    maxSize: number;
    hits: number;
    misses: number;
    hitRate: number;
    evictions: number;
    totalSize: number;
    oldestEntry?: number;
    newestEntry?: number;
}
/**
 * Intelligent Cache with TTL, LRU eviction, and stats
 */
export declare class IntelligentCache<K extends string, V> {
    private config;
    private cache;
    private accessOrder;
    private stats;
    private cleanupTimer?;
    constructor(config?: CacheConfig);
    /**
     * Get value from cache
     */
    get(key: K): Promise<V | undefined>;
    /**
     * Set value in cache
     */
    set(key: K, value: V, ttl?: number): Promise<void>;
    /**
     * Check if key exists in cache (doesn't update access time)
     */
    has(key: K): boolean;
    /**
     * Delete entry from cache
     */
    delete(key: K): Promise<boolean>;
    /**
     * Clear all entries
     */
    clear(): Promise<void>;
    /**
     * Get cache statistics
     */
    getStats(): CacheStats;
    /**
     * Get all keys
     */
    keys(): K[];
    /**
     * Get cache size
     */
    size(): number;
    /**
     * Evict entries based on policy
     */
    private evict;
    /**
     * Update access order for LRU
     */
    private updateAccessOrder;
    /**
     * Remove key from access order
     */
    private removeFromAccessOrder;
    /**
     * Estimate size of value (rough estimation)
     */
    private estimateSize;
    /**
     * Cleanup expired entries
     */
    private cleanup;
    /**
     * Start automatic cleanup timer
     */
    private startCleanup;
    /**
     * Stop cleanup timer and destroy cache
     */
    destroy(): void;
    /**
     * Get or set pattern: get value if exists, otherwise compute and cache
     */
    getOrSet(key: K, computeFn: () => Promise<V>, ttl?: number): Promise<V>;
    /**
     * Batch get: get multiple keys at once
     */
    getMany(keys: K[]): Promise<Map<K, V>>;
    /**
     * Batch set: set multiple keys at once
     */
    setMany(entries: Map<K, V>, ttl?: number): Promise<void>;
    /**
     * Export cache to JSON (for persistence)
     */
    export(): Promise<Record<string, CacheEntry<V>>>;
    /**
     * Import cache from JSON (for persistence)
     */
    import(data: Record<string, CacheEntry<V>>): Promise<void>;
}
/**
 * Get global cache instance
 */
export declare function getGlobalCache(config?: CacheConfig): IntelligentCache<string, unknown>;
/**
 * Destroy global cache instance
 */
export declare function destroyGlobalCache(): void;
//# sourceMappingURL=intelligent-cache.d.ts.map