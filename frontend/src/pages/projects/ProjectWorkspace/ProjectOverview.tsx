import { useProjectContext } from "@/context/ProjectContext";

function formatDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function ProjectOverview() {
    const project = useProjectContext();

    return (
        <div
            className="
                grid grid-cols-1
                gap-4 sm:gap-5
                lg:grid-cols-2
            "
        >

            <div
                className="
                    group relative overflow-hidden
                    rounded-2xl border border-white/10
                    bg-[#0F172A]
                    p-4 sm:p-5

                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5
                    hover:border-indigo-500/30
                    hover:shadow-lg hover:shadow-indigo-500/5
                "
            >

                <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Description
                </h3>

                <p
                    className="
                        break-words
                        text-sm leading-relaxed text-slate-300
                    "
                >
                    {project.description || "No description provided"}
                </p>
            </div>


            <div
                className="
                    group relative overflow-hidden
                    rounded-2xl border border-white/10
                    bg-[#0F172A]
                    p-4 sm:p-5

                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5
                    hover:border-indigo-500/30
                    hover:shadow-lg hover:shadow-indigo-500/5
                "
            >

                <h3 className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Timeline
                </h3>

                <div
                    className="
                        flex items-center justify-between gap-4
                    "
                >

                    <div className="min-w-0 space-y-1">
                        <p className="text-xs text-slate-500">
                            Start
                        </p>

                        <p
                            className="
                                truncate
                                text-sm font-medium text-slate-200
                            "
                        >
                            {formatDate(project.startDate)}
                        </p>
                    </div>

                    <div className="h-8 w-px shrink-0 bg-white/10" />

                    <div className="min-w-0 space-y-1 text-right">
                        <p className="text-xs text-slate-500">
                            Due
                        </p>

                        <p
                            className="
                                truncate
                                text-sm font-medium text-slate-200
                            "
                        >
                            {formatDate(project.dueDate)}
                        </p>
                    </div>

                </div>
            </div>


            <div
                className="
                    group relative overflow-hidden
                    rounded-2xl border border-white/10
                    bg-[#0F172A]
                    p-4 sm:p-5

                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5
                    hover:border-indigo-500/30
                    hover:shadow-lg hover:shadow-indigo-500/5
                "
            >

                <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Status
                </h3>

                <div className="flex items-center gap-2.5">

                    <span
                        className="
                            h-2.5 w-2.5 shrink-0 rounded-full
                            bg-indigo-500
                            shadow-sm shadow-indigo-500/50
                        "
                    />

                    <p
                        className="
                            truncate
                            text-sm font-medium capitalize text-slate-200
                        "
                    >
                        {project.status}
                    </p>

                </div>
            </div>


            <div
                className="
                    group relative overflow-hidden
                    rounded-2xl border border-white/10
                    bg-[#0F172A]
                    p-4 sm:p-5

                    transition-all duration-300 ease-out
                    hover:-translate-y-0.5
                    hover:border-indigo-500/30
                    hover:shadow-lg hover:shadow-indigo-500/5
                "
            >

                <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Budget
                </h3>

                <p
                    className="
                        break-words
                        text-2xl font-semibold tracking-tight
                        text-white tabular-nums
                    "
                >
                    {project.budget ? `₹${project.budget}` : "—"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    Total allocated budget
                </p>
            </div>

        </div>
    );
}