import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-100">
            <Sidebar />

            <div className="flex-1 overflow-y-auto p-8">
                {children}
            </div>
        </div>
    );
}