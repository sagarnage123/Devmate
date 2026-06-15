import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../api/auth";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { Circles } from 'react-loader-spinner'

export default function Login(){

    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);
   
    const navigate=useNavigate();
  
    const handleLogin=async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{

        e.preventDefault();

       try {
            setLoading(true);
            await login({ email, password });
            toast.success("Logged in successfully");
            setTimeout(() => {
                navigate("/projects");
                setLoading(false);
            }, 30000);
 
        } catch (error: unknown) {
            toast.error(getApiErrorMessage(error));
           setLoading(false);
        } 
        finally {
            
        }

    };


    return (
        <div className="min-h-screen  overflow-hidden flex items-center justify-center bg-[#0B0F19]">

           
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 blur-3xl top-[-100px] left-[-100px]" />
                <div className="absolute w-[300px] h-[300px] bg-indigo-500/10 blur-3xl bottom-[-100px] right-[-100px]" />
            </div>
           
            <div className="
        relative
        w-fit sm:w-full max-w-md
        bg-[#111827]/90 backdrop-blur-md
        border border-white/10
        rounded-2xl p-8

        shadow-xl shadow-black/40

        transition-all duration-500 ease-out
        animate-[fadeIn_0.6s_ease-out]
        ">

               
                <h2 className="text-xl font-semibold text-center mb-6 text-white">
                    Welcome back
                </h2>

                
                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    
                    <div className="space-y-1">
                        <label className="text-sm text-slate-400">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
                                w-full px-4 py-2 rounded-lg
                                bg-[#0B0F19]
                                border border-white/10

                                text-sm 
                                text-white
                                 placeholder:text-slate-500

                                focus:outline-none
                                focus:ring-2 focus:ring-indigo-500/40
                                focus:border-indigo-500/40

                                transition-all duration-200
                                "
                        />
                    </div>

                   
                    <div className="space-y-1">
                        <label className="text-sm text-slate-400">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="
                                w-full px-4 py-2 rounded-lg
                                bg-[#0B0F19]
                                border border-white/10

                                text-sm text-white placeholder:text-slate-500

                                focus:outline-none
                                focus:ring-2 focus:ring-indigo-500/40
                                focus:border-indigo-500/40

                                transition-all duration-200
                                "
                        />
                    </div>

                    
                    <button
                        type="submit"
                        className="
                    w-full py-2 rounded-lg text-sm font-medium

                    bg-indigo-500 hover:bg-indigo-400
                    shadow-md shadow-indigo-500/20

                    transition-all duration-200
                    active:scale-[0.97]
                    "
                    >
                        Login
                        {loading && (
                            <span className="ml-2">
                                <Circles
                                    height="80"
                                    width="80"
                                    color="#4fa94d"
                                    ariaLabel="Circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="wrapper-class"
                                    visible={true}
                                />
                            </span>
                        )}
                    </button>

                </form>

                <div
                    className="
        mt-6
        rounded-xl
        border border-indigo-500/20
        bg-indigo-500/5
        sm:p-4
    "
                >
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-sm font-semibold text-white">
                                Demo Workspace
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                                Explore DevMate instantly using the pre-configured recruiter account.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setEmail("demo@devmate.app");
                                setPassword("Demo@123");
                            }}
                            className="
                shrink-0
                rounded-lg
                bg-indigo-500/15
                px-3
                py-2
                text-xs
                font-medium
                text-indigo-300
                transition
                hover:bg-indigo-500/25
            "
                        >
                            Fill
                        </button>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2">
                            <span className="text-slate-400">Email</span>

                            <span className="font-medium text-slate-200">
                                demo@devmate.app
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2">
                            <span className="text-slate-400">Password</span>

                            <span className="font-medium text-slate-200">
                                Demo@123
                            </span>
                        </div>
                    </div>
                </div>

                
                <p className="text-center text-sm text-slate-400 mt-6">
                    Don’t have an account?
                    <Link
                        to="/register"
                        className="ml-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        Sign up
                    </Link>
                </p>

            </div>

            
            <style>
                {`
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px) scale(0.98);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            `}
            </style>

        </div>
    );
}