import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";

export default function ProjectTasks() {
    const project = useProjectContext();
    const { tasks, loading, error } = useProjectTasks(project._id);

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tasks</h3>

            {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tasks yet</p>
            ) : (
                <ul className="space-y-3">
                    {tasks.map(task => (
                        <li
                            key={task._id}
                            className="border rounded p-3 space-y-1"
                        >
                            <div className="flex justify-between">
                                <span className="font-medium">{task.title}</span>
                                <span className="text-xs text-muted-foreground">
                                    {task.status}
                                </span>
                            </div>

                            {task.priority && (
                                <div className="text-xs">
                                    Priority: {task.priority}
                                </div>
                            )}

                            {task.dueDate && (
                                <div className="text-xs text-muted-foreground">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
