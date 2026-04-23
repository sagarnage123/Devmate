import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive
            ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="w-64 bg-[#0B0F19] border-r border-white/10 flex flex-col p-4">
        
            <div>
                <div className="mt-8 flex items-center gap-2 px-2 mb-6">

                   
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400 font-semibold text-sm">D</span>
                    </div>

                   
                    <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                        DevMate
                    </h1>

                </div>

                <nav className="flex flex-col gap-1">
                    <NavLink to="/projects" className={linkClass}>
                        Projects
                    </NavLink>

                    <NavLink to="/invoices" className={linkClass}>
                        Invoices
                    </NavLink>

                    <NavLink to="/clients" className={linkClass}>
                        Clients
                    </NavLink>
                </nav>
            </div>

           
            <div className="mt-auto mb-4 pt-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium
    text-slate-400 transition-all duration-200
    hover:bg-red-500/10 hover:text-red-400"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}