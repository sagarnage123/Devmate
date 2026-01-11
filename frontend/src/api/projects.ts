import api from "./axios";
import type { Project, ProjectStatus } from "../types/Project";
import { isProjectStatus } from "../types/Project";


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
    const res = await api.get("/project");
    return extractProjects(res.data);
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

export async function createProject(
    payload: CreateProjectPayload
): Promise<void> {
    await api.post("/project", payload);
}



export async function updateProject(
    projectId: string,
    updates: Partial<Project>
): Promise<void> {
    await api.put(`/project/${projectId}`, updates);
}



export async function deleteProject(projectId: string): Promise<void> {
    await api.delete(`/project/${projectId}`);
}
