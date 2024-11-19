import axios from "axios";
import Config from "./urlConf.js";

// Axios instance oluştur
const axiosInstance = axios.create({
    baseURL: Config.API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Her istek öncesinde token'ı eklemek için interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // LocalStorage'dan token'ı çek
        const token = localStorage.getItem("accessToken");

        // Token yoksa bile isteği devam ettir, sadece Authorization başlığı eklenmez
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; // İsteği devam ettir
    },
    (error) => Promise.reject(error)
);

// Hataları global olarak yönetmek için response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || "Something went wrong!")
);

export default axiosInstance;