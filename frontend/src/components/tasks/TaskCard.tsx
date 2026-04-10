import { Task } from "@/types/Task";

type Props = {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onStatusChange: (taskId: string, status: Task["status"]) => void;
};

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    onStatusChange,
}: Props) {
    return (
        <div className="group border border-slate-200 rounded-lg p-3 space-y-2 hover:border-slate-300 transition-colors">

            <div className="flex justify-between items-center gap-3">
                <span className="font-medium text-slate-800">
                    {task.title}
                </span>

                <button
                    onClick={() => onStatusChange(task._id, task.status)}
                    className="text-xs text-slate-500 hover:text-slate-900 capitalize"
                >
                    {task.status}
                </button>
            </div>

            
            {task.description && (
                <p className="text-sm text-slate-600 line-clamp-2 cursor-pointer">
                    {task.description}
                </p>
            )}

            
            <div className="flex justify-between items-center text-xs text-slate-500">
                <span>{task.priority}</span>

                <button
                    onClick={() => onDelete(task._id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500"
                >
                    Delete
                </button>
            </div>

        </div>
    );
}