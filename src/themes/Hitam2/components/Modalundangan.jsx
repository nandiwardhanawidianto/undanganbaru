import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const galleryPhotos = (data) => {
  const g = data?.galeri?.[0] || {};
  return [
    ...(Array.isArray(g.carousel_atas) ? g.carousel_atas : []),
    ...(Array.isArray(g.carousel_bawah) ? g.carousel_bawah : []),
  ].filter(Boolean);
};

export default function ModalUndangan({ data, onBukaUndangan }) {
  const [closing, setClosing] = useState(false);
  const hero = data?.heroInvitation || {};
  const photos = useMemo(() => galleryPhotos(data), [data]);
  const bg = photos[0] || data?.counting?.foto_counting || hero?.foto_pria || hero?.foto_wanita || "/Nonfoto.png";
  const namaTamu = new URLSearchParams(window.location.search).get("to") || "Tamu Undangan";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const open = () => {
    setClosing(true);
    setTimeout(() => {
      window.__userInteractionTriggered = true;
      window.dispatchEvent(new CustomEvent("userInteraction"));
      onBukaUndangan();
    }, 550);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex justify-center bg-[#151515]"
      initial={false}
      animate={closing ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-full w-full max-w-[430px] overflow-hidden border-x-[4px] border-[#b7c873] bg-[#252525]">
        <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/85" />

        <div className="absolute inset-9 border border-dashed border-[#d6aa78]/90" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 text-center text-white">
          <motion.p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
          >
            The Wedding Of
          </motion.p>

          <motion.h1
            className="font-cursive text-6xl leading-[0.95] text-[#d6aa78]"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.65, ease: "easeOut" }}
          >
            {hero?.nama_panggilan_pria || "Mempelai"}
          </motion.h1>

          <motion.div
            className="my-1 font-cursive text-5xl text-[#d6aa78]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
          >
            &amp;
          </motion.div>

          <motion.h1
            className="font-cursive text-6xl leading-[0.95] text-[#d6aa78]"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.65, ease: "easeOut" }}
          >
            {hero?.nama_panggilan_wanita || ""}
          </motion.h1>

          <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm">Kepada Yth.</p>
            <p className="text-sm">Bapak/Ibu/Saudara/i</p>
            <p className="mt-4 text-2xl font-medium">{namaTamu}</p>
          </motion.div>

          <motion.button
            onClick={open}
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#d6aa78] px-6 py-3 text-sm font-semibold text-white shadow-lg"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.55, ease: "easeOut" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaEnvelope />
            Buka Undangan
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
