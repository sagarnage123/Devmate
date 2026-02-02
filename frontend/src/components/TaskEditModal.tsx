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

    useEffect(()=>{
        if(task)
            setForm({
                title: task.title,
                description: task.description ?? "",
                priority: task.priority ?? "",
                dueDate: task.dueDate ? task.dueDate.split("T")[0] : ""
            });

    },[task]);

    if(!isOpen)
        return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center item-center z-50">
            <div className="bg-white rounded-lg p-4 w-96">
                <h2 className="text-lg font-bold mb-3">Edit task</h2>

                <input type="text"
                value={form.title}
                onChange={(e)=>{setForm({...form,title:e.target.value})}} 
                placeholder="Title"
                className="w-full mb-2 p-2 border rounded"
                />

                <textarea value={form.description}
                onChange={(e)=>{setForm({...form,description:e.target.value})}}
                    placeholder="Description"
                    className="w-full mb-2 p-2 border rounded"
                    rows={3}
                />
                <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
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
                        className="px-3 py-1 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>

    )
}
