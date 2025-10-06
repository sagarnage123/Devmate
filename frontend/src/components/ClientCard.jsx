import React from "react";
import { useState } from "react";
import CreateClientModal from "./CreateClientModal";
import toast from "react-hot-toast";
import api from "../api/axios";


export default function ClientCard({
    clientsLoading,
    clients,
    fetchClients

}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [creatingClient, setCreatingClient] = useState(false);

    const handleCreateClient=async ()=>{
        
        if(!clientEmail || !clientName)
        {
            toast.error("Name and Email are required");
            return;
        }

        setCreatingClient(true);

        try {
            const res = await api.post("/client", {
                name: clientName,
                email: clientEmail,
                phone: clientPhone || undefined
            });

            toast.success("✅ Client created!");

           
            await fetchClients(); 

           
            setClientName("");
            setClientEmail("");
            setClientPhone("");
            setIsModalOpen(false);
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create client");
        } finally {
            
            setCreatingClient(false);
        }
    }

    return(
        <div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Clients</h2>
            {
                (clientsLoading) ? (<p>⏳ Loading clients...</p>)
                    : (clients.length == 0) ? (<p>No clients yet.</p>)
                        : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{
                                    clients.map(client => (
                                        <div key={client._id} className="p-4 border rounded shadow-sm hover:shadow-md transition">
                                            <h3 className="font-bold">{client.name}</h3>
                                            <p className="text-gray-600">{client.email}</p>
                                            <p className="text-gray-500 text-sm"> Phone :{client.phone || "N/A"}</p>
                                        </div>
                                    ))
                                }

                                </div>
                        )
            }
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                + Add Client
            </button>

            <CreateClientModal
                isOpen={isModalOpen}
                onClose={()=>{setIsModalOpen(false)}}
                clientName={clientName}
                setClientName={setClientName}
                clientEmail={clientEmail}
                setClientEmail={setClientEmail}
                clientPhone={clientPhone}
                setClientPhone={setClientPhone}
                creatingClient={creatingClient}
                handleCreateClient={handleCreateClient}
            />
            
        </div>
       
       
        
    )
}