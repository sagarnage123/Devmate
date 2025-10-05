import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { formToJSON } from "axios";
import { Link } from "react-router-dom";


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

        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Login to your account</h2>

        
        <form onSubmit={handleLogin}
        className="space-y-5">

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                        />
          </div>

          <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter the password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                        />
          </div>

           <button type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition-all">Submit</button>

    </form>
        <p className="text-center text-sm text-gray-600 mt-4">Don't have an account? 
                    <Link to="/register" className="hover:text-black hover:underline"> Sign up</Link>
        </p>
            </div>
        </div>

    );
}