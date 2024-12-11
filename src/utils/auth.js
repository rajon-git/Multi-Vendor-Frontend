import axios from "axios";
import { useAuthStore } from "../store/auth";

export const login = async (email, password) =>{
    try {
        const {data, status} = await axios.post("user/token/", {
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

export const register = async (full_name, email, phone, password, password2) => {
    try {
        const {data} =  await axios.post("user/register", {
            full_name,
            email,
            phone,
            password,
            password2
        })

        await login(email, password)
        return {data, error: null}
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.detail || "Error occurred while trying to register"
        }
    }
}

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    useAuthStore.getState().setUser(null)
}