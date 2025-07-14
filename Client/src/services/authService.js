import axios from "axios";
import ENDPOINTS from "../Routes";
console.log(ENDPOINTS.LOGIN);

export const loginService = async (formdata) => {
  const res = await axios.post(ENDPOINTS.LOGIN, formdata, {
    withCredentials: true,
  });
  return res.data;
};
