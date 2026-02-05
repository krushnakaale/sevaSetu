import axios from "./axios"; // already configured instance

export const createAppointment = async (data) => {
  const res = await axios.post("/appointments", data);
  return res.data;
};

export const getMyAppointments = async () => {
  const res = await axios.get("/appointments/my-appointments");
  return res.data;
};

export const cancelAppointment = async (id, reason) => {
  const res = await axios.put(`/appointments/${id}/cancel`, { reason });
  return res.data;
};

export const rateAppointment = async (id, rating, review) => {
  const res = await axios.post(`/appointments/${id}/rate`, {
    rating,
    review,
  });
  return res.data;
};
