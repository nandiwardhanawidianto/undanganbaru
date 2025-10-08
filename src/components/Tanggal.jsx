import bgtanggal from "../assets/bg2.png";
import { SiGooglemaps } from "react-icons/si";
import { TbMapSearch } from "react-icons/tb";
import { motion } from "framer-motion";

export default function Tanggal({ data }) {
  const acaras = data?.acaras || [];
  if (acaras.length === 0) {
    return (
      <section id="tanggal" className="p-10 text-center text-gray-500">
        Tidak ada data acara.
      </section>
    );
  }

  // Variants reusable
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      id="tanggal"
      className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-ungu-500 to-white"
    >
      <motion.div
        className="flex flex-col gap-10 w-full max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {acaras.map((acara, i) => (
          <motion.div
            key={acara.id}
            className="relative w-full h-90 rounded-[150px] overflow-hidden border-ungu-500 border-4 shadow-lg hover:shadow-2xl transition-all duration-500"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src={bgtanggal}
              alt={`Background ${acara.nama_acara}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div
                className="text-center text-ungu-500"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-3xl font-bold mb-4"
                  variants={fadeUp}
                  custom={1}
                >
                  {acara.nama_acara}
                </motion.h2>

                <motion.p
                  className="text-lg font-bold leading-relaxed"
                  variants={fadeUp}
                  custom={2}
                >
                  {acara.tanggal_acara}
                </motion.p>

                <motion.p
                  className="text-base leading-relaxed"
                  variants={fadeUp}
                  custom={3}
                >
                  Pukul {acara.pukul_acara}
                </motion.p>

                <motion.div
                  className="mt-6 flex flex-col items-center"
                  variants={fadeUp}
                  custom={4}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <SiGooglemaps className="w-8 h-8 mb-2 text-ungu-600" />
                  </motion.div>
                  Bertempat di<br />
                  {acara.alamat_acara}
                </motion.div>

                {acara.link_acara && (
                  <motion.div
                    className="mt-6 flex justify-center"
                    variants={fadeUp}
                    custom={5}
                  >
                    <motion.a
                      href={acara.link_acara}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-ungu-500 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:bg-ungu-600 hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        initial={{ rotate: -30, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        viewport={{ once: true }}
                      >
                        <TbMapSearch className="text-xl" />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        viewport={{ once: true }}
                      >
                        Google Maps
                      </motion.span>
                    </motion.a>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
