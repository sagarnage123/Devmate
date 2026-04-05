import api from "./axios";
import { Task, TaskPriority } from "../types/Task";

function extractTasks(data: unknown): Task[] {
    if (
        typeof data === "object" &&
        data !== null &&
        ("data" in data || "task" in data)
    ) {
        const maybeTasks = (data as any).data ?? (data as any).task;
        return Array.isArray(maybeTasks) ? maybeTasks : [];
    }
    return [];
}

export async function getTasksByProject(
    projectId: string
): Promise<Task[]> {
    const res = await api.get("/task", {
        params: { projectId },
    });

    return extractTasks(res.data);
}

export interface CreateTaskPayload {
    projectId: string;
    title: string;
    priority: TaskPriority;
    dueDate?: string;
}

export async function createTask(
    payload: CreateTaskPayload
): Promise<Task> {
    const res = await api.post("/task", payload);

    const data = res.data;

    if (data?.task) return data.task;
    if (data?.data) return data.data;

    throw new Error("Invalid createTask response");
}
export async function updateTask(
    taskId: string,
    updates: Partial<Task>
): Promise<void> {
    await api.put(`/task/${taskId}`, updates);
}

export async function deleteTask(
    taskId: string
): Promise<void> {
    await api.delete(`/task/${taskId}`);
}