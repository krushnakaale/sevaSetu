// src/api/emergency.js
import api from "./axios";

// 🆘 SOS
export const sendSOS = async (payload) => {
  const { data } = await api.post("/emergency/sos", payload);
  return data;
};

// 📍 Share location
export const shareLiveLocation = async (payload) => {
  const { data } = await api.post("/emergency/share-location", payload);
  return data;
};
