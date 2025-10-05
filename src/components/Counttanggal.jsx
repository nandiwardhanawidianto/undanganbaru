import BG from "/fotowedding1.png";
import bungaatas from "../assets/Bungaatas.png";
import { useState, useEffect } from "react";

export default function Counttanggal({ data }) {
  const acara = data?.acaras?.[0] || {}; // ambil acara pertama
  const targetDateStr = acara?.tanggal_acara;

// Ambil gambar background dari CMS
let bgUrl = BG; // fallback default
if (data?.galeri?.[0]?.carousel_atas) {
  try {
    const carouselAtas = JSON.parse(data.galeri[0].carousel_atas);
    if (carouselAtas.length > 0) {
      // base URL CMS kamu (ganti kalau sudah hosting)
      const baseURL = import.meta.env.VITE_CMS_URL || "http://127.0.0.1:8000";
      bgUrl = `${baseURL}/storage/${carouselAtas[0].replace(/\\/g, "/")}`;
    }
  } catch (err) {
    console.error("Error parsing carousel_atas:", err);
  }
}

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!targetDateStr) return;

    const target = new Date(`${targetDateStr}T00:00:00`);

    if (isNaN(target)) return;

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
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Judul dari API */}
          <h2 className="text-base text-center text-black mb-4">
            {data?.counting?.surat_arab}
          </h2>

          {/* Deskripsi dari API */}
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.deskripsi_surat}
          </p>
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.nama_surat}
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
