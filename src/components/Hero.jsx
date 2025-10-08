import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";
import Pigura from "/pigura.png";
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.background_photo || bgHero})` }}
      ></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-full">
          {/* 🖼️ Animasi Pigura dari atas ke bawah */}
          <motion.img
            src={Pigura}
            alt="Pigura Dekorasi"
            className="relative z-10 w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[600px] xl:max-w-[700px] h-auto"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
            {/* ✨ The Wedding Of */}
            <motion.h1
              className="text-3xl md:text-4xl text-purple mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
            >
              The Wedding Of
            </motion.h1>

            {/* 💑 Nama Pengantin */}
            <motion.div
              className="flex flex-col items-center text-center text-4xl italic font-display text-ungu-500 gap-y-2"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 1.5, ease: "easeInOut" }}
            >
              <span>{hero.nama_panggilan_pria || "Loading..."}</span>
              <span className="text-3xl">&amp;</span>
              <span>{hero.nama_panggilan_wanita || ""}</span>
            </motion.div>

            {/* 📅 Tanggal Acara */}
            <motion.div
              className="text-2xl italic font-display text-ungu-500 mt-10"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8, ease: "easeInOut" }}
            >
              {tanggalFormatted}
            </motion.div>
          </div>
        </div>

        {/* 🎉 Tombol Save the Date */}
        <motion.a
          href="#"
          className="inline-flex items-center gap-3 bg-white text-purple px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-purple hover:text-white hover:shadow-xl transition-all duration-300 shadow-lg mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6, ease: "easeInOut" }}
        >
          <FaCalendarCheck className="text-lg" />
          Save The Date
        </motion.a>

        <div className="mt-8 sm:mt-12 flex flex-col items-center animate-bounce">
          <FaChevronDown className="text-2xl text-white mb-2" />
          <span className="text-xl text-white">Scroll Down</span>
        </div>
      </div>
    </section>
  );
}
