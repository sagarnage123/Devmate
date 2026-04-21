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
        <div className="bg-slate-200 p-6 rounded-2xl">

            <h2 className="text-xl font-semibold mb-6">
                Project Settings
            </h2>

            <div className="space-y-4">

               
                <input
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
                />

               
                <select
                    value={form.status}
                    onChange={(e) =>
                        handleChange("status", e.target.value as ProjectStatus)
                    }
                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
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
                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
                />

               
                <textarea
                    value={form.description || ""}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2"
                />

            </div>

            <div className="mt-10 border-t pt-6 mb-3">

                <h3 className="text-red-400 font-semibold mb-3">
                    Danger Zone
                </h3>

               
                <div className="flex items-center justify-between gap-4">

                    
                    <div className="text-sm text-gray-400 min-h-[24px] flex items-center">
                        {confirmDelete
                            ? "Are you sure? This cannot be undone."
                            : "Delete this project permanently"}
                    </div>

                   
                    <div className="flex items-center gap-2 min-w-[220px] justify-end">

                        {!confirmDelete ? (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="bg-red-600 px-4 py-2 rounded-lg"
                                >
                                    {deleting ? "Deleting..." : "Confirm"}
                                </button>

                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    className="bg-gray-600 px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>

           
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-indigo-600 px-5 py-2 rounded-lg"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            
        </div>
    );
}
