import { useEffect, useState } from "react";
import { Project } from "@/types/Project";
import { getProjectById } from "@/api/projects";

export function useProject(projectId: string) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchProject() {
            try {
                setLoading(true);
                setError(null);
                const project=await getProjectById(projectId);
                
                await new Promise(res => setTimeout(res, 500));

                if (!isMounted) return;
                if(!project)
                    throw new Error("Project not found");

                setProject({
                    _id: project._id,
                    title: project.title,
                    status: project.status,
                    startDate: project.startDate,
                    dueDate: project.dueDate,
                    clientId: project.clientId.name,
                    budget: project.budget,
                    description: project.description,
                });
              
            } catch (err) {
                if (!isMounted) return;
                setError("Failed to load project");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchProject();

        return () => {
            isMounted = false;
        };
    }, [projectId]);

    return { project, loading, error };
}
