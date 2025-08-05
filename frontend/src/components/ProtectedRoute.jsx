import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const token=localStorage.getItem("devmate-token");

    if(!token)
    {
        console.warn("Unothorized access . Redirecting to Login...");
        return <Navigate to="/login" replace />
    }

    return children;
}