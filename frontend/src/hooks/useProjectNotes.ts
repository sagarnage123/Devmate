import { useEffect, useState } from "react";
import { Note } from "@/types/Note";
import {
    getNotesByProject,
    createNote,
    updateNote,
    deleteNote,
} from "@/api/notes";

export function useProjectNotes(projectId: string) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchNotes() {
            try {
                setLoading(true);
                const data = await getNotesByProject(projectId);
                if (!mounted) return;
                setNotes(data);
            } catch {
                if (!mounted) return;
                setError("Failed to load notes");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchNotes();

        return () => {
            mounted = false;
        };
    }, [projectId]);

    
    async function createNoteHandler(data: {
        content: string;
    }) {
        const newNote = await createNote({
            projectId,
            ...data,
        });
        console.log("Created note:", newNote);

        setNotes((prev) => [newNote, ...prev]);
    }

   
    async function updateNoteHandler(
        noteId: string,
        updates: Partial<Note>
    ) {
        await updateNote(noteId, updates);

        setNotes((prev) =>
            prev.map((n) =>
                n._id === noteId ? { ...n, ...updates } : n
            )
        );
    }

    
    async function deleteNoteHandler(noteId: string) {
        await deleteNote(noteId);

        setNotes((prev) => prev.filter((n) => n._id !== noteId));
    }

    return {
        notes,
        loading,
        error,
        createNote: createNoteHandler,
        updateNote: updateNoteHandler,
        deleteNote: deleteNoteHandler,
    };
}