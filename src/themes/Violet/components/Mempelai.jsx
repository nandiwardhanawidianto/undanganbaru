import { motion } from "framer-motion";

export default function Mempelai({ data }) {
  const hero = data?.heroInvitation || {};

  return (
    <section id="mempelai" className="relative min-h-screen">
      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Konten Mempelai */}
      <div className="relative z-10 min-h-screen flex items-start justify-center pt-20 p-6">
        <motion.div
          className="text-center text-black max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Mempelai
          </motion.h2>

          {/* Kotak Putih Transparan */}
          <motion.div
            className="bg-white/40 backdrop-blur-sm rounded-[100px] p-8 border border-white/30 mb-12"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm leading-relaxed mt-3 font-display3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasangan-pasangan.
              Tanpa mengurangi rasa hormat, dengan ini kami bermaksud mengundang
              Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami :
            </motion.p>

            <br />

            {/* Mempelai Pria */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-48 h-60 rounded-[100px] overflow-hidden border-4 border-ungu-500/50 shadow-lg mx-auto mb-4"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.img
                  src={hero?.foto_pria || ""}
                  alt="Mempelai Pria"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-male.png";
                  }}
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              <motion.h3
                className="text-2xl mb-2 font-bold text-ungu-500"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {hero.nama_panggilan_pria || "Nama Pria"}
              </motion.h3>
              <motion.p
                className="text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {hero.orangtua_pria || "Orangtua Pria"}
              </motion.p>
            </motion.div>

            {/* & Tanda */}
            <motion.div
              className="text-5xl font-cursive font-bold text-ungu-600"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              &
            </motion.div>

            {/* Mempelai Wanita */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-48 h-60 rounded-[100px] overflow-hidden border-4 border-ungu-500/50 shadow-lg mx-auto mb-4"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.img
                  src={hero?.foto_wanita || ""}
                  alt="Mempelai Wanita"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-female.png";
                  }}
                  initial={{ opacity: 0, scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, duration: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              <motion.h3
                className="text-2xl font-bold mb-2 text-ungu-500"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {hero.nama_panggilan_wanita || "Nama Wanita"}
              </motion.h3>
              <motion.p
                className="text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {hero.orangtua_wanita || "Orangtua Wanita"}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
