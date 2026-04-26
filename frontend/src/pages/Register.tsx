
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../api/auth";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export default function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password and confirm password are not the same");
            return;
        }

        try {
            await register({ name, email, password });
            toast.success("Account created successfully");
            navigate("/dashboard");
        } catch (error: unknown) {
            toast.error(getApiErrorMessage(error));
        } 
    };

    return (
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-[#0B0F19] text-white px-4 relative">

           
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 blur-3xl top-[-120px] left-[-120px]" />
                <div className="absolute w-[320px] h-[320px] bg-indigo-500/10 blur-3xl bottom-[-120px] right-[-120px]" />
            </div>

          
            <div className="
        relative z-10
        w-full max-w-md
        bg-[#111827]/90 backdrop-blur-md
        border border-white/10
        rounded-2xl p-8

        shadow-xl shadow-black/40
        animate-[fadeIn_0.6s_ease-out]
        ">

                
                <h2 className="text-xl font-semibold text-center mb-6">
                    Create your account
                </h2>

               
                <form onSubmit={handleRegister} className="space-y-5">

                   
                    <div className="space-y-1">
                        <label className="text-sm text-slate-400">Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
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

                    
                    <div className="space-y-1">
                        <label className="text-sm text-slate-400">Email</label>
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

                        text-sm text-white placeholder:text-slate-500

                        focus:outline-none
                        focus:ring-2 focus:ring-indigo-500/40
                        focus:border-indigo-500/40

                        transition-all duration-200
                        "
                        />
                    </div>

                    
                    <div className="space-y-1">
                        <label className="text-sm text-slate-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter password"
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

                   
                    <div className="space-y-1">
                        <label className="text-sm text-slate-400">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
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
                        Create Account
                    </button>

                </form>

                
                <p className="text-sm text-slate-400 text-center mt-6">
                    Already have an account?
                    <Link
                        to="/login"
                        className="ml-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        Login
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
