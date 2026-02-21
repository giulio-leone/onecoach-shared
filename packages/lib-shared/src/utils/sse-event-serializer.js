/**
 * SSE Event Serializer
 *
 * Structural, domain-agnostic utility for serializing events to SSE format.
 * Ensures consistent event serialization across all domains and endpoints.
 *
 * KISS: Simple, single-purpose function
 * DRY: Reusable across all SSE endpoints
 * SOLID: Single Responsibility - only serializes events
 */
'server-only';
/**
 * Serialize an event to SSE format
 * Includes both data and debug fields in the payload
 *
 * @param event - The event to serialize
 * @returns SSE-formatted message string
 *
 * @example
 * const message = serializeEventToSSE({
 *   type: 'subtask-start',
 *   planId: 'plan-123',
 *   timestamp: new Date().toISOString(),
 *   data: { subtaskId: 'sub-1' },
 *   debug: { contextSnapshot: {...} }
 * });
 * // Returns: "event: subtask-start\ndata: {...}\n\n"
 */
export function serializeEventToSSE(event) {
    // Include both data and debug fields in the event payload
    // This ensures debug information (like context snapshots) is always available
    // Type-safe handling: event.data is unknown, so we need to check if it's an object
    // In practice, event data is always an object, but TypeScript doesn't know this
    const dataIsObject = event.data !== null && typeof event.data === 'object' && !Array.isArray(event.data);
    // Build payload: merge data (if object) with debug field
    const payload = dataIsObject
        ? { ...event.data }
        : { data: event.data };
    // Add debug field if present
    if (event.debug) {
        payload.debug = event.debug;
    }
    return `event: ${event.type}\ndata: ${JSON.stringify(payload)}\n\n`;
}
/**
 * Create an SSE event sender function
 * Returns a function that can be used to send events to an SSE stream controller
 *
 * @param encoder - TextEncoder instance
 * @param controller - ReadableStreamDefaultController
 * @returns Function to send events
 *
 * @example
 * const sendEvent = createSSEEventSender(encoder, controller);
 * sendEvent({ type: 'subtask-start', ... });
 */
export function createSSEEventSender(encoder, controller) {
    return (event) => {
        const message = serializeEventToSSE(event);
        controller.enqueue(encoder.encode(message));
    };
}
