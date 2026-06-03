import { motion } from "framer-motion";
import {
    Users,
    FolderKanban,
    CheckSquare,
    Receipt,
} from "lucide-react";

const modules = [
    {
        title: "Client Management",
        description: "Maintain centralized client records",
        icon: Users,
    },
    {
        title: "Project Tracking",
        description: "Monitor project progress",
        icon: FolderKanban,
    },
    {
        title: "Task Management",
        description: "Track project execution",
        icon: CheckSquare,
    },
    {
        title: "Invoice Management",
        description: "Manage project invoices",
        icon: Receipt,
    },
];

export default function HeroPreviewCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            
            
            className="relative"
        >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl md:hover:scale-[1.01] md:hover:-translate-y-2 md:hover:translate-x-2 transition-all duration-300">
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <div className="p-6 md:p-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white">
                            DevMate Workspace
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                            Connected project management workflow
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {modules.map((module) => {
                            const Icon = module.icon;

                            return (
                                <div
                                    key={module.title}
                                    className="rounded-2xl border border-white/10 bg-black/10 p-4"
                                >
                                    <div className="mb-3 inline-flex rounded-xl bg-indigo-500/10 p-2">
                                        <Icon className="h-5 w-5 text-indigo-400" />
                                    </div>

                                    <h4 className="font-medium text-white">
                                        {module.title}
                                    </h4>

                                    <p className="mt-2 text-sm text-slate-400">
                                        {module.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                        <p className="text-sm text-slate-300">
                            Clients → Projects → Tasks → Invoices
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                            A workflow designed around real freelance and agency operations.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}