import { motion } from "framer-motion";
import {
    Users,
    FolderKanban,
    CheckSquare,
    Receipt,
    ArrowDown,
} from "lucide-react";

const workflow = [
    {
        title: "Client",
        description:
            "Maintain client information and establish the foundation for every project.",
        icon: Users,
    },
    {
        title: "Project",
        description:
            "Organize work into projects linked directly to client relationships.",
        icon: FolderKanban,
    },
    {
        title: "Tasks",
        description:
            "Break projects into actionable tasks and track execution progress using Kanban table",
        icon: CheckSquare,
    },
    {
        title: "Invoices",
        description:
            "Manage billing and invoices as part of the project workflow.",
        icon: Receipt,
    },
];

export default function Workflow() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
                        Core Workflow
                    </span>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Built Around Real Project Lifecycles
                    </h2>

                    <p className="mt-4 text-lg text-slate-400">
                        DevMate connects clients, projects, tasks and invoices into
                        a structured workflow that reflects how freelance and agency
                        work is actually managed.
                    </p>
                </motion.div>

                <div className="mt-20 flex flex-col items-center">
                    {workflow.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.title}
                                className="flex flex-col items-center md:hover:scale-[1.01] transition-all duration-300"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.15,
                                    }}
                                    className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-2xl bg-indigo-500/10 p-3">
                                            <Icon className="h-6 w-6 text-indigo-400" />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                {step.title}
                                            </h3>

                                            <p className="mt-2 text-slate-400">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {index !== workflow.length - 1 && (
                                    <div className="my-5">
                                        <ArrowDown className="h-6 w-6 text-indigo-400" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}