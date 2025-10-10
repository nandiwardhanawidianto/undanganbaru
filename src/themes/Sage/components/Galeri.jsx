import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
      return;
    }

    const galeri = data.galeri[0];
    const atas = Array.isArray(galeri.carousel_atas) ? galeri.carousel_atas : [];
    const bawah = Array.isArray(galeri.carousel_bawah) ? galeri.carousel_bawah : [];

    setSlidesAtas(atas);
    setSlidesBawah(bawah);
    setIsLoaded(true);
  }, [data]);

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
    if (!slides || slides.length === 0) {
      return (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={index}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
          <div className="h-80 rounded-2xl overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Tidak ada gambar</p>
          </div>
        </motion.div>
      );
    }

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
          className="text-2xl font-bold text-gray-900 mb-4 text-center"
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
                whileHover={{ scale: 1.2, boxShadow: "0 0 10px rgba(123,31,162,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronLeft />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.2, boxShadow: "0 0 10px rgba(123,31,162,0.3)" }}
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
                  i === currentSlide ? "bg-hijau-500 w-5" : "bg-gray-400"
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

  if (!isLoaded) {
    return (
      <section
        id="galeri"
        className="relative min-h-screen flex items-center justify-center p-6 bg-white/50"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-coklat-500 mb-8">Galeri</h2>
          <p>Loading galeri...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="galeri"
      className="relative min-h-screen flex items-center justify-center p-6 bg-coklat-500/10"
    >
      <div className="max-w-4xl w-full text-center">
        <motion.h2
          className="text-4xl font-bold text-coklat-00 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Galeri
        </motion.h2>

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
      </div>
    </section>
  );
}
