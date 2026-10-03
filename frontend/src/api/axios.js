import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://placement-hub-pink.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;