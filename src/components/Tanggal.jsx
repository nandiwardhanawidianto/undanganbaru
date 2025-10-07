import bgtanggal from "../assets/bg2.png";
import { SiGooglemaps } from "react-icons/si";
import { TbMapSearch } from "react-icons/tb";

export default function Tanggal({ data }) {
  // Langsung ambil acaras dari props data
  const acaras = data?.acaras || [];
  if (acaras.length === 0) {
    return (
      <section id="tanggal" className="p-10 text-center text-gray-500">
        Tidak ada data acara.
      </section>
    );
  }

  return (
    <section
      id="tanggal"
      className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-ungu-500 to-white"
    >
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {acaras.map((acara) => (
          <div
            key={acara.id}
            className="relative w-full h-90 rounded-[150px] overflow-hidden border-ungu-500 border-4 shadow-lg"
          >
            <img
              src={bgtanggal}
              alt={`Background ${acara.nama_acara}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center text-ungu-500">
                <h2 className="text-3xl font-bold mb-4">{acara.nama_acara}</h2>
                <p className="text-lg font-bold leading-relaxed">
                  {acara.tanggal_acara}
                </p>
                <p className="text-base leading-relaxed">
                  Pukul {acara.pukul_acara}
                </p>
                <div className="mt-6 flex flex-col items-center">
                  <SiGooglemaps className="w-8 h-8 mb-2" />
                  Bertempat di<br />
                  {acara.alamat_acara}
                </div>
                {acara.link_acara && (
                  <div className="mt-6">
                    <a
                      href={acara.link_acara}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-ungu-500 text-white font-medium py-2 px-6 rounded-full mx-auto"
                    >
                      <TbMapSearch className="text-xl" />
                      <span>Google Maps</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}