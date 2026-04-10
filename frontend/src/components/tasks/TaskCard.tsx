import { Task } from "@/types/Task";

type Props = {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onStatusChange: (taskId: string, status: Task["status"]) => void;
    isUpdating?: boolean;
};

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    onStatusChange,
    isUpdating
}: Props) {
    return (
        <div className={`group border border-slate-200 rounded-lg p-3 space-y-2 
hover:border-slate-300 hover:shadow-sm hover:-translate-y-[1px] 
transition-all duration-200
${isUpdating ? "opacity-0 scale-95" : "opacity-100 scale-100"}
`}>

            <div className="flex justify-between items-center gap-3">
                <span className="font-medium text-slate-800">
                    {task.title}
                </span>

                <button
                    onClick={() => onStatusChange(task._id, task.status)}
                    className="text-xs font-medium px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors capitalize"
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