
import { ApiError } from "./apiError";
import { normalizeApiError } from "./normalizeApiError";

export async function apiCall<T>(
    fn: () => Promise<T>
): Promise<T> {
    try {
        return await fn();
    } catch (error: unknown) {
        const normalized = normalizeApiError(error);

        
        if (!(normalized instanceof ApiError)) {
            throw new Error("API invariant violated: non-ApiError thrown");
        }

        throw normalized;
    }
}
