import axios from "axios";
import errorHandle from "../api/error";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

if (!backendBaseUrl) {
  console.error('VITE_BACKEND_BASE_URL is not defined in the environment');
}

const Api = axios.create({
  baseURL: backendBaseUrl  || 'https://coursatech-backend.onrender.com/api',
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return errorHandle(error);
    } else {
      console.log("axios error:", error);
    }
    return Promise.reject(error);
  }
);

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default Api;
