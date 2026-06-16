import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Counttanggal from "./components/Counttanggal";
import Mempelai from "./components/Mempelai";
import Tanggal from "./components/Tanggal";
import Galeri from "./components/Galeri";
import Ucapan from "./components/Ucapan";
import Footer from "./components/Footer";
import Lovegift from "./components/Lovegift";
import ModalUndangan from "./components/Modalundangan";
import MusicPlayer from "./components/MusicPlayer";
import bgImage from "./assets/Bg_all.png";

export default function Brownapp({ data }) {
  const [showModal, setShowModal] = useState(true);

  const handleBukaUndangan = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  if (!data)
    return (
      <p className="text-center mt-10 text-white">404...</p>
    );

  return (
    <>
      {/* Modal Awal */}
      {showModal && (
        <ModalUndangan data={data} onBukaUndangan={handleBukaUndangan} />
      )}

      {/* Background Global */}
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Komponen Utama */}
      <Navbar data={data} />
      <MusicPlayer data={data} />
      <Hero data={data} />
      <Counttanggal data={data} />
      <Mempelai data={data} />
      <Tanggal data={data} />
      <Galeri data={data} />
      <Lovegift data={data} />
      <Ucapan slugId={data?.slug?.slug} />
      <Footer data={data} />
    </>
  );
}
