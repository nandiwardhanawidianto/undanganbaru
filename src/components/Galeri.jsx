import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Galeri() {
  // Data untuk carousel pertama (Atas)
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const slides1 = [
    '/fotowedding1.png',
    '/fotowedding2.png'
  ];

  // Data untuk carousel kedua (Bawah)
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const [isTransitioning2, setIsTransitioning2] = useState(false);
  const slides2 = [
    '/fotowedding4.png',
    '/fotowedding3.png'
  ];

  // Fungsi navigasi carousel 1 dengan smooth transition
  const nextSlide1 = () => {
    if (isTransitioning1) return;
    setIsTransitioning1(true);
    setCurrentSlide1((prev) => (prev === slides1.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning1(false), 500);
  };

  const prevSlide1 = () => {
    if (isTransitioning1) return;
    setIsTransitioning1(true);
    setCurrentSlide1((prev) => (prev === 0 ? slides1.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning1(false), 500);
  };

  // Fungsi navigasi carousel 2 dengan smooth transition
  const nextSlide2 = () => {
    if (isTransitioning2) return;
    setIsTransitioning2(true);
    setCurrentSlide2((prev) => (prev === slides2.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning2(false), 500);
  };

  const prevSlide2 = () => {
    if (isTransitioning2) return;
    setIsTransitioning2(true);
    setCurrentSlide2((prev) => (prev === 0 ? slides2.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning2(false), 500);
  };

  // Fungsi untuk langsung pindah slide dengan smooth transition
  const goToSlide1 = (index) => {
    if (isTransitioning1 || index === currentSlide1) return;
    setIsTransitioning1(true);
    setCurrentSlide1(index);
    setTimeout(() => setIsTransitioning1(false), 500);
  };

  const goToSlide2 = (index) => {
    if (isTransitioning2 || index === currentSlide2) return;
    setIsTransitioning2(true);
    setCurrentSlide2(index);
    setTimeout(() => setIsTransitioning2(false), 500);
  };

  // Komponen Carousel Reusable
  const Carousel = ({ slides, currentSlide, nextSlide, prevSlide, title, isTransitioning, goToSlide }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h3>
      
      <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-4'
            } ${isTransitioning ? 'transitioning' : ''}`}
          >
            <img
              src={slide}
              alt={`${title} Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 transition duration-300 ${
            isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
          }`}
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 transition duration-300 ${
            isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
          }`}
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="mt-2 text-gray-600 text-sm text-center">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );

  return (
    <section id="galeri" className="relative min-h-screen flex items-center justify-center p-6 bg-white/50">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Galeri</h2>
        
        {/* Carousel 1 - ATAS */}
        <Carousel
          slides={slides1}
          currentSlide={currentSlide1}
          nextSlide={nextSlide1}
          prevSlide={prevSlide1}
          isTransitioning={isTransitioning1}
          goToSlide={goToSlide1}
        />
        
        {/* Carousel 2 - BAWAH */}
        <Carousel
          slides={slides2}
          currentSlide={currentSlide2}
          nextSlide={nextSlide2}
          prevSlide={prevSlide2}
          isTransitioning={isTransitioning2}
          goToSlide={goToSlide2}
        />
      </div>

      {/* Tambahkan style untuk transisi yang lebih smooth */}
      <style jsx>{`
        .transitioning {
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}