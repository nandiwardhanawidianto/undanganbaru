import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Pigura from "/pigura.png";
import BG from "../assets/BG.png";

export default function ModalUndangan({ data, onBukaUndangan }) {
  const [isVisible, setIsVisible] = useState(false);

  // Ambil nama tamu dari URL (?to=Nama)
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to") || "Tamu Undangan";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBuka = () => {
    setIsVisible(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("userInteraction"));
      onBukaUndangan();
    }, 500);
  };

  const hero = data?.heroInvitation || {};

  // const tanggalAcara = acara.tanggal_acara; // misal "2025-11-11"
  const acara = data?.acaras?.[0] || {}; // ambil acara pertama
  const tanggalAcara = acara?.tanggal_acara;
  const tanggalFormatted = tanggalAcara
    ? new Date(tanggalAcara).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const bgUrl = hero.background_photo || BG;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bgUrl})`,
        }}
      />

      <div
        className={`relative z-10 text-center text-white max-w-md mx-4 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="relative">
          <img src={Pigura} alt="Pigura" className="w-auto h-[600px] mt-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-ungu-500 text-2xl mb-2 mt-10">
              <span>The Wedding Of</span>
            </div>

            <div className="text-4xl italic font-display text-ungu-500 mt-3 leading-relaxed">
              <span className="block text-center">
                {hero.nama_panggilan_pria || "Loading..."}
                <br />
                <span className="text-3xl my-2">&amp;</span>
                <br />
                {hero.nama_panggilan_wanita || ""}
              </span>
            </div>

            {/* <div className="text-2xl italic font-display text-ungu-500">
              {tanggalFormatted}
            </div> */}

            <div className="mt-8 mb-6">
              <p className="text-lg text-ungu-500">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="text-2xl italic text-ungu-500 mt-2">{namaTamu}</p>
            </div>

            <button
              onClick={handleBuka}
              className="text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto border-white border-2 bg-ungu-500"
            >
              <FaHeart />
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
