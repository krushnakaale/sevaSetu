import { useEffect } from "react";
import axiosInstance from "../../api/axios";
import Hero from "./Hero";

export default function HomePage() {
  useEffect(() => {
    axiosInstance
      .get("/")
      .then((res) => {
        console.log("BACKEND RESPONSE 👉", res.data);
      })
      .catch((err) => {
        console.error("BACKEND ERROR ❌", err);
      });
  }, []);
  return (
    <>
      <Hero />
    </>
  );
}
