import { Task } from "@/types/Task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
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
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task._id,
            data: {
                status: task.status,
            },
        });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
    group
    bg-[#111827] border border-white/10 rounded-lg p-3 space-y-2

    transition-all duration-200 ease-out
    hover:border-indigo-500/30 hover:-translate-y-[2px] hover:scale-[1.02]
    active:scale-[0.98]

    ${isUpdating ? "opacity-0 scale-90 translate-y-2" : ""}
    ${isDragging ? "opacity-0" : ""}
    `}
        >  
            <div className="flex justify-between items-start gap-3">
                <div className="flex items-start gap-2 flex-1 min-w-0">

                    <button
                        {...listeners}
                        {...attributes}
                        className="
            mt-0.5 shrink-0
            text-slate-500
            hover:text-slate-300
            cursor-grab
            active:cursor-grabbing
        "
                    >
                        <GripVertical size={16} />
                    </button>

                    <span
                        className="
            font-medium text-slate-200
            leading-snug
            break-words
        "
                    >
                        {task.title}
                    </span>

                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        
                        onStatusChange(task._id, task.status)
                    }}
                    className={`
                    text-xs font-medium px-2 py-1 rounded-md capitalize
                    transition-all duration-200

                    ${task.status === "Done"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : task.status === "In Progress"
                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                : "bg-slate-500/10 text-slate-400 border border-white/10"
                        }
                    `}
                >
                    {task.status}
                </button>
            </div>

            
            {task.description && (
                <p className="
                text-sm text-slate-400 line-clamp-2 cursor-pointer
                hover:text-slate-200 transition-colors
                ">
                    {task.description}
                </p>
            )}

          
            <div className="flex justify-between items-center text-xs text-slate-500">

                <span className={`
                font-medium
                ${task.priority === "High"
                        ? "text-red-400"
                        : task.priority === "Medium"
                            ? "text-amber-400"
                            : "text-slate-400"
                    }
                `}>
                    {task.priority}
                </span>

                <button
                    onClick={() => onDelete(task._id)}
                    className="
                    opacity-1
                    sm:opacity-0 group-hover:opacity-100
                    text-red-400
                    px-2 py-1 rounded-md
                    hover:bg-red-500/10 hover:text-red-300
                    transition-all duration-200
                    "
                >
                    Delete
                </button>
            </div>

        </div>
    );
}