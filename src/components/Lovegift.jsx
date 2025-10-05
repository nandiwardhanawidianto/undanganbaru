import { useState } from 'react';
import bungaatas from "../assets/Bungaatas.png";

export default function LoveGift() {
  const [copied, setCopied] = useState(null);

  const salinRekening = (nomer, bank) => {
    navigator.clipboard.writeText(nomer);
    setCopied(bank);
    setTimeout(() => setCopied(null), 2000);
  };

  const bankData = [
    {
      logo: "https://www.bni.co.id/Portals/1/BNI/Images/logo-bni-new.png",
      nama: "BNI",
      norek: "123456789",
      atasNama: "Lorem ipsum dolor"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png",
      nama: "BRI",
      norek: "123456789", 
      atasNama: "Lorem ipsum dolor"
    }
  ];

  return (
    <section id="lovegift" className="relative py-16 bg-gradient-to-b from-ungu-500 to-white">
      <div className="absolute top-0 left-0 w-full flex justify-center z-0 mb-5">
              <img 
                src={bungaatas} 
                alt="Bunga Atas" 
                className="w-full max-w-4xl opacity-80"
              />
            </div>
      <div className="container mx-auto px-4 mt-28">
        <div className="text-center">
          <h1 className="font-estetik text-5xl mb-6">Love Gift</h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih untuk kami,
            dapat melalui :
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {bankData.map((bank, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-sm transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src={bank.logo} 
                  alt={bank.nama}
                  className="mx-auto rounded-lg w-40 h-12 object-contain mb-4"
                />
                <div className="text-center">
                  <p className="text-gray-700 mb-1">No. Rekening {bank.norek}</p>
                  <p className="text-gray-600 mb-4">a.n {bank.atasNama}</p>
                  <button 
                    onClick={() => salinRekening(bank.norek, bank.nama)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition duration-300"
                  >
                    {copied === bank.nama ? 'Tersalin!' : 'Salin No. Rekening'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}