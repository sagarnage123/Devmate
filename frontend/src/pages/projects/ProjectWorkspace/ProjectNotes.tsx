import { useProjectContext } from "@/context/ProjectContext";
import { useProjectNotes } from "@/hooks/useProjectNotes";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ProjectNotes() {
    const project = useProjectContext();
    const { notes, loading, error, createNote, updateNote, deleteNote } =
        useProjectNotes(project._id);
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState("");

    return (
        <div className="space-y-6">


            <div className="
bg-[#0F172A] border border-white/10 rounded-xl
p-3 transition-all duration-200
focus-within:border-indigo-500/40 focus-within:shadow-md focus-within:shadow-indigo-500/5
">
                <textarea
                    placeholder="Write a note… (Enter to save, Shift+Enter for new line)"
                    className="
    w-full bg-transparent text-sm text-slate-200
    placeholder:text-slate-500
    outline-none resize-none
    leading-relaxed no-scrollbar
    "
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={async (e) => {
                        if (e.key !== "Enter" || e.shiftKey) return;



                        e.preventDefault();

                        const trimmed = content.trim();

                        if (!trimmed) return;

                        try {
                            await createNote({ content: trimmed });
                            toast .success("Note added",{icon:"📝"});
                            setContent("");
                        } catch (err) {
                            toast.error("Failed to add note");
                        }
                    }}
                    disabled={loading}
                />
            </div>


            {notes.length === 0 ? (
                <p className="text-sm text-slate-500">
                    No notes yet. Start writing above.
                </p>
            ) : (
                notes.map(note => (
                    <div
                        key={note._id}
                        className="space-y-3"
                    >
                        {editingId === note._id ? (
                            <textarea
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                className="
w-full bg-[#111827] border border-indigo-500/30 rounded-lg p-3
text-sm text-slate-200
outline-none resize-none
focus:ring-2 focus:ring-indigo-500/30
transition-all duration-200 no-scrollbar h-auto max-h-100x
"
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
                                    className="
group
bg-[#111827] border border-white/10 rounded-lg p-3

text-sm text-slate-300
flex justify-between items-start gap-3

transition-all duration-200 ease-out
hover:border-indigo-500/30 hover:-translate-y-[1px]
hover:shadow-md hover:shadow-indigo-500/5
cursor-pointer
"
                            >
                                     <span className="leading-relaxed">{note.content}</span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNote(note._id);
                                        toast.success("Note deleted",{icon:"🗑️"});
                                    }}
                                        className="
opacity-0 group-hover:opacity-100
text-xs text-red-400
px-2 py-1 rounded-md
hover:bg-red-500/10 hover:text-red-300
transition-all duration-200
"
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