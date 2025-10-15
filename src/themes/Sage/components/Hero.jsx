import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";
import Pigurafoto from "../assets/pigurahero.png";
import Pohon from "../assets/PohonHijau1.png";
import PohonKiri from "../assets/Pohonhijaukiri.png";
import bgHero from "../assets/BG.png";
import { motion } from "framer-motion";

export default function Hero({ data }) {
  const hero = data?.heroInvitation || {};

  const acara = data?.acaras?.[0] || {}; // ambil acara pertama
  const tanggalAcara = acara?.tanggal_acara;
  const tanggalFormatted = tanggalAcara
    ? new Date(tanggalAcara).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Background - Layer 1 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgHero})` }}
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
        <div className="absolute inset-0 bg-ungu-900 bg-opacity-20" />
      </div>

      {/* Konten utama - Layer 5 */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-full">
          
          {/* Pigura besar di belakang */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img 
              src={Pigurafoto} 
              alt="Pigura" 
              className="max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain" 
            />
          </motion.div>

          {/* Semua tulisan di depan pigura */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
            {/* The Wedding Of */}
            <motion.h1
              className="text-lg md:text-2xl text-coklat-500 mb-4 font-semibold tracking-wider font-judul uppercase"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
            >
              The Wedding Of
            </motion.h1>

            {/* Nama Pengantin */}
            <motion.div
              className="flex flex-col items-center text-center text-4xl italic font-display text-coklat-500 gap-y-2 mb-6"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
            >
              <span>{hero.nama_panggilan_pria || "Loading..."}</span>
              <span className="text-3xl mx-4">&amp;</span>
              <span>{hero.nama_panggilan_wanita || ""}</span>
            </motion.div>

            {/* Tanggal Acara */}
            <motion.div
              className="text-2xl italic font-display text-coklat-500 mb-8"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
            >
              {tanggalFormatted}
            </motion.div>

            {/* Tombol Save the Date */}
            <motion.a
              href="#"
              className="inline-flex items-center gap-3  text-coklat-500 px-8 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-ungu-900/50 border-2 border-coklat-500 hover:bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarCheck className="text-lg" />
              <span className="text-xl">Save The Date</span>
            </motion.a>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <FaChevronDown className="text-2xl text-white mb-2 animate-bounce" />
          <span className="text-xl text-white shadow-sm">Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
}