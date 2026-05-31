import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[#0B0F19] text-slate-100">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
          
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-5 lg:p-6 no-scrollbar">
                <div className="mb-4">
                    <button
                        onClick={() => setCollapsed(false)}
                        className="
        fixed left-4 top-4 
        z-50
        flex h-10 w-10 items-center justify-center
        rounded-xl border border-white/10
        bg-[#111827]/90
        backdrop-blur-md
        text-slate-300
        transition-colors
        hover:bg-slate-800 hover:text-white
    "
                    >
                        <Menu size={18} />
                    </button>
                </div>

                <div className="mx-auto w-full max-w-[1600px]">
                    {children}
                </div>
            </main>
        </div>
    );
}