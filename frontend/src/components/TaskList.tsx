import React,{useState,Dispatch,SetStateAction} from "react";
import { LoaderIcon } from "react-hot-toast";
import TaskEditModal from "./TaskEditModal";
import { Task ,TaskPriority,TaskStatus} from "./../types/Task";
import { isValidPriority } from "../utils/taskGuard";
interface TaskListProps {
    projectId:string;
    tasks: Task[];
    handleCreateTask: (projectId:string) => Promise<void>;
    handleDeleteTask: (taskId:string, projectId:string) => Promise<void>;
    handleUpdateTask: (
        taskId:string, 
        updatedData:Partial<Task>,
        projectId:string) => Promise<void>;
    formatDate: (dateStr?:string) => string;
    setNewTaskDueDate: Dispatch<SetStateAction<string>>;
    setNewTaskPriority: Dispatch<SetStateAction<TaskPriority>>;
    setNewTaskTitle: Dispatch<SetStateAction<string>>;

    newTaskDueDate: string;
    newTaskPriority: TaskPriority;
    newTaskTitle: string;

    taskSubmitting: boolean;
    taskLoading: boolean;

    fetchTasksForProject: (projectId:string) => Promise<void>;

}

export default function TaskList({
        projectId,
        tasks,
        handleCreateTask,
        handleDeleteTask,
        handleUpdateTask,
        formatDate,
        setNewTaskDueDate,
        setNewTaskPriority,
        setNewTaskTitle,
        newTaskDueDate,
        newTaskPriority,
        newTaskTitle,
        taskSubmitting,
        taskLoading,
        fetchTasksForProject

}: TaskListProps) {
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [modalOpen, setModalOpen] = useState(false);

    const isTaskStatus = (v: string): v is TaskStatus =>
        v === "To Do" || v === "in-progress" || v === "done";
    
    return(

    <div className="border-t mt-3 pt-3 space-y-3">
        {(taskLoading) ? (<p>⏳ Loading tasks...</p>)
            : (tasks || []).length == 0 ? (<p className="text-sm text-gray-500">No tasks yet for this project.</p>)
                : (
                    <ul className="space-y-2">

                        {
                            (tasks || []).map(task => (
                                <li key={task._id}
                                    className="p-2 border rounded flex justify-between item-start">
                                    <div className="font-medium">
                                        {task.title}
                                    </div>

                                    {task.description && (
                                        <div className="text-sm text-gray-600">Description :{task.description}</div>
                                    )}


                                    <div className="text-xs text-gray-500 flex flex-wrap gap-4">
                                        <span>Priority: {task.priority} </span>
                                        <span>Due: {formatDate(task.dueDate)} </span>
                                        {task.completedAt && <span>Completed: {formatDate(task.completedAt)} </span>}
                                    </div>
                                    <div className="flex items-center gap-2">

                                        <select value={task.status}
                                            onChange={(e) => {
                                                if(!isTaskStatus(e.target.value)) return;
                                                 handleUpdateTask(task._id, { status: e.target.value}, projectId) }}
                                            className="p-1 border rounded text-sm">
                                            <option value="To Do">To Do</option>
                                            <option value="in-progress">in-progress</option>
                                            <option value="done">done</option>
                                        </select>

                                        <button onClick={() => handleDeleteTask(task._id, projectId)}
                                            className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => {
                                                setEditingTask(task);
                                                setModalOpen(true);
                                            }}
                                            className="px-2 py-1 bg-yellow-500 text-white rounded"
                                        >
                                            ✏️
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

            <div className="flex gap-2 mb-2">
                <select
                    value={newTaskPriority}
                    onChange={(e) => { 
                        if(!isValidPriority(e.target.value))
                            return;

                        setNewTaskPriority(e.target.value) }}
                >
                    <option value="Low">low</option>
                    <option value="Medium">medium</option>
                    <option value="High">high</option>
                </select>
                <input type="date"
                    value={newTaskDueDate}
                    onChange={(e) => { setNewTaskDueDate(e.target.value) }} />

            </div>
            <div className="flex gap-2">
                <button onClick={() => handleCreateTask(projectId)} disabled={taskSubmitting} className="px-3 py-1 bg-green-500 text-white rounded">
                    {taskSubmitting ? "Creating..." : "Add Task"}
                </button>
                <button onClick={() => { setNewTaskTitle(""); setNewTaskPriority("Medium" as TaskPriority); setNewTaskDueDate(""); }} className="px-3 py-1 bg-gray-200 rounded">
                    Reset
                </button>
            </div>

        </div>

        <TaskEditModal 
        task={editingTask}
        isOpen={modalOpen}
        onClose={()=>setModalOpen(false)}
        onSave={async (formData)=>{

                if(!editingTask) return;

            const updates: Partial<Task> = {
                title: formData.title,
                description: formData.description || undefined,
                priority: isValidPriority(formData.priority)
                    ? formData.priority
                    : undefined,
                dueDate: formData.dueDate || undefined,
            };
                await handleUpdateTask(editingTask._id, updates, projectId);
                await fetchTasksForProject(projectId);

                setModalOpen(false);
                setEditingTask(null);
            
        }}
        
        />
    </div>
    );
}