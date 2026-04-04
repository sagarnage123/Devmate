import { useEffect, useState } from "react";
import { Project } from "@/types/Project";

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

                
                await new Promise(res => setTimeout(res, 500));

                if (!isMounted) return;

                setProject({
                    _id: projectId,
                    title: "DevMate Core Refactor",
                    status: "in-progress",
                    startDate: new Date().toISOString(),
                    dueDate: new Date().toISOString(),
                    clientId: "client_123",
                    budget: 50000,
                    description: "UI refactor for project workspace",
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
