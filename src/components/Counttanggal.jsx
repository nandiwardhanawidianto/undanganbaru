import BG from "/fotowedding1.png";
import bungaatas from "../assets/Bungaatas.png";
import { useState, useEffect } from "react";

export default function Counttanggal({ data }) {
  const acara = data?.acaras?.[0] || {}; // ambil acara pertama
  const targetDateStr = acara?.tanggal_acara; // PERBAIKAN: gunakan tanggal_acara

  // PERBAIKAN: Sekarang carousel_atas adalah ARRAY
  let bgUrl = BG; // fallback default
  
  if (data?.galeri?.[0]?.carousel_atas) {
    const carouselAtas = data.galeri[0].carousel_atas;
    
    // Cek jika carousel_atas adalah array dan tidak kosong
    if (Array.isArray(carouselAtas) && carouselAtas.length > 0) {
      // Ambil gambar pertama dari array
      bgUrl = carouselAtas[0];
    }
    // Fallback untuk handle data lama (string)
    else if (typeof carouselAtas === 'string' && carouselAtas.startsWith('http')) {
      bgUrl = carouselAtas;
    }
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // PERBAIKAN: Gunakan tanggal_acara dari acara
    if (!targetDateStr) {
      console.log('❌ No target date found, using fallback');
      // Fallback ke tanggal default jika tidak ada
      const fallbackDate = "2025-11-11";
      const target = new Date(`${fallbackDate}T00:00:00`);
      
      const interval = setInterval(() => {
        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          clearInterval(interval);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(interval);
    }

    const target = new Date(`${targetDateStr}T00:00:00`);

    if (isNaN(target)) {
      console.log('❌ Invalid target date:', targetDateStr);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Debug data
  console.log('🔍 Counttanggal data:', {
    acara: data?.acaras?.[0],
    tanggal_acara: data?.acaras?.[0]?.tanggal_acara,
    galeri: data?.galeri?.[0],
    carousel_atas: data?.galeri?.[0]?.carousel_atas,
    carousel_atas_type: typeof data?.galeri?.[0]?.carousel_atas,
    carousel_atas_is_array: Array.isArray(data?.galeri?.[0]?.carousel_atas),
    bgUrl: bgUrl
  });

  return (
    <section
      id="counttanggal"
      className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-ungu-500 to-white"
    >
      {/* Background Bunga Atas */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-0">
        <img
          src={bungaatas}
          alt="Bunga Atas"
          className="w-full max-w-4xl opacity-80"
        />
      </div>

      {/* Card Container */}
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/30 mt-32 mb-12">
        {/* Image Section */}
        <div className="w-full h-96 relative">
          <img
            src={bgUrl}
            alt="Card background"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              console.error('❌ Error loading countdown image:', bgUrl);
              e.target.src = BG; // fallback ke default
            }}
            onLoad={(e) => {
              console.log('✅ Countdown image loaded successfully:', bgUrl);
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Judul dari API */}
          <h2 className="text-base text-center text-black mb-4">
            {data?.counting?.surat_arab || "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم"}
          </h2>

          {/* Deskripsi dari API */}
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.deskripsi_surat || "Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang"}
          </p>
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.nama_surat || "Al-Fatihah"}
          </p>

          {/* Countdown Box */}
          <div className="flex justify-center gap-3 mb-6">
            {[
              { value: timeLeft.days, label: "Hari" },
              { value: timeLeft.hours, label: "Jam" },
              { value: timeLeft.minutes, label: "Menit" },
              { value: timeLeft.seconds, label: "Detik" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-ungu-500 border rounded-lg shadow-sm p-3 min-w-[70px]">
                  <div className="text-xl font-bold text-white">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}