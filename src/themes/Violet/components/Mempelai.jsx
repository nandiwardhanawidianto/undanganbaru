import { motion } from "framer-motion";
import bunga from "../assets/pigurabungaungu.png";

export default function Mempelai({ data }) {
  const hero = data?.heroInvitation || {};

  return (
    <section
      id="mempelai"
      className="relative min-h-screen flex items-center justify-center p-6"
    >
      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-white rounded-t-3xl rounded-b-2xl shadow-xl p-8 md:p-12 text-center text-black"
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
          Maha Suci Allah SWT yang telah menciptakan makhluk-Nya
          berpasangan-pasangan. Dengan rasa hormat, dengan ini kami bermaksud
          mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami:
        </motion.p>

        <br />

        {/* === MEMPELAI PRIA === */}
        <motion.div
          className="text-center mb-8 relative inline-block"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative w-48 h-72 mx-auto mb-4 flex justify-center">
            {/* Bingkai foto */}
            <motion.div
              className="relative z-10 overflow-hidden border-4 border-ungu-500 shadow-md shadow-black/30 rounded-t-full w-full h-full"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.img
                src={hero?.foto_pria || ""}
                alt="Mempelai Pria"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/placeholder-male.png")}
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* Bunga di bawah bingkai */}
            <motion.img
              src={bunga}
              alt="Dekorasi bunga"
              className="absolute bottom-[-25px] w-[200px] sm:w-[200px] z-20 pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>

          <h3 className="text-3xl mb-2 font-bold text-ungu-500 pt-4">
            {hero.nama_lengkap_pria || "Nama Pria"}
          </h3>
          <p className="text-lg">{hero.orangtua_pria || "Orangtua Pria"}</p>
        </motion.div>

        {/* Simbol & */}
        <motion.div
          className="text-5xl font-cursive font-bold text-ungu-500"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          &
        </motion.div>

        {/* === MEMPELAI WANITA === */}
        <motion.div
          className="text-center mt-8 relative inline-block"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative w-48 h-72 mx-auto mb-4 flex justify-center">
            {/* Bingkai foto */}
            <motion.div
              className="relative z-10 overflow-hidden border-4 border-ungu-500 shadow-md shadow-black/30 rounded-t-full w-full h-full"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.img
                src={hero?.foto_wanita || ""}
                alt="Mempelai Wanita"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/placeholder-female.png")}
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* Bunga di bawah bingkai */}
            <motion.img
              src={bunga}
              alt="Dekorasi bunga"
              className="absolute bottom-[-25px] w-[180px] sm:w-[200px] z-20 pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </div>

          <h3 className="text-3xl font-bold mb-2 text-ungu-500 pt-4">
            {hero.nama_lengkap_wanita || "Nama Wanita"}
          </h3>
          <p className="text-lg">{hero.orangtua_wanita || "Orangtua Wanita"}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
