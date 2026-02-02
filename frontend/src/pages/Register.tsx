// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios, { formToJSON } from "axios";
// import toast from "react-hot-toast";

// export default function Register(){

//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [confirmPassword,setConfirmPassword]=useState("");
//     const [name,setName]=useState("");
//     const navigate=useNavigate();

//     const handleRegister=async (e)=>{

//         e.preventDefault();

//         if(password !==confirmPassword)
//         {
//             toast.error("Password and confirm passsword are not same");
//             return;
//         }

//         try {
//             const res = await axios.post("/api/users/register",{
//                 name,
//                 email,
//                 password
//             }, { withCredentials:true});

//             const token = res.data.token;

//             if (token)
//                 localStorage.setItem("devmate-token", token);

           
//             navigate("/dashboard");
            
//         } catch (error) {
//             console.log(error.response?.data?.message || "Register Failed");
//         }

//     };


//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-100">
//             <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8 ">
//                 <h2 className="text-2xl font-semibold mb-6 text-center ">Create a new account</h2>

        
//         <form onSubmit={handleRegister}
//         className="space-y-5">

//             <div>
//                 <label className="block text-gray-700 mb-2" >Name</label>
//                         <input
//                             type="text"
//                             value={name}
//                             placeholder="Enter your name"
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                             className="w-full text-gray-500 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//             </div>

//         <div>
//             <label className="block text-gray-700 mb-2">Email</label>

//           <input 
//           type="email"
//           value={email}
//           placeholder="Enter your email"
//           onChange={(e)=>
//             setEmail(e.target.value)
//         }
//         required
//         className="w-full rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
//         />
//         </div>

//         <div>
//             <label className="block text-gray-700 mb-2">Password</label>

//           <input 
//           type="password"
//           value={password}
//           placeholder="Enter the password"
//           onChange={(e)=>setPassword(e.target.value)}
//           required
//           className="border w-full rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
//           />


//           </div>

//           <div>
//                         <label className="block text-gray-700 mb-2">Confirm Password</label>
//             <input type="password"
//             value={confirmPassword}
//             onChange={(e)=>{setConfirmPassword(e.target.value)}} 
//             placeholder="Confirm Password"
//             required
//             className="w-full border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
//             />
//           </div>

//            <button type="submit"
//            className="w-full border rounded-lg bg-blue-500 text-white px-4 py-2 mt-6 hover:bg-blue-700 transition-all" >Submit</button>
//     </form>
//     <p className=" text-sm text-gray-700 text-center mt-4">Already have an account?
        
//                     <Link to="/login" className="hover:text-black hover:underline"> Login</Link>
//     </p>
//             </div>
//         </div>

//     );
// }

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
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Create a new account
                </h2>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter the password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Submit
                    </button>
                </form>

                <p className="text-sm text-gray-700 text-center mt-4">
                    Already have an account?
                    <Link
                        to="/login"
                        className="hover:text-black hover:underline ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
