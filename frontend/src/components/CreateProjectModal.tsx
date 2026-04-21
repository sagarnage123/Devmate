import { useState } from "react";
import type { ProjectStatus } from "../types/Project";
import { createProject } from "../api/projects";
import ClientSelector from "./ClientSelector";
import type { Client } from "../types/Client";
import toast from "react-hot-toast";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => Promise<void>;
}

export default function CreateProjectModal({
    isOpen,
    onClose,
    onSuccess,
}: Props) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<ProjectStatus>("planned");
    const [budget, setBudget] = useState<number | "">("");
    const [description, setDescription] = useState("");

    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title || !selectedClient) {
            toast.error("Title and client are required");
            return;
        }

        try {
            setLoading(true);

            await createProject({
                title,
                clientId: selectedClient.id,
                status,
                budget: budget || undefined,
                description,
            });

            toast.success("Project created");

            await onSuccess();
            onClose();

           
            setTitle("");
            setBudget("");
            setDescription("");
            setSelectedClient(null);

        } catch (err) {
            toast.error("Failed to create project");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#111827] text-white w-full max-w-lg p-6 rounded-2xl shadow-xl">

                <h2 className="text-xl font-semibold mb-6">
                    Create Project
                </h2>

                <div className="space-y-4">

                  
                    <input
                        placeholder="Project title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
                    />

                   
                    <ClientSelector
                        selectedClient={selectedClient}
                        setSelectedClient={setSelectedClient}
                    />

                    
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
                    >
                        <option value="planned">Planned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="on-hold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>

                    
                    <input
                        type="number"
                        placeholder="Budget (optional)"
                        value={budget}
                        onChange={(e) =>
                            setBudget(e.target.value ? Number(e.target.value) : "")
                        }
                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
                    />

                    
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
                    />

                </div>

               
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>

            </div>
        </div>
    );
}