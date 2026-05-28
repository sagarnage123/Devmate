import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";
import {motion,AnimatePresence} from "framer-motion";
const tabs = [
    { label: "Overview", path: "overview" },
    { label: "Tasks", path: "tasks" },
    { label: "Notes", path: "notes" },
    { label: "Kanban", path: "kanban" },
    { label: "Settings", path: "settings" },
];
export default function ProjectTabs({ projectId }: { projectId: string }) {

    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const activeTab =
        tabs.find((tab) => location.pathname.includes(tab.path)) || tabs[0];
    return (
        <>
            <div
                className="
                sticky top-0 z-40
                border-b border-white/5
                bg-transparent
            "
            >

                <div className="py-3">

                    <div className="sm:hidden">

                        <button
                            onClick={() => setMobileOpen(true)}
                            className="
                            flex w-full items-center justify-between
                            rounded-xl border border-white/10
                            bg-[#0F172A]
                            px-4 py-3
                            text-sm text-slate-200
                            transition-colors
                            hover:border-indigo-500/20
                        "
                        >
                            <span>{activeTab.label}</span>
                           {mobileOpen ?(
                                <CircleChevronUp
                                    size={18}
                                    className="text-slate-400"
                                />
                            ) : (
                            <CircleChevronDown
                                size={18}
                                className="text-slate-400"
                            />
                            )}
                        </button>

                    </div>

                    
                    <div className="hidden sm:flex justify-center">

                        <div
                            className="
                            inline-flex items-center gap-1
                            rounded-xl border border-white/10
                            bg-[#0F172A]
                            p-1
                        "
                        >

                            {tabs.map(tab => (
                                <NavLink
                                    key={tab.path}
                                    to={`/projects/${projectId}/${tab.path}`}
                                >
                                    {({ isActive }) => (
                                        <div
                                            className={`
                                            relative rounded-lg
                                            px-4 py-2
                                            text-sm
                                            transition-all duration-200 ease-out

                                            ${isActive
                                                    ? "text-white"
                                                    : "text-slate-400 hover:text-slate-200"
                                                }
                                        `}
                                        >
                                            {isActive && (
                                                <span
                                                    className="
                                                    absolute inset-0 rounded-lg
                                                    border border-indigo-500/20
                                                    bg-indigo-500/10
                                                    shadow-sm shadow-indigo-500/10
                                                "
                                                />
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
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 , ease: "easeInOut"}}
             
                    className="
            fixed inset-0 z-50
            sm:hidden
        "
                    onClick={() => setMobileOpen(false)}
                >

                    <div
                        className="
                absolute left-0 right-0 top-24
                mx-3
                rounded-2xl border border-white/10
                bg-[#0F172A]
                p-2
                shadow-2xl shadow-black/40
                backdrop-blur-xl
            "
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="space-y-1">

                            {tabs.map((tab) => {
                                const isActive = activeTab.path === tab.path;

                                return (
                                    <button
                                        key={tab.path}
                                        onClick={() => {
                                            navigate(
                                                `/projects/${projectId}/${tab.path}`
                                            );
                                            setMobileOpen(false);
                                        }}
                                        className={`
                                flex w-full items-center
                                rounded-xl px-4 py-3
                                text-left text-sm
                                transition-all duration-200

                                ${isActive
                                                ? "border border-indigo-500/20 bg-indigo-500/10 text-white"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                            }
                            `}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}

                        </div>

                    </div>
                </motion.div>
                
            )}
            </AnimatePresence>
        </>
    );
}