import axios from 'axios';
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from './auth'; // Import authentication-related functions
import { API_BASE_URL } from './constants'; // Import the base API URL
import Cookies from 'js-cookie'; // Import the 'js-cookie' library for managing cookies

const useAxios = () => {

    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    axiosInstance.interceptors.request.use(async (req) => {
        if (!isAccessTokenExpired(accessToken)) {
            return req; 
        }

        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    });

    return axiosInstance; 
};

export default useAxios; 