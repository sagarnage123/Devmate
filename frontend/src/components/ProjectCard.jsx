import React from "react";
import TaskList from "./TaskList";
import api from "../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import NoteList from "./NoteList";

// const [noteProjectId,setNoteProjectId]=useState(null);
// const [notes,setNotes]=useState([]);
// const [loadingNotes,setLoadingNotes]=useState(false);
// const [content,setContent]=useState("");
// const [noteCreating,setNoteCreating]=useState(false);

// const fetchNotes=async (projectId)=>{

//     if(!projectId)
//         return;
//     setLoadingNotes(true);

//     try {
//         const res=await api.get(`/notes/${projectId}`);
//         const data=res.data?.notes ?? res?.data  ?? [];
//         console.log(res);
//         setNotes(data);
        
//     } catch (error) {
//         toast.error("Failed to load the notes");
//     }
//     finally{
//         setLoadingNotes(false);
//     }
// }

// const handelCreateNote=async (projectId)=>{
//     if(!projectId || content)
//     {
//         toast.error("Failed to add note");
//         return;
//     }
//     setNoteCreating(true);

//     try {
//         const res=await api.post("/notes",{
//             projectId,
//             content
//         });
//         toast.success("Note added succesfuly")
//         fetchNotes();
        
//     } catch (error) {
//         toast.error("Failed to add note");
//     }
//     finally{
//         setNoteCreating(false);
//     }
// }

// const handelDeleteNote=async (noteId)=>{
//     if(!noteId)
//         return;

//     try {
//         await api.delete(`/notes/${noteId}`);
//         toast.success("Note deleted");
        
//     } catch (error) {
//         toast.error("Failed to delete the note");
        
//     }
// }


// const toggleNoteProjectId=async (projectId)=>{

//     if(!projectId)
//         return ;

//     toggleProjectExpand(null);
//     if(projectId===noteProjectId)
//     {
//         setNoteProjectId(null);
//         return;
//     }
   
//     setNoteProjectId(projectId);
//     console.log(projectId);

//     if(!notes || notes.length==0)
//         fetchNotes(projectId);

// }

export default function ProjectCard({
    project,
    formatDate,
    taskByProjectId,
    expandedProjectId,
    handleUpdateTask,
    handleDeleteTask,
    toggleProjectExpand,
    newTaskTitle,
    setNewTaskTitle,
    newTaskPriority,
    setNewTaskPriority,
    newTaskDueDate,
    setNewTaskDueDate,
    handleCreateTask,
    taskSubmitting,
    taskLoading,
    setEditingProject
}) {
    const [noteProjectId, setNoteProjectId] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loadingNotes, setLoadingNotes] = useState(false);
    const [content, setContent] = useState("");
    const [noteCreating, setNoteCreating] = useState(false);

    const fetchNotes = async (projectId) => {

        if (!projectId)
            return;
        setLoadingNotes(true);

        try {
            const res = await api.get(`/notes/${projectId}`);
            const data = res.data?.notes ?? res?.data ?? [];
            console.log(res);
            setNotes(data);

        } catch (error) {
            toast.error("Failed to load the notes");
        }
        finally {
            setLoadingNotes(false);
        }
    }

    const handelCreateNote = async (projectId,content) => {
        if (!projectId || !content) {
            toast.error("Failed to add note");
            return;
        }
        setNoteCreating(true);

        try {
            const res = await api.post("/notes", {
                projectId,
                content
            });
            toast.success("Note added succesfuly")
            await fetchNotes(projectId);

        } catch (error) {
            toast.error("Failed to add note");
            console.log(error.message || "Hey");
        }
        finally {
            setNoteCreating(false);
        }
    }

    const handelDeleteNote = async (noteId) => {

        if (!noteId)
            return;

        try {
            await api.delete(`/notes/${noteId}`);
            toast.success("Note deleted");
            if(noteProjectId)
                fetchNotes(noteProjectId);
            
        } catch (error) {
            toast.error("Failed to delete the note");
        }
    }


    const toggleNoteProjectId = async (projectId) => {

        if (!projectId)
            return;

        toggleProjectExpand(null);
        if (projectId === noteProjectId) {
            setNoteProjectId(null);
            return;
        }

        setNoteProjectId(projectId);
        console.log(projectId);

        if (!notes || notes.length == 0)
            fetchNotes(projectId);

    }


    return (
        <div key={project._id} className="p-4 border rounded shadow-sm hover:shadow-md transition">

            <h3 className="font-bold">Title:{project.title}</h3>
            <p>Budget: {project.budget != null ? project.budget.toLocaleString() : "-"}</p>
            <p className="text-gray-500">Start: {formatDate(project.startDate)}</p>
            <p className="text-gray-500">Due: {formatDate(project.dueDate)}</p>
            <p className="text-gray-700">Description: {project.description || "No description"}</p>

            <div className="flex-gap-2">
                <button
                    onClick={() => toggleProjectExpand(project._id)}
                    className="mt-2 px-3 py-1 bg-gray-200 rounded text-sm">
                    {expandedProjectId === project._id ? "Hide tasks" : "Show tasks"}
                </button>
                <button
                    onClick={() => toggleNoteProjectId(project._id)}
                    className="mt-2 px-3 py-1 bg-gray-200 rounded text-sm">
                    {noteProjectId === project._id ? "Hide notes" : "Show notes"}
                </button>
                <button onClick={() => setEditingProject(project)}
                    className="mt-2 px-3 py-1 bg-yellow-500 text-white-rounded"
                >
                    ✏️ Edit
                </button>

                <button type="button"
                    className="mt-3 px-3 py-1 bg-red-500 text-white-rounded"
                    onClick={async (e) => {

                        if(!confirm("Sure you want to delete project"))
                            return;

                        try {
                            const res = await api.delete(`/project/${project._id}`);
                            await fetchProject();
                            toast.success("Project deleted succefully");

                        } catch (error) {
                            toast.error(error?.data?.message || "❌ Failed to delete the project");
                        }

                    }}>
                    Delete
                </button>
                {
                    expandedProjectId === project._id && (
                        <TaskList
                        tasks={taskByProjectId[project._id] || []}
                        projectId={project._id}
                        handleCreateTask={handleCreateTask}
                        handleDeleteTask={handleDeleteTask}
                        handleUpdateTask={handleUpdateTask}
                        formatDate={formatDate}
                        setNewTaskDueDate={setNewTaskDueDate}
                        setNewTaskPriority={setNewTaskPriority}
                        setNewTaskTitle={setNewTaskTitle}
                        newTaskDueDate={newTaskDueDate}
                        newTaskPriority={newTaskPriority}
                        newTaskTitle={newTaskTitle}
                        taskSubmitting={taskSubmitting} 
                        taskLoading={taskLoading[project._id]} />

                    )
       
                }
                {
                    noteProjectId===project._id && (
                        <NoteList 
                        handelCreateNote={handelCreateNote}
                        handelDeleteNote={handelDeleteNote}
                        setContent={setContent}
                        loading={loadingNotes}
                        noteCreating={noteCreating}
                        projectId={project._id}
                        content={content}
                        notes={notes}
                        />
                    )
                }

            </div>

        </div>
    );
}