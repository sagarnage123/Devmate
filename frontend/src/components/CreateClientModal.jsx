import React from "react";

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

}){
    if(!isOpen)
        return;

    return(
        <div className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50 transition-all">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
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