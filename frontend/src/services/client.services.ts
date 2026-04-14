import { Client } from "@/types/Client";
import { createClient,getClients,deleteClient } from "@/api/clients";

export default function clientServices() {
    async function fetchClients() {
        try {
            const clients = await getClients();
            return clients;
        } catch (error) {
            console.error("Error fetching clients:", error);
            throw error;
        }
    }

    async function addClient(clientData: Pick<Client, "name" | "email" | "phone">) {
        try {
            await createClient(clientData);
        } catch (error) {
            console.error("Error creating client:", error);
            throw error;
        }
    }

    async function removeClient(clientId: string) {
        if(!clientId)
        {
            console.error("Client ID is required to delete a client.");
            return;
        }
        try {
            await deleteClient(clientId);
        } catch (error) {
            console.error("Error deleting client:", error);
            throw error;
        }
    }

    return {
        fetchClients,
        addClient,
        removeClient
    };
}



