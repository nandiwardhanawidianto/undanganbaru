import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

export default function Ucapan({ slugId }) {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: "",
  });
  const [daftarUcapan, setDaftarUcapan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const API_URL = `http://localhost:8000/api/guest-messages/${slugId}`;

  // Ambil data awal
  const fetchUcapan = async () => {
    if (!slugId) return;
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) {
        const sorted = res.data.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setDaftarUcapan(sorted);
      } else setDaftarUcapan([]);
    } catch (err) {
      console.error("❌ Gagal memuat ucapan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUcapan();
  }, [slugId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUcapan = daftarUcapan.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(daftarUcapan.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Kirim ucapan baru dengan animasi langsung
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slugId) return alert("Slug tidak ditemukan!");
    if (!formData.name || !formData.attendance || !formData.message)
      return alert("Semua field wajib diisi!");

    setSending(true);
    try {
      const res = await axios.post(API_URL, formData);
      if (res.data.success) {
        const newUcapan = {
          id: Date.now(), // temporary ID biar bisa langsung tampil
          ...formData,
          created_at: new Date().toISOString(),
        };

        // Tambahkan ke atas daftar tanpa refetch
        setDaftarUcapan((prev) => {
          const updated = [newUcapan, ...prev];
          // jika lebih dari 6 di halaman pertama, potong yang terakhir
          return updated.slice(0, itemsPerPage * totalPages);
        });

        setFormData({ name: "", attendance: "", message: "" });
        setCurrentPage(1);
      } else {
        alert(res.data.message || "Gagal mengirim ucapan.");
      }
    } catch (err) {
      console.error("❌ Error saat kirim ucapan:", err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="ucapan" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-estetik text-4xl text-center mb-10 text-ungu-600">
          Ucapan & Doa
        </h1>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ungu-400 outline-none"
                placeholder="Masukkan nama kamu"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Kehadiran</label>
              <select
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ungu-400 outline-none"
                required
              >
                <option value="">Pilih Kehadiran</option>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Belum Pasti">Belum Pasti</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Ucapan & Doa</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ungu-400 outline-none resize-none"
                placeholder="Tulis ucapan dan doa terbaikmu..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
                sending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-ungu-500 hover:bg-ungu-600"
              }`}
            >
              <FaPaperPlane className="text-sm" />
              {sending ? "Mengirim..." : "Kirim Ucapan"}
            </button>
          </form>
        </div>

        {/* Daftar Ucapan */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Ucapan dari Tamu
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Memuat ucapan...</p>
          ) : daftarUcapan.length === 0 ? (
            <p className="text-center text-gray-500 italic">Belum ada ucapan 🕊️</p>
          ) : (
            <>
              {/* Animasi Fade In / Out */}
              <AnimatePresence mode="popLayout">
                {currentUcapan.map((ucapan) => (
                  <motion.div
                    key={ucapan.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    layout
                    className="bg-white border border-gray-200 rounded-2xl shadow p-5"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{ucapan.name}</h3>
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            ucapan.attendance === "Hadir"
                              ? "bg-green-100 text-green-800"
                              : ucapan.attendance === "Tidak Hadir"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {ucapan.attendance}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {new Date(ucapan.created_at).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">
                      “{ucapan.message}”
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-ungu-500 text-white hover:bg-ungu-600"
                    }`}
                  >
                    <FaChevronLeft /> Sebelumnya
                  </button>
                  <span className="text-gray-700 font-medium">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-ungu-500 text-white hover:bg-ungu-600"
                    }`}
                  >
                    Selanjutnya <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
