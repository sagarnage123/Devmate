import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#0B0F19] text-white">

           
            <Sidebar />

            
            <div className="flex-1 p-8">
                {children}
            </div>

        </div>
    );
}