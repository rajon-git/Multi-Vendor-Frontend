import axios from "axios";
import { useAuthStore } from "../store/auth";

export const login = (email, password) =>{
    try {
        const {data, status} = axios.post("user/token/", {
            email,
            password
        })

        if(status === 200){
            setAuthUser(data.access, data.refresh)
        }
        return {data, error: null}
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.detail || "Error occurred while trying to login"
        }
    }
}