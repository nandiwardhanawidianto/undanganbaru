import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import BG from "../assets/BGModalbiru.png";
import { motion } from "framer-motion";

export default function ModalUndangan({ data, onBukaUndangan }) {
  const [isClosing, setIsClosing] = useState(false);

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
    setIsClosing(true);

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("userInteraction")); // 🔔 trigger animasi
      onBukaUndangan();
    }, 650);
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

  const bgUrl = BG;

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex items-center justify-center`}
      initial={false}
      animate={isClosing ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
        <div className="absolute inset-0" />
      </div>

      <div className="relative z-10 text-center text-white max-w-md mb-4 pb-10">
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            className="text-biru-500 text-2xl mb-4 font-semibold tracking-wider font-judul"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
          >
            The Wedding Of
          </motion.div>

          <motion.div
            className="text-4xl italic font-display text-biru-500 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.55, ease: "easeOut" }}
          >
            <span className="block text-center">
              {hero.nama_panggilan_pria || "Mempelai Pria"}
              <span className="text-3xl mx-4 my-2">&</span>
              {hero.nama_panggilan_wanita || "Mempelai Wanita"}
            </span>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-xl text-biru-500 font-medium">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <p className="text-2xl italic text-biru-500 mt-3 font-semibold">
              {namaTamu}
            </p>
          </motion.div>

          <motion.button
            onClick={handleBuka}
            className="text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto border-2 border-white bg-biru-500 hover:bg-biru-500 shadow-xl shadow-black/40"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart />
            <span className="text-xl">Buka Undangan</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
