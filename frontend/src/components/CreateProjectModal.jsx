import React from "react";

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

}){
    if(!isOpen)
        return ;

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50">

        
        <div className="bg-white p-6 rounded-md max-w-md shadow-md">
            <h2 className="text-xl font-semibold mt-3 mb-4">Create New Project</h2>

                <form onSubmit={onFormSubmit} className="space-y-3">

                <input type="text" placeholder="Project Title"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    required
                    className="p-2 border rounded w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "

                />

                
                <select value={status}
                    onChange={(e) => setStatus(e.target.value)}
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