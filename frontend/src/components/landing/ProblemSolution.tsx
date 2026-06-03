import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const problems = [
    "Client information stored separately from project work",
    "Project progress difficult to track across multiple tools",
    "Tasks disconnected from overall project context",
    "Notes scattered across different applications",
    "Invoices managed outside the project workflow",
];

const solutions = [
    "Clients, projects, tasks, notes and invoices remain connected",
    "Centralized dashboard for project visibility",
    "Tasks linked directly to project execution",
    "Project information organized in a single workspace",
    "Integrated invoice management workflow",
];

export default function ProblemSolution() {
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
                        Why DevMate
                    </span>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Project Work Shouldn't Be Scattered Across Multiple Tools
                    </h2>

                    <p className="mt-4 text-lg text-slate-400">
                        Managing clients, projects, tasks, notes and invoices across
                        separate tools creates unnecessary complexity. DevMate keeps every
                        part of the workflow connected in one organized workspace.
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-6 lg:grid-cols-2">
                    
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
                    >
                        <div className="mb-8 flex items-center gap-3">
                            <div className="rounded-xl bg-red-500/10 p-2">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                Common Challenges
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {problems.map((problem) => (
                                <div
                                    key={problem}
                                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/10 p-4"
                                >
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

                                    <p className="text-slate-300">{problem}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                   
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
                    >
                        <div className="mb-8 flex items-center gap-3">
                            <div className="rounded-xl bg-indigo-500/10 p-2">
                                <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                            </div>

                            <h3 className="text-xl font-semibold text-white">
                                How DevMate Helps
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {solutions.map((solution) => (
                                <div
                                    key={solution}
                                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/10 p-4"
                                >
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />

                                    <p className="text-slate-300">{solution}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}