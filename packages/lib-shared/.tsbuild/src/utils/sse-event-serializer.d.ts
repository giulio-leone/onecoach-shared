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
/**
 * Generic SSE Event type
 */
export interface SSEEvent {
    type: string;
    planId?: string;
    executionId?: string;
    taskId?: string;
    subtaskId?: string;
    timestamp: string;
    data?: Record<string, unknown>;
    debug?: Record<string, unknown>;
}
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
export declare function serializeEventToSSE(event: SSEEvent): string;
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
export declare function createSSEEventSender(encoder: TextEncoder, controller: ReadableStreamDefaultController<Uint8Array>): (event: SSEEvent) => void;
//# sourceMappingURL=sse-event-serializer.d.ts.map