import Hero from "@/components/Home/Hero";
import Templates from "@/components/Home/Templates";
import { apiv1 } from "./config/api";

export default function Home() {
  const fetchData = async () => {
    try {
      const res = await fetch(apiv1 + "/health");
      if (!res.ok) {
        throw new Error("API is dead");
      }
      const data = await res.json();
      console.log("log:", data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
  return (
    <>
      <Hero />
      <Templates />
    </>
  );
}
