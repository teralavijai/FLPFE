/*
 * Backend Configuration
 */

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ??
    "http://10.4.25.199:8090/api";

export const REST_API_URL = API_BASE_URL;

// Remove trailing /api for websocket endpoint
const WS_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

export const WS_API_URL = WS_BASE_URL
    .replace(/^http:/, "ws:")
    .replace(/^https:/, "wss:");