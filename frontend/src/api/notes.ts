import api from "./axios";
import type { Note } from "../types/Note";

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
    const res = await api.get(`/notes/${projectId}`);
    return extractNotes(res.data);
}

export interface CreateNotePayload {
    projectId: string;
    content: string;
}

export async function createNote(
    payload: CreateNotePayload
): Promise<void> {
    await api.post("/notes", payload);
}

export async function deleteNote(noteId: string): Promise<void> {
    await api.delete(`/notes/${noteId}`);
}
