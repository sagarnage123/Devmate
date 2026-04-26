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
        <div className="min-h-screen bg-[#0B0F19] text-white p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-lg font-semibold text-white">
                            Clients
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Manage all your clients in one place
                        </p>
                    </div>

                </div>


                <div className="
            bg-[#111827] border border-white/10 rounded-xl
            ">

                  
                    <div className="px-6 py-4 border-b border-white/10 text-sm text-slate-400">
                        All clients
                    </div>

                    
                    <div className="px-6 py-6">
                        <ClientCard
                            clientsLoading={loading}
                            clients={clients}
                            fetchClients={fetchClients}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}