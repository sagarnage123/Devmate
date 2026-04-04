import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProjectLayout from "./pages/projects/ProjectWorkspace/ProjectLayout";
import ProjectOverview from "./pages/projects/ProjectWorkspace/ProjectOverview";
import ProjectTasks from "./pages/projects/ProjectWorkspace/ProjectTasks";
import ProjectNotes from "./pages/projects/ProjectWorkspace/ProjectNotes";
import ProjectInvoices from "./pages/projects/ProjectWorkspace/ProjectInvoices";
import ProjectSettings from "./pages/projects/ProjectWorkspace/ProjectSettings";

export default function App() {
    
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>}
            />
            <Route path="/projects/:projectId" element={
                <ProtectedRoute>
                <ProjectLayout />
                </ProtectedRoute>
        }>
                <Route index element={<ProjectOverview />} />
                <Route path="overview" element={<ProjectOverview />} />
                <Route path="tasks" element={<ProjectTasks />} />
                <Route path="notes" element={<ProjectNotes />} />
                <Route path="invoices" element={<ProjectInvoices />} />
                <Route path="settings" element={<ProjectSettings />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

    );
}