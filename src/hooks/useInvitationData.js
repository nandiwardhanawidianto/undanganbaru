// src/hooks/useInvitationData.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function useInvitationData() {
  const { slugId } = useParams(); // otomatis ambil dari route /:slugId
  const slug = slugId || "default";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug === "default") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
<<<<<<< HEAD

        const API_URL = `https://cms.royalweddinginvitiation.com/api/slug/${slug}/listapi`;
        //  const API_URL = `http://127.0.0.1:8000/api/slug/${slug}/listapi`;
=======
        const API_URL = `http://cms.royalweddinginvitiation.com/api/slug/${slug}/listapi`;
>>>>>>> 35b44a53bb8c2b7f31ebaa642da9f0df72d9a10b
        const response = await fetch(API_URL, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();

        if (result?.success && result?.data) {
          setData(result.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        setError(err.message || "Fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return {
    slug,
    data,
    loading,
    error,
    theme: data?.slug?.theme || "Default", // <-- ambil theme langsung di sini
    heroData: data?.heroInvitation || null,
    acarasData: data?.acaras || [],
    galeriData: data?.galeri || [],
    lovegiftData: data?.lovegift || [],
    countingData: data?.counting || null,
  };
}
