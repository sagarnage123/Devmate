import api from "./axios";
import type { Project, ProjectStatus } from "../types/Project";
import { isProjectStatus } from "../types/Project";
import { apiCall } from "./apiCall";


function extractProjects(data: unknown): Project[] {
    if (
        typeof data === "object" &&
        data !== null &&
        ("projects" in data || "project" in data)
    ) {
        const raw = (data as any).projects ?? (data as any).project;

        if (!Array.isArray(raw)) return [];

        return raw.map((p) => ({
            ...p,
            status: isProjectStatus(p.status) ? p.status : "planned",
        }));
    }

    return [];
}


export async function getProjects(): Promise<Project[]> {
    return apiCall(async () => {
        const response = await api.get("/projects");
        return extractProjects(response.data);
    });
}

export interface CreateProjectPayload {
    title: string;
    clientId: string;
    status: ProjectStatus;
    budget?: number;
    startDate?: string;
    dueDate?: string;
    description?: string;
}

export function createProject(
    payload: CreateProjectPayload
): Promise<void> {
    return apiCall(() => api.post("/project", payload));
}


export function updateProject(
    projectId: string,
    updates: Partial<Project>
): Promise<void> {
    return apiCall(() => api.put(`/project/${projectId}`, updates));
}

export function deleteProject(projectId: string): Promise<void> {
    return apiCall(() => api.delete(`/project/${projectId}`));
}
