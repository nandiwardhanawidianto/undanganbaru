import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import BG from "../assets/Bg_all2.png";
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
      window.dispatchEvent(new CustomEvent("userInteraction"));
      onBukaUndangan();
    }, 650);
  };

  const hero = data?.heroInvitation || {};

  return (
    <motion.div
      className="
        fixed inset-0 z-[9999]
        w-full h-[100dvh]
        flex items-center justify-center
        overflow-hidden
      "
      initial={false}
      animate={
        isClosing
          ? {
              opacity: 0,
              y: -40,
            }
          : {
              opacity: 1,
              y: 0,
            }
      }
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden bg-bugis-500">
        <img
          src={BG}
          alt=""
          className="
            absolute
            left-1/2
            top-1/2
            h-full
            w-auto
            min-w-full
            max-w-none
            -translate-x-1/2
            -translate-y-1/2
            object-cover
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative z-10
          w-full
          max-w-md
          px-5
          text-center
          text-white
          -translate-y-[3dvh]
        "
      >
        <div className="flex flex-col items-center justify-center">
          {/* TITLE */}
          <motion.div
            className="
              text-bugis-500
              text-xl
              mb-4
              font-semibold
              tracking-wider
              font-judul
            "
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            The Wedding Of
          </motion.div>

          {/* NAMA MEMPELAI */}
          <motion.div
            className="
              text-3xl
              italic
              font-display
              text-bugis-500
              mb-8
              leading-relaxed
            "
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.6,
              duration: 0.55,
              ease: "easeOut",
            }}
          >
            <span className="block text-center">
              {hero.nama_panggilan_pria || "Mempelai Pria"}

              <span className="text-3xl mx-4 my-2">
                &
              </span>

              {hero.nama_panggilan_wanita || "Mempelai Wanita"}
            </span>
          </motion.div>

          {/* NAMA TAMU */}
          <motion.div
            className="mb-8"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <p
              className="
                text-xl
                text-bugis-500
                font-medium
              "
            >
              Kepada Yth. <br></br> Bapak/Ibu/Saudara/i
            </p>

            <p
              className="
                text-2xl
                italic
                text-bugis-500
                mt-3
                font-semibold
              "
            >
              {namaTamu}
            </p>
          </motion.div>

          {/* BUTTON */}
          <motion.button
            onClick={handleBuka}
            className="
              text-white
              px-5
              py-2
              rounded-full
              font-bold
              flex
              items-center
              gap-3
              mx-auto
              border-2
              border-white
              bg-bugis-500
              shadow-xl
              shadow-black/40
              transition-all
              duration-300
            "
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.2,
              duration: 0.45,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <FaHeart />

            <span className="text-xl">
              Buka Undangan
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}