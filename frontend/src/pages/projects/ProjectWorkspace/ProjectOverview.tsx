import { useProjectContext } from "@/context/ProjectContext";
import { cardInteractiveStyles,sectionPadding } from "@/components/ui/styles";
import ProjectHeader from "@/components/project/ProjectHeader";
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
       

        <div className="grid gap-6 md:grid-cols-2 items-stretch">

            
            <div className={`${cardInteractiveStyles} ${sectionPadding} hover:border-slate-300`}>
                <h3 className="text-sm font-medium text-slate-700">
                    Description
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                    {project.description || "No description provided"}
                </p>
            </div>

           
           <div className={`${cardInteractiveStyles} ${sectionPadding} hover:border-slate-300`}> 
                <h3 className="text-sm font-medium text-slate-700">
                    Timeline
                </h3>

                <div className="flex justify-between text-sm text-slate-600">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500">Start</p>
                        <p className="font-medium text-slate-800">
                            {formatDate(project.startDate)}
                        </p>
                    </div>

                    <div className="space-y-1 text-right">
                        <p className="text-xs text-slate-500">Due</p>
                        <p className="font-medium text-slate-800">
                            {formatDate(project.dueDate)}
                        </p>
                    </div>
                </div>
            </div>

           
            <div className={`${cardInteractiveStyles} ${sectionPadding} hover:border-slate-300`}>
                <h3 className="text-sm font-medium text-slate-700">
                    Status
                </h3>

                <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500/80" />
                    <p className="text-sm font-medium text-slate-800 capitalize">
                        {project.status}
                    </p>
                </div>
            </div>
  
            <div className={`${cardInteractiveStyles} ${sectionPadding} hover:border-slate-300`}>
                <h3 className="text-sm font-medium text-slate-700">
                    Budget
                </h3>

                <p className="text-xl font-semibold text-slate-900 tracking-tight">
                    {project.budget ? `₹${project.budget}` : "—"}
                </p>

                <p className="text-xs text-slate-500">
                    Total allocated budget
                </p>
            </div>
        </div>

    );
}