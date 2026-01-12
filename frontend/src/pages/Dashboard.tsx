import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import api from "../api/axios"
import ProjectCard from "../components/ProjectCard";
import ClientCard from "../components/ClientCard";
import { createTask,getTasksByProject,deleteTask,updateTask } from "../api/tasks";
import { Task,TaskPriority } from "../types/Task";

import { ProjectStatus,Project,isProjectStatus } from "../types/Project";
import { getProjects,createProject,updateProject } from "../api/projects";
import { getClients } from "../api/clients";

import CreateProjectModal from "../components/CreateProjectModal";
import { Client } from "../types/Client";
import { User } from "../types/User";
import { getCurrentUser } from "../api/user";
export default function Dashboard() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [clients, setClients] = useState<Client[]>([]);
    const [clientsLoading, setClientsLoading] = useState(true);

    const [projects, setProject] = useState<Project[]>([]);
    const [projectLoading, setProjectLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [clientId, setClientId] = useState("");
    const [budget, setBudget] = useState<number | string | undefined>("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [submiting, setSubmiting] = useState(false);
    const [status, setStatus] = useState<ProjectStatus>("planned");
    const [isModalOpen, setOpenProjectModal] = useState(false);

    const [editingProject, setEditingProject] = useState<Project | null>(null);

    //  states related to task
        const [taskByProjectId, setTaskByProjectId] = useState<Record<string, Task[]>>({});
        const [taskLoading, setTaskLoading] = useState<Record<string, boolean>>({});
        const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

        const [newTaskTitle, setNewTaskTitle] = useState("");
        const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>("Medium");
        const [newTaskDueDate, setNewTaskDueDate] = useState("");
        const [taskSubmitting, setTaskSubmitting] = useState(false);

        const fetchTasksForProject = async (projectId:string):Promise<void> => {
            if (!projectId)
                return;

            setTaskLoading(prev => ({ ...prev, [projectId]: true }));

            try {

                const task = await getTasksByProject(projectId);

                setTaskByProjectId(prev => ({ ...prev, [projectId]: task }));

            } catch (error) {
                toast.error("Failed to load the task");
            } finally {
                setTaskLoading(prev => ({ ...prev, [projectId]: false }));
            }
        }

        const toggleProjectExpand = async (projectId:string | null):Promise<void> => {
            if (expandedProjectId === projectId || !projectId) {
                setExpandedProjectId(null);
                return;
            }
            setExpandedProjectId(projectId);

            if (!taskByProjectId[projectId])
                fetchTasksForProject(projectId);
        }

        const handleCreateTask = async (projectId:string) => {
            if (!projectId)
                return;
            setTaskSubmitting(true);

            try {
                await createTask({
                    projectId,
                    title: newTaskTitle,
                    priority: newTaskPriority,
                    dueDate: newTaskDueDate || undefined,
                });

                toast.success("Task created");

                await fetchTasksForProject(projectId);


        } catch (error: any) {

            const mess = error?.response?.data?.message ?? error?.message ?? "Failed to create task";
            toast.error(mess);

        } finally {
            setTaskSubmitting(false);
            setNewTaskTitle("");
            setNewTaskPriority("Medium");
            setNewTaskDueDate("");
        }
    };

    const handleUpdateTask = async (taskId:string, updates:Partial<Task>, projectId:string):Promise<void> => {
        if (!taskId)
            return;

        try {
            await updateTask(taskId, updates);
            await fetchTasksForProject(projectId);
        } catch (error) {

        }
    }

    const handleDeleteTask = async (taskId:string, projectId:string) => {
        if (!taskId)
            return;
        if (!confirm("Delete this task?"))
            return;

        try {
            await deleteTask(taskId);
            await fetchTasksForProject(projectId);
        } catch (error) {
            toast.error("Failed to delete the task")
        }
    }

    useEffect(() => {

        const fetchUser = async () => {
            setLoading(true);

            try {

                const res = await getCurrentUser()
                setUser(res);

            } catch (error) {
                setError("❌ Failed to fetch user. Please try later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

    }, []);
    
    const fetchClients = async () => {
        try {
            const res = await getClients();
            setClients(res);

        } catch (error) {
            toast.error("❌ Failed to fetch clients.")

        } finally {
            setClientsLoading(false);

        }

    }
    useEffect(() => {
         fetchClients();

    }, []);
    const fetchProject = async () => {
        setProjectLoading(true);

        try {
            const projects=await getProjects();
            setProject(projects);

        } catch (error) {
            toast.error("Error occured");
            setProjectLoading(false);

        } finally {
            setProjectLoading(false);
        }
    }



    useEffect(() => {
        fetchProject();
    }, []);//note-> dependecy list empty means only will run 1 time when dashboard is rendered

    if (loading)
        return <div className="p-4">⏳ Loading your dashboard...</div>

    if (error)
        return <div className="p-4 text-red-600">{error}</div>


    const formatDate = (dateString?:string):string => {
        if (!dateString) return "-";
        return new Date(dateString).toISOString().split("T")[0]; // YYYY-MM-DD
    };

    const handleSubmit = async (): Promise<void> => {

     setSubmiting(true);

        try {
            await createProject({
                clientId,
                title,
                description,
                startDate,
                dueDate,
                status,
                budget: Number(budget),
            });
   

            toast.success("✅ Project created succesfully !");

            await fetchProject();

        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to create Project";
            toast.error(message);
        }
        finally {
            setSubmiting(false);
        }
        setTitle("");
        setClientId("");
        setBudget("");
        setStartDate("");
        setDueDate("");
        setDescription("");
        setStatus("planned")
    }

    
    


    return (
        <div className="p-6 max-w-2xl mx-auto">

            <h1 className="text-2xl font-bold mb-2">📋 Welcome back! {user?.name}</h1>
        
           
            <button
                onClick={() => {

                    toast.success("Logged out!");

                    setTimeout(() => {

                        localStorage.removeItem("devmate-token");
                        window.location.href = "/login";

                    }, 300);
                }

                }

                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                🚪 Logout
            </button>

            <ClientCard
            clientsLoading={clientsLoading}
            clients={clients}
            fetchClients={fetchClients}
            />


            <h2 className="text-xl font-semibold mt-6 mb-2">Projects </h2>
            <div>
                <button onClick={()=>setOpenProjectModal(true)}
                    className="px-4 py-2 mt-3 mb-4 rounded-lg text-white bg-blue-500 hover:bg-blue-700">
                        + Add Project
                </button>
                <CreateProjectModal
                    isOpen={isModalOpen}
                    onClose={()=>{setOpenProjectModal(false)}}
                    handleSubmit={handleSubmit}
                    title={title}
                    setTitle={setTitle}
                    status={status}
                    setStatus={setStatus}
                    clientId={clientId}
                    setClientId={setClientId}
                    clients={clients}
                    budget={budget}
                    setBudget={setBudget}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    description={description}
                    setDescription={setDescription}
                    submiting={submiting}
                />
            </div>
            {
                (projectLoading) ? (<p>⏳ Loading projects...</p>)
                    : (projects.length == 0) ? (<p>No Projects yet</p>)
                        : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    projects.map(project => (
                                        <ProjectCard
                                            key={project._id}
                                            project={project}
                                            formatDate={formatDate}
                                            taskByProjectId={taskByProjectId}
                                            expandedProjectId={expandedProjectId}
                                            handleUpdateTask={handleUpdateTask}
                                            handleDeleteTask={handleDeleteTask}
                                            toggleProjectExpand={toggleProjectExpand}
                                            newTaskTitle={newTaskTitle}
                                            setNewTaskTitle={setNewTaskTitle}
                                            newTaskPriority={newTaskPriority}
                                            setNewTaskPriority={setNewTaskPriority}
                                            newTaskDueDate={newTaskDueDate}
                                            setNewTaskDueDate={setNewTaskDueDate}
                                            handleCreateTask={handleCreateTask}
                                            taskSubmitting={taskSubmitting}
                                            taskLoading={taskLoading}
                                            setEditingProject={setEditingProject}
                                            fetchTasksForProject={fetchTasksForProject}
                                            fetchProject={fetchProject}  
                                        />


                                    ))
                                }
                            </div>
                        )
            }

            {editingProject && (
                <div className="fixed inset-0 bg-black bg-opacity flex item-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Edit Project
                        </h2>

                        <form onSubmit={async (e) => {
                            e.preventDefault();

                            try {
                                await updateProject(editingProject._id, editingProject);

                                toast.success("✅ Project updated!");

                                await fetchProject();
                            } catch (error) {
                                toast.error("❌ Failed to update project.");
                                console.log(error);

                            } finally {
                                setEditingProject(null);
                            }
                        }}
                            className="grid grid-cols-1 gap-4">

                            <input
                                type="text"
                                value={editingProject.title}
                                onChange={(e) => { setEditingProject({ ...editingProject, title: e.target.value }) }}
                                className="p-2 border rounded"
                            />

                            <textarea
                                value={editingProject.description}
                                onChange={(e) => { setEditingProject({ ...editingProject, description: e.target.value }) }}
                                className="p-2 border rounded "
                            ></textarea>

                            <input
                                type="number"
                                value={editingProject.budget || ""}
                                onChange={(e) => {
                                    setEditingProject({ ...editingProject, budget: e.target.value ? Number(e.target.value) : undefined });
                                }}
                                className="p-2 border rounded" />

                            <select
                                value={editingProject.status}
                                onChange={(e) => {
                                    setEditingProject({ ...editingProject, status:isProjectStatus(e.target.value) ? e.target.value : "planned" });

                                }}
                                className="p-2 border rounded"
                            >
                                <option value="">Select status</option>
                                <option value="planned">Planned</option>
                                <option value="in-progress">Active</option>
                                <option value="completed">Completed</option>
                                <option value="on-hold">On Hold</option>
                            </select>

                            <div className="flex-gap-2">
                                <button type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded">
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingProject(null);

                                    }}
                                    className="px-4 py-2 bg-red-300 rounded">Cancel</button>
                            </div>

                        </form>

                    </div>
                </div>
            )}
        </div>);
}