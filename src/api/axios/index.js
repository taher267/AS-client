import axios from "axios";

export const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4001"
    : "https://pz-attendance.onrender.com";
const urlV1 = `${baseURL}/api/v1`;

// export const baseURL = "https://api1.convertmybankstatement.com/api/v1";
// const baseURL = "https://cmbs.onrender.com/api/v1";
export default axios.create({
  baseURL: `${urlV1}`,
});

export const axiosPrivate = axios.create({
  baseURL: `${urlV1}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
