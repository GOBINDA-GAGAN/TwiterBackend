import axios, { Axios } from "axios";
import ENDPOINTS from "../Routes";
console.log(ENDPOINTS.LOGIN);

export const loginService = async (formdata) => {
  const res = await axios.post(ENDPOINTS.LOGIN, formdata, {
    withCredentials: true,
  });
  return res.data;
};

export const signupService= async(formdata)=>{
  const res= await axios.post(ENDPOINTS.SIGNUP,formdata,{
    withCredentials:true,
  });
  return res.data;
};
