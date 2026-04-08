import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { cardStyles, sectionPadding, titleText } from "@/components/ui/styles";
import { useState } from "react";
import TaskEditModal from "@/components/TaskEditModal";
import { Task } from "@/types/Task";
export default function ProjectTasks() {
    const project = useProjectContext();
    const { tasks, loading, error, createTask, taskSubmitting , updateTaskStatus,deleteTask,updateTask} =
        useProjectTasks(project._id);
    const [title, setTitle] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="border border-slate-200 rounded-lg px-3 py-2 focus-within:border-slate-300 transition-colors">
            
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a task and press Enter..."
                    className="w-full text-sm bg-transparent outline-none placeholder:text-slate-400"
                    disabled={taskSubmitting}
                    onKeyDown={async (e) => {
                        if (e.key !== "Enter") return;

                        const trimmed = title.trim();
                        if (!trimmed) return;
                        if (taskSubmitting) return;

                        try {
                            await createTask({ title: trimmed,priority: "Medium" });
                            setTitle(""); 
                        } catch (err) {
                            
                        }
                    }}
                />
            </div>
            
            <div className={`${cardStyles} ${sectionPadding}`}>

                <h3 className={titleText}>Tasks</h3>

                {tasks.length === 0 ? (
                    <p className="text-sm text-slate-500">
                        No tasks yet. Start by adding one above.
                    </p>
                ) : (
                    <ul className="space-y-3">
                        {tasks.map(task => (
                            <li
                                key={task._id}
                                className=" group border border-slate-200 rounded-lg p-3 space-y-1 hover:border-slate-300 transition-colors"
                            >
                                <div className="flex justify-between items-center gap-3">
                                    <span className="font-medium text-slate-800">
                                        {task.title}
                                    </span>

                                    <div className="flex items-center gap-4 transition-opacity">
                                        <button
                                            onClick={() => updateTaskStatus(task._id, task.status)}
                                            className="text-xs text-slate-500 capitalize hover:text-slate-900 transition-colors"
                                        >
                                            <span
                                                className={`text-xs font-medium capitalize ${task.status === "Done"
                                                    ? "text-emerald-600"
                                                    : task.status === "In Progress"
                                                        ? "text-blue-600"
                                                        : "text-slate-500"
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
                                                    className="opacity-0 group-hover:opacity-100 text-xs text-red-500  p-1 border border-red-100 rounded-lg bg-red-100 hover:text-red-600 transition-all"
                                                >
                                                    Confirm
                                                </button>

                                                <button
                                                    onClick={() => setDeletingId(null)}
                                                    className="opacity-0 group-hover:opacity-100 text-xs text-green-500  p-1 border border-green-100 rounded-lg bg-green-100 hover:text-green-600 transition-all"
                                                >
                                                    Cancel
                                                </button>

                                            </div>
                                        ) :
                                        (<button
                                            onClick={() => {
                                                setDeletingId(task._id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 text-xs text-red-500  p-1 border border-red-100 rounded-lg bg-red-100 hover:text-red-600 transition-all"
                                        >
                                            Delete
                                        </button>)}
                                    </div>
                                </div>

                                <span
                                    className={`text-xs font-medium ${task.priority === "High"
                                            ? "text-red-600"
                                            : task.priority === "Medium"
                                                ? "text-amber-600"
                                                : "text-slate-500"
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
                                            className={`text-slate-600 cursor-pointer ${expandedTaskId === task._id ? "" : "line-clamp-2"
                                                }`}
                                        >
                                            {task.description}
                                        </p>
                                    ) : (
                                        <button
                                            onClick={() => openEditModal(task)}
                                            className="text-slate-400 hover:text-slate-600 text-sm italic"
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
                                            className="text-xs text-slate-500 hover:text-slate-700"
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
