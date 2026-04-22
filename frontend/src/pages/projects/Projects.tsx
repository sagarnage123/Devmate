import { useEffect, useState } from "react";
import { getProjects } from "@/api/projects";

import StatusBadge from "@/components/project/ProjectStatusBadge";
import { ProjectStatus } from "@/types/Project";
import CreateProjectModal from "@/components/CreateProjectModal";
export interface Project {
    _id: string;
    title: string;
    budget?: number | null;
    startDate: string;
    dueDate: string;
    description?: string;
    status: ProjectStatus;

    clientId: {
        _id: string;
        name: string;
    };
}
export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-8">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-semibold">Projects</h1>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg font-medium"
                    >
                        + New Project
                    </button>
                   
                </div>

                {loading && (
                    <div className="text-gray-400">Loading projects...</div>
                )}

             
                {!loading && projects.length === 0 && (
                    <div className="text-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-xl">
                        No projects yet. Create your first project 🚀
                    </div>
                )}

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <a
                            key={project._id}
                            href={`/projects/${project._id}`}
                            className="group bg-[#111827] border border-gray-800 rounded-2xl p-5 hover:border-indigo-500 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10"
                        >

                           
                            <h2 className="text-lg font-semibold group-hover:text-indigo-400 transition">
                                {project.title}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Client : {project.clientId?.name}
                            </p>

                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                {project.description || "No description"}
                            </p>

                           
                            <div className="mt-6 flex justify-between items-center">

                                
                                <StatusBadge status={project.status} />

                                
                                {project.budget && (
                                    <span className="text-sm text-gray-400">
                                        ₹{project.budget}
                                    </span>
                                )}
                            </div>
                        </a>
                    ))}
                </div>

                <CreateProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={async () => {
                        const data = await getProjects();
                        setProjects(data);
                    }}
                />

            </div>
        </div>
    );
}