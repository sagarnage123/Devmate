import { TaskPriority } from "../types/Task";

export function isValidPriority(priority: string): priority is TaskPriority {
    return ["Low", "Medium", "High"].includes(priority);
}   