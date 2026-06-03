import { motion } from "framer-motion";
import {
    GitBranch,
    ShieldCheck,
    Smartphone,
    Layers3,
    Workflow,
    Code2,
} from "lucide-react";

const challenges = [
    {
        title: "Connected Business Relationships",
        description:
            "Designed relationships between clients, projects, tasks, notes and invoices so information remains connected throughout the workflow.",
        icon: Workflow,
    },
    {
        title: "TypeScript Migration",
        description:
            "Migrated the application to a TypeScript-first architecture to improve maintainability, type safety and developer experience.",
        icon: Code2,
    },
    {
        title: "User Data Isolation",
        description:
            "Implemented ownership-based access patterns to ensure users can only access and manage their own records.",
        icon: ShieldCheck,
    },
    {
        title: "Reusable UI Architecture",
        description:
            "Built reusable components and consistent design patterns to support future feature expansion.",
        icon: Layers3,
    },
    {
        title: "Responsive Dashboard Experience",
        description:
            "Optimized complex dashboard layouts, tables and forms for mobile, tablet and desktop devices.",
        icon: Smartphone,
    },
    {
        title: "Predictable API Structure",
        description:
            "Created consistent request, validation and response patterns across the application.",
        icon: GitBranch,
    },
];

export default function EngineeringChallenges() {
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
                        Engineering Decisions
                    </span>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Built Beyond Basic CRUD Operations
                    </h2>

                    <p className="mt-4 text-lg text-slate-400">
                        DevMate focuses on solving practical engineering challenges around
                        data relationships, maintainability, security and scalability.
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {challenges.map((challenge, index) => {
                        const Icon = challenge.icon;

                        return (
                            <motion.div
                                key={challenge.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.08,
                                }}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                            >
                                <div className="mb-4 inline-flex rounded-2xl bg-indigo-500/10 p-3">
                                    <Icon className="h-6 w-6 text-indigo-400" />
                                </div>

                                <h3 className="text-lg font-semibold text-white">
                                    {challenge.title}
                                </h3>

                                <p className="mt-3 text-slate-400">
                                    {challenge.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}