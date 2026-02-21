/**
 * ID Generator Utilities
 *
 * Secure ID generation for the application.
 * All IDs are now RFC 4122 UUID v4 for Supabase/PostgreSQL compatibility.
 */
/**
 * Generate UUID v4 identifier compatible with Prisma and PostgreSQL UUID type.
 * Previously generated CUID, now generates RFC 4122 UUID v4 for
 * native PostgreSQL UUID column support and Supabase Realtime compatibility.
 */
export function createId() {
    return generateUUID();
}
/**
 * Generate RFC 4122 UUID v4.
 * Uses native crypto.randomUUID() when available (Node 19+, modern browsers),
 * with fallback for older environments.
 */
export function generateUUID() {
    // Use native randomUUID if available (most modern environments)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for environments without randomUUID
    const bytes = new Uint8Array(16);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(bytes);
    }
    else {
        // Node.js fallback
        const nodeCrypto = require('crypto');
        if (nodeCrypto?.randomFillSync) {
            nodeCrypto.randomFillSync(bytes);
        }
        else {
            // Last resort: insecure random (should never happen in production)
            for (let i = 0; i < 16; i++) {
                bytes[i] = Math.floor(Math.random() * 256);
            }
        }
    }
    // Set version (4) and variant (RFC 4122)
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
/**
 * Validate if a string is a valid UUID format.
 * Useful for input validation and migration checks.
 */
export function isValidUUID(value) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
}
