import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        toast.success("Toast is mounted");

        const fetchUser = async () => {
            const token = localStorage.getItem("devmate-token");

            if (!token) {
                console.warn("Token not found,User not logged in");
                setError("🚫 You are not logged in.")
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get("/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                console.log("Response from backend:", res.data);
                setUser(res.data.user);

            } catch (error) {
                if (error.response?.status === 401) {
                    setError("⚠️ Session expired. Please log in again.");
                }
                else setError("❌ Failed to fetch user. Please try later.");
            } finally {
                setLoading(false);
                console.log(user);
            }
        };

        fetchUser();

    }, []);

    if (loading)
        return <div className="p-4">⏳ Loading your dashboard...</div>

    if (error)
        return <div className="p-4 text-red-600">{error}</div>


    return (
        <div className="p-6 max-w-2xl mx-auto">

            <h1 className="text-2xl font-bold mb-2">📋 Welcome back!</h1>
            <p className="text-gray-700">
                Hello,<span className="font-semibold">{user?.name || user?.email}</span>
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

        </div>);
}