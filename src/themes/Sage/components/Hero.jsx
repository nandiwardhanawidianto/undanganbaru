import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sageAnim from "../assets/lottie/sageanim.json";

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
      {/* Lottie Animation - Layer 2 */}
     <div className="absolute inset-0 flex items-center justify-center">
        <Lottie
          animationData={sageAnim}
          loop={false}
          autoplay={true}
           className="w-full h-auto max-w-[500px] md:max-w-[800px] lg:max-w-[1000px]"
           transition={{ delay: 4, duration: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Konten utama - Layer 6 */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-full">
          {/* Tulisan di depan pigura */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
            <motion.h1
              className="text-lg md:text-2xl text-coklat-500 mb-4 font-semibold tracking-wider font-judul uppercase"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 8, duration: 1, ease: "easeInOut" }}
            >
              The Wedding Of
            </motion.h1>

            <motion.div
              className="flex flex-col items-center text-center text-4xl italic font-display text-coklat-500 gap-y-2 mb-6"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 8, duration: 1.5, ease: "easeInOut" }}
            >
              <span>{hero.nama_panggilan_pria || "Loading..."}</span>
              <span className="text-3xl mx-4">&amp;</span>
              <span>{hero.nama_panggilan_wanita || ""}</span>
            </motion.div>

            <motion.div
              className="text-2xl italic font-display text-coklat-500 mb-8"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 8, duration: 0.8, ease: "easeInOut" }}
            >
              {tanggalFormatted}
            </motion.div>

            <motion.a
              href="#"
              className="inline-flex items-center gap-3  text-coklat-500 px-8 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-ungu-900/50 border-2 border-coklat-500 hover:bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 8, duration: 0.6, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarCheck className="text-lg" />
              <span className="text-xl">Save The Date</span>
            </motion.a>
          </div>
        </div>

        {/* Scroll Down */}
        <motion.div
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8, duration: 0.6 }}
        >
          <FaChevronDown className="text-2xl text-coklat-500 mb-2 animate-bounce" />
          <span className="text-xl text-coklat-500 shadow-sm">Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
}
