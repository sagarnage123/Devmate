import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const api=axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig)=>{
        const token=localStorage.getItem("devmate-token");

        if(token)
            config.headers.Authorization=`Bearer ${token}`;


        return config;
    }
        ,
   
    (error:AxiosError)=>{

        return Promise.reject(error);

    },
);

api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error:AxiosError)=>{
        if(error.response?.status===401)
        {
            localStorage.removeItem("devmate-token");

            toast.error("⚠️ Session expired. Please log in again.");
            setTimeout(()=>{
                window.location.href="/login";
            },400);
        }
        return Promise.reject(error);

    }
);


export default api;