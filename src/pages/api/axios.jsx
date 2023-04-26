import axios from "axios";
import { getToken } from "../../helper/token";

const api = axios.create({
  baseURL: "https://sms-twox.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: getToken() || null,
  },
});

export default api;
