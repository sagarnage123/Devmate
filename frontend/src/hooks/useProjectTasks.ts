import { useEffect, useState } from "react";
import type { Task } from "@/types/Task";
import { getTasksByProject } from "@/api/tasks";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { createTask } from "@/api/tasks";
import { TaskPriority } from "@/types/Task";

export function useProjectTasks(projectId: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [taskSubmitting, setTaskSubmitting] = useState(false);
    
    const createTaskHandler = async (data: {
        title: string;
        priority: TaskPriority;
        dueDate?: string;
    }) => {
            if (!projectId || !data.title.trim() || taskSubmitting)
                return;
            setTaskSubmitting(true);

            try {
                const newTask = await createTask({
                    projectId,
                    title: data.title,
                    priority: data.priority || "Medium",
                    dueDate: data.dueDate || undefined,
                });
                setTasks(prev => [newTask, ...prev]);
                toast.success("Task created");

            } catch (error: unknown) {
                toast.error(getApiErrorMessage(error));
            } finally {
                setTaskSubmitting(false);
            }
        };

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

    return { tasks, loading, error, createTask: createTaskHandler, taskSubmitting };
}
