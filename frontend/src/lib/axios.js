import axios from "axios";

export const axiosinstance = axios.create({
    baseURL: import.meta.env.MODE==="Development"?"http://localhost:5001/api":"/api",
    withCredentials:true,
}
)