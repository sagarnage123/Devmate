import { Dispatch ,SetStateAction} from "react";
import {ProjectStatus } from "../types/Project";
interface Client {
    _id: string;
    name: string;
}

interface CreateProjectModalProps {

    isOpen: boolean;
    onClose: () => void;    
    handleSubmit: () => Promise<void>;

    setTitle: Dispatch<SetStateAction<string>>;
    title: string;

    setStatus: Dispatch<SetStateAction<ProjectStatus>>;
    status: ProjectStatus;

    setClientId: Dispatch<SetStateAction<string>>;
    clientId: string;
    clients: Array<Client>;

    budget?: number | string;
    setBudget: Dispatch<SetStateAction<number | string | undefined>>;

    startDate: string;
    setStartDate: Dispatch<SetStateAction<string>>;

    dueDate: string;
    setDueDate: Dispatch<SetStateAction<string>>;

    description: string;
    setDescription: Dispatch<SetStateAction<string>>;

    submiting: boolean;

}

export default function CreateProjectModal({
    isOpen,
    onClose,
    handleSubmit,
    setTitle,
    title,
    setStatus,
    status,
    setClientId,
    clientId,
    clients,
    budget,
    setBudget,
    startDate,
    dueDate,
    setStartDate,
    setDueDate,
    description,
    setDescription,
    submiting

}: CreateProjectModalProps) {
    // if(!isOpen)
    //     return null;

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    };

    const isProjectStatus=(status: string): status is ProjectStatus => {
        return ["planned", "in-progress", "on-hold", "completed"].includes(status);
    }

    return (
        <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
            className={`flex justify-center items-center fixed inset-0 backdrop-blur-sm bg-black transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen? `pointer-events-auto bg-opacity-50`:`opacity-0 pointer-events-none`}`}>

        
            <div className={`bg-white p-6 rounded-md max-w-md shadow-md w-full transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen?'scale-100 translate-y-0 opacity-100':`scale-95 opacity-0 -translate-y-3`}`} >
            <h2
            id="modal-title"
             className="text-xl font-semibold mt-3 mb-4">Create New Project</h2>

                <form onSubmit={onFormSubmit} className="space-y-3">

                <input type="text" placeholder="Project Title"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    required
                    className="p-2 border rounded w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "

                />

                
                <select value={status}
                    onChange={(e) => {
                        if (!isProjectStatus(e.target.value)) return;
                        setStatus(e.target.value);
                    }}
                    className="p-2 border rounded w-full mt-3 "
                    required
                >
                    <option value="">Select status</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">Active</option>
                    <option value="on-hold">On hold</option>
                    <option value="completed">Completed</option>


                </select>
                
                <select value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="p-2 border rounded w-full mt-3 "
                    required
                >
                    <option value="">Select Client</option>
                    {
                        clients.map(client => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))
                    }

                </select>

                <input type="number"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="p-2 border rounded w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input type="date"
                    value={startDate}
                    placeholder="Start Date"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input type="date"
                    value={dueDate}
                    placeholder="Due date"
                    onChange={(e) => setDueDate(e.target.value)}
                    className="p-2 border rounded w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <textarea placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 border rounded w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                ></textarea>

                <div className="flex gap-2 mt-2">
                    <button type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={submiting}
                    >{submiting ? "Creating project" : "Create Project"}</button>
                    <button 
                    type="button"
                    onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
                        Cancel
                    </button>
                </div>
                </form>

        </div>
        </div>
    )
}