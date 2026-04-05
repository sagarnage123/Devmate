import { useProjectContext } from "@/context/ProjectContext";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { cardStyles, sectionPadding, titleText } from "@/components/ui/styles";
export default function ProjectTasks() {
    const project = useProjectContext();
    const { tasks, loading, error } = useProjectTasks(project._id);

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-6">

            
            <div className={`${cardStyles} ${sectionPadding}`}>

                <h3 className={titleText}>Tasks</h3>

                {tasks.length === 0 ? (
                    <p className="text-sm text-slate-500">No tasks yet</p>
                ) : (
                    <ul className="space-y-3">
                        {tasks.map(task => (
                            <li
                                key={task._id}
                                className="border border-slate-200 rounded-lg p-3 space-y-1 hover:border-slate-300 transition-colors"
                            >
                                <div className="flex justify-between items-center gap-4">
                                    <span className="font-medium text-slate-800">
                                        {task.title}
                                    </span>

                                    <span className="text-xs text-slate-500 capitalize">
                                        {task.status}
                                    </span>
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
