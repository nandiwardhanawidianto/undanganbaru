export default function Mempelai({ data }) {
  const hero = data?.heroInvitation || {};

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
              Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasangan-pasangan.
              Tanpa mengurangi rasa hormat, dengan ini kami bermaksud mengundang
              Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami :
            </p>

            <br />

            {/* Mempelai Pria */}
            <div className="text-center mb-8">
              <div className="w-48 h-60 rounded-[100px] overflow-hidden border-4 border-ungu-500/50 shadow-lg mx-auto mb-4">
                <img
                  src={hero?.foto_pria || ""}
                  alt="Mempelai Pria"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-male.png';
                  }}
                />
              </div>
              <h3 className="text-2xl mb-2 font-bold text-ungu-500">
                {hero.nama_panggilan_pria || "Nama Pria"}
              </h3>
              <p className="text-lg">{hero.orangtua_pria || "Orangtua Pria"}</p>
            </div>

            {/* & Tanda */}
            <div className="text-5xl font-cursive font-bold">&</div>

            {/* Mempelai Wanita */}
            <div className="text-center mt-8">
              <div className="w-48 h-60 rounded-[100px] overflow-hidden border-4 border-ungu-500/50 shadow-lg mx-auto mb-4">
                <img
                  src={hero?.foto_wanita || ""}
                  alt="Mempelai Wanita"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-female.png';
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-ungu-500">
                {hero.nama_panggilan_wanita || "Nama Wanita"}
              </h3>
              <p className="text-lg">{hero.orangtua_wanita || "Orangtua Wanita"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}