import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../api/auth";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";


export default function Login(){

    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
   
    const navigate=useNavigate();

    const handleLogin=async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{

        e.preventDefault();

       try {
            await login({ email, password });
            toast.success("Logged in successfully");
            navigate("/dashboard");
        } catch (error: unknown) {
            toast.error(getApiErrorMessage(error));
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