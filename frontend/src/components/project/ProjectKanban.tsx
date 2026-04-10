import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import TaskCard from "@/components/tasks/TaskCard";
import { useState } from "react";
export default function ProjectKanban() {
    const project = useProjectContext();
    const { tasks, loading, error, updateTaskStatus, deleteTask } =
        useProjectTasks(project._id);
    const total = tasks.length;
    const done = tasks.filter(t => t.status === "Done").length;
    const progress = total === 0 ? 0 : (done / total) * 100;
    const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

    let progressColor = "bg-slate-400";

    if (progress > 30 && progress <= 70) {
        progressColor = "bg-blue-500";
    } else if (progress > 70 && progress < 100) {
        progressColor = "bg-emerald-500";
    }
    else if (progress === 100) {
        progressColor = "bg-green-600";
    }

    const columns = {
        todo: tasks.filter(t => t.status === "To Do"),
        "in-progress": tasks.filter(t => t.status === "In Progress"),
        done: tasks.filter(t => t.status === "Done"),
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;

    return (

        <div className="space-y-3 min-h-2">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 space-y-4 shadow-sm transition-all duration-300">
                <div className="flex justify-between text-sm text-slate-600">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${progressColor} transition-all duration-500 ease-out`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {Object.entries(columns).map(([status, tasks]) => (
                    <div
                        key={status}
                        className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 min-h-[300px]"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-800 capitalize tracking-tight">
                                {status.replace("-", " ")}
                            </h3>

                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                {tasks.length}
                            </span>
                        </div>

                        <div className="space-y-3 transition-all duration-500 ease-out">
                            {tasks.length === 0 ? (
                                <div className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-lg">
                                    No tasks
                                </div>
                            ) : (
                                tasks.map(task => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        onEdit={() => { }}
                                        onDelete={() => deleteTask(task._id)}
                                        onStatusChange={(taskId, status) => {
                                            setUpdatingTaskId(taskId);

                                            setTimeout(() => {
                                                updateTaskStatus(taskId, status);
                                                setUpdatingTaskId(null);
                                            }, 120); 
                                        }}
                                        isUpdating={updatingTaskId === task._id}
                                    />
                                )))}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}