// services/profileService.js
import axios from "axios";
import ENDPOINTS from '../Routes';

export const getProfile = async () => {
  const res = await axios.get(ENDPOINTS.GET_PROFILE, {
    withCredentials: true, // Send cookie
  });
  return res.data;
};
