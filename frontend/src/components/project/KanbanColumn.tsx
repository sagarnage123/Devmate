import { useDroppable } from "@dnd-kit/core";

export default function KanbanColumn({
    id,
    children,
    className
}: {
    id: string;
    children: React.ReactNode;
    className?: string;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id,
        data: {
            status: id, 
        },
    });

    return (
        <div
            ref={setNodeRef}
            data-column={id}
            className={`
            ${className}
            ${isOver ? "bg-indigo-500/5 border-indigo-500/40" : ""}
            `}
        >
            {children}
        </div>
    );
}