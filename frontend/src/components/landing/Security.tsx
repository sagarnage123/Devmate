import { motion } from "framer-motion";
import {
    KeyRound,
    ShieldCheck,
    Lock,
    UserCheck,
} from "lucide-react";

const securityFeatures = [
    {
        title: "JWT Authentication",
        description:
            "Authenticated sessions are secured using JSON Web Tokens to protect access to application resources.",
        icon: KeyRound,
    },
    {
        title: "Protected Routes",
        description:
            "Application routes are restricted to authenticated users, preventing unauthorized access.",
        icon: Lock,
    },
    {
        title: "User Data Isolation",
        description:
            "Clients, projects, tasks, notes and invoices are scoped to the authenticated user.",
        icon: UserCheck,
    },
    {
        title: "Access Validation",
        description:
            "Backend validation ensures users can only interact with records they own.",
        icon: ShieldCheck,
    },
];

export default function Security() {
    return (
        <section className="py-24" id="security">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
                        Security
                    </span>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                        Authentication & Access Control Built Into The Platform
                    </h2>

                    <p className="mt-4 text-lg text-slate-400">
                        DevMate uses authentication, route protection and ownership-based
                        access patterns to ensure users only access their own workspace data.
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {securityFeatures.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
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
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-slate-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}