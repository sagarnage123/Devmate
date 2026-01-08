import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ReactNode } from "react";

interface ProtectedRouteProps{
    children:ReactNode;
}

export default function ProtectedRoute({children}:ProtectedRouteProps){
    const token=localStorage.getItem("devmate-token");
    
    if(!token)
    {
        console.warn("Unothorized access . Redirecting to Login...");
        toast.error("You're not logged in.. Redirecting to Login..");
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
}
