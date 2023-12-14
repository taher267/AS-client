import axios from "axios";

export const baseURL =
import.meta.env.MODE === "development"
    ? "http://localhost:4001/api/v1"
    : "https://pz-attendance.onrender.com/api/v1";

// export const baseURL = "https://api1.convertmybankstatement.com/api/v1";
// const baseURL = "https://cmbs.onrender.com/api/v1";
export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});