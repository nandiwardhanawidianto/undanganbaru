import { useEffect } from "react";
import { gsap } from "gsap";
import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";

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

  useEffect(() => {
    const svgObject = document.getElementById("bgHeroSvg");

    const handleLoad = () => {
      const svgDoc = svgObject?.contentDocument;
      if (!svgDoc) return;

      // Ambil elemen berdasarkan ID di SVG
      const pohonKiri = svgDoc.getElementById("PohonKiri");
      const pohonKanan = svgDoc.getElementById("PohonKanan");

      // Buat timeline animasi
      const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power3.out" } });

      // Animasi slide masuk dari sisi kiri dan kanan
      if (pohonKiri)
        tl.fromTo(
          pohonKiri,
          { x: "-80%", opacity: 0 },
          { x: "-2%", opacity: 1, duration: 1.8 },
          0
        );

      if (pohonKanan)
        tl.fromTo(
          pohonKanan,
          { x: "100%", opacity: 0 },
          { x: "80%", opacity: 1, duration: 1.8 },
          0
        );
    };

    svgObject.addEventListener("load", handleLoad);
    return () => svgObject.removeEventListener("load", handleLoad);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Background SVG */}
      <object
        id="bgHeroSvg"
        data="/themes/Brown/assets/Bgatas.svg"
        type="image/svg+xml"
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay (opsional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

      {/* Konten Utama */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
            <h1 className="text-lg md:text-2xl text-coklat-500 mb-4 font-semibold tracking-wider font-judul uppercase">
              The Wedding Of
            </h1>

            <div className="flex flex-col items-center text-center text-4xl italic font-display text-coklat-500 gap-y-2 mb-6">
              <span>{hero.nama_panggilan_pria || "Loading..."}</span>
              <span className="text-3xl mx-4">&amp;</span>
              <span>{hero.nama_panggilan_wanita || ""}</span>
            </div>

            <div className="text-2xl italic font-display text-coklat-500 mb-8">
              {tanggalFormatted}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-3 text-coklat-500 px-8 py-2 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl border-2 border-coklat-500 hover:bg-white"
            >
              <FaCalendarCheck className="text-lg" />
              <span className="text-xl">Save The Date</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center animate-fade-in">
          <FaChevronDown className="text-2xl text-white mb-2 animate-bounce" />
          <span className="text-xl text-white shadow-sm">Scroll Down</span>
        </div>
      </div>
    </section>
  );
}
