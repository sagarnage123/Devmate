import type { Project } from "@/types/Project";

type Props = {
    project: Project;
};

function getStatusStyles(status: string) {
    switch (status) {
        case "completed":
            return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
        case "in-progress":
            return "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
        case "on-hold":
            return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
        default:
            return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
}
export default function ProjectHeader({ project }: Props) {
    return (
        <div className="
        bg-[#0F172A] border border-white/10 rounded-xl
        px-6 py-5 space-y-5
        ">

           
            <div className="flex items-start justify-between gap-6">

                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight leading-tight text-white">
                        {project.title}
                    </h1>

                    <p className="text-sm text-slate-400">
                        Project workspace overview
                    </p>
                </div>

                <span
                    className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap hover:scale-105 transition-transform duration-200 ${getStatusStyles(project.status)}`}
                >
                    {project.status}
                </span>
           
            </div>

           
            <div className="h-px bg-white/10" />

            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Client</p>
                    <p className="font-medium text-slate-200">
                        {project.clientId}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Start Date</p>
                    <p className="font-medium text-slate-200">
                        {new Date(project.startDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Due Date</p>
                    <p className="font-medium text-slate-200">
                        {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-slate-500">Budget</p>
                    <p className="font-medium text-slate-200 tabular-nums">
                        {project.budget ? `₹${project.budget}` : "—"}
                    </p>
                </div>

            </div>
        </div>
    );
}