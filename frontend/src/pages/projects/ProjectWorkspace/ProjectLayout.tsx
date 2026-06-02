import { Outlet, useParams } from "react-router-dom";
import { useProject } from "@/hooks/useProject";
import { useLocation } from "react-router-dom";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectCompactHeader from "@/components/project/ProjectCompactHeader";
import { ProjectProvider } from "@/context/ProjectContext";
import ProjectTabs from "@/components/project/ProjectTabs";

export default function ProjectLayout() {
    const { projectId } = useParams();
    const location = useLocation();
    const isOverview = location.pathname.includes("/overview");

    if (!projectId) {
        return (
            <div className="flex items-center justify-center py-20 text-sm text-slate-400">
                Invalid project
            </div>
        );
    }

    const { project, loading, error } = useProject(projectId);

    if (loading) {
        return (
            <div
                className="
                    flex h-full min-h-[50vh]
                    items-center justify-center
                    text-sm text-slate-400 animate-pulse
                "
            >
                Loading project...
            </div>
        );
    }

    if (error || !project) {
        return (
            <div
                className="
                    flex h-full min-h-[50vh]
                    items-center justify-center
                    text-sm text-red-400
                "
            >
                {error ?? "Project not found"}
            </div>
        );
    }

    return (
        <ProjectProvider project={project}>
            <div className="h-full overflow-x-hidden text-slate-100">

                <div
                    className="
                        mx-auto w-full max-w-6xl
                        space-y-5 sm:space-y-6
                        px-3 sm:px-4 md:px-6
                        py-4 sm:py-6 md:py-8
                    
                    "
                >

                    <div className="sticky top-0 z-40">
                        <ProjectTabs projectId={project._id} />
                    </div>

                    <div className="min-w-0">
                        {isOverview ? (
                            <ProjectHeader project={project} />
                        ) : (
                            <ProjectCompactHeader project={project} />
                        )}
                    </div>

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl border border-white/10
                            bg-[#0F172A]
                            p-2 sm:p-5 md:p-6
                            relative
                            transition-all duration-200
                        "
                    >
                        <Outlet />
                    </div>

                </div>
            </div>
        </ProjectProvider>
    );
}