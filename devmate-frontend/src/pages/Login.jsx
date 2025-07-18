import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin=async (e)=>{
        e.preventDefault();

        try {

            const res = await axios.post("http://localhost:5000/api/users/login",{
                email,
                password
            }, { withCredentials:true});

            console.log(res.data);
            navigate("/dashboard");
            
        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");
            
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            required

            />

            <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
            required
            />

            <button type="submit">Login</button>

        </form>
    );
}