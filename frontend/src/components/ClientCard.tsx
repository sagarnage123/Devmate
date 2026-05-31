
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
   
    return (
        <div className="space-y-6">

          
            <div className="
flex flex-col gap-3
sm:flex-row sm:items-center sm:justify-between
">
                <h2 className="text-lg font-semibold text-white">
                    Clients
                </h2>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="
w-full sm:w-auto
px-4 py-2.5
rounded-lg text-sm font-medium
bg-indigo-500 hover:bg-indigo-400
shadow-md shadow-indigo-500/20
transition-all duration-200 active:scale-[0.97]
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
            text-center py-12 sm:py-16 text-slate-500
            border border-dashed border-white/10 rounded-xl
            ">
                    No clients yet. Add your first client.
                </div>
            ) : (
                <div className="
            grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4
            ">
                    {clients.map(client => (
                        <div
                            key={client.id}
                            className="
                        group
                        bg-[#111827] border border-white/10 rounded-xl p-4 sm:p-6

                        transition-all duration-200 ease-out
                        hover:border-indigo-500/30 hover:-translate-y-[2px]
                        hover:shadow-md hover:shadow-indigo-500/10
                        "
                        >

                           
                            <h3 className="truncate text-sm font-semibold text-white">
                                {client.name}
                            </h3>

                           
                            <p className="text-sm text-slate-400 mt-1 truncate">
                                {client.email}
                            </p>

                           
                            <p className="mt-2 break-all text-xs text-slate-500">
                                {client.phone || "No phone"}
                            </p>

                        </div>
                    ))}
                </div>
            )}

            
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