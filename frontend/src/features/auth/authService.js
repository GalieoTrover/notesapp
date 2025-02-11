// import { toast, Slide } from "react-toastify";
import axiosInstance from "../../app/axiosCore";
import { USERS_POINT } from "../../app/constants";

import { successToast, errorToast } from "../../components/ReactToastEmitters";

const register = async (userData) => {
  try {
    const response = await axiosInstance.post(USERS_POINT, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.token));
    }

    return response.data;
  } catch (error) {
    if (error) {
      errorToast(error.message);
    }
  }
};

const login = async (userData) => {
  try {
    const response = await axiosInstance.post(USERS_POINT + "logins", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.token));
    }

    successToast(response.data.message);
    return response.data;
  } catch (error) {
    if (error) {
      errorToast(error.message);
    }
  }
};

const logout = () => {
  localStorage.removeItem("user");
  successToast("Logout successful");
};

const authService = { register, login, logout };

export default authService;
