import api from "./axios";
import type { User } from "../types/User";
import { apiCall } from "./apiCall";

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


export async function getCurrentUser(): Promise<User> {
    return apiCall(async () => {
        const res = await api.get("/users/me");
        const user = extractUser(res.data);

        if (!user) {
            throw new Error("Invalid user response");
        }

        return user;
    })
}
