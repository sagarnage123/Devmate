import { NavLink, useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";
import { transitionProperty } from "@dnd-kit/sortable/dist/hooks/defaults";
import { opacity } from "pdfkit";

type Props = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Sidebar({ collapsed, setCollapsed }: Props) {
    const navigate = useNavigate();

    const linkClass = ({ isActive }: { isActive: boolean}) =>
        `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive
            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        }
        ${collapsed && "sr-only"}
        `

    const list=[
        {
            name:"Project",
            path:"/projects"
        },
        {
            name:"Invoices",
            path:"/invoices"
        },
        {
            name:"Clients",
            path: "/clients"
        }
    ];
    const parentVarient={
        open:{
            transition:{
                staggerChildren:0.15,
                delayChildren:0.2
            }
        }
        ,
        close:{
            transition: {
                staggerChildren: 0.5,
                delayChildren: -1
            }

        }
    }
    const childVariant={
        open:{
            opacity:1,
            y:0
        },
        close:{
            opacity:0,
            y:-10

        }
    }
        
        

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <motion.div
           animate={{
                width: !collapsed?"16rem":"4.5rem"
           }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        
         className="w-64 bg-[#0B0F19] border-r border-white/10 flex flex-col p-4 ">

            <button
                onClick={() => setCollapsed(prev => !prev)}
                className="
    mb-6 text-slate-400 hover:text-white
    transition-colors ml-auto
    "
            >
                {collapsed ? "→" : "←"}
            </button>
        
            <div>
                <div className="mt-8 flex items-center gap-2 px-2 mb-6">

                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400 font-semibold text-sm">D</span>
                    </div>

                   
                    <h1 className={`text-xl font-semibold ${collapsed && "sr-only"}`}>
                        DevMate
                    </h1>

                </div>

                <motion.nav
                
                
                 className="flex flex-col gap-2">

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
                                    <span className="text-sm">
                                        {item.name}
                                    </span>
                                </NavLink>
                            </motion.li>
                        ))}

                    </motion.ul>
                </motion.nav>
            </div>

           
            <div className= {`mt-auto mb-4 pt-4 ${collapsed && "sr-only"}`}>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium
    text-slate-400 transition-all duration-200
    hover:bg-red-500/10 hover:text-red-400"
                >
                    Logout
                </button>
            </div>

        </motion.div>
    );
}