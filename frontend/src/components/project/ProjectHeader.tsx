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
        <div
            className="
                overflow-hidden
                rounded-2xl border border-white/10
                bg-[#0F172A]
                px-4 sm:px-5 md:px-6
                py-4 sm:py-5
                space-y-5
            "
        >

            <div
                className="
                    flex flex-col gap-4
                    sm:flex-row sm:items-start sm:justify-between
                "
            >

                <div className="min-w-0 space-y-1">

                    <h1
                        className="
                            break-words
                            text-2xl sm:text-3xl
                            font-semibold tracking-tight leading-tight
                            text-white
                        "
                    >
                        {project.title}
                    </h1>

                    <p className="text-sm text-slate-400">
                        Project workspace overview
                    </p>

                </div>

                <div className="shrink-0">

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


            <div className="h-px bg-white/10" />


            <div
                className="
                    grid grid-cols-2
                    gap-4 sm:gap-5
                    sm:grid-cols-4
                    text-sm
                "
            >

                <div className="min-w-0 space-y-1">

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Client
                    </p>

                    <p
                        className="
                            truncate
                            font-medium text-slate-200
                        "
                    >
                        {project.clientId}
                    </p>

                </div>

                <div className="min-w-0 space-y-1">

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Start Date
                    </p>

                    <p
                        className="
                            truncate
                            font-medium text-slate-200
                        "
                    >
                        {new Date(project.startDate).toLocaleDateString()}
                    </p>

                </div>

                <div className="min-w-0 space-y-1">

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Due Date
                    </p>

                    <p
                        className="
                            truncate
                            font-medium text-slate-200
                        "
                    >
                        {new Date(project.dueDate).toLocaleDateString()}
                    </p>

                </div>

                <div className="min-w-0 space-y-1">

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                        Budget
                    </p>

                    <p
                        className="
                            truncate
                            font-medium text-slate-200
                            tabular-nums
                        "
                    >
                        {project.budget ? `₹${project.budget}` : "—"}
                    </p>

                </div>

            </div>

        </div>
    );
}