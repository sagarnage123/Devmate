import type { Project } from "@/types/Project";

type Props = {
    project: Project;
};

function getStatusColor(status: string) {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700";
        case "in-progress":
            return "bg-blue-100 text-blue-700";
        case "on-hold":
            return "bg-yellow-100 text-yellow-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
}

export default function ProjectHeader({ project }: Props) {
    return (
        <div className="border-b pb-4 space-y-3">
           
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">
                    {project.title}
                </h1>

                <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                        project.status
                    )}`}
                >
                    {project.status}
                </span>
            </div>

           
            <div className="text-sm text-muted-foreground flex flex-wrap gap-4">
                <span>Client: {project.clientId}</span>

                <span>
                    Start: {new Date(project.startDate).toLocaleDateString()}
                </span>

                <span>
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                </span>

                {project.budget && (
                    <span>Budget: ₹{project.budget}</span>
                )}
            </div>
        </div>
    );
}