import { useState } from "react";
import CreateClientModal from "./CreateClientModal";
import { createClient, getClients } from "../api/clients";
import type { Client } from "../types/Client";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

interface Props {
    selectedClient: Client | null;
    setSelectedClient: (client: Client) => void;
}

export default function ClientSelector({
    selectedClient,
    setSelectedClient,
}: Props) {
    const [clients, setClients] = useState<Client[]>([]);
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchClients = async () => {
        const data = await getClients();
        setClients(data);
    };

    const filtered = clients.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
    );

    
    const handleCreateClient = async (
        name: string,
        email: string,
        phone?: string
    ) => {
        try {
            await createClient({ name, email, phone });
            toast.success("Client created");

            const updated = await getClients();
            setClients(updated);

            const newClient = updated.find((c) => c.email === email);
            if (newClient) setSelectedClient(newClient);

            setIsModalOpen(false);
        } catch (err) {
            toast.error(getApiErrorMessage(err));
        }
    };

    return (
        <div className={`relative ${isModalOpen ? "pointer-events-none opacity-50" : ""}`}>

            
            <input
                placeholder="Search or create client..."
                value={query}
                onFocus={() => {
                    fetchClients();
                    setShowDropdown(true);
                }}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
        placeholder:text-slate-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
        transition-all duration-200"
            />

           
            {showDropdown && (
                <div
                    className="absolute left-0 right-0 mt-2 z-20
            bg-[#0F172A] border border-white/10 rounded-xl
            shadow-xl shadow-black/30
            overflow-hidden
            animate-in fade-in zoom-in-95 duration-200"
                >

                   
                    <div className="max-h-56 overflow-y-auto no-scrollbar">

                        {filtered.length > 0 ? (
                            filtered.map((client) => (
                                <div
                                    key={client.id}
                                    onClick={() => {
                                        setSelectedClient(client);
                                        setQuery(client.name);
                                        setShowDropdown(false);
                                    }}
                                    className="px-3 py-2 text-sm text-slate-300
                            hover:bg-[#111827] hover:text-white
                            cursor-pointer transition-all duration-150"
                                >
                                    {client.name}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-slate-500">
                                No clients found
                            </div>
                        )}

                    </div>

                  
                    <div className="border-t border-white/10" />

                   
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="px-3 py-2 text-sm font-medium
                text-indigo-400 hover:text-indigo-300
                hover:bg-indigo-500/10
                cursor-pointer transition-all duration-150 flex items-center gap-1"
                    >
                        + Create "{query || "new client"}"
                    </div>

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