import axiosInstance from "./axios";

const BASE_URL = "/medicines";

// Get all medicines
export const getAllMedicines = async (params = {}) => {
  const res = await axiosInstance.get(BASE_URL, { params });
  return res.data.data;
};

// Get medicine by ID
export const getMedicineById = async (id) => {
  const res = await axiosInstance.get(`${BASE_URL}/${id}`);
  return res.data.data;
};

// Search medicines
export const searchMedicines = async (query) => {
  const res = await axiosInstance.get(`${BASE_URL}/search`, {
    params: { q: query },
  });
  return res.data.data;
};
