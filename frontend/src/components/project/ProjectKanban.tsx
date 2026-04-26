import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import TaskCard from "@/components/tasks/TaskCard";
import { useState } from "react";
import { DndContext,DragOverlay } from "@dnd-kit/core";
import { Task } from "@/types/Task";
import KanbanColumn from "./KanbanColumn";


export default function ProjectKanban() {

    const project = useProjectContext();
    const { tasks, loading, error, updateTaskStatus, deleteTask } =
        useProjectTasks(project._id);
    const total = tasks.length;
    const done = tasks.filter(t => t.status === "Done").length;
    const progress = total === 0 ? 0 : (done / total) * 100;
    const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const statusMap: Record<string, Task["status"]> = {
        todo: "To Do",
        "in-progress": "In Progress",
        done: "Done",
    };



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

        <DndContext
        onDragStart={(event) => {
                const taskId = event.active.id as string;
                const task = tasks.find(t => t._id === taskId);
                if (task) setActiveTask(task);

            }
        }

            onDragEnd={(event) => {
                const taskId = event.active.id as string;
                const column = event.over?.id as string;

                const map: Record<string, Task["status"]> = {
                    todo: "Done",
                    "in-progress": "To Do",
                    done: "In Progress",
                };

                updateTaskStatus(taskId, map[column]);
                setActiveTask(null);
            }}

    >

            <div className="space-y-4 pb-4">

                <div className="
bg-[#0F172A] border border-white/10 rounded-xl p-4 space-y-4
">
                    <div className="flex justify-between text-sm text-slate-400">
                        <span>Progress</span>
                        <span className="text-slate-200 font-medium">
                            {Math.round(progress)}%
                        </span>
                    </div>


                    <div className="relative h-2 rounded-full bg-[#111827] overflow-hidden ">

                        <div
                            className={`h-full ${progressColor} rounded-full trasniton-colors duration-300 ease-in-out`}
                            style={{ width: `${progress}%` }}
                        />

                        <div
                            className={`absolute top-0 left-0 h-full ${progressColor} opacity-30 blur-sm`}
                            style={{ width: `${progress}%` }}
                        />

                    </div>
                </div>

                <DragOverlay>
                    {activeTask ? (
                        <div className="
        bg-[#111827] border border-indigo-500/40 rounded-lg p-3 space-y-2
        shadow-2xl shadow-black/40
        scale-105 rotate-[1deg]
        ">

                            <div className="text-sm font-medium text-slate-200">
                                {activeTask.title}
                            </div>

                            {activeTask.description && (
                                <p className="text-xs text-slate-400 line-clamp-2">
                                    {activeTask.description}
                                </p>
                            )}
                        </div>
                    ) : null}
                </DragOverlay>




                <div className="
grid grid-cols-1 md:grid-cols-3 gap-5
items-start
">

                    {Object.entries(columns).map(([status, tasks]) => {

                        

                        return (


                            <KanbanColumn
                                key={status}
                                id={status}
                                className={`
    flex flex-col
    bg-[#0F172A] border border-white/10 rounded-xl
    p-3 gap-3 h-[420px]

    ${status === "todo" ? "border-l-2 border-l-slate-500/30" : ""}
    ${status === "in-progress" ? "border-l-2 border-l-indigo-500/40" : ""}
    ${status === "done" ? "border-l-2 border-l-emerald-500/40" : ""}
`}
                            >


                           
                                <div className="
                            sticky top-0 z-10
                            bg-[#0F172A]/90 backdrop-blur-sm
                            pb-2
                            flex items-center justify-between
                            ">

                                    <h3 className="
    text-sm font-medium text-slate-300 capitalize tracking-tight
    ">
                                        {status.replace("-", " ")}
                                    </h3>

                                    <span className="
    text-xs text-slate-400
    bg-[#111827] border border-white/10
    px-2 py-0.5 rounded-md
    ">
                                        {tasks.length}
                                    </span>

                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">
                                    {tasks.length === 0 ? (
                                        <div className="
                                        text-xs text-slate-500 text-center py-6
                                        border border-dashed border-white/10 rounded-lg
                                        ">
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
                                        ))
                                        
                                        )}
                                </div>
                            </KanbanColumn>
                        )
                    })}

                </div>

            </div>
        </DndContext>
    );
}