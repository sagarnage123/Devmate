import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import TaskCard from "@/components/tasks/TaskCard";
export default function ProjectKanban() {
    const project = useProjectContext();
    const { tasks, loading, error } = useProjectTasks(project._id);

    const columns = {
        todo: tasks.filter(t => t.status === "To Do"),
        "in-progress": tasks.filter(t => t.status === "In Progress"),
        done: tasks.filter(t => t.status === "Done"),
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {Object.entries(columns).map(([status, tasks]) => (
                <div
                    key={status}
                    className="bg-white border border-slate-200 rounded-xl p-4 space-y-3"
                >
                    <h3 className="text-sm font-medium text-slate-700 capitalize">
                        {status.replace("-", " ")}
                    </h3>

                    <div className="space-y-2">
                        {tasks.map(task => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={() => { }}
                                onDelete={() => { }}
                                onStatusChange={() => { }}
                            />
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
}