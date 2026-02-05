import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/pharmacy";

export const getPharmacies = async (params = {}) => {
  try {
    const res = await axios.get(`${BASE_URL}/pharmacy/all`, { params });
    return res.data.data;
  } catch (err) {
    console.error(
      "Failed to fetch pharmacies:",
      err.response?.data || err.message,
    );
    return [];
  }
};
