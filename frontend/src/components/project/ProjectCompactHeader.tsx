
import { Project } from "@/types/Project";
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

export default function ProjectCompactHeader({project}: {project: Project}) {
    return (
        <div className="
        flex items-center justify-between
        px-4 py-3
        bg-[#0F172A] border border-white/10 rounded-lg
        ">

            {/* Left */}
            <div className="flex items-center gap-3">

                {/* Accent dot */}
                <div className="w-2 h-2 rounded-full bg-indigo-500/70" />

                {/* Title */}
                <h1 className="text-sm font-medium text-slate-200">
                    {project.title}
                </h1>

            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

                <span
                    className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap hover:scale-105 transition-transform duration-200 ${getStatusStyles(project.status)}`}
                >
                    {project.status}
                </span>

            </div>

        </div>
    );
}