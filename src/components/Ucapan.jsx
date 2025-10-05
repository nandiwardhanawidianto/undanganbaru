import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function Ucapan() {
  const [formData, setFormData] = useState({
    nama: '',
    hadiran: '',
    pesan: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data ucapan:', formData);
    // Reset form setelah kirim
    setFormData({ nama: '', hadiran: '', pesan: '' });
    alert('Ucapan berhasil dikirim!');
  };

  // Data dummy ucapan
  const daftarUcapan = [
    { nama: "Budi Santoso", hadiran: "Hadir", pesan: "Selamat atas pernikahannya! Semoga menjadi keluarga yang sakinah mawaddah warahmah.", waktu: "2 jam yang lalu" },
    { nama: "Sari Indah", hadiran: "Tidak Hadir", pesan: "Semoga pernikahan ini membawa kebahagiaan yang abadi. Doa terbaik untuk kalian!", waktu: "5 jam yang lalu" },
    { nama: "Ahmad Wijaya", hadiran: "Hadir", pesan: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair.", waktu: "1 hari yang lalu" },
    { nama: "Dewi Lestari", hadiran: "Hadir", pesan: "Congratulations! Semoga menjadi pasangan yang selalu kompak dan saling mendukung.", waktu: "1 hari yang lalu" }
  ];

  return (
    <section id="ucapan" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Judul Section */}
        <h1 className="font-estetik text-4xl text-center mb-8">Ucapan & Doa</h1>

        {/* Form Ucapan */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Nama */}
            <div>
              <label htmlFor="nama" className="block text-gray-700 mb-2 font-medium">
                Nama
              </label>
              <input 
                type="text" 
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ungu-500 focus:border-transparent"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            {/* Dropdown Kehadiran */}
            <div>
              <label htmlFor="hadiran" className="block text-gray-700 mb-2 font-medium">
                Kehadiran
              </label>
              <select 
                id="hadiran"
                name="hadiran"
                value={formData.hadiran}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ungu-500 focus:border-transparent"
                required
              >
                <option value="">Pilih kehadiran</option>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
              </select>
            </div>

            {/* Textarea Ucapan & Doa */}
            <div>
              <label htmlFor="pesan" className="block text-gray-700 mb-2 font-medium">
                Ucapan & Doa
              </label>
              <textarea 
                id="pesan"
                name="pesan"
                value={formData.pesan}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ungu-500 focus:border-transparent"
                placeholder="Tulis ucapan dan doa untuk mempelai..."
                required
              />
            </div>

            {/* Button Kirim */}
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 bg-ungu-500 hover:bg-ungu-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300"
            >
              <FaPaperPlane className="text-sm" />
              Kirim Ucapan
            </button>
          </form>
        </div>

        {/* Daftar Ucapan Dummy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ucapan dari Tamu</h2>
          
          {daftarUcapan.map((ucapan, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{ucapan.nama}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    ucapan.hadiran === 'Hadir' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {ucapan.hadiran}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{ucapan.waktu}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{ucapan.pesan}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}