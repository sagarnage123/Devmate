import { Outlet, useParams } from "react-router-dom";
import { useProject } from "@/hooks/useProject";
import ProjectHeader from "@/components/project/ProjectHeader";
import { ProjectProvider } from "@/context/ProjectContext";
import ProjectTabs from "@/components/project/ProjectTabs";

export default function ProjectLayout() {
    const { projectId } = useParams();
    if (!projectId) return <div>Invalid project</div>;

    const { project, loading, error } = useProject(projectId);

    if (loading) return <div>Loading project...</div>;
    if (error || !project) return <div>{error ?? "Project not found"}</div>;

    return (
        <ProjectProvider project={project}>
            <div className="bg-slate-50 min-h-screen text-slate-900">
                <div className="max-w-6xl mx-auto px-6 py-8 space-y-7">
                    <ProjectHeader project={project} />
                    <ProjectTabs projectId={project._id} />
                    <Outlet />
                </div>
            </div>
        </ProjectProvider>
    );
}
