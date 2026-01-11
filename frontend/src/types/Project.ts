export type ProjectStatus = "planned" | "in-progress" | "on-hold" | "completed";
export interface Project {
    _id: string;
    title: string;
    budget?: number | null;
    startDate: string;
    dueDate: string;
    description?: string;
    status: ProjectStatus;
    clientId: string;
}

export function isProjectStatus(status: string): status is ProjectStatus {
    return ["planned", "in-progress", "on-hold", "completed"].includes(status);
}