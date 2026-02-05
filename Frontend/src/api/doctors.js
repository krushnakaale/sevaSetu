import axios from "./axios";

export const getDoctors = async (params = {}) => {
  const res = await axios.get("/doctor/all", { params });
  return res.data;
};
