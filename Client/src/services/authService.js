// src/services/authService.js
import axios from "axios";
import ENDPOINTS from "../Routes";

export const loginService = async (formData) => {
  console.log("LOGIN ENDPOINT:", ENDPOINTS.LOGIN);

  const res = await axios.post(ENDPOINTS.LOGIN, formData, {
    withCredentials: true,
  });
  console.log(res.data);

  return res.data;
};

export const logoutService = async () => {
  console.log("Logout:", ENDPOINTS.LOGOUT);
  const res = await axios.get(ENDPOINTS.LOGOUT, {
    withCredentials: true,
  });
  console.log(res.data);
};
