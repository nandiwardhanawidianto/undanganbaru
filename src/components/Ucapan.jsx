import { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function Ucapan({ slugId }) {
  const [formData, setFormData] = useState({
    nama: '',
    hadiran: '',
    pesan: ''
  });
  const [daftarUcapan, setDaftarUcapan] = useState([]);

 const LARAVEL_API = 'http://127.0.0.1:8000/api';

const fetchUcapan = async () => {
  try {
    const res = await fetch(`${LARAVEL_API}/guest-messages/${slugId}`);
    const data = await res.json();
    setDaftarUcapan(data);
  } catch (err) {
    console.error('Gagal load ucapan:', err);
  }
};


  useEffect(() => {
    fetchUcapan();
  }, [slugId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${LARAVEL_API}/guest-messages`, { // <== ini
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slug_id: slugId,
        nama: formData.nama,
        hadiran: formData.hadiran,
        pesan: formData.pesan
      })
    });

    const result = await res.json();

    if (result.success) {
      alert(result.message);
      setFormData({ nama: '', hadiran: '', pesan: '' });
      fetchUcapan();
    } else {
      alert('Gagal mengirim ucapan.');
    }
  } catch (err) {
    console.error('Error kirim ucapan:', err);
    alert('Terjadi kesalahan saat mengirim ucapan.');
  }
};


  return (
    <section id="ucapan" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <h1 className="font-estetik text-4xl text-center mb-8">Ucapan & Doa</h1>

        {/* Form Ucapan */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-gray-700 mb-2 font-medium">Nama</label>
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

            <div>
              <label htmlFor="hadiran" className="block text-gray-700 mb-2 font-medium">Kehadiran</label>
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

            <div>
              <label htmlFor="pesan" className="block text-gray-700 mb-2 font-medium">Ucapan & Doa</label>
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

            <button 
              type="submit"
              className="flex items-center justify-center gap-2 bg-ungu-500 hover:bg-ungu-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300"
            >
              <FaPaperPlane className="text-sm" />
              Kirim Ucapan
            </button>
          </form>
        </div>

        {/* Daftar Ucapan */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ucapan dari Tamu</h2>
          
          {daftarUcapan.map((ucapan) => (
            <div key={ucapan.id} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
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
                <span className="text-gray-500 text-sm">{new Date(ucapan.created_at).toLocaleString()}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{ucapan.pesan}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
