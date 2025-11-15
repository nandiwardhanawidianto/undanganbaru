import { motion } from "framer-motion";
import bunga from "../assets/Bunga.png";
import cewe from "/Cewe.png";
import laki from "/Laki.png";

export default function Mempelai({ data }) {
  const hero = data?.heroInvitation || {};

  // Gunakan default image kalau foto dari API tidak ada atau kosong
  const fotoPria = hero?.foto_pria && hero.foto_pria.trim() !== "" ? hero.foto_pria : laki;
  const fotoWanita =
    hero?.foto_wanita && hero.foto_wanita.trim() !== "" ? hero.foto_wanita : cewe;

  return (
    <section id="mempelai" className="relative min-h-screen flex items-center justify-center p-6">
      <div className="absolute inset-0" />

      <motion.div
        className="relative z-10 w-full max-w-4xl bg-krem rounded-t-3xl rounded-b-2xl shadow-xl p-8 md:p-12 text-center text-black"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Judul */}
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Mempelai
        </motion.h2>

        {/* Deskripsi */}
        <motion.p
          className="text-sm leading-relaxed mt-3 font-sans text-hijau-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasangan-pasangan.
          Dengan rasa hormat, dengan ini kami bermaksud mengundang
          Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami :
        </motion.p>

        <br />

        {/* Mempelai Pria */}
        <motion.div
          className="text-center mb-8 relative inline-block"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative w-48 h-72 mx-auto mb-4">
            <motion.img
              src={bunga}
              alt="bunga dekoratif"
              className="absolute -bottom-1 -left-1 w-32 rotate-[-25deg] opacity-90 z-0 pointer-events-none"
              style={{ transformOrigin: "bottom left" }}
              initial={{ opacity: 0, scale: 0.95, rotate: -25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -25 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Bingkai foto */}
            <motion.div
              className="relative z-10 overflow-hidden border-4 border-coklat-700 shadow-md shadow-black/30 rounded-full w-full h-full"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.img
                src={fotoPria}
                alt="Mempelai Pria"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = laki)}
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>

          <h3 className="text-3xl mb-2 font-bold text-coklat-700">
            {hero.nama_lengkap_pria || "Nama Pria"}
          </h3>
          <p className="text-lg">{hero.orangtua_pria || "Orangtua Pria"}</p>
        </motion.div>

        {/* Simbol & */}
        <motion.div
          className="text-5xl font-cursive font-bold text-coklat-700"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          &
        </motion.div>

        {/* Mempelai Wanita */}
        <motion.div
          className="text-center mt-8 relative inline-block"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative w-48 h-72 mx-auto mb-4">
            <motion.img
              src={bunga}
              alt="bunga dekoratif"
              className="absolute -bottom-0 -right-0 w-32 rotate-[25deg] opacity-90 z-0 pointer-events-none"
              style={{ transformOrigin: "bottom right" }}
              initial={{ opacity: 0, scale: 0.95, rotate: 25, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 25, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Bingkai foto */}
            <motion.div
              className="relative z-10 overflow-hidden border-4 border-coklat-700 shadow-md shadow-black/30 rounded-full w-full h-full"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.img
                src={fotoWanita}
                alt="Mempelai Wanita"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = cewe)}
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9, duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>

          <h3 className="text-3xl font-bold mb-2 text-coklat-800">
            {hero.nama_lengkap_wanita || "Nama Wanita"}
          </h3>
          <p className="text-lg">{hero.orangtua_wanita || "Orangtua Wanita"}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
