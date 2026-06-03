import { motion } from "framer-motion";
import HeroPreviewCard from "./HeroPreviewCard";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay,
        },
    }),
};

const highlights = [
    "Type-Safe Codebase",
    "JWT Authentication",
    "Responsive Design",
    "Connected Workflows",
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 text-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid items-center  gap-14 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <motion.p
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="mb-4 text-sm font-medium text-slate-400"
                        >
                            React • TypeScript • Node.js • MongoDB
                        </motion.p>

                        <motion.div
                            custom={0.1}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="mb-6 inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
                        >
                            Full-Stack Project Management Platform
                        </motion.div>

                        <motion.h1
                            custom={0.2}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                        >
                            Manage Clients, Projects, Tasks & Invoices From One Workspace
                        </motion.h1>

                        <motion.p
                            custom={0.3}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="mt-6  text-lg leading-relaxed text-slate-400"
                        >
                            DevMate helps freelancers and small teams organize client
                            relationships, manage projects, track tasks, store project notes,
                            and handle invoices through a single connected workspace.
                        </motion.p>

                        <motion.div
                            custom={0.4}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between w-fit mx-auto"
                        >
                            <button className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500">
                                Explore the Platform
                            </button>

                            <button className="rounded-xl border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/5">
                                View Source Code
                            </button>
                        </motion.div>

                        <motion.div
                            custom={0.5}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="mt-10 flex flex-wrap gap-3"
                        >
                            {highlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
                                >
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <HeroPreviewCard />
                </div>
            </div>
        </section>
    );
}