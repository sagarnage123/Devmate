import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { formToJSON } from "axios";

export default function Register(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const navigate=useNavigate();

    const handleRegister=async (e)=>{

        e.preventDefault();

        try {
            const res = await axios.post("/api/users/register",{
                name,
                email,
                password
            }, { withCredentials:true});

           
            navigate("/dashboard");
            
        } catch (error) {
            console.log(error.response?.data?.message || "Register Failed");
        }

    };


    return (
        <form onSubmit={handleRegister}>

        <input
         type="String"
         value={name}
         placeholder="Enter your name"
         onChange={(e)=>setName(e.target.value)}
         required
          />

          <input 
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e)=>
            setEmail(e.target.value)
          }
          required
          />

          <input 
          type="password"
          value={password}
          placeholder="Enter the password"
          onChange={(e)=>setPassword(e.target.value)}
          required
           />

           <button type="submit">Submit</button>

    </form>

    );
}