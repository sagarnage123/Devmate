

import axios from "axios";
import { ApiError, ApiErrorCode } from "./apiError";

export function normalizeApiError(error: unknown): ApiError {
   
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        const code: ApiErrorCode =
            status === 401
                ? "UNAUTHORIZED"
                : status === 403
                    ? "FORBIDDEN"
                    : status === 404
                        ? "NOT_FOUND"
                        : status === 422
                            ? "VALIDATION_ERROR"
                            : status && status >= 500
                                ? "SERVER_ERROR"
                                : "NETWORK_ERROR";

        return new ApiError({
            message:
                error.response?.data?.message ??
                "Something went wrong. Please try again.",
            code,
            status,
            details: error.response?.data,
        });
    }

    if (error instanceof Error) {
        return new ApiError({
            message: error.message,
            code: "UNKNOWN_ERROR",
        });
    }

    // Truly unknown
    return new ApiError({
        message: "Unexpected error occurred",
        code: "UNKNOWN_ERROR",
    });
}
