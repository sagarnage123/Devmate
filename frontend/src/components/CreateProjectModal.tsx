import { useEffect, useState } from "react";
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

    const [shouldRender, setShouldRender] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);

            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        } else {
            setIsVisible(false);

            const timeout = setTimeout(() => {
                setShouldRender(false);
            }, 300); 

            return () => clearTimeout(timeout);
        }
    }, [isOpen]);



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

    if (!shouldRender) return null;

   
    return (
        <div
            className={`
    fixed inset-0 z-50 flex items-center justify-center
    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${isVisible ? "bg-black/60 backdrop-blur-md" : "bg-black/0 backdrop-blur-0"}
`}
        >
            <div
                className={`
        w-full max-w-lg rounded-2xl p-6
        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]

        ${isVisible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                    }

        bg-[#0F172A] border border-white/10
        shadow-2xl shadow-black/40
    `}
            >

                <h2 className="text-lg font-semibold tracking-tight text-slate-100 mb-6">
                    Create Project
                </h2>

                <div className="space-y-4">

                    <input
                        placeholder="Project title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />

                    <ClientSelector
                        selectedClient={selectedClient}
                        setSelectedClient={setSelectedClient}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                        className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                        className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />

                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />

                </div>

                <div className="flex justify-end gap-2 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm text-slate-400
                hover:bg-slate-800 hover:text-slate-100
                transition-all duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg text-sm font-medium
                bg-indigo-500 text-white
                transition-all duration-300 ease-out
                hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20
                active:scale-[0.97]"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>

                </div>

            </div>
        </div>
    );
}