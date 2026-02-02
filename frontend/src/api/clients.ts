import api from "./axios";
import type { Client } from "../types/Client";
import { apiCall } from "./apiCall";



function extractClients(data: unknown): Client[] {
    if (
        typeof data === "object" &&
        data !== null &&
        ("clients" in data || Array.isArray(data))
    ) {
        const raw = (data as any).clients ?? data;
        return Array.isArray(raw) ? raw : [];
    }
    return [];
}


export async function getClients(): Promise<Client[]> {
    return apiCall(
       async () => {
            const res = await api.get("/client");
    return extractClients(res.data);
})
}

export async function createClient(
    payload: Pick<Client, "name" | "email" | "phone">
): Promise<void> {
   return apiCall(()=> api.post("/client", payload));
}

export async function deleteClient(clientId: string): Promise<void> {
    return apiCall(()=> api.delete(`/client/${clientId}`));
}
