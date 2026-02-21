/**
 * Flight Types - Single Source of Truth
 *
 * Shared types for the OneFlight feature.
 * Import from @onecoach/lib-shared/utils/flight-types
 *
 * @module flight-types
 */
// ============================================================================
// Type Guards & Utilities
// ============================================================================
/** Type guard for round-trip search results */
export function isRoundTrip(response) {
    return response.tripType === 'round-trip';
}
/** Type guard for one-way search results */
export function isOneWay(response) {
    return response.tripType === 'one-way';
}
/** Get all flights from a search response regardless of trip type */
export function getAllFlights(response) {
    return isRoundTrip(response) ? [...response.outbound, ...response.return] : response.flights;
}
/** Group flights by route (departure-arrival pair) */
export function groupFlightsByRoute(flights) {
    const groups = new Map();
    for (const flight of flights) {
        const routeKey = `${flight.flyFrom}-${flight.flyTo}`;
        if (!groups.has(routeKey)) {
            groups.set(routeKey, {
                routeKey,
                cityFrom: flight.cityFrom,
                flyFrom: flight.flyFrom,
                cityTo: flight.cityTo,
                flyTo: flight.flyTo,
                flights: [],
                lowestPrice: Infinity,
            });
        }
        const group = groups.get(routeKey);
        group.flights.push(flight);
        if (flight.price < group.lowestPrice) {
            group.lowestPrice = flight.price;
        }
    }
    // Sort by lowest price
    return Array.from(groups.values()).sort((a, b) => a.lowestPrice - b.lowestPrice);
}
