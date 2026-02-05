import axios from "./axios";

export const fetchUserAppointments = async () => {
  const res = await axios.get("/user/appointments?limit=5");
  return res.data;
};
