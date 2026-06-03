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
        <div className="space-y-5 sm:space-y-6">

            <div
                className="
                rounded-2xl border border-white/10
                bg-[#0F172A]
                p-3 sm:p-4

                transition-all duration-200

                focus-within:border-indigo-500/40
                focus-within:shadow-md
                focus-within:shadow-indigo-500/5
            "
            >
                <textarea
                    placeholder="Write a note… (Enter to save, Shift+Enter for new line)"
                    className="
                    min-h-[100px] w-full
                    resize-none bg-transparent
                    text-sm leading-relaxed text-slate-200
                    outline-none no-scrollbar

                    placeholder:text-slate-500
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
                            toast.success("Note added", { icon: "📝" });
                            setContent("");
                        } catch (err) {
                            toast.error("Failed to add note");
                        }
                    }}
                    disabled={loading}
                />
            </div>


            {notes.length === 0 ? (
                <div
                    className="
                    rounded-2xl border border-dashed border-white/10
                    px-4 py-10
                    text-center
                "
                >
                    <p className="text-sm text-slate-500">
                        No notes yet. Start writing above.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notes.map(note => (
                        <div
                            key={note._id}
                            className="space-y-3"
                        >
                            {editingId === note._id ? (
                                <textarea
                                    value={editingContent}
                                    onChange={(e) => setEditingContent(e.target.value)}
                                    className="
                                    min-h-[100px] w-full
                                    rounded-xl border border-indigo-500/30
                                    bg-[#111827]
                                    p-3 sm:p-4

                                    text-sm leading-relaxed text-slate-200

                                    outline-none resize-none
                                    no-scrollbar

                                    transition-all duration-200
                                    focus:ring-2 focus:ring-indigo-500/30
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
                                    flex flex-col gap-3
                                    sm:flex-row sm:items-start sm:justify-between

                                    rounded-2xl border border-white/10
                                    bg-[#111827]

                                    p-4

                                    text-sm text-slate-300

                                    transition-all duration-200 ease-out

                                    hover:-translate-y-[1px]
                                    hover:border-indigo-500/30
                                    hover:shadow-md hover:shadow-indigo-500/5

                                    cursor-pointer
                                "
                                >

                                    <span
                                        className="
                                        break-words
                                        leading-relaxed
                                        text-slate-300
                                    "
                                    >
                                        {note.content}
                                    </span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(note._id);
                                            toast.success("Note deleted", { icon: "🗑️" });
                                        }}
                                        className="
                                        self-start shrink-0

                                        rounded-md px-2 py-1

                                        text-xs text-red-400

                                        transition-all duration-200

                                        hover:bg-red-500/10
                                        hover:text-red-300

                                        sm:opacity-0
                                        sm:group-hover:opacity-100
                                    "
                                    >
                                        Delete
                                    </button>

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}