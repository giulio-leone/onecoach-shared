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
export declare function createId(): string;
/**
 * Generate RFC 4122 UUID v4.
 * Uses native crypto.randomUUID() when available (Node 19+, modern browsers),
 * with fallback for older environments.
 */
export declare function generateUUID(): string;
/**
 * Validate if a string is a valid UUID format.
 * Useful for input validation and migration checks.
 */
export declare function isValidUUID(value: string): boolean;
//# sourceMappingURL=id-generator.d.ts.map