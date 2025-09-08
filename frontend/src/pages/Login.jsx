import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { formToJSON } from "axios";


export default function Login(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
   
    const navigate=useNavigate();

    const handleLogin=async (e)=>{

        e.preventDefault();

        try {
            const res = await axios.post("/api/users/login",{
                email,
                password
            }, { withCredentials:true});
            const token=res.data.token;

            if(token)
            localStorage.setItem("devmate-token", token);

            // console.log(res?.data);
            navigate("/dashboard");
            
        } catch (error) {
            console.log(error.response?.data?.message || "Login Failed");
        }

    };


    return (
        <form onSubmit={handleLogin}>

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