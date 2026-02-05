import axios from "./axios";

export const fetchUserDashboard = async () => {
  try {
    const res = await axios.get("/user/dashboard");
    return res.data;
  } catch (err) {
    console.error("Dashboard API error", err);
    return null;
  }
};
