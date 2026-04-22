import { useEffect, useState } from "react";
import ClientCard from "@/components/ClientCard";
import { getClients } from "@/api/clients";
import type { Client } from "@/types/Client";
import toast from "react-hot-toast";

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await getClients();
            setClients(data);
        } catch {
            toast.error("Failed to fetch clients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">

            
            <div className="mb-8">
                <h1 className="text-2xl font-semibold">Clients</h1>
                <p className="text-gray-400 text-sm mt-1">
                    Manage all your clients in one place
                </p>
            </div>

           
            <ClientCard
                clientsLoading={loading}
                clients={clients}
                fetchClients={fetchClients}
            />
        </div>
    );
}