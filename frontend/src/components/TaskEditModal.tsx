import React,{useState,useEffect} from "react";
import { Task } from "../types/Task";

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
}:TaskEditModalProps){
    const [form,setForm]=useState<TaskForm>({
        title: "",
        description: "",
        priority: "",
        dueDate: ""
    });
    const [show, setShow] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    
    useEffect(()=>{
        if(task)
            setForm({
                title: task.title,
                description: task.description ?? "",
                priority: task.priority ?? "",
                dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
            });

    },[task]);

    useEffect(() => {
        if (isOpen) {
            setShow(true);

           
            setTimeout(() => {
                setAnimateIn(true);
            }, 70);
        } else {
            setAnimateIn(false);

            setTimeout(() => {
                setShow(false);
            }, 200);
        }
    }, [isOpen]);

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen && !show) return null;

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity duration-250 ease-in ${animateIn ? "opacity-100" : "opacity-0"
                }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white border border-slate-200 rounded-xl shadow-sm w-full max-w-md p-5 space-y-4 transform transition-all duration-250 ease-in ${animateIn
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-2"
                    }`}
            >
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Edit task</h2>

                <input type="text"
                value={form.title}
                onChange={(e)=>{setForm({...form,title:e.target.value})}} 
                placeholder="Title"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-slate-300"
                />

                <textarea value={form.description}
                onChange={(e)=>{setForm({...form,description:e.target.value})}}
                    placeholder="Description"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-slate-300"
                    rows={3}
                />
                <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-slate-300"
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
                    className="w-full mb-3 p-2 border rounded"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 text-sm border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        
                        onClick={() => onSave(form)}
                        className="px-3 py-1.5 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>

    )
}
