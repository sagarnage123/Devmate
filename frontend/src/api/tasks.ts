import api from "./axios";
import { Task, TaskPriority } from "../types/Task";
import { apiCall } from "./apiCall";

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
   return apiCall(async ()=> {const res = await api.get("/task", {
        params: { projectId },
    });

    return extractTasks(res.data);})
}

export interface CreateTaskPayload {
    projectId: string;
    title: string;
    priority: TaskPriority;
    dueDate?: string;
}

export async function createTask(
    payload: CreateTaskPayload
): Promise<void> {
    return apiCall( ()=>api.post("/task", payload));
}

export async function updateTask(
    taskId: string,
    updates: Partial<Task>
): Promise<void> {
  return apiCall(()=> api.put(`/task/${taskId}`, updates));
}

export async function deleteTask(
    taskId: string
): Promise<void> {
    return apiCall(()=> api.delete(`/task/${taskId}`));
}