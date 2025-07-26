import React, { useEffect } from "react";
import axios from "axios";

export default function Dashboard() {

    useEffect(() => {

        const fetchUser = async () => {
            const token = localStorage.getItem("devmate-token");

            if (!token) {
                console.warn("Token not found,User not logged in");
                return;
            }

            try {
                const res = await axios.get("/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                console.log("Loged in user details", res.data);

            } catch (error) {
                console.log("Error fetching user", error);
            }
        };

        fetchUser();

    }, []);


    return (<div>📋 Welcome to Dashboard</div>);
}