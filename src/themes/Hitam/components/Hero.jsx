import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import sageAnim from "../assets/lottie/UndanganHitam.json";

export default function Hero({ data }) {
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

  const lottieRef = useRef(null); `
  
  
  
  
  6960
  
  696091`
  const [showText, setShowText] = useState(false);
  const timerRef = useRef(null);
  const startedRef = useRef(false); // mencegah double-start

  useEffect(() => {
    const anim = lottieRef.current;

    // handler ketika anim selesai
    const onComplete = () => {
      // kalau anim selesai lebih cepat dari timer, tampilkan teks segera
      clearTimeout(timerRef.current);
      setShowText(true);
    };

    // handler utk event global userInteraction (dari Modal)
    const handleStart = () => {
      // hindari multiple start
      if (startedRef.current) return;
      startedRef.current = true;

      // jika ref anim terpasang, mulai animasi
      if (anim && typeof anim.goToAndPlay === "function") {
        try {
          anim.goToAndPlay(0, true);
        } catch (e) {
          // fallback ke play kalau perlu
          try { anim.play(); } catch (e2) {}
        }
      }

      // 
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowText(true);
      }, 6000);
    };

    // pasang listeners jika anim instance ada
    if (anim && typeof anim.addEventListener === "function") {
      anim.addEventListener("complete", onComplete);
    }

    // dengarkan event global
    window.addEventListener("userInteraction", handleStart);

    // jika event userInteraction sempat dipicu sebelum listener ini terpasang,
    // kita cek flag global (Modal nanti kita set flag itu) — fallback
    if (window.__userInteractionTriggered) {
      // beri tick singkat supaya ref sudah stabil
      setTimeout(handleStart, 20);
    }

    return () => {
      window.removeEventListener("userInteraction", handleStart);
      if (anim && typeof anim.removeEventListener === "function") {
        anim.removeEventListener("complete", onComplete);
      }
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Lottie Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={sageAnim} 
          loop={false}
          autoplay={false}
          className="w-full h-full  md:max-w-[800px] lg:max-w-[1000px]"
        />
      </div>

      {/* Konten utama — tampilkan hanya setelah showText true */}
      {showText && (
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-full">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
              <motion.h1
                className="text-lg md:text-2xl text-hitam-500 mb-4 mt- font-semibold tracking-wider font-judul uppercase"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                The Wedding Of
              </motion.h1>

              <motion.div
                className="flex flex-col items-center text-center text-4xl italic font-display text-hitam-500 gap-y-2 mb-6"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <span>{hero.nama_panggilan_pria || "Loading..."}</span>
                <span className="text-3xl mx-4">&amp;</span>
                <span>{hero.nama_panggilan_wanita || ""}</span>
              </motion.div>

              <motion.div
                className="text-2xl italic font-display text-hitam-500 mb-8"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {tanggalFormatted}
              </motion.div>

              <motion.a
                href="#"
                className="inline-flex items-center gap-3 text-hitam-500 px-8 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-hijau-700/50 border-2 border-hitam-500 hover:bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCalendarCheck className="text-lg" />
                <span className="text-xl">Save The Date</span>
              </motion.a>

              <motion.div
                className="mt-8 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <FaChevronDown className="text-2xl text-hitam-500 mb-2 animate-bounce" />
                <span className="text-xl text-hitam-500 shadow-sm">Scroll Down</span>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
