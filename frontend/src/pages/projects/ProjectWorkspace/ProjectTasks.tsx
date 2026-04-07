import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { cardStyles, sectionPadding, titleText } from "@/components/ui/styles";
import { useState } from "react";
export default function ProjectTasks() {
    const project = useProjectContext();
    const { tasks, loading, error, createTask, taskSubmitting , updateTaskStatus,deleteTask} =
        useProjectTasks(project._id);
    const [title, setTitle] = useState("");

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

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
                    <p className="text-sm text-slate-500">No tasks yet</p>
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

                                        <button
                                            onClick={() => {
                                                if (confirm("Delete this task?")) {
                                                    deleteTask(task._id);
                                                }
                                            }}
                                            className="opacity-0 group-hover:opacity-100 text-xs text-red-500  p-1 border border-red-100 rounded-lg bg-red-100 hover:text-red-600 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {task.priority && (
                                    <div className="text-xs text-slate-500">
                                        Priority: {task.priority}
                                    </div>
                                )}

                                {task.dueDate && (
                                    <div className="text-xs text-slate-500">
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

            </div>

        </div>
    );
}
