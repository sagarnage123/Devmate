import type { ProjectStatus } from "@/types/Project";

const styles = {
    planned: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "on-hold": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
    return (
        <span
            className={`px-3 py-1 rounded-full text-xs border ${styles[status]}`}
        >
            {status}
        </span>
    );
}