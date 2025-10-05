import bgtanggal from '../assets/bg2.png';
import { SiGooglemaps } from "react-icons/si";
import { TbMapSearch } from "react-icons/tb";

export default function Tanggal() {
  return (
    <section id="tanggal" className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-ungu-500 to-white">
      
      {/* Container Utama - Flex Column */}
      <div className="flex flex-col gap-8 w-150 max-w-4xl">
        
        {/* Container AKAD */}
        <div className="relative w-full h-90 rounded-[150px] overflow-hidden border-ungu-500 border-4 shadow-lg">
          <img 
            src={bgtanggal} 
            alt="Background Akad" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center text-ungu-500">
              <h2 className="text-3xl font-bold mb-4">Akad Nikah</h2>
              <p className="text-lg font-bold leading-relaxed">
                Sabtu, 28 September 2025
              </p>    
              <p className="text-base leading-relaxed">
                Pukul 09.00 WIB - Selesai
              </p>
              <div className="mt-6 flex flex-col items-center">
                <SiGooglemaps className="w-8 h-8 mb-2"/>
                Bertempat di<br/>
                Jl. Kenanga No. 12, Kota Bandung
              </div>
              <div className="mt-6">
                <button className="flex items-center justify-center gap-2 bg-ungu-500 text-white font-medium py-2 px-6 rounded-full mx-auto">
                  <TbMapSearch className="text-xl" />
                  <span>Google Maps</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Container RESEPSI */}
        <div className="relative w-full h-90 rounded-[150px] overflow-hidden border-ungu-500 border-4 shadow-lg">
          <img 
            src={bgtanggal} 
            alt="Background Resepsi" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center text-ungu-500">
              <h2 className="text-3xl font-bold mb-4">Resepsi</h2>
              <p className="text-lg font-bold leading-relaxed">
                Sabtu, 28 September 2025
              </p>    
              <p className="text-base leading-relaxed">
                Pukul 11.00 WIB - Selesai
              </p>
              <div className="mt-6 flex flex-col items-center">
                <SiGooglemaps className="w-8 h-8 mb-2"/>
                Bertempat di<br/>
                Jl. Kenanga No. 12, Kota Bandung
              </div>
              <div className="mt-6">
                <button className="flex items-center justify-center gap-2 bg-ungu-500 text-white font-medium py-2 px-6 rounded-full mx-auto">
                  <TbMapSearch className="text-xl" />
                  <span>Google Maps</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}