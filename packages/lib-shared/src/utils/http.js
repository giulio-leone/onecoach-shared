/**
 * HTTP Utilities
 */
export function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        if (params[key]) {
            params[key] = Array.isArray(params[key])
                ? [...params[key], value]
                : [params[key], value];
        }
        else {
            params[key] = value;
        }
    });
    return params;
}
