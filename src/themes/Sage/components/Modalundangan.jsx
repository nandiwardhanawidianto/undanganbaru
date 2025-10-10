import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Pigurafoto from "../assets/Group.svg";
import BG from "../assets/BG.png";
import { motion } from "framer-motion";
import Pohon from "../assets/PohonHijau1.png";
import PohonKiri from "../assets/Pohonhijaukiri.png";
import BG2 from "/fotowedding1.png";

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

  const bgUrl = BG;

  // CONTAINER: initial={false} supaya gak ada animasi masuk global
  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex items-center justify-center`}
      initial={false}
      animate={isClosing ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background - Layer 1 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
        <div className="absolute inset-0" />
      </div>

      {/* Pohon Kiri - Layer 2 */}
      <div className="absolute inset-0 z-0">
        <img 
          src={PohonKiri}
          className="absolute top-0 left-0 w-1/3 h-auto object-contain" 
          alt="Pohon Kiri"
        />
        <div className="absolute inset-0 bg-white bg-opacity-10" />
      </div>

      {/* Pohon Kanan - Layer 3 */}
      <div className="absolute inset-0 z-0">
        <img 
          src={PohonKiri}
          className="absolute top-0 right-0 w-1/3 h-auto object-contain scale-x-[-1]" 
          alt="Pohon Kanan"
        />
        <div className="absolute inset-0 bg-white bg-opacity-10" />
      </div>

      {/* Pohon Utama - Layer 4 */}
      <div className="absolute inset-0 z-0">
        <img 
          src={Pohon}
          className="w-full h-full object-bottom object-cover" 
          alt="Pohon Background"
        />
        <div className="absolute inset-0 bg-hijau-900 bg-opacity-20" />
      </div>

      {/* Konten utama - Layer 5 */}
      <div className="relative z-10 text-center text-white max-w-md mx-4">
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Foto dalam pigura dengan masking */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <div 
              className="w-80 h-80 relative"
              style={{
                maskImage: `url(${Pigurafoto})`,
                WebkitMaskImage: `url(${Pigurafoto})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center'
              }}
            >
              <img 
                src={BG2} 
                alt="Foto Wedding" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* The Wedding Of */}
          <motion.div
            className="text-coklat-500 text-2xl mb-4 font-semibold tracking-wider font-judul"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
          >
            <span>The Wedding Of</span>
          </motion.div>

          {/* Nama Pengantin */}
          <motion.div
            className="text-4xl italic font-display text-coklat-500 mb-8 leading-relaxed"
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

          {/* Kepada Yth + nama tamu */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-2xl text-coklat-500 font-medium">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="text-3xl italic text-coklat-500 mt-3 font-semibold">{namaTamu}</p>
          </motion.div>

          {/* Tombol Buka Undangan */}
          <motion.button
            onClick={handleBuka}
            className="text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto border-2 border-white bg-coklat-500 hover:bg-coklat-600 shadow-xl shadow-black/40"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.05, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart/>
            <span className="text-xl">Buka Undangan</span>
          </motion.button>

          {/* Tanggal Acara (opsional) */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-coklat-500 text-sm font-light">
              {tanggalFormatted !== "-" ? tanggalFormatted : ""}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}