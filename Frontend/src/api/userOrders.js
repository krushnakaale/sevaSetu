import axios from "./axios";

export const fetchUserOrders = async () => {
  const res = await axios.get("/user/orders?limit=5");
  return res.data;
};
