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
        <div className={`${isModalOpen ? "pointer-events-none opacity-50" : "" }`} >
            

            <input
                placeholder="Search or create client..."
                value={query}
                onFocus={() => {
                    fetchClients();
                    setShowDropdown(true);
                }}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
            />

           
            {showDropdown && (
                <div className="absolute w-full bg-[#1F2937] border border-gray-700 rounded-lg mt-1 z-10">

                    {filtered.map((client) => (
                        <div
                            key={client.id}
                            onClick={() => {
                                setSelectedClient(client);
                                setQuery(client.name);
                                setShowDropdown(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                            {client.name}
                        </div>
                    ))}

                   
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className={`px-4 py-2 hover:bg-gray-700 cursor-pointer text-green-500 font-semibold flex items-center gap-1}`}
                    >
                        + Create {query}
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