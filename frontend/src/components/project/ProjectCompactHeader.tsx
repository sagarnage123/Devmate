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

export default function ProjectCompactHeader({
    project,
}: {
    project: Project;
}) {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl border border-white/10
                bg-[#0F172A]
                px-4 py-3 sm:px-5 sm:py-4
                relative
            "
        >

            <div
                className="
                    flex flex-col gap-3
                    sm:flex-row sm:items-center sm:justify-between
                "
            >

               
                <div className="flex min-w-0 items-center gap-3">

                    
                    <div className="h-2 w-2 shrink-0 rounded-full bg-indigo-500/70" />

                   
                    <h1
                        className="
                            truncate
                            text-sm sm:text-base
                            font-medium text-slate-200
                        "
                    >
                        {project.title}
                    </h1>

                </div>


                
                <div className="flex items-center sm:justify-end">

                    <span
                        className={`
                            inline-flex items-center
                            rounded-full px-3 py-1
                            text-xs font-medium whitespace-nowrap
                            transition-transform duration-200
                            hover:scale-105
                            ${getStatusStyles(project.status)}
                        `}
                    >
                        {project.status}
                    </span>

                </div>

            </div>

        </div>
    );
}