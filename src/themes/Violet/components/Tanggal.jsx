import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { SiGooglemaps } from "react-icons/si";
import { TbMapSearch } from "react-icons/tb";
import bgtanggal from "../assets/bg2.png";
import bucketbunga from "../assets/bunga-01.png";

export default function Tanggal({ data }) {
  const acaras = data?.acaras || [];
  const acaraPertama = acaras[0] || {};
  const targetDateStr = acaraPertama?.tanggal_acara || "2025-11-11";

  // === Format Hari + Tanggal ===
  const formatTanggal = (tanggalStr) => {
    if (!tanggalStr) return "";

    const hariIndo = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const bulanIndo = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const [year, month, day] = tanggalStr.split("-");
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    const namaHari = hariIndo[dateObj.getDay()];
    const namaBulan = bulanIndo[parseInt(month) - 1];

    return `${namaHari}, ${day} ${namaBulan} ${year}`;
  };

  // === Hitung countdown ===
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDateStr));

  function getTimeLeft(dateStr) {
    const [y, m, d] = dateStr.split("-");
    const target = new Date(parseInt(y), parseInt(m) - 1, parseInt(d), 0, 0, 0);

    const diff = target - new Date();
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDateStr));
    }, 1000);

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
      className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-ungu-500"
    >
      {/* Bunga atas */}
      <motion.img
        src={bucketbunga}
        alt="Bucket Bunga"
        className="w-28"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Countdown */}
      <motion.div
        className="text-center max-w-md w-full mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-white text-3xl font-semibold mb-5">Save The Date</h3>

        <div className="flex justify-center gap-3">
          <CountBox value={timeLeft.days} label="Hari" />
          <CountBox value={timeLeft.hours} label="Jam" />
          <CountBox value={timeLeft.minutes} label="Menit" />
          <CountBox value={timeLeft.seconds} label="Detik" />
        </div>
      </motion.div>

      {/* Daftar acara */}
      <div className="flex flex-col gap-10 w-full max-w-4xl">
        {acaras.map((acara, i) => (
          <motion.div
            key={acara.id}
            className="relative w-full h-[500px] rounded-[150px] overflow-hidden border-ungu-600 border-4 shadow-lg"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={bgtanggal}
              alt="bg"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center p-8 text-lg">
              <div className="text-center text-ungu-600 px-6 py-8">
                <h2 className="text-3xl font-bold mb-3">{acara.nama_acara}</h2>

                {/* === Hari + Tanggal tampil di sini === */}
                <p className="text-lg font-semibold mb-1">
                  {formatTanggal(acara.tanggal_acara)}
                </p>

                <p className="text-lg mb-4">
                  Pukul {acara.pukul_acara}
                </p>

                <div className="mt-3 flex flex-col items-center text-lg">
                  <SiGooglemaps className="text-ungu-600 w-10 h-10 mb-1" />
                  <p>Bertempat di</p>
                  <p className="font-semibold">{acara.alamat_acara}</p>
                </div>

                {acara.link_acara && (
                  <a
                    href={acara.link_acara}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 bg-ungu-500 text-white font-medium py-2 px-6 rounded-full shadow-md mt-5"
                  >
                    <TbMapSearch />
                    Google Maps
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* CountBox */
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
    }
  }, [value]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-krem/90 rounded-xl shadow-md p-3 min-w-[70px]">
        <div className="text-xl font-bold text-ungu-600">
          {displayValue.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-ungu-600 mt-1">{label}</div>
      </div>
    </motion.div>
  );
}
