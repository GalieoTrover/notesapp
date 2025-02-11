import axios from "axios";

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json; charset=utf-8",
};

const config = {
  headers: defaultHeaders,
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: config.headers,
});

/* intercepters to add token */
axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = JSON.parse(localStorage.getItem("user"));

    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => console.log(error)
);

export default axiosInstance;
