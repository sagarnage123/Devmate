import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../api/axios"

export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [clients,setClients]=useState([]);
    const [clientsLoading,setClientsLoading]=useState(true);

    const [projects,setProject]=useState([]);
    const [projectLoading,setProjectLoading]=useState(true);

    const [title,setTitle]=useState("");
    const [clientId,setClientId]=useState("");
    const [budget,setBudget]=useState("");
    const [startDate,setStartDate]=useState("");
    const [dueDate,setDueDate]=useState("");
    const [description,setDescription]=useState("");
    const [submiting,setSubmiting]=useState(false);
    const [status,setStatus]=useState("planned");

    const [editingProject,setEditingProject]=useState(null);

    useEffect(() => {

        const fetchUser = async () => {
            setLoading(true);
           
            try {
                
                const res=await api.get("/users/me");
                setUser(res.data.user);

            } catch (error) {
                 setError("❌ Failed to fetch user. Please try later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

    }, []);

    useEffect(()=>{

        const fetchClients=async ()=>{
            try {
                const res=await api.get("/client");
                // console.log(res.data);

                setClients(res.data.clients);
                
            } catch (error) {
                toast.error("❌ Failed to fetch clients.")
                
            }finally{
                setClientsLoading(false);

            }

        }

        fetchClients();

    },[]);
    const fetchProject = async () => {
        setProjectLoading(true);

        try {
            const res = await api.get("/project");

            setProject(res.data.projects);

        } catch (error) {
            toast.error("Error occured");
            setProjectLoading(false);

        } finally {
            setProjectLoading(false);
        }
    }


    
    useEffect(()=>{
        fetchProject();
    },[]);//note-> dependecy list empty means only will run 1 time when dashboard is rendered

    if (loading)
        return <div className="p-4">⏳ Loading your dashboard...</div>

    if (error)
        return <div className="p-4 text-red-600">{error}</div>

    
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toISOString().split("T")[0]; // YYYY-MM-DD
    };

    const handleSubmit=async (e)=>{
       
        e.preventDefault();
        setSubmiting(true);

        try {
            const res=await api.post("/project",{
                clientId,
                title,
                description,
                startDate,
                dueDate,
                status,
                budget:Number(budget)
            });

            toast.success("✅ Project created succesfully !");

            await fetchProject();
            
        } catch (error) {
            toast.error(error?.message || "Failed to create project.");   
        }
        finally{
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

            <h1 className="text-2xl font-bold mb-2">📋 Welcome back!</h1>
            <h1 className="text-2xl font-bold mb-2">
                Welcome {user?.name}
            </h1>
            <p className="text-gray-700">
                Email is .......<span className="font-semibold">{user?.email}</span>
            </p>

            <button
                onClick={()=>{
                    
                    toast.success("Logged out!");
                    
                    setTimeout(()=>{
                        
                        localStorage.removeItem("devmate-token");
                        window.location.href="/login" ;

                    },300);
                }

                }

                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                🚪 Logout
            </button>

            <h2 className="text-xl font-semibold mt-6 mb-2">Clients</h2>

            {
                (clientsLoading) ? (<p>⏳ Loading clients...</p>)
                    : (clients.length == 0) ? (<p>No clients yet.</p>)
                    :(
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{
                            clients.map(client=>(
                                <div key={client._id} className="p-4 border rounded shadow-sm hover:shadow-md transition">
                                    <h3 className="font-bold">{client.name}</h3>
                                    <p className="text-gray-600">{client.email}</p>
                                    <p className="text-gray-500 text-sm"> Phone :{client.phone || "N/A"}</p>
                                </div>
                            ))
                        }

                        </div>
                    )
            }

            <h2 className="text-xl font-semibold mt-6 mb-2">Projects </h2>
                {
                    (projectLoading) ? (<p>⏳ Loading projects...</p>)
                    : (projects.length==0)?(<p>No Projects yet</p>)
                    :(
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                    projects.map(project => (
                        <div key={project._id} className="p-4 border rounded shadow-sm hover:shadow-md transition">
                            <h3 className="font-bold">Title:{project.title}</h3>
                            <p>Budget: {project.budget != null ? project.budget.toLocaleString() : "-"}</p>
                            <p className="text-gray-500">Start: {formatDate(project.startDate)}</p>
                            <p className="text-gray-500">Due: {formatDate(project.dueDate)}</p>
                            <p className="text-gray-700">Description: {project.description || "No description"}</p>
                            <button onClick={()=> setEditingProject(project)}
                            className="mt-2 px-3 py-1 bg-yellow-500 text-white-rounded"
                            >
                                ✏️ Edit
                            </button>

                        </div>
                    ))
                    }
                    </div>
                    )
                }

                <div>
                    <h2 className="text-xl font-semibold mt-10 mb-4">Create New Project</h2>

                    <form className="grid  grid-cols-1 gap-4 max-w-md" onSubmit={handleSubmit}>

                        <input type="text" placeholder="Project Title"
                        value={title} onChange={(e)=>setTitle(e.target.value)}
                        required
                        className="p-2 border-rounded"

                        />

                        <select value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        className="p-2 border rounded"
                        required
                        >
                            <option value="">Select status</option>
                        <option value="planned">Planned</option>
                        <option value="in-progress">Active</option>
                        <option value="on-hold">On hold</option>
                        <option value="completed">Completed</option>
                        

                        </select>

                        <select value={clientId}
                        onChange={(e)=>setClientId(e.target.value)}
                        className="p-2 border rounded"
                        required
                        >
                            <option value="">Select Client</option>
                            {
                                clients.map(client=>(
                                    <option key={client._id} value={client._id}>
                                    {client.name}
                                    </option>
                                ))
                            }

                        </select>

                        <input type="number" 
                        placeholder="Budget"
                        value={budget}
                        onChange={(e)=>setBudget(e.target.value)}
                        className="p-2 border rounded"
                        />

                        <input type="date"
                        value={startDate}
                        placeholder="Start Date"
                        onChange={(e)=>setStartDate(e.target.value)}
                        className="p-2 border rounded" 
                        />

                        <input type="date"
                        value={dueDate} 
                        placeholder="Due date"
                        onChange={(e)=>setDueDate(e.target.value)}
                        className="p-2 border rounded" />

                        <textarea placeholder="Description" 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        className="p-2 border rounded"
                        ></textarea>

                        <button type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded" disabled={submiting}
                        >{submiting?"Creating project":"Create Project"}</button>


                    </form>
                </div>

                { editingProject && (
                    <div className="fixed inset-0 bg-black bg-opacity flex item-center justify-center">
                        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">
                                Edit Project
                            </h2>

                            <form onSubmit={async (e)=>{
                                e.preventDefault();

                                try {
                                    const res=await api.put(`/project/${editingProject._id}`,editingProject);
                                    toast.success("✅ Project updated!");
                                    
                                    await fetchProject();
                                } catch (error) {
                                    toast.error("❌ Failed to update project.");
                                    console.log(error);
                                    
                                }finally{
                                    setEditingProject(null);
                                }
                            }}
                            className="grid grid-cols-1 gap-4">

                                <input
                                 type="text"
                                 value={editingProject.title}
                                 onChange={(e)=>{setEditingProject({...editingProject,title:e.target.value})}}
                                 className="p-2 border rounded"
                                 />

                                 <textarea 
                                 value={editingProject.description}
                                 onChange={(e)=>{setEditingProject({...editingProject,description:e.target.value})}}
                                 className="p-2 border rounded "
                                 ></textarea>

                                 <input 
                                 type="number"
                                 value={editingProject.budget || ""}
                                 onChange={(e)=>{
                                    setEditingProject({...editingProject,budget:e.target.value});
                                 }}
                                 className="p-2 border rounded" />

                                 <select
                                value={editingProject.status}
                                  onChange={(e)=>{
                                    setEditingProject({...editingProject,status:e.target.value})

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
                                    onClick={()=>{
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