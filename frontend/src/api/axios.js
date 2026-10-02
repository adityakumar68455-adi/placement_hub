import axios from "axios";

const api = axios.create({
  baseURL: "https://placement-hub-pink.vercel.app//api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;