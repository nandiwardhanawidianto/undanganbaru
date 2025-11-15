import BG from "/Nonfoto.png";
import bungaatas from "../assets/Bungaatas.png";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function Counttanggal({ data }) {
  const acara = data?.acaras?.[0] || {};
  const targetDateStr = acara?.tanggal_acara;

  // ambil foto background
  let bgUrl = BG;
  if (data?.galeri?.[0]?.carousel_atas) {
    const carouselAtas = data.galeri[0].carousel_atas;
    if (Array.isArray(carouselAtas) && carouselAtas.length > 0) {
      bgUrl = carouselAtas[0];
    } else if (typeof carouselAtas === "string" && carouselAtas.startsWith("http")) {
      bgUrl = carouselAtas;
    }
  }
  return (
    <section
      id="counttanggal"
      className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-ungu-500 to-white overflow-hidden"
    >
      {/* bunga atas */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-0">
        <img src={bungaatas} alt="Bunga Atas" className="w-full max-w-4xl opacity-80" />
      </div>

      {/* card utama */}
      <motion.div
        className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mt-32 mb-12 shimmer-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* shimmer overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="w-full h-96 relative">
          <img
            src={bgUrl}
            alt="Card background"
            className="w-full h-full object-cover object-top"
            onError={(e) => (e.currentTarget.src = BG)}
          />
        </div>

        <div className="p-6 relative z-10">
          <h2 className="text-base text-center text-black mb-4">
            {data?.counting?.surat_arab || "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ"}
          </h2>
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.deskripsi_surat ||
              "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."}
          </p>
          <p className="text-gray-700 text-center mb-6">
            {data?.counting?.nama_surat || "Al-(Q.S. Ar-Rum: 21)"}
          </p>
        </div>
      </motion.div>
    </section>
  );
}