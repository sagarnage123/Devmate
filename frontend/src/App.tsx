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

import ProjectSettings from "./pages/projects/ProjectWorkspace/ProjectSettings";
import ProjectKanban from "./components/project/ProjectKanban.js";

import Projects from "./pages/projects/Projects.js";
import Invoices from "./pages/invoices/Invoice.js";
import CreateInvoice from "./pages/invoices/CreateInvoice.js";
import InvoiceDetail from "./pages/invoices/InvoiceDetail.js";
import EditInvoice from "./pages/invoices/EditInvoice.js";

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
            <Route path="invoices" element={
                    <ProtectedRoute>
                    <Invoices />
                </ProtectedRoute>
                } />
            <Route path="invoices/create-invoice" element={
                <ProtectedRoute>
                    <CreateInvoice />
                </ProtectedRoute>
            } />
            <Route path="invoices/:invoiceId" element={
                <ProtectedRoute>
                    <InvoiceDetail />
                </ProtectedRoute>
            } />
            <Route path="invoices/edit-invoice/:invoiceId" element={
                <ProtectedRoute>
                    <EditInvoice />
                </ProtectedRoute>
            } />
            <Route path="/projects" element={
                <ProtectedRoute>
                    <Projects />
                </ProtectedRoute>
            } />
            <Route path="/projects/:projectId" element={
                <ProtectedRoute>
                <ProjectLayout />
                </ProtectedRoute>
        }>
                <Route index element={<ProjectOverview />} />
                <Route path="overview" element={<ProjectOverview />} />
                <Route path="tasks" element={<ProjectTasks />} />
                <Route path="notes" element={<ProjectNotes />} />
                <Route path="settings" element={<ProjectSettings />} />
                <Route path="kanban" element={<ProjectKanban />} />

                
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

    );
}