/**
 * Storage Service
 *
 * Astrazione per localStorage con possibilità di swap verso IndexedDB
 */
/**
 * Interface per Storage Service
 */
export interface IStorageService {
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    has(key: string): boolean;
    keys(): string[];
}
/**
 * Singleton instance
 */
export declare const storageService: IStorageService;
//# sourceMappingURL=storage.service.d.ts.map