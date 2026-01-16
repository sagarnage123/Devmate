import { ApiError } from "../api/apiError";

export function getApiErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        return error.message;
    }

    return "Unexpected error occurred";
}
