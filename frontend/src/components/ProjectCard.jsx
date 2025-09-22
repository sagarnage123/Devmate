import React from "react";

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
                            toast.success(" Project deleted succefully");

                        } catch (error) {
                            toast.error(error?.data?.message || "❌ Failed to delete the project");
                        }

                    }}>
                    Delete
                </button>
                {
                    expandedProjectId === project._id && (
                        <div className="border-t mt-3 pt-3 space-y-3">
                            {taskLoading[project._id] ? (<p>⏳ Loading tasks...</p>)
                                : (taskByProjectId[project._id] || []).length == 0 ? (<p className="text-sm text-gray-500">No tasks yet for this project.</p>)
                                    : (
                                        <ul className="space-y-2">

                                            {
                                                (taskByProjectId[project._id] || []).map(task => (
                                                    <li key={task._id}
                                                        className="p-2 border rounded flex justify-between item-start">
                                                        <div className="font-medium">
                                                            {task.title}
                                                        </div>

                                                        <div className="text-xs text-gray-500">
                                                            Priority {"=>"} {task.priority} Due {formatDate(task.dueDate)}
                                                        </div>
                                                        <div className="flex item-centre gap-2">

                                                            <select value={task.status}
                                                                onChange={(e) => { handleUpdateTask(task._id, { status: e.target.value }, project._id) }}
                                                                className="p-1 border rounded text-sm">
                                                                <option value="todo">todo</option>
                                                                <option value="in-progress">in-progress</option>
                                                                <option value="done">done</option>
                                                            </select>

                                                            <button onClick={() => handleDeleteTask(task._id, project._id)}
                                                                className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </li>
                                                ))

                                            }

                                        </ul>
                                    )
                            }

                            <div className="mt-2 p-2 border rounded">

                                <h4 className="font-semibold text-sm mb-2">Add a task</h4>
                                <input type="text"
                                    value={newTaskTitle}
                                    placeholder="Task title"
                                    onChange={(e) => { setNewTaskTitle(e.target.value) }}
                                    className="w-full p-2 border rounded mb-2" />

                                <div className="flex-gap-2 mb-2">
                                    <select
                                        value={newTaskPriority}
                                        onChange={(e) => { setNewTaskPriority(e.target.value) }}
                                    >
                                        <option value="low">low</option>
                                        <option value="medium">medium</option>
                                        <option value="high">high</option>
                                    </select>
                                    <input type="date"
                                        value={newTaskDueDate}
                                        onChange={(e) => { setNewTaskDueDate(e.target.value) }} />

                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleCreateTask(project._id)} disabled={taskSubmitting} className="px-3 py-1 bg-green-500 text-white rounded">
                                        {taskSubmitting ? "Creating..." : "Add Task"}
                                    </button>
                                    <button onClick={() => { setNewTaskTitle(""); setNewTaskPriority("medium"); setNewTaskDueDate(""); }} className="px-3 py-1 bg-gray-200 rounded">
                                        Reset
                                    </button>
                                </div>

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
}