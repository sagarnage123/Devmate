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
    if (!projectId) return <div className="text-sm text-slate-400">Invalid project</div>;

    const { project, loading, error } = useProject(projectId);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-sm text-slate-400 animate-pulse">
                Loading project...
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="flex items-center justify-center h-full text-sm text-red-400">
                {error ?? "Project not found"}
            </div>
        );
    }

    return (
        <ProjectProvider project={project}>
            <div className="text-slate-100">

                <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

                    <ProjectTabs projectId={project._id} />
                    
                    {isOverview ? (
                        <ProjectHeader project={project} />
                    ) : (
                        <ProjectCompactHeader project={project}/>
                    )}


                    
                    <div className="bg-[#0F172A] border border-white/10 rounded-xl p-5
                    transition-all duration-200">

                        <Outlet />

                    </div>

                </div>
            </div>
        </ProjectProvider>
    );
}