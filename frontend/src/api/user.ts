import api from "./axios";
import type { User } from "../types/User";

function extractUser(data: unknown): User | null {
    if (
        typeof data === "object" &&
        data !== null &&
        "user" in data &&
        typeof (data as any).user === "object"
    ) {
        return (data as any).user as User;
    }
    return null;
}

/* -----------------------------------------
 * API functions
 * ----------------------------------------- */

export async function getCurrentUser(): Promise<User> {
    const res = await api.get("/users/me");
    const user = extractUser(res.data);

    if (!user) {
        throw new Error("Invalid user response");
    }

    return user;
}
