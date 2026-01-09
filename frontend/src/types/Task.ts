export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
    _id: string;
    title: string;
    description?: string;
    priority?: TaskPriority;
    dueDate?: string; 
    status: TaskStatus;
    completedAt?: string; 
}