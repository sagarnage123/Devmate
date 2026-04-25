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
        <div className="grid gap-5 md:grid-cols-2">

            <div className="
            group relative
            bg-[#0F172A] border border-white/10 rounded-xl p-5
            transition-all duration-300 ease-out
            hover:border-indigo-500/30 hover:-translate-y-0.5
            hover:shadow-lg hover:shadow-indigo-500/5
            ">

                <h3 className="text-xs font-medium text-slate-400 mb-2">
                    Description
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                    {project.description || "No description provided"}
                </p>
            </div>

            
            <div className="
            group relative
            bg-[#0F172A] border border-white/10 rounded-xl p-5
            transition-all duration-300 ease-out
            hover:border-indigo-500/30 hover:-translate-y-0.5
            hover:shadow-lg hover:shadow-indigo-500/5
            ">

                <h3 className="text-xs font-medium text-slate-400 mb-3">
                    Timeline
                </h3>

                <div className="flex justify-between items-center">

                    <div className="space-y-1">
                        <p className="text-xs text-slate-500">Start</p>
                        <p className="text-sm font-medium text-slate-200">
                            {formatDate(project.startDate)}
                        </p>
                    </div>

                    <div className="h-6 w-px bg-white/10" />

                    <div className="space-y-1 text-right">
                        <p className="text-xs text-slate-500">Due</p>
                        <p className="text-sm font-medium text-slate-200">
                            {formatDate(project.dueDate)}
                        </p>
                    </div>

                </div>
            </div>

           
            <div className="
            group relative
            bg-[#0F172A] border border-white/10 rounded-xl p-5
            transition-all duration-300 ease-out
            hover:border-indigo-500/30 hover:-translate-y-0.5
            hover:shadow-lg hover:shadow-indigo-500/5
            ">

                <h3 className="text-xs font-medium text-slate-400 mb-3">
                    Status
                </h3>

                <div className="flex items-center gap-2.5">

                    <span className="
                    h-2.5 w-2.5 rounded-full
                    bg-indigo-500
                    shadow-sm shadow-indigo-500/50
                    " />

                    <p className="text-sm font-medium text-slate-200 capitalize">
                        {project.status}
                    </p>

                </div>
            </div>

           
            <div className="
            group relative
            bg-[#0F172A] border border-white/10 rounded-xl p-5
            transition-all duration-300 ease-out
            hover:border-indigo-500/30 hover:-translate-y-0.5
            hover:shadow-lg hover:shadow-indigo-500/5
            ">

                <h3 className="text-xs font-medium text-slate-400 mb-2">
                    Budget
                </h3>

                <p className="text-xl font-semibold text-white tracking-tight tabular-nums">
                    {project.budget ? `₹${project.budget}` : "—"}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                    Total allocated budget
                </p>
            </div>

        </div>
    );
}