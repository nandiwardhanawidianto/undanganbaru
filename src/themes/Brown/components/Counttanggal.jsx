import BG from "/Nonfoto.png";
import bgcount from "../assets/BgCount.png";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function Counttanggal({ data }) {
  const acara = data?.acaras?.[0] || {};
  const targetDateStr = acara?.tanggal_acara;

  // ambil foto background
  let bgUrl = BG;
  if (data?.galeri?.[0]?.carousel_atas) {
    const carouselAtas = data.galeri[0].carousel_atas;
    if (Array.isArray(carouselAtas) && carouselAtas.length > 0) {
      bgUrl = carouselAtas[0];
    } else if (typeof carouselAtas === "string" && carouselAtas.startsWith("http")) {
      bgUrl = carouselAtas;
    }
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDateStr));

  function getTimeLeft(dateStr) {
    const target = new Date(`${dateStr || "2025-11-11"}T00:00:00`);
    const diff = target - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDateStr));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return (
    <section
      id="counttanggal"
      className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden"
      style={{ backgroundImage: `url(${bgcount})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* card utama */}
      <motion.div
        className="relative z-10 max-w-[360px] w-full bg-krem border-4 border-white rounded-[60px] overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Gambar dengan aspect ratio vertikal */}
        <div className="w-full h-80 relative">
          <img
            src={bgUrl}
            alt="Card background"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = BG)}
          />
        </div>

        <div className="p-6 relative z-10">
          <h2 className="text-base text-center text-black mb-4">
            {data?.counting?.surat_arab || "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ"}
          </h2>
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.deskripsi_surat ||
              "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."}
          </p>
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.nama_surat || "Al-(Q.S. Ar-Rum: 21)"}
          </p>
        </div>
      </motion.div>
    </section>
  );
}