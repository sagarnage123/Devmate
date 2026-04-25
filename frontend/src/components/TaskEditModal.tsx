import React, { useState, useEffect } from "react";
import { Task } from "../types/Task";
import { motion, AnimatePresence } from "framer-motion";

interface TaskForm {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
}

interface TaskEditModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (form: TaskForm) => void;
}

export default function TaskEditModal({
    task,
    isOpen,
    onClose,
    onSave
}: TaskEditModalProps) {

    const [form, setForm] = useState<TaskForm>({
        title: "",
        description: "",
        priority: "",
        dueDate: ""
    });

    useEffect(() => {
        if (task)
            setForm({
                title: task.title,
                description: task.description ?? "",
                priority: task.priority ?? "",
                dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
            });
    }, [task]);

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md p-5 space-y-4
                        bg-[#0F172A] border border-white/10 rounded-xl
                        shadow-2xl shadow-black/40"

                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}

                        transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >

                       
                        <h2 className="text-lg font-semibold text-white tracking-tight">
                            Edit Task
                        </h2>

                        
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Title"
                            className="
                            w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                            placeholder:text-slate-500
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                            transition-all duration-200
                            "
                        />

                        
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Description"
                            rows={3}
                            className="
                            w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                            placeholder:text-slate-500
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                            transition-all duration-200 overflow-y-auto no-scrollbar
                            "
                        />

                       
                        <select
                            value={form.priority}
                            onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            className="
                            w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                            transition-all duration-200
                            "
                        >
                            <option value="">Select priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                      
                        <input
                            type="date"
                            value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                            className="
                            w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                            transition-all duration-200
                            "
                        />

                       
                        <div className="flex justify-end gap-2 pt-2">

                            <button
                                onClick={onClose}
                                className="
                                px-3 py-1.5 text-sm rounded-lg
                                text-slate-400 hover:text-white
                                hover:bg-slate-800
                                transition-all duration-200
                                "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => onSave(form)}
                                className="
                                px-3 py-1.5 text-sm rounded-lg font-medium
                                bg-indigo-500 text-white
                                transition-all duration-300 ease-out
                                hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20
                                active:scale-[0.97]
                                "
                            >
                                Save
                            </button>

                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}