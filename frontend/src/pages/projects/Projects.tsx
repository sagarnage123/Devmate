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
       
        <div className="max-w-7xl mx-auto space-y-8">

           
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
                    Projects
                </h1>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
            bg-indigo-500 text-white
            transition-all duration-300 ease-out
            hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20
            active:scale-[0.97]"
                >
                    + New Project
                </button>
            </div>

            
            {loading && (
                <div className="text-sm text-slate-400 animate-pulse">
                    Loading projects...
                </div>
            )}

            
            {!loading && projects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20
        border border-dashed border-slate-800 rounded-xl text-center
        transition-all duration-300">

                    <p className="text-sm text-slate-400">
                        No projects yet
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                        Create your first project to get started
                    </p>
                </div>
            )}

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {projects.map((project) => (
                    <a
                        key={project._id}
                        href={`/projects/${project._id}`}
                        className="group relative overflow-hidden
                bg-slate-900 border border-slate-800 rounded-xl p-5

                transition-all duration-300 ease-out

                hover:-translate-y-1
                hover:border-indigo-500/40
                hover:shadow-xl hover:shadow-indigo-500/10

                active:scale-[0.99]"
                    >

                       
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none
                bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent" />

                       
                        <div className="relative z-10">

                            <h2 className="text-base font-medium text-slate-100
                    transition-all duration-300
                    group-hover:text-indigo-400">
                                {project.title}
                            </h2>

                            
                            <p className="text-xs text-slate-500 mt-1">
                                {project.clientId?.name}
                            </p>

                           
                            <p className="text-sm text-slate-400 mt-3 line-clamp-2">
                                {project.description || "No description"}
                            </p>

                            
                            <div className="mt-5 flex items-center justify-between
                    transition-all duration-300 group-hover:translate-y-[2px]">

                                <StatusBadge status={project.status} />

                                {project.budget && (
                                    <span className="text-sm text-slate-400 tabular-nums">
                                        ₹{project.budget}
                                    </span>
                                )}
                            </div>

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
    );
}

