import { useState } from "react";
import { motion } from "framer-motion";
import { TourStep } from "./WorkflowTourModal";
import WorkflowTourModal from "./WorkflowTourModal";

import registerDesktop from "@/assets/screenshots/register-desktop.png";
import registerMobile from "@/assets/screenshots/register-mobile.png";
import loginDesktop from "@/assets/screenshots/login-desktop.png";
import loginMobile from "@/assets/screenshots/login-mobile.png";
import projectsDesktop from "@/assets/screenshots/projects-desktop.png";
import projectsMobile from "@/assets/screenshots/projects-mobile.png";
import createProjectDesktop from "@/assets/screenshots/create-project-desktop.png";
import createProjectMobile from "@/assets/screenshots/create-project-mobile.png";
import projectOverviewDesktop from "@/assets/screenshots/project-overview-desktop.png";
import projectOverviewMobile from "@/assets/screenshots/project-overview-mobile.png";
import tasksDesktop from "@/assets/screenshots/tasks-desktop.png";
import tasksMobile from "@/assets/screenshots/tasks-mobile.png";
import kanbanDesktop from "@/assets/screenshots/kanban-desktop.png";
import kanbanMobile from "@/assets/screenshots/kanban-mobile.png";
import notesDesktop from "@/assets/screenshots/notes-desktop.png";
import notesMobile from "@/assets/screenshots/notes-mobile.png";

import invoicesDesktop from "@/assets/screenshots/invoices-desktop.png";
import invoicesMobile from "@/assets/screenshots/invoices-mobile.png";
import createInvoiceDesktop from "@/assets/screenshots/create-invoice-desktop.png";
import createInvoiceMobile from "@/assets/screenshots/create-invoice-mobile.png";

import invoiceDetailsDesktop from "../../assets/screenshots/invoice-details-desktop.png"
import invoiceDetailsMobile from "../..//assets/screenshots/invoice-details-mobile.png";

import updateInvoiceDesktop from "@/assets/screenshots/update-invoice-desktop.png";
import updateInvoiceMobile from "@/assets/screenshots/update-invoice-mobile.png";
import clientsDesktop from "@/assets/screenshots/clients-desktop.png";
import clientsMobile from "@/assets/screenshots/clients-mobile.png";
import createClientDesktop from "@/assets/screenshots/create-client-desktop.png";
import createClientMobile from "@/assets/screenshots/create-client-mobile.png";

console.log("ProductWalkthrough component loaded", {
    registerDesktop,
    registerMobile,
    loginDesktop,
    loginMobile
});

export const steps: TourStep[] = [
    {
        desktopImage: registerDesktop,
        mobileImage: registerMobile,
        title: "User Registration",
        description:
            "New users can create an account to access their personal DevMate workspace.",
    },

    {
        desktopImage: loginDesktop,
        mobileImage: loginMobile,
        title: "Secure Authentication",
        description:
            "Users authenticate through JWT-based login before accessing protected application resources.",
    },

    {
        desktopImage: projectsDesktop,
        mobileImage: projectsMobile,
        title: "Projects Dashboard",
        description:
            "The projects area provides a centralized view of ongoing work and project activity.",
    },

    {
        desktopImage: createProjectDesktop,
        mobileImage: createProjectMobile,
        title: "Create Project",
        description:
            "Projects can be created and organized to structure client work and delivery.",
    },

    {
        desktopImage: projectOverviewDesktop,
        mobileImage: projectOverviewMobile,
        title: "Project Overview",
        description:
            "View project details, progress, tasks, notes and invoices from a single workspace.",
    },

    {
        desktopImage: tasksDesktop,
        mobileImage: tasksMobile,
        title: "Task Management",
        description:
            "Break projects into actionable tasks and track execution progress.",
    },

    {
        desktopImage: kanbanDesktop,
        mobileImage: kanbanMobile,
        title: "Kanban Workflow",
        description:
            "Visual task management helps teams monitor work across different stages of completion.",
    },

    {
        desktopImage: notesDesktop,
        mobileImage: notesMobile,
        title: "Project Notes",
        description:
            "Store project-related information and important context alongside active work.",
    },

    {
        desktopImage: invoicesDesktop,
        mobileImage: invoicesMobile,
        title: "Invoices Workspace",
        description:
            "Manage project invoices through a dedicated billing workflow.",
    },

    {
        desktopImage: createInvoiceDesktop,
        mobileImage: createInvoiceMobile,
        title: "Create Invoice",
        description:
            "Generate invoices directly within the platform without relying on external tools.",
    },

    {
        desktopImage: invoiceDetailsDesktop,
        mobileImage: invoiceDetailsMobile,
        title: "Invoice Details",
        description:
            "Review invoice information, payment details and project-related billing records.",
    },

    {
        desktopImage: updateInvoiceDesktop,
        mobileImage: updateInvoiceMobile,
        title: "Update Invoice",
        description:
            "Modify invoice information while maintaining a consistent billing workflow.",
    },

    {
        desktopImage: clientsDesktop,
        mobileImage: clientsMobile,
        title: "Client Management",
        description:
            "Maintain centralized client records connected to projects and invoices.",
    },

    {
        desktopImage: createClientDesktop,
        mobileImage: createClientMobile,
        title: "Create Client",
        description:
            "Quickly onboard new clients and connect them to future projects.",
    },
];
export default function ProductWalkthrough() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <>
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
                            Product Walkthrough
                        </span>

                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            Explore The Platform Without Creating An Account
                        </h2>

                        <p className="mt-4 text-lg text-slate-400">
                            Follow the complete DevMate workflow from client creation
                            to project delivery and invoice management.
                        </p>
                    </motion.div>

                    <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <div className="grid gap-4 md:grid-cols-3">
                            {steps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="rounded-2xl border border-white/10 bg-black/10 p-5"
                                >
                                    <div className="mb-3 text-sm font-medium text-indigo-300">
                                        Step {index + 1}
                                    </div>

                                    <h3 className="font-semibold text-white">
                                        {step.title}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => {
                                    setCurrentStep(0);
                                    setIsOpen(true);
                                }}
                                className="
                  rounded-xl
                  bg-indigo-600
                  px-6
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-indigo-500
                "
                            >
                                Start Interactive Walkthrough
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <WorkflowTourModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </>
    );
}