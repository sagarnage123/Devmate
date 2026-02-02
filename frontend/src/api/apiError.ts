
export type ApiErrorCode =
    | "NETWORK_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "VALIDATION_ERROR"
    | "SERVER_ERROR"
    | "UNKNOWN_ERROR";

export class ApiError extends Error {
    readonly code: ApiErrorCode;
    readonly status?: number;
    readonly details?: unknown;

    constructor(params: {
        message: string;
        code: ApiErrorCode;
        status?: number;
        details?: unknown;
    }) {
        super(params.message);
        this.name = "ApiError";
        this.code = params.code;
        this.status = params.status;
        this.details = params.details;
    }
}
