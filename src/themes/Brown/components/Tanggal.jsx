import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { SiGooglemaps } from "react-icons/si";
import { TbMapSearch } from "react-icons/tb";
import bgtanggal from "../assets/BgCount.png";
import bucketbunga from "../assets/bucketbunga.png";

export default function Tanggal({ data }) {
  const acaras = data?.acaras || [];
  const acaraPertama = acaras[0] || {};
  const targetDateStr = acaraPertama?.tanggal_acara || "2025-11-11";

  // === State waktu tersisa ===
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDateStr));

  function getTimeLeft(dateStr) {
    const target = new Date(`${dateStr}T00:00:00`);
    const diff = target - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDateStr)), 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  if (acaras.length === 0) {
    return (
      <section id="tanggal" className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Tidak ada data acara.</p>
      </section>
    );
  }

  return (
    <section
      id="tanggal"
      className="relative min-h-screen flex flex-col items-center justify-center p-6 pb-10 bg-coklat-800"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* === BUNGA ATAS === */}
      <motion.img
        src={bucketbunga}
        alt="Bucket Bunga"
        className="w-full"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      
      {/* === COUNTDOWN SECTION (tanpa kotak krem luar) === */}
      <motion.div
        className="text-center max-w-md w-full mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h3 className="text-white text-3xl font-semibold mb-5"
        >
          Save The Date
        </h3>

        <div className="flex justify-center gap-3">
          <CountBox value={timeLeft.days} label="Hari" />
          <CountBox value={timeLeft.hours} label="Jam" />
          <CountBox value={timeLeft.minutes} label="Menit" />
          <CountBox value={timeLeft.seconds} label="Detik" />
        </div>
      </motion.div>

      {/* === DAFTAR ACARA === */}
      <div className="flex flex-col gap-10 w-full max-w-4xl">
        {acaras.map((acara, i) => (
          <motion.div
            key={acara.id}
            className="relative w-full h-[500px] rounded-full overflow-hidden border-white border-4 shadow-lg hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Background */}
            <motion.img
              src={bgtanggal}
              alt={`Background ${acara.nama_acara}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />

            {/* Isi acara */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div
                className="text-center text-coklat-700 rounded-3xl px-6 py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-3">{acara.nama_acara}</h2>
                <p className="text-lg font-semibold mb-1">
                  {new Date(acara.tanggal_acara).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-lg mb-4">Pukul {acara.pukul_acara}</p>

                <div className="mt-3 flex flex-col items-center text-base">
                  <SiGooglemaps className="text-coklat-700 w-8 h-8 mb-1" />
                  <p>Bertempat di</p>
                  <p className="font-semibold">{acara.alamat_acara}</p>
                </div>

                {acara.link_acara && (
                  <a
                    href={acara.link_acara}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-coklat-500 text-white font-medium py-2 px-6 rounded-full shadow-md hover:bg-coklat-800 hover:shadow-lg transition-all mt-5"
                  >
                    <TbMapSearch className="text-lg" />
                    Google Maps
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* === CountBox dengan bg krem === */
function CountBox({ value, label }) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="bg-krem/90 rounded-xl shadow-md p-3 min-w-[70px] backdrop-blur-sm">
        <div className="text-xl font-bold text-coklat-600">
          {displayValue.toString().padStart(2, "0")}
        </div>
        <div className="text-base text-coklat-600 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}
