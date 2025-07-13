// services/profileService.js
import axios from "axios";
import ENDPOINTS from "../Routes";

export const getProfileService = async () => {
  console.log("LOGIN ENDPOINT:", ENDPOINTS.GET_PROFILE);

  const res = await axios.get(ENDPOINTS.GET_PROFILE, {
    withCredentials: true,
  });

  return res.data;
};
