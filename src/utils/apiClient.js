import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://news-api-m05g.onrender.com/api",
  timeout: 5000,
});
