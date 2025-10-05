import { useState, useEffect } from "react";

export default function Mempelai() {
  const [data, setData] = useState({
    foto_pengantin_1: "",
    nama_pengantin_1: "",
    deskripsi_pengantin_1: "",
    foto_pengantin_2: "",
    nama_pengantin_2: "",
    deskripsi_pengantin_2: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/mempelai")
      .then((res) => res.json())
      .then((result) => {
        if (!result.error) {
          setData(result);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <section id="mempelai" className="relative min-h-screen">
      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Konten Mempelai */} 
      <div className="relative z-10 min-h-screen flex items-start justify-center pt-20 p-6">
        <div className="text-center text-black max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Mempelai</h2>

          {/* Kotak Putih Transparan */}
          <div className="bg-white/40 backdrop-blur-sm rounded-[100px] p-8 border border-white/30 mb-12">
            <p className="text-sm leading-relaxed mt-3 font-display3">
              Maha Suci Allah SWT yang telah menciptakan makhluk-Nya
              berpasangan-pasangan. Tanpa mengurangi rasa hormat, dengan ini kami
              bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara
              pernikahan kami :
            </p>
            <br />

            {/* Mempelai Pria */}
            <div className="text-center mb-8">
              <div className="w-48 h-60 rounded-[100px] overflow-hidden border-4 border-ungu-500/50 shadow-lg mx-auto mb-4">
                <img
                  src={`http://localhost:8080/uploads/${data.foto_pengantin_1}`}
                  alt="Mempelai Pria"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl mb-2 font-bold text-ungu-500">
                {data.nama_pengantin_1}
              </h3>
              <p className="text-lg">{data.deskripsi_pengantin_1}</p>
            </div>

            {/* & Tanda */}
            <div className="text-5xl font-cursive font-bold">&</div>

            {/* Mempelai Wanita */}
            <div className="text-center mt-8">
              <div className="w-48 h-60 rounded-[100px] overflow-hidden border-4 border-ungu-500/50 shadow-lg mx-auto mb-4">
                <img
                  src={`http://localhost:8080/uploads/${data.foto_pengantin_2}`}
                  alt="Mempelai Wanita"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-ungu-500">
                {data.nama_pengantin_2}
              </h3>
              <p className="text-lg">{data.deskripsi_pengantin_2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
