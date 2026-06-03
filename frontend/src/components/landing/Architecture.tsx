import { motion } from "framer-motion";
import {
    Monitor,
    Server,
    Database,
    Shield,
} from "lucide-react";

const architectureLayers = [
    {
        title: "Frontend",
        description:
            "React and TypeScript power a responsive interface focused on productivity and usability.",
        icon: Monitor,
    },
    {
        title: "API Layer",
        description:
            "Structured REST endpoints handle communication between the client and server.",
        icon: Shield,
    },
    {
        title: "Backend",
        description:
            "Express and TypeScript manage business logic, validation and authentication.",
        icon: Server,
    },
    {
        title: "Database",
        description:
            "MongoDB stores user-specific clients, projects, tasks, notes and invoices.",
        icon: Database,
    },
];

export default function Architecture() {
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
                        Architecture
                    </span>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Built With Clear Separation Between UI, Business Logic & Data
                    </h2>

                    <p className="mt-4 text-lg text-slate-400">
                        DevMate separates presentation, business logic and data
                        management into clear layers while keeping business
                        workflows connected throughout the application.
                    </p>
                </motion.div>

                {/* System Flow */}
                <div className="mt-20">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {architectureLayers.map((layer, index) => {
                            const Icon = layer.icon;

                            return (
                                <motion.div
                                    key={layer.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                    }}
                                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                                >
                                    <div className="mb-4 inline-flex rounded-2xl bg-indigo-500/10 p-3">
                                        <Icon className="h-6 w-6 text-indigo-400" />
                                    </div>

                                    <h3 className="text-lg font-semibold text-white">
                                        {layer.title}
                                    </h3>

                                    <p className="mt-3 text-slate-400">
                                        {layer.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Product Relationship */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                >
                    <h3 className="text-xl font-semibold text-white">
                        Connected Data Model
                    </h3>

                    <p className="mt-3 text-slate-400">
                        Every record belongs to an authenticated user and remains
                        connected throughout the workflow.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
                        <div className="rounded-xl border border-white/10 px-4 py-3">
                            User
                        </div>

                        <span className="text-indigo-400">→</span>

                        <div className="rounded-xl border border-white/10 px-4 py-3">
                            Clients
                        </div>

                        <span className="text-indigo-400">→</span>

                        <div className="rounded-xl border border-white/10 px-4 py-3">
                            Projects
                        </div>

                        <span className="text-indigo-400">→</span>

                        <div className="rounded-xl border border-white/10 px-4 py-3">
                            Tasks
                        </div>

                        <span className="text-indigo-400">→</span>

                        <div className="rounded-xl border border-white/10 px-4 py-3">
                            Invoices
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}