import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";

import { useEffect, useRef, useState } from "react";
import TaskEditModal from "@/components/TaskEditModal";
import { Task } from "@/types/Task";
import toast from "react-hot-toast";


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

        toast.success("Task updated",{icon:"✏️"});

        setIsModalOpen(false);
        setEditingTask(null);
    }


    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className="h-20 bg-[#111827] border border-white/10 rounded-lg animate-pulse"
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
        <div className="space-y-5 sm:space-y-6">

            <div
                className="
                rounded-2xl border border-white/10
                bg-[#0F172A]
                px-2 sm:px-4
                py-2.5 sm:py-3

                transition-all duration-200
                focus-within:border-indigo-500/40
            "
            >
                <input
                    type="text"
                    value={title}
                    ref={inputRef}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a task and press Enter..."
                    className="
                    w-full bg-transparent
                    text-sm text-slate-200
                    outline-none

                    placeholder:text-slate-500
                "
                    disabled={taskSubmitting}
                    onKeyDown={async (e) => {
                        if (e.key !== "Enter") return;

                        const trimmed = title.trim();
                        if (!trimmed) return;
                        if (taskSubmitting) return;

                        try {
                            await createTask({ title: trimmed, priority: "Medium" });
                            toast.success("Task created", { icon: "✅" });
                            setTitle("");
                        } catch (err) {
                            toast.error("Failed to create task");
                        }
                    }}
                />
            </div>

            {taskSubmitting && (
                <div className="mt-1 text-xs text-slate-500">
                    Adding task...
                </div>
            )}

            <div
                className="
                overflow-hidden
                rounded-2xl border border-white/10
                bg-[#0F172A]
                p-2 sm:p-5
            "
            >
                <h3 className="mb-4 text-sm font-medium text-slate-300">
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
                                overflow-hidden
                                rounded-xl border border-white/10
                                bg-[#111827]
                                p-3 sm:p-5

                                transition-all duration-200 ease-out

                                hover:-translate-y-[1px]
                                hover:border-indigo-500/30
                                hover:shadow-lg hover:shadow-indigo-500/5
                            "
                            >

                                <div
                                    className="
                                    flex flex-col gap-3
                                    sm:flex-row sm:items-start sm:justify-between
                                "
                                >

                                    <div className="min-w-0 flex-1">

                                        <span
                                            className="
                                            block break-words
                                            font-medium text-slate-200
                                        "
                                        >
                                            {task.title}
                                        </span>

                                    </div>

                                    <div
                                        className="
                                        flex flex-wrap items-center gap-2 sm:gap-3 justify-between
                                    "
                                    >

                                        <button
                                            onClick={() => updateTaskStatus(task._id, task.status)}
                                            className="
                                            text-xs capitalize
                                            transition-colors
                                            hover:text-slate-200
                                        "
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
                                            <div className="flex items-center gap-2 justify-end">

                                                <button
                                                    onClick={async () => {
                                                        await deleteTask(task._id);
                                                        toast.success("Task deleted", { icon: "🗑️" });
                                                        setDeletingId(null);
                                                    }}
                                                    className="
                                                    text-xs text-red-400
                                                    rounded-md px-2 py-1
                                                    transition-all duration-200

                                                    hover:bg-red-500/10
                                                    hover:text-red-300

                                                    sm:opacity-0 sm:group-hover:opacity-100
                                                "
                                                >
                                                    Confirm
                                                </button>

                                                <button
                                                    onClick={() => setDeletingId(null)}
                                                    className="
                                                    text-xs text-slate-400
                                                    rounded-md px-2 py-1
                                                    transition-all duration-200

                                                    hover:bg-slate-700
                                                    hover:text-white

                                                    sm:opacity-0 sm:group-hover:opacity-100
                                                "
                                                >
                                                    Cancel
                                                </button>

                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setDeletingId(task._id);
                                                }}
                                                className="
                                                text-xs text-red-400
                                                rounded-md px-2 py-1
                                                transition-all duration-200

                                                hover:bg-red-500/10
                                                hover:text-red-300

                                                sm:opacity-0 sm:group-hover:opacity-100
                                            "
                                            >
                                                Delete
                                            </button>
                                        )}

                                    </div>

                                </div>

                                <div
                                    className="
                                    mt-3 flex flex-wrap items-center gap-x-4 gap-y-2
                                "
                                >

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
                                        <span className="text-xs text-slate-500">
                                            Due {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    )}

                                </div>

                                <div className="mt-3 space-y-1 text-sm">

                                    {task.description ? (
                                        <p
                                            onClick={() => openEditModal(task)}
                                            className={`
                                            cursor-pointer
                                            break-words
                                            text-slate-400
                                            hover:text-slate-200

                                            ${expandedTaskId === task._id
                                                    ? ""
                                                    : "line-clamp-2"
                                                }
                                        `}
                                        >
                                            {task.description}
                                        </p>
                                    ) : (
                                        <button
                                            onClick={() => openEditModal(task)}
                                            className="
                                            text-sm italic text-slate-500
                                            hover:text-slate-300
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
                                            className="
                                            text-xs text-slate-500
                                            hover:text-slate-300
                                        "
                                        >
                                            {expandedTaskId === task._id
                                                ? "Show less"
                                                : "Show more..."}
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
