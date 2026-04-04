import { useEffect, useState } from "react";
import type { Task } from "@/types/Task";
import { getTasksByProject } from "@/api/tasks";

export function useProjectTasks(projectId: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchTasks() {
            try {
                setLoading(true);
                setError(null);

                const data = await getTasksByProject(projectId);

                if (!mounted) return;
                setTasks(data);
            } catch (err) {
                if (!mounted) return;
                setError("Failed to load tasks");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchTasks();

        return () => {
            mounted = false;
        };
    }, [projectId]);

    return { tasks, loading, error };
}
