import { useState } from "react";
import { createPortal } from "react-dom";
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: {
        name: string;
        email: string;
        phone?: string;
    }) => Promise<void>;
}

export default function CreateClientModal({
    isOpen,
    onClose,
    onCreate,
}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email) return;

        setLoading(true);

        await onCreate({
            name,
            email,
            phone: phone || undefined,
        });

        setLoading(false);

       
        setName("");
        setEmail("");
        setPhone("");

        onClose();
    };

    if(!isOpen) return null;

    return createPortal(
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}>
            <div className="bg-white p-6 rounded-2xl w-96">

                <h2 className="text-xl font-semibold mb-4">
                    Add Client
                </h2>

                <div className="space-y-3">
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        ,
        document.body
    );
}