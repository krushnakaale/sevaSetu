import axios from "axios";

export const createOrder = async (orderData) => {
  const { data } = await axios.post("/api/orders", orderData);
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await axios.get(`/api/orders/${id}`);
  return data;
};
