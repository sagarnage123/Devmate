import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { cardStyles, sectionPadding, titleText } from "@/components/ui/styles";
import { useEffect, useRef, useState } from "react";
import TaskEditModal from "@/components/TaskEditModal";
import { Task } from "@/types/Task";


export default function ProjectTasks() {
    const project = useProjectContext();
    const { tasks, loading, error, createTask, taskSubmitting, updateTaskStatus, deleteTask, updateTask } =
        useProjectTasks(project._id);
    const [title, setTitle] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function openEditModal(task: Task) {
        setEditingTask(task);
        setIsModalOpen(true);
    }
    async function handleSave(form: any) {
        if (!editingTask) return;

        await updateTask(editingTask._id, form);

        setIsModalOpen(false);
        setEditingTask(null);
    }


    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className="h-20 bg-slate-200 rounded-lg animate-pulse"
                    />
                ))}
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-sm text-red-500">
                Failed to load tasks
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="
bg-[#0F172A] border border-white/10 rounded-lg px-3 py-2
focus-within:border-indigo-500/40
transition-all duration-200
">
                <input
                    type="text"
                    value={title}
                    ref={inputRef}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a task and press Enter..."
                    className="
    w-full text-sm bg-transparent outline-none
    text-slate-200 placeholder:text-slate-500
    "
                    disabled={taskSubmitting}
                    onKeyDown={async (e) => {
                        if (e.key !== "Enter") return;

                        const trimmed = title.trim();
                        if (!trimmed) return;
                        if (taskSubmitting) return;

                        try {
                            await createTask({ title: trimmed, priority: "Medium" });
                            setTitle("");
                        } catch (err) {

                        }
                    }}
                />
            </div>
            {taskSubmitting && (
                <div className="text-xs text-slate-500 mt-1">
                    Adding task...
                </div>
            )}

            <div className="
bg-[#0F172A] border border-white/10 rounded-xl p-5
">
                <h3 className="text-sm font-medium text-slate-300 mb-3">
                    Tasks
                </h3>

                {tasks.length === 0 ? (
                    <p className="text-sm text-slate-500">
                        No tasks yet. Start by adding one above.
                    </p>
                ) : (
                    <ul className="space-y-3">
                        {tasks.map(task => (
                            <li
                                key={task._id}
                                className="
                                    group
                                    bg-[#111827] border border-white/10 rounded-lg p-4 space-y-2

                                    transition-all duration-200 ease-out
                                    hover:border-indigo-500/30 hover:-translate-y-[1px]
                                    hover:shadow-lg hover:shadow-indigo-500/5 "
                            >
                                <div className="flex justify-between items-center gap-3">
                                    <span className="font-medium text-slate-200">
                                        {task.title}
                                    </span>

                                    <div className="flex items-center gap-4 transition-opacity">
                                        <button
                                            onClick={() => updateTaskStatus(task._id, task.status)}
                                            className="text-xs text-slate-400 capitalize hover:text-slate-200 transition-colors"
                                        >
                                            <span
                                                className={`text-xs font-medium capitalize ${task.status === "Done"
                                                    ? "text-emerald-400"
                                                    : task.status === "In Progress"
                                                        ? "text-indigo-400"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                {task.status}
                                            </span>
                                        </button>
                                        {deletingId === task._id ? (
                                            <div className="flex items-center gap-2">

                                                <button
                                                    onClick={async () => {
                                                        await deleteTask(task._id);
                                                        setDeletingId(null);
                                                    }}
                                                    className="
                                                        opacity-0 group-hover:opacity-100
                                                        text-xs text-red-400
                                                        px-2 py-1 rounded-md
                                                        hover:bg-red-500/10 hover:text-red-300
                                                        transition-all duration-200
                                                        "
                                                >
                                                    Confirm
                                                </button>

                                                <button
                                                    onClick={() => setDeletingId(null)}
                                                    className="
                                                    opacity-0 group-hover:opacity-100
                                                    text-xs text-slate-400
                                                    px-2 py-1 rounded-md
                                                    hover:bg-slate-700 hover:text-white
                                                    transition-all duration-200
                                                    "
                                                >
                                                    Cancel
                                                </button>

                                            </div>
                                        ) :
                                            (<button
                                                onClick={() => {
                                                    setDeletingId(task._id);
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
                                            </button>)}
                                    </div>
                                </div>

                                <span
                                    className={`text-xs font-medium ${task.priority === "High"
                                        ? "text-red-400"
                                        : task.priority === "Medium"
                                            ? "text-amber-400"
                                            : "text-slate-400"
                                        }`}
                                >
                                    {task.priority}
                                </span>
                                {task.dueDate && (
                                    <span className="ml-4 text-xs text-slate-500">
                                        Due {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                )}

                                <div className="text-sm space-y-1">

                                    {task.description ? (
                                        <p
                                            onClick={() => openEditModal(task)}
                                            className={`text-slate-400 cursor-pointer
    hover:text-slate-200 ${expandedTaskId === task._id ? "" : "line-clamp-2"
                                                }`}
                                        >
                                            {task.description}
                                        </p>
                                    ) : (
                                        <button
                                            onClick={() => openEditModal(task)}
                                            className="
                                                text-slate-500 hover:text-slate-300 text-sm italic
                                                "
                                        >
                                            Add description...
                                        </button>
                                    )}

                                    {task.description && task.description.length > 100 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedTaskId(
                                                    expandedTaskId === task._id ? null : task._id
                                                );
                                            }}
                                            className="text-xs text-slate-500 hover:text-slate-300"
                                        >
                                            {expandedTaskId === task._id ? "Show less" : "Show more..."}
                                        </button>
                                    )}

                                </div>

                            </li>
                        ))}
                    </ul>
                )}

            </div>
            <TaskEditModal
                task={editingTask}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />

        </div>
    );
}
