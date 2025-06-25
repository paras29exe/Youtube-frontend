import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_BACKEND_URL + "/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

export default AxiosInstance