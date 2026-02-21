/**
 * Simple in-memory cache with optional TTL and basic LRU eviction.
 * Avoids external dependencies (e.g. lru-cache) that can cause bundler issues.
 */
export class SimpleCache {
    store = new Map();
    max;
    ttl;
    constructor(options) {
        this.max = Math.max(1, options.max);
        this.ttl = Math.max(0, options.ttl ?? 0);
    }
    get(key) {
        const entry = this.store.get(key);
        if (!entry)
            return undefined;
        if (entry.expiresAt && entry.expiresAt <= Date.now()) {
            this.store.delete(key);
            return undefined;
        }
        return entry.value;
    }
    set(key, value) {
        const expiresAt = this.ttl > 0 ? Date.now() + this.ttl : null;
        // Refresh insertion order when updating an existing key
        if (this.store.has(key)) {
            this.store.delete(key);
        }
        this.store.set(key, { value, expiresAt });
        this.enforceLimit();
    }
    delete(key) {
        this.store.delete(key);
    }
    clear() {
        this.store.clear();
    }
    enforceLimit() {
        if (this.store.size <= this.max) {
            return;
        }
        const oldestKey = this.store.keys().next().value;
        if (oldestKey !== undefined) {
            this.store.delete(oldestKey);
        }
    }
}
