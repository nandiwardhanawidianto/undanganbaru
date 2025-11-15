import BG from "/Nonfoto.png";
import bgcount from "../assets/Bgcount.png";
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
        className="relative z-10 max-w-[360px] w-full bg-white/50 border-4 border-white rounded-t-full rounded-b-2xl overflow-hidden shadow-lg"
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

          {/* COUNTER */}
          <div className="flex justify-center gap-3 mb-6">
            <CounterBox value={timeLeft.days} label="Hari" />
            <CounterBox value={timeLeft.hours} label="Jam" />
            <CounterBox value={timeLeft.minutes} label="Menit" />
            <CounterBox value={timeLeft.seconds} label="Detik" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ==== CounterBox (tetap elegan) ==== */
function CounterBox({ value, label }) {
  const count = useMotionValue(value);
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      const controls = animate(count, value, {
        duration: 0.4,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
      prevValue.current = value;
      return () => controls.stop();
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 15px rgba(147, 51, 234, 0.35)",
      }}
    >
      <motion.div
        className="bg-hijau-500 rounded-lg shadow-md p-2 min-w-[65px] backdrop-blur-sm"
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      >
        <div className="text-xl font-bold text-white">
          {displayValue.toString().padStart(2, "0")}
        </div>
      </motion.div>
      <div className="text-xs text-black mt-1">{label}</div>
    </motion.div>
  );
}