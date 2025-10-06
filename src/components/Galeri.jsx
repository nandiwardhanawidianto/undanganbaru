import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    let atas = [];
    let bawah = [];

    if (Array.isArray(galeri.carousel_atas) && galeri.carousel_atas.length > 0) {
      atas = galeri.carousel_atas;
    }

    if (Array.isArray(galeri.carousel_bawah) && galeri.carousel_bawah.length > 0) {
      bawah = galeri.carousel_bawah;
    }

    setSlidesAtas(atas);
    setSlidesBawah(bawah);
    setIsLoaded(true);
  }, [data]);

  const Carousel = ({ slides, currentSlide, setCurrentSlide, setDirection, title }) => {
    if (!slides || slides.length === 0) {
      return (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
          <div className="h-80 rounded-2xl overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Tidak ada gambar</p>
          </div>
        </div>
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
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h3>

        <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border-2 bg-gray-50">
          <div className="relative w-full h-full overflow-hidden">
            <div
              className={`flex transition-transform duration-700 ease-in-out`}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${title}-${index}`}
                  className="w-full h-80 flex-shrink-0 object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {slides.length > 1 && (
            <>
              {/* Tombol kiri */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
              >
                <FaChevronLeft />
              </button>

              {/* Tombol kanan */}
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="flex justify-center mt-3 space-x-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "bg-gray-800 w-5" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isLoaded) {
    return (
      <section
        id="galeri"
        className="relative min-h-screen flex items-center justify-center p-6 bg-white/50"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Galeri</h2>
          <p>Loading galeri...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="galeri"
      className="relative min-h-screen flex items-center justify-center p-6 bg-white/50"
    >
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Galeri</h2>

        <Carousel
          slides={slidesAtas}
          currentSlide={currentSlide1}
          setCurrentSlide={setCurrentSlide1}
          setDirection={setDirection1}
          title="Galeri Atas"
        />

        <Carousel
          slides={slidesBawah}
          currentSlide={currentSlide2}
          setCurrentSlide={setCurrentSlide2}
          setDirection={setDirection2}
          title="Galeri Bawah"
        />
      </div>
    </section>
  );
}
