import axios from "axios";

import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";
/*
 * Base URL
 *
 * Priority:
 * 1. VITE_API_BASE_URL from .env
 * 2. Current backend URL
 */
import { REST_API_URL } from "../config/api";

const BASE_URL = REST_API_URL;

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

/*
 * Request interceptor
 * Authentication will be added later.
 */
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/*
 * Response interceptor
 * Refresh token handling will be added
 * when Authentication module is implemented.
 */
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized request.");
        }

        if (error.response?.status === 403) {
            console.warn("Forbidden request.");
        }

        if (error.response?.status === 500) {
            console.error("Internal server error.");
        }

        return Promise.reject(error);
    }
);

export default api;