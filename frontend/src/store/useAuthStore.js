import {create} from "zustand";
import { axiosinstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth:async ()=>{
        try {
            const res=await axiosinstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log(`Error in checkAuth :`,error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosinstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account Created Successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosinstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Account LoggedIn Successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    },

    logout:async()=>{
        try{
            await axiosinstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged Out Successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}));