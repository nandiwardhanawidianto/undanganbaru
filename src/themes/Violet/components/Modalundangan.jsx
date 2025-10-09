import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Pigura from "/pigura.png";
import BG from "../assets/BG.png";
import { motion } from "framer-motion";

export default function ModalUndangan({ data, onBukaUndangan }) {
  const [isClosing, setIsClosing] = useState(false);

  // Ambil nama tamu dari URL (?to=Nama)
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to") || "Tamu Undangan";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBuka = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // Mulai animasi keluar: slide-up + fade-out
    setIsClosing(true);

    // Tunggu durasi animasi lalu panggil onBukaUndangan()
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("userInteraction"));
      onBukaUndangan();
    }, 650); // cocokkan dengan durasi transition di bawah (0.6s)
  };

  const hero = data?.heroInvitation || {};
  const acara = data?.acaras?.[0] || {};
  const tanggalAcara = acara?.tanggal_acara;
  const tanggalFormatted = tanggalAcara
    ? new Date(tanggalAcara).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const bgUrl = hero.background_photo || BG;

  // CONTAINER: initial={false} supaya gak ada animasi masuk global
  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex items-center justify-center`}
      initial={false}
      animate={isClosing ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />

      {/* Konten utama (tidak di-wrap dengan entry animation) */}
      <div className="relative z-10 text-center text-white max-w-md mx-4">
        <div className="relative">
          {/* Pigura: tampil langsung (tidak mengganggu teks) */}
          <img src={Pigura} alt="Pigura" className="w-auto h-[600px] mt-10" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* The Wedding Of - fade in (stagger manual via delay) */}
            <motion.div
              className="text-ungu-500 text-2xl mb-2 mt-10"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
            >
              <span>The Wedding Of</span>
            </motion.div>

            {/* Nama Pengantin - muncul setelah "The Wedding Of" */}
            <motion.div
              className="text-4xl italic font-display text-ungu-500 mt-3 leading-relaxed"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.55, ease: "easeOut" }}
            >
              <span className="block text-center">
                {hero.nama_panggilan_pria || "Loading..."}
                <br />
                <span className="text-3xl my-2">&amp;</span>
                <br />
                {hero.nama_panggilan_wanita || ""}
              </span>
            </motion.div>

            {/* Kepada Yth + nama tamu */}
            <motion.div
              className="mt-8 mb-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.45, ease: "easeOut" }}
            >
              <p className="text-lg text-ungu-500">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="text-2xl italic text-ungu-500 mt-2">{namaTamu}</p>
            </motion.div>

            {/* Tombol Buka Undangan */}
            <motion.button
              onClick={handleBuka}
              className="text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto border-white border-2 bg-ungu-500"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.45, ease: "easeOut" }}
            >
              <FaHeart />
              Buka Undangan
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
