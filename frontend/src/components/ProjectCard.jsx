import React from "react";
import TaskList from "./TaskList";

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

            </div>

        </div>
    );
}