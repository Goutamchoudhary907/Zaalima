// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
      } catch (error) {
        console.error("Unauthorized or error fetching home:", error);
        localStorage.removeItem("token");
        navigate("/signin");
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Home</h1>
      <p className="mt-2">{message}</p>
    </div>
  );
}
