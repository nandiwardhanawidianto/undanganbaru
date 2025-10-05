import { useState, useEffect } from "react";

export default function useInvitationData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ambil slug dari URL, contoh: domain.com/nandimia → slug = nandimia
  const pathParts = window.location.pathname.split("/").filter(Boolean);
const slug = pathParts[0] || "default";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/slug/${slug}/listapi`);
        if (!res.ok) throw new Error("Gagal mengambil data dari server");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, slug };
}
