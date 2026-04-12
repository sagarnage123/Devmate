import api from "./axios";
import type { Note } from "../types/Note";
import { apiCall } from "./apiCall";

function extractNotes(data: unknown): Note[] {
    if (
        typeof data === "object" &&
        data !== null &&
        ("notes" in data || Array.isArray(data))
    ) {
        const raw = (data as any).notes ?? data;
        return Array.isArray(raw) ? raw : [];
    }
    return [];
}

export async function getNotesByProject(
    projectId: string
): Promise<Note[]> {
    return apiCall(async () => {
       
        const response = await api.get(`/notes/${projectId}`);
        return extractNotes(response.data);
    });
}

export interface CreateNotePayload {
    projectId: string;
    content: string;
}

export async function createNote(payload: {
    projectId: string;
    content: string;
}): Promise<Note> {
    const res = await api.post("/notes", payload);

    const data = res.data;
    return data;
}

export async function updateNote(
    noteId: string,
    updates: Partial<Note>
): Promise<void> {
    await api.put(`/notes/${noteId}`, updates);
}

export async function deleteNote(noteId: string): Promise<void> {
    return apiCall(() => api.delete(`/notes/${noteId}`));
}
