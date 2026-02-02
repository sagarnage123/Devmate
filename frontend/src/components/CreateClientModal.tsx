import React from "react";
import { Dispatch, SetStateAction } from "react";

interface CreateClientModalProps {
    isOpen: boolean;
    onClose: () => void;

    clientName: string;
    setClientName: Dispatch<SetStateAction<string>>;

    clientEmail: string;
    setClientEmail: Dispatch<SetStateAction<string>>;

    clientPhone: string;
    setClientPhone: Dispatch<SetStateAction<string>>;

    creatingClient: boolean;
    handleCreateClient: () => Promise<void>;
}
    
export default function CreateClientModal({
    isOpen,
    onClose,
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    clientPhone,
    setClientPhone,
    creatingClient,
    handleCreateClient

}:CreateClientModalProps){
    // if(!isOpen)
    //     return;

    return(
        <div className={`flex items-center justify-center fixed inset-0  bg-black   backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen?"bg-opacity-50 opacity-100 pointer-events-auto":"bg-opacity-0  opacity-0 pointer-events-none"}`}>

            <div className={`bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen
                ? 'scale-100 translate-y-0 opacity-100'
                : 'scale-95 -translate-y-4 opacity-0'}`}>

                <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

                <div className="grid gap-4">
                <input type="text"
                placeholder="Enter Client Name"
                value={clientName}
                onChange={(e)=>setClientName(e.target.value)}
                required
                className="p-2 border rounded" />

                <input type="email"
                placeholder="Enter Client Email"
                value={clientEmail}
                onChange={(e)=>setClientEmail(e.target.value)}
                required
                className="p-2 border rounded" />

                <input type="text"
                placeholder="Enter Client Phone"
                value={clientPhone}
                onChange={(e)=>setClientPhone(e.target.value)}
                className="p-2 border rounded" />

                <div className="flex gap-2 mt-4">
                    <button onClick={handleCreateClient} disabled={creatingClient}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg">
                        {creatingClient?"Creating...":"Create Client"}
                    </button>

                    <button onClick={onClose}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg">
                        Cancel
                    </button>

                </div>
                </div>

            </div>

        </div>

    )
}