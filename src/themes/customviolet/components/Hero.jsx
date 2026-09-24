import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import VioletAnim from "../assets/lottie/Violetanim.json";

export default function Hero({ data }) {
  const hero = data?.heroInvitation || {};
  const acara = data?.acaras?.[0] || {};

  const nama1 = hero?.nama_panggilan_pria || null;
  const nama2 = hero?.nama_panggilan_wanita || null;

  const tanggalAcara = acara?.tanggal_acara;

  const tanggalFormatted = tanggalAcara
    ? new Date(tanggalAcara).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const lottieRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const timerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const anim = lottieRef.current;

    const onComplete = () => {
      clearTimeout(timerRef.current);
      setShowText(true);
    };

    const handleStart = () => {
      // Hindari animasi dimulai lebih dari sekali
      if (startedRef.current) return;

      startedRef.current = true;

      if (anim && typeof anim.goToAndPlay === "function") {
        try {
          anim.goToAndPlay(0, true);
        } catch (e) {
          try {
            anim.play();
          } catch (e2) {}
        }
      }

      // Fallback jika event complete Lottie tidak terpanggil
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setShowText(true);
      }, 13000);
    };

    if (anim && typeof anim.addEventListener === "function") {
      anim.addEventListener("complete", onComplete);
    }

    window.addEventListener("userInteraction", handleStart);

    // Jika userInteraction sudah terjadi sebelum Hero siap
    if (window.__userInteractionTriggered) {
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
          animationData={VioletAnim}
          loop={false}
          autoplay={false}
          className="w-full h-auto max-w-[500px] md:max-w-[800px] lg:max-w-[1000px]"
        />
      </div>

      {/* Konten utama */}
      {showText && (
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-full">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">

              {/* Judul Acara */}
              <motion.h1
                className="text-lg md:text-2xl text-ungu-500 mb-4 font-semibold tracking-wider font-judul uppercase"
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                Acara Burdah
              </motion.h1>

              {/* Nama */}
              {(nama1 || nama2) && (
                <motion.div
                  className="flex flex-col items-center text-center text-4xl italic font-display text-ungu-500 gap-y-2 mb-6"
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  {/* Nama pertama */}
                  {nama1 && (
                    <span>
                      {nama1}
                    </span>
                  )}

                  {/* & hanya muncul kalau ada 2 nama */}
                  {nama1 && nama2 && (
                    <span className="text-3xl mx-4">
                      &amp;
                    </span>
                  )}

                  {/* Nama kedua */}
                  {nama2 && (
                    <span>
                      {nama2}
                    </span>
                  )}
                </motion.div>
              )}

              {/* Tanggal */}
              <motion.div
                className="text-2xl italic font-display text-ungu-500 mb-8"
                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                {tanggalFormatted}
              </motion.div>

              {/* Save The Date */}
              <motion.a
                href="#"
                className="inline-flex items-center gap-3 text-ungu-500 px-8 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-ungu-500/50 border-2 border-ungu-500 hover:bg-white"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <FaCalendarCheck className="text-lg" />

                <span className="text-xl">
                  Save The Date
                </span>
              </motion.a>

              {/* Scroll Down */}
              <motion.div
                className="mt-12 flex flex-col items-center"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <FaChevronDown className="text-2xl text-ungu-500 mb-2 animate-bounce" />

                <span className="text-xl text-ungu-500 shadow-sm">
                  Scroll Down
                </span>
              </motion.div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}