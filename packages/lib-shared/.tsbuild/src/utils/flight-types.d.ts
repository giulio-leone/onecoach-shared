/**
 * Flight Types - Single Source of Truth
 *
 * Shared types for the OneFlight feature.
 * Import from @onecoach/lib-shared
 *
 * @module flight-types
 */
/** Layover information for multi-segment flights */
export interface FlightLayover {
    city: string;
    code: string;
    durationInSeconds: number;
    arrival?: {
        utc: string;
        local: string;
    };
    departure?: {
        utc: string;
        local: string;
    };
}
/** Core flight result from search API */
export interface FlightResult {
    id?: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    departure: {
        utc: string;
        local: string;
    };
    arrival: {
        utc: string;
        local: string;
    };
    totalDurationInSeconds: number;
    price: number;
    deepLink: string;
    isDeal?: boolean;
    savingsAmount?: number;
    layovers?: FlightLayover[];
    direction?: FlightDirection;
}
/** Flight direction for round-trip legs */
export type FlightDirection = 'outbound' | 'return';
/** Deal strategy types */
export type DealStrategy = 'standard' | 'one-way-combo' | 'hidden-city' | 'flexible-dates';
/** Extended Flight interface with deal strategy for UI */
export interface Flight extends FlightResult {
    dealStrategy?: DealStrategy;
}
/** Round-trip search result */
export interface RoundTripSearchResult {
    tripType: 'round-trip';
    outbound: FlightResult[];
    return: FlightResult[];
}
/** One-way search result */
export interface OneWaySearchResult {
    tripType: 'one-way';
    flights: FlightResult[];
}
/** Discriminated union for flight search results */
export type FlightSearchResponse = RoundTripSearchResult | OneWaySearchResult;
/** Flight search input parameters */
export interface FlightSearchInput {
    flyFrom: string[];
    flyTo: string[];
    departureDate: string;
    returnDate?: string | null;
    passengers?: {
        adults: number;
        children?: number;
        infants?: number;
    };
    cabinClass?: string;
}
/** Type guard for round-trip search results */
export declare function isRoundTrip(response: FlightSearchResponse): response is RoundTripSearchResult;
/** Type guard for one-way search results */
export declare function isOneWay(response: FlightSearchResponse): response is OneWaySearchResult;
/** Get all flights from a search response regardless of trip type */
export declare function getAllFlights(response: FlightSearchResponse): FlightResult[];
/** A group of flights sharing the same route */
export interface RouteGroup {
    /** Route key: "FCO-DXB" */
    routeKey: string;
    /** Departure city */
    cityFrom: string;
    /** Departure airport code */
    flyFrom: string;
    /** Arrival city */
    cityTo: string;
    /** Arrival airport code */
    flyTo: string;
    /** Flights on this route */
    flights: FlightResult[];
    /** Lowest price in group */
    lowestPrice: number;
}
/** Group flights by route (departure-arrival pair) */
export declare function groupFlightsByRoute(flights: FlightResult[]): RouteGroup[];
//# sourceMappingURL=flight-types.d.ts.map