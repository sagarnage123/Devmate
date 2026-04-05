import type { Project } from "@/types/Project";
import { cardInteractiveStyles,cardStyles } from "../ui/styles";
type Props = {
    project: Project;
};

function getStatusStyles(status: string) {
    switch (status) {
        case "completed":
            return "bg-emerald-50 text-emerald-600 border border-emerald-100";
        case "in-progress":
            return "bg-blue-50 text-blue-600 border border-blue-100";
        case "on-hold":
            return "bg-amber-50 text-amber-600 border border-amber-100";
        default:
            return "bg-slate-100 text-slate-600 border border-slate-200";
    }
}

export default function ProjectHeader({ project }: Props) {
    return (
        <div className={`${cardStyles} p-5 px-6 space-y-4`}>
            <div className="flex items-start justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight leading-tight text-slate-900">
                        {project.title}
                    </h1>

                    <p className="text-sm text-slate-500">
                        Project workspace overview
                    </p>
                </div>

                <span
                    className={`px-2.5 py-1 text-xs font-medium  rounded-full whitespace-nowrap ${getStatusStyles(
                        project.status
                    )}`}
                >
                    {project.status}
                </span>
            </div>

            
            <div className=" h-px bg-slate-200/70 transition-opacity duration-200" />

            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-700 items-stretch">

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Client</p>
                    <p className="font-medium text-slate-800">
                        {project.clientId}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Start Date</p>
                    <p className="font-medium text-slate-800">
                        {new Date(project.startDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Due Date</p>
                    <p className="font-medium text-slate-800">
                        {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Budget</p>
                    <p className="font-medium text-slate-800">
                        {project.budget ? `₹${project.budget}` : "—"}
                    </p>
                </div>
            </div>
        </div>
    );
}