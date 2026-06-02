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
        <div className="text-white px-3 sm:px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-6">

                
                <div className="flex flex-col gap-2 text-center sm:text-left">

                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-white">
                            Clients
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Manage all your clients in one place
                        </p>
                    </div>

                </div>


                <div className="
            rounded-2xl
            ">

                  
                    <div className="px-4 py-4 sm:px-6 border-b border-white/10 text-sm text-slate-400 text-center sm:text-left">
                        All clients
                    </div>

                    
                    <div className="px-4 py-4 sm:px-6">
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