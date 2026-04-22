import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-4 py-2 rounded-lg transition ${isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col justify-between p-4">

            <div>
                
                <h1 className="text-xl font-semibold mb-8 px-2">
                    DevMate
                </h1>

               
                <nav className="flex flex-col gap-2">

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

           
            <div>
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}