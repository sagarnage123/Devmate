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
        <div className="space-y-4">
            <ProjectProvider project={project}>
                <ProjectHeader project={project} />
                <ProjectTabs projectId={project._id} />
                <Outlet />
            </ProjectProvider>
        </div>
    );
}
