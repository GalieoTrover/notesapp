import axiosInstance from "../../app/axiosCore";
import { USERS_POINT } from "../../app/constants";

const register = async (userData) => {
  const response = await axiosInstance.post(USERS_POINT, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axiosInstance.post(USERS_POINT + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };

export default authService;
