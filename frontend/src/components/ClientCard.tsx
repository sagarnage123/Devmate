
import { useState } from "react";
import CreateClientModal from "./CreateClientModal";
import toast from "react-hot-toast";

import type { Client } from "../types/Client";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { createClient } from "../api/clients";

interface ClientCardProps{
    clientsLoading:boolean;
    clients:Client[];
    fetchClients:()=>Promise<void>;
}
export default function ClientCard({
    clientsLoading,
    clients,
    fetchClients

}:ClientCardProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [creatingClient, setCreatingClient] = useState(false);

    const handleCreateClient=async ():Promise<void>=>{
        
        if(!clientEmail || !clientName)
        {
            toast.error("Name and Email are required");
            return;
        }

        setCreatingClient(true);

        try {
            await createClient({
                name: clientName,
                email: clientEmail,
                phone: clientPhone || undefined
            })

            toast.success("✅ Client created!");

           
            await fetchClients(); 

           
            setClientName("");
            setClientEmail("");
            setClientPhone("");
            setIsModalOpen(false);
            
        } catch (error: unknown) {
            toast.error(getApiErrorMessage(error));
        } finally {
            setCreatingClient(false);
        }
    }

    return (
        <div className="space-y-6">

          
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                    Clients
                </h2>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="
                px-4 py-2 rounded-lg text-sm font-medium
                bg-indigo-500 hover:bg-indigo-400 hover:scale-105
                transition-all duration-200 
                "
                >
                    + Add Client
                </button>
            </div>

            
            {clientsLoading ? (
                <div className="text-sm text-slate-400 py-10 text-center">
                    ⏳ Loading clients...
                </div>
            ) : clients.length === 0 ? (
                <div className="
            text-center py-16 text-slate-500
            border border-dashed border-white/10 rounded-xl
            ">
                    No clients yet. Add your first client.
                </div>
            ) : (
                <div className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
            ">
                    {clients.map(client => (
                        <div
                            key={client.id}
                            className="
                        group
                        bg-[#111827] border border-white/10 rounded-xl p-4

                        transition-all duration-200 ease-out
                        hover:border-indigo-500/30 hover:-translate-y-[2px]
                        hover:shadow-md hover:shadow-indigo-500/10
                        "
                        >

                           
                            <h3 className="text-sm font-semibold text-white">
                                {client.name}
                            </h3>

                           
                            <p className="text-sm text-slate-400 mt-1 truncate">
                                {client.email}
                            </p>

                           
                            <p className="text-xs text-slate-500 mt-2">
                                {client.phone || "No phone"}
                            </p>

                        </div>
                    ))}
                </div>
            )}

            {/* MODAL */}
            <CreateClientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={async (data) => {
                    await createClient(data);
                    toast.success("Client created!");
                    await fetchClients();
                }}
            />

        </div>
    );
}