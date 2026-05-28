import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useRef,useEffect} from "react";
import { Menu, X } from "lucide-react";

type Props = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ collapsed, setCollapsed }: Props) {
    const navigate = useNavigate();
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setCollapsed(true);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setCollapsed]);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
        min-h-[44px]
        ${isActive
            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        }
        ${collapsed ? "justify-center px-2" : ""}
        `;

    const list = [
        {
            name: "Project",
            path: "/projects"
        },
        {
            name: "Invoices",
            path: "/invoices"
        },
        {
            name: "Clients",
            path: "/clients"
        }
    ];

    const parentVarient = {
        open: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        },
        close: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: -1
            }
        }
    };

    const childVariant = {
        open: {
            x: 0
        },
        close: {
            x: "-120%"
        }
    };

    const topParentVariant = {
        open: {
            x: 0
        },
        close: {
            x: "-120%"
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    

    return (
        <motion.aside
        ref={sidebarRef}
            animate={
                !collapsed? "open"
                    : "close"
        
            }
            variants={{
                open: {
                        x:0
                },
                close: {
                    x: "-120%"
                },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
    fixed left-0 top-0 z-50
    m-3
    h-[calc(100vh-24px)]
    w-72
    overflow-hidden
    rounded-2xl border border-white/10
    bg-[#111827]
    shadow-2xl shadow-black/30
    flex flex-col
    p-4
"
        >
            <div className="flex items-center justify-end mb-4 sm:mb-6">
                <button
                    onClick={() => setCollapsed(true)}
                    className="
        rounded-lg p-2
        text-slate-400 hover:text-white hover:bg-slate-800
        transition-colors
    "
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
                <motion.div
                    variants={childVariant}
                    className={`
                        mb-6 mt-2 flex items-center gap-3 px-1
                        ${collapsed ? "justify-center" : ""}
                    `}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                        <span className="text-sm font-semibold text-indigo-400">
                            D
                        </span>
                    </div>

                    <h1
                        className={`
                            truncate text-lg sm:text-xl font-semibold transition-opacity duration-200
                            ${collapsed ? "hidden opacity-0" : "opacity-100"}
                        `}
                    >
                        DevMate
                    </h1>
                </motion.div>

                <motion.nav className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
                    <motion.ul
                        animate={!collapsed ? "open" : "close"}
                        variants={parentVarient}
                        className="flex flex-col gap-2"
                    >
                        {list.map((item) => (
                            <motion.li
                                key={item.path}
                                variants={childVariant}
                            >
                                <NavLink to={item.path} className={linkClass}>
                                    <span
                                        className={`
                                            truncate text-sm
                                            ${collapsed ? "hidden" : "block"}
                                        `}
                                    >
                                        {item.name}
                                    </span>
                                </NavLink>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.nav>
            </div>

            <div className={`pt-4 ${collapsed ? "hidden" : "block"}`}>
                <button
                    onClick={handleLogout}
                    className="
                        flex min-h-[44px] w-full items-center rounded-xl
                        px-3 py-2.5 text-sm font-medium
                        text-slate-400 transition-all duration-200
                        hover:bg-red-500/10 hover:text-red-400
                    "
                >
                    Logout
                </button>
            </div>
        </motion.aside>
    );
}