/**
 * Storage Service
 *
 * Astrazione per localStorage con possibilità di swap verso IndexedDB
 */
/**
 * Implementazione localStorage
 */
class LocalStorageService {
    prefix = 'coachone_';
    get(key) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (item === null)
                return null;
            return JSON.parse(item);
        }
        catch (error) {
            console.error('Storage get error', error);
            return null;
        }
    }
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        }
        catch (error) {
            console.error('Storage set error', error);
        }
    }
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
        }
        catch (error) {
            console.error('Storage remove error', error);
        }
    }
    clear() {
        try {
            const keys = this.keys();
            keys.forEach((key) => this.remove(key));
        }
        catch (error) {
            console.error('Storage clear error', error);
        }
    }
    has(key) {
        return localStorage.getItem(this.prefix + key) !== null;
    }
    keys() {
        const allKeys = Object.keys(localStorage);
        return allKeys
            .filter((key) => key.startsWith(this.prefix))
            .map((key) => key.replace(this.prefix, ''));
    }
}
/**
 * Singleton instance
 */
export const storageService = new LocalStorageService();
