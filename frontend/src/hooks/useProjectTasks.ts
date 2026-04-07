import { useEffect, useState } from "react";
import type { Task ,TaskStatus} from "@/types/Task";
import { deleteTask, getTasksByProject, updateTask } from "@/api/tasks";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { createTask } from "@/api/tasks";
import { TaskPriority } from "@/types/Task";

export function useProjectTasks(projectId: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [taskSubmitting, setTaskSubmitting] = useState(false);

    async function deleteTaskHandler(taskId: string) {
        try {
            await deleteTask(taskId);

            setTasks((prev) => prev.filter((task) => task._id !== taskId));
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    }

    async function updateTaskStatus(taskId: string, currentStatus: TaskStatus) {
        const nextStatus =
            currentStatus === "To Do"
                ? "In Progress"
                : currentStatus === "In Progress"
                    ? "Done"
                    : "To Do";

        try {
            await updateTask(taskId, { status: nextStatus });

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? { ...task, status: nextStatus } : task
                )
            );
        } catch (err) {
            console.error("Failed to update status", err);
        }
    }
    
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

    return { tasks, loading, error, createTask: createTaskHandler, taskSubmitting ,updateTaskStatus, deleteTask: deleteTaskHandler};
}
