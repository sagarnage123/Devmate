import { useProjectContext } from "@/context/ProjectContext";
import { useProjectNotes } from "@/hooks/useProjectNotes";
import { useState } from "react";
export default function ProjectNotes() {
    const project = useProjectContext();
    const { notes, loading, error, createNote, updateNote, deleteNote } =
        useProjectNotes(project._id);
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState("");
    
    return (
        <div className="space-y-6">

           
            <div className="w-full text-sm outline-none resize-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-lg border border-slate-200 p-3 bg-white/80 backdrop-blur-sm shadow-sm transition-colors">
                <textarea
                    placeholder="Add note..."
                    className="w-full text-sm border-none p-3 outline-none resize-none  transition-colors"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={async (e) => {
                        if (e.key !== "Enter" || e.shiftKey) return;

                       
                        
                        e.preventDefault();
                        
                        const trimmed = content.trim();
                       
                        if (!trimmed) return;

                        try {
                            await createNote({ content: trimmed });
                            setContent("");
                        } catch (err) {
                           
                        }
                    }}
                    disabled={loading}
                />
            </div>

           
            {notes.length === 0 ? (
                <p className="text-sm text-slate-500">
                    No notes yet. Add one above.
                </p>
            ) : (
                notes.map(note => ( 
                    <div
                        key={note._id}
                        
                    >
                        {editingId === note._id ? (
                            <textarea
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                className="w-full text-sm border border-slate-200 rounded-lg p-3 outline-none resize-none  transition-colors"
                                rows={2}
                                autoFocus
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();

                                        const trimmed = editingContent.trim();
                                        if (!trimmed) return;

                                        await updateNote(note._id, { content: trimmed });

                                        setEditingId(null);
                                        setEditingContent("");
                                    }

                                    if (e.key === "Escape") {
                                        setEditingId(null);
                                    }
                                }}
                            />
                        ) : (
                            <div
                                onClick={() => {
                                    setEditingId(note._id);
                                    setEditingContent(note.content);
                                }}
                                className="group border border-slate-200 rounded-lg p-3 text-sm text-slate-700 hover:border-slate-300 transition-colors cursor-pointer flex justify-between items-start"
                            >
                                    <span>{note.content}</span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(note._id);
                                        }}
                                        className="opacity-0 group-hover:opacity-100 text-xs text-red-500 border bg-red-100 border-red-500 rounded-lg px-2 py-0.5 transition-opacity"
                                    >
                                        Delete
                                    </button>
                            </div>
                        )}
                    </div>
                     
                ))
            )}

        </div>
    );
}