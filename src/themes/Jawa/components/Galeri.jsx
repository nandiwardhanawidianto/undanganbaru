import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import bucketbunga from "../assets/bucketbunga.png";

export default function Galeri({ data }) {
  const [slidesAtas, setSlidesAtas] = useState([]);
  const [slidesBawah, setSlidesBawah] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const [direction1, setDirection1] = useState("right");
  const [direction2, setDirection2] = useState("right");

  const prevDataRef = useRef();

  useEffect(() => {
    if (data === prevDataRef.current) return;
    prevDataRef.current = data;

    if (!data?.galeri || data.galeri.length === 0) {
      setIsLoaded(false);
      setSlidesAtas([]);
      setSlidesBawah([]);
      return;
    }

    const galeri = data.galeri[0];
    const atas = Array.isArray(galeri.carousel_atas) ? galeri.carousel_atas : [];
    const bawah = Array.isArray(galeri.carousel_bawah) ? galeri.carousel_bawah : [];

    setSlidesAtas(atas);
    setSlidesBawah(bawah);
    setIsLoaded(true);
  }, [data]);

  // RULE LOVE STORY – sama seperti tema Violet
  const ls = data?.lovestory || {};

  const loveStorySections = [
    { img: ls.gambar_awal, text: ls.awal_pertemuan, label: "Awal Pertemuan" },
    { img: ls.gambar_hubungan, text: ls.menjalin_hubungan, label: "Menjalin Hubungan" },
    { img: ls.gambar_lamaran, text: ls.lamaran, label: "Lamaran" },
  ];

  const filteredSections = loveStorySections.filter(
    (s) => s.text && s.text.toString().trim() !== ""
  );

  const galeriExists =
    (slidesAtas.length > 0 || slidesBawah.length > 0) && isLoaded;

  const loveStoryTextExists = filteredSections.length > 0;

  // 🔥 Jika galeri kosong & love story kosong → hilang total
  if (!galeriExists && !loveStoryTextExists) return null;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
    }),
  };

  const Carousel = ({ slides, currentSlide, setCurrentSlide, setDirection, title, index }) => {
    if (!slides || slides.length === 0) return null;

    const nextSlide = () => {
      setDirection("right");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
      setDirection("left");
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={index}
        className="mb-12"
      >
        <motion.h3
          className="text-2xl font-bold text-brown-900 mb-4 text-center"
          variants={fadeUp}
          custom={index + 0.2}
        >
          {title}
        </motion.h3>

        <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border-2 bg-gray-50">
          <AnimatePresence initial={false} custom={direction1}>
            <motion.img
              key={currentSlide}
              src={slides[currentSlide]}
              custom={direction1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full h-80 object-cover"
            />
          </AnimatePresence>

          {slides.length > 1 && (
            <>
              <motion.button
                onClick={prevSlide}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronLeft />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronRight />
              </motion.button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="flex justify-center mt-3 space-x-2">
            {slides.map((_, i) => (
              <motion.span
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "bg-brown-600 w-5" : "bg-gray-400"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              ></motion.span>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section
      id="galeri"
      className="relative min-h-screen flex items-center justify-center p-6 bg-coklat-500/30 backdrop-blur-sm"
    >
      <div className="max-w-4xl w-full text-center">
        
        {/* GALERI TITLE */}
        {galeriExists && (
          <motion.h2
            className="text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Galeri
          </motion.h2>
        )}

        {/* CAROUSELS */}
        {galeriExists && (
          <>
            <Carousel
              slides={slidesAtas}
              currentSlide={currentSlide1}
              setCurrentSlide={setCurrentSlide1}
              setDirection={setDirection1}
              index={1}
            />

            <Carousel
              slides={slidesBawah}
              currentSlide={currentSlide2}
              setCurrentSlide={setCurrentSlide2}
              setDirection={setDirection2}
              index={2}
            />
          </>
        )}

        {/* LOVE STORY */}
        {loveStoryTextExists && (
          <motion.div
            className="relative bg-coklat-700 border-2 border-white rounded-xl p-6 flex flex-col gap-8 shadow-[0_0_25px_rgba(120,72,32,0.45)] mt-12 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Bunga Brown */}
            <img
              src={bucketbunga}
              alt="Bunga"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 opacity-90 pointer-events-none z-40"
            />

            <div className="relative z-10">
              <h3 className="text-center text-white text-3xl font-bold mt-24">
                Love Story
              </h3>
              <div className="w-full h-[2px] bg-white/60 mb-6"></div>
            </div>

            <div className="relative z-10 flex flex-col gap-8">
              {filteredSections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  {section.img && (
                    <img
                      src={section.img}
                      alt={section.label}
                      className="w-full rounded-xl object-cover shadow-lg"
                    />
                  )}

                  <h4 className="text-white text-2xl font-semibold">
                    {section.label}
                  </h4>

                  <p className="text-white text-lg leading-relaxed">
                    {section.text}
                  </p>

                  {idx < filteredSections.length - 1 && (
                    <div className="w-full h-[1px] bg-white/30 my-2"></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
