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
        <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8 ">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl text-center sm:text-left font-semibold tracking-tight text-slate-100">
                        Projects
                    </h1>

                    <p className="mt-1 text-sm text-slate-400 text-center sm:text-left  ">
                        Manage and track all your active projects
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="
                        inline-flex items-center justify-center
                        rounded-xl px-4 py-2.5
                        text-sm font-medium
                        bg-indigo-500 text-white
                        transition-all duration-300 ease-out
                        hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20
                        active:scale-[0.97]
                        w-full sm:w-auto
                        shrink-0
                    "
                >
                    + New Project
                </button>
            </div>

            {loading && (
                <div className="animate-pulse rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-400">
                    Loading projects...
                </div>
            )}

            {!loading && projects.length === 0 && (
                <div
                    className="
                        flex flex-col items-center justify-center
                        rounded-2xl border border-dashed border-slate-800
                        px-6 py-16 sm:py-20
                        text-center
                        transition-all duration-300
                    "
                >
                    <p className="text-sm sm:text-base text-slate-300">
                        No projects yet
                    </p>

                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                        Create your first project to get started
                    </p>
                </div>
            )}

            <div
                className="
                    grid grid-cols-1
                    gap-4 sm:gap-5
                    md:grid-cols-2
                    xl:grid-cols-3
                    m-auto
                "
            >
                {projects.map((project) => (
                    <a
                        key={project._id}
                        href={`/projects/${project._id}`}
                        className="
                            group relative overflow-hidden
                            rounded-2xl border border-slate-800
                            bg-slate-900
                            p-4 sm:p-5

                            transition-all duration-300 ease-out

                            hover:-translate-y-1
                            hover:border-indigo-500/40
                            hover:shadow-xl hover:shadow-indigo-500/10

                            active:scale-[0.99]
                        "
                    >

                        <div
                            className="
                                pointer-events-none absolute inset-0
                                opacity-0 transition duration-300
                                group-hover:opacity-100
                                bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent
                            "
                        />

                        <div className="relative z-10 flex h-full flex-col min-w-0">

                            <div className="min-w-0">
                                <h2
                                    className="
                                        truncate
                                        text-base sm:text-lg
                                        font-medium text-slate-100
                                        transition-all duration-300
                                        group-hover:text-indigo-400
                                    "
                                >
                                    {project.title}
                                </h2>

                                <p className="mt-1 truncate text-xs sm:text-sm text-slate-500">
                                    {project.clientId?.name}
                                </p>
                            </div>

                            <p
                                className="
                                    mt-3 line-clamp-2
                                    text-sm text-slate-400
                                "
                            >
                                {project.description || "No description"}
                            </p>

                            <div
                                className="
                                    mt-5 flex items-center justify-between gap-3
                                    transition-all duration-300
                                    group-hover:translate-y-[2px]
                                "
                            >
                                <div className="shrink-0">
                                    <StatusBadge status={project.status} />
                                </div>

                                {project.budget && (
                                    <span
                                        className="
                                            truncate text-sm
                                            text-slate-400 tabular-nums
                                        "
                                    >
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