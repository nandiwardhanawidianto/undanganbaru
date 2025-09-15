export default function Galeri() {
    const images = [1,2,3,4,5,6].map(i => `/assets/images/Gambar${i}.png`);
    return (
      <section id="galeri" className="py-16 bg-black text-center text-white">
        <h2 className="text-3xl font-bold mb-8">Galeri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {images.map((src,i) => (
            <img key={i} src={src} alt={`Foto ${i+1}`} className="w-full rounded-lg"/>
          ))}
        </div>
      </section>
    );
  }
  