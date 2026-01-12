import api from "./axios";
import type { Client } from "../types/Client";



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
    const res = await api.get("/client");
    return extractClients(res.data);
}

export async function createClient(
    payload: Pick<Client, "name" | "email" | "phone">
): Promise<void> {
    await api.post("/client", payload);
}

export async function deleteClient(clientId: string): Promise<void> {
    await api.delete(`/client/${clientId}`);
}
