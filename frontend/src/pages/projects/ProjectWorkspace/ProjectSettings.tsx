import { useEffect, useState } from "react";
import { updateProject, deleteProject } from "@/api/projects";
import type { Project, ProjectStatus } from "@/types/Project";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "@/hooks/useProject";

export default function ProjectSettings() {
    const { projectId } = useParams();
    const { project, loading, error } = useProject(projectId!);

   
    const [form, setForm] = useState<Project | null>(null);
    const [saving, setSaving] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const Navigate = useNavigate();

    useEffect(() => {
        if (project) setForm(project);
    }, [project]);

    if (loading || !form || !project) {
        return <div>Loading...</div>;
    }
   
    if (error) {
        return <div className="text-red-400">{error}</div>;
    }

    const handleChange = <K extends keyof Project>(
        key: K,
        value: Project[K]
    ) => {
        setForm((prev) =>
            prev ? { ...prev, [key]: value } : prev
        );
    };
    const handleSave = async () => {
        try {
            setSaving(true);

            await updateProject(project._id, {
                title: form.title,
                status: form.status,
                budget: form.budget,
                description: form.description,
            });

            toast.success("Project updated");

        } catch {
            toast.error("Failed to update project");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);

            await deleteProject(project._id);

            toast.success("Project deleted");

            
            Navigate("/projects");

        } catch {
            toast.error("Failed to delete project");
        } finally {
            setDeleting(false);
        }
    };
    
    return (
        <div className="
    bg-[#0F172A] border border-white/10 rounded-xl
    p-6 space-y-8
    ">

           
            <div>
                <h2 className="text-lg font-semibold text-white">
                    Project Settings
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                    Update your project details and preferences
                </p>
            </div>

           
            <div className="space-y-4">

                <input
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Project title"
                    className="
                w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                transition-all duration-200
                "
                />

                <select
                    value={form.status}
                    onChange={(e) =>
                        handleChange("status", e.target.value as ProjectStatus)
                    }
                    className="
                w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                transition-all duration-200
                "
                >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                </select>

                <input
                    type="number"
                    value={form.budget || ""}
                    onChange={(e) =>
                        handleChange("budget", Number(e.target.value))
                    }
                    placeholder="Budget"
                    className="
                w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                transition-all duration-200
                "
                />

                <textarea
                    value={form.description || ""}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                    placeholder="Description"
                    rows={3}
                    className="
                w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
                transition-all duration-200 overflow-y-auto no-scrollbar
                "
                />

            </div>

            
            <div className="h-px bg-white/10" />

           
            <div className="space-y-3">

                <h3 className="text-sm font-medium text-red-400">
                    Danger Zone
                </h3>

                <div className="
            flex items-center justify-between gap-4
            bg-red-500/5 border border-red-500/10 rounded-lg p-4
            ">

                 
                    <div className="text-sm text-slate-400">
                        {confirmDelete
                            ? "Are you sure? This action cannot be undone."
                            : "Delete this project permanently"}
                    </div>

                    
                    <div className="flex items-center gap-2">

                        {!confirmDelete ? (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                className="
                            px-3 py-1.5 text-sm rounded-lg
                            text-red-400 hover:text-red-300
                            hover:bg-red-500/10
                            transition-all duration-200
                            "
                            >
                                Delete
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="
                                px-3 py-1.5 text-sm rounded-lg
                                bg-red-600 text-white
                                hover:bg-red-500
                                transition-all duration-200
                                "
                                >
                                    {deleting ? "Deleting..." : "Confirm"}
                                </button>

                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    className="
                                px-3 py-1.5 text-sm rounded-lg
                                text-slate-400 hover:text-white
                                hover:bg-slate-800
                                transition-all duration-200
                                "
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>

            
            <div className="flex justify-end pt-2">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="
                px-5 py-2 rounded-lg text-sm font-medium
                bg-indigo-500 text-white
                transition-all duration-300 ease-out
                hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20
                active:scale-[0.97]
                "
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

        </div>
    );
}
