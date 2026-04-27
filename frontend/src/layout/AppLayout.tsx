import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="flex h-screen bg-[#0B0F19] text-slate-100">
            <Sidebar collapsed={collapsed}
                setCollapsed={setCollapsed}
             />

            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                {children}
            </div>
        </div>
    );
}