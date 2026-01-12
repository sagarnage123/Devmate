import api from "./axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export async function login(payload: LoginPayload): Promise<void> {
    const res = await api.post("/users/login", payload, {
        withCredentials: true,
    });

    const token =
        typeof res.data === "object" &&
            res.data !== null &&
            "token" in res.data
            ? String((res.data as Record<string, unknown>).token)
            : null;

    if (!token) {
        throw new Error("Invalid login response");
    }

    localStorage.setItem("devmate-token", token);
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export async function register(payload: RegisterPayload): Promise<void> {
    const res = await api.post("/users/register", payload, {
        withCredentials: true,
    });

    const token =
        typeof res.data === "object" &&
            res.data !== null &&
            "token" in res.data
            ? String((res.data as Record<string, unknown>).token)
            : null;

    if (!token) {
        throw new Error("Invalid register response");
    }

    localStorage.setItem("devmate-token", token);
}
