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
        <div className="border-b border-slate-200">
            <div className="flex gap-8 text-sm">
                {tabs.map(tab => (
                    <NavLink
                        key={tab.path}
                        to={`/projects/${projectId}/${tab.path}`}
                    >
                        {({ isActive }) => (
                            <div
                                className={`relative pb-3 transition-all duration-200 ease-out ${isActive
                                        ? "text-slate-900 font-medium"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                            >
                                {tab.label}

                              
                                <span
                                    className={`absolute left-0 bottom-0 h-[1.5px] w-full rounded-full transition-all ${isActive ? "bg-slate-900/80" : "bg-transparent"
                                        }`}
                                />
                            </div>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}