import { NavLink } from "react-router-dom";

const tabs = [
    { label: "Overview", path: "overview" },
    { label: "Tasks", path: "tasks" },
    { label: "Notes", path: "notes" },
    { label: "Invoices", path: "invoices" },
];

export default function ProjectTabs({ projectId }: { projectId: string }) {
    return (
        <div className="flex gap-6 border-b text-sm">
            {tabs.map(tab => (
                <NavLink
                    key={tab.path}
                    to={`/projects/${projectId}/${tab.path}`}
                    className={({ isActive }) =>
                        `pb-2 ${isActive
                            ? "border-b-2 border-black font-medium"
                            : "text-muted-foreground"
                        }`
                    }
                >
                    {tab.label}
                </NavLink>
            ))}
        </div>
    );
}