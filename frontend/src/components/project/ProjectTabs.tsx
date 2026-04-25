import { NavLink } from "react-router-dom";

const tabs = [
    { label: "Overview", path: "overview" },
    { label: "Tasks", path: "tasks" },
    { label: "Notes", path: "notes" },
    { label: "Kanban", path: "kanban" },
    { label: "Settings", path: "settings" },
];
export default function ProjectTabs({ projectId }: { projectId: string }) {
    return (
       
        <div className="
sticky top-0 z-40
bg-transparent 
border-b border-white/5
">

            <div className="flex justify-center py-3">

                <div className="
        inline-flex items-center gap-1
        bg-[#0F172A] border border-white/10
        rounded-lg p-1
        ">

                    {tabs.map(tab => (
                        <NavLink
                            key={tab.path}
                            to={`/projects/${projectId}/${tab.path}`}
                        >
                            {({ isActive }) => (
                                <div
                                    className={`
                            relative px-4 py-2 text-sm rounded-md
                            transition-all duration-200 ease-out

                            ${isActive
                                            ? "text-white"
                                            : "text-slate-400 hover:text-slate-200"
                                        }
                            `}
                                >
                                    {isActive && (
                                        <span className="
                                absolute inset-0 rounded-md
                                bg-indigo-500/10
                                border border-indigo-500/20
                                shadow-sm shadow-indigo-500/10
                                " />
                                    )}

                                    <span className="relative z-10">
                                        {tab.label}
                                    </span>

                                </div>
                            )}
                        </NavLink>
                    ))}

                </div>

            </div>
        </div>
    );
}