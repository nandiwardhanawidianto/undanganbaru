import { useState, useEffect } from "react";

export default function useInvitationData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const slug = pathParts[0] || "default";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_URL = `http://localhost:8000/api/slug/${slug}/listapi`;
        console.log('🔄 Fetching from:', API_URL);

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        console.log('📡 Response Status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Full API Response:', result);

        // PERBAIKAN: Simpan result.data saja, bukan result
        if (result && result.success && result.data) {
          console.log('✅ Data structure:', result.data);
          setData(result.data); // HANYA result.data
        } else {
          throw new Error('Invalid response structure');
        }
        
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { 
    data, // Sekarang data langsung berisi result.data
    loading, 
    error, 
    slug,
    // Helper functions
    heroData: data?.heroInvitation || null,
    acarasData: data?.acaras || [],
    galeriData: data?.galeri || [],
    lovegiftData: data?.lovegift || [],
    countingData: data?.counting || null
  };
}