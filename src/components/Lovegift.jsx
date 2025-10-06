import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bungaatas from "../assets/Bungaatas.png";

/**
 * LoveGift.jsx
 * - Bisa menerima `data` sebagai prop (dari useInvitationData di App.jsx)
 * - Jika tidak ada prop `data`, akan mengambil slug dari URL dan fetch API
 * - Menangani bank_logo yang berupa full URL atau relative path
 * - Tampilkan maksimal 3 bank, minimal 1 (tampilan sesuai request)
 */
export default function LoveGift({ data: propData }) {
  const { slug } = useParams(); // optional, hanya kalau kita tidak kirim prop data
  const [copied, setCopied] = useState(null);
  const [bankData, setBankData] = useState([]);
  const [loading, setLoading] = useState(Boolean(!propData));
  const baseUrl = "http://127.0.0.1:8000"; // ganti kalau CMS mu beda

  const salinRekening = async (nomer, bank) => {
    try {
      await navigator.clipboard.writeText(nomer || "");
      setCopied(bank);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Gagal salin:", err);
    }
  };

  // helper: normalisasi data lovegift ke array
  const normalizeLoveGift = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "object") return [raw];
    // kadang server mengembalikan string JSON (tidak ideal) -> coba parse
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : (parsed ? [parsed] : []);
    } catch {
      return [];
    }
  };

  // helper: resolve logo path -> full URL or placeholder
  const resolveLogo = (logoPath) => {
    const placeholder = "https://via.placeholder.com/300x80?text=No+Logo";
    if (!logoPath) return placeholder;
    if (/^https?:\/\//i.test(logoPath) || logoPath.startsWith("//")) {
      return logoPath;
    }
    // remove leading slashes
    const p = logoPath.replace(/^\/+/, "");
    // if already contains 'storage', assume it's correct relative to baseUrl
    if (p.startsWith("storage/") || p.includes("storage/")) {
      return `${baseUrl}/${p}`;
    }
    // if path looks like 'bank_logos/...' or 'bank-logos/...' -> prefix /storage/
    if (p.startsWith("bank_logos/") || p.startsWith("bank-logos/") || p.startsWith("banklogos/")) {
      return `${baseUrl}/storage/${p}`;
    }
    // fallback: try baseUrl + '/' + p
    return `${baseUrl}/${p}`;
  };

  // helper: safe field pick (meng-handle berbagai nama field dari API)
  const pick = (bank, ...keys) => {
    for (const k of keys) {
      if (bank && bank[k] !== undefined && bank[k] !== null) return bank[k];
    }
    return "";
  };

  useEffect(() => {
    // jika prop data diberikan, gunakan itu dulu (preferred)
    if (propData) {
      const arr = normalizeLoveGift(propData.lovegift ?? propData.loveGift ?? propData.love_gift ?? propData.lovegift_list);
      setBankData(arr);
      setLoading(false);
      return;
    }

    // kalau tidak ada propData, ambil dari API menggunakan slug
    if (!slug) {
      setBankData([]); // no slug -> nothing
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(`${baseUrl}/api/slug/${encodeURIComponent(slug)}/listapi`);
        if (!res.ok) throw new Error("Fetch error " + res.status);
        const json = await res.json();
        const arr = normalizeLoveGift(json.lovegift ?? json.loveGift ?? json.love_gift ?? json.lovegift_list);
        if (mounted) setBankData(arr);
      } catch (err) {
        console.error("Gagal fetch lovegift:", err);
        if (mounted) setBankData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [propData, slug]);

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

          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (bankData.length === 0) ? (
            <p className="text-gray-400 italic">Belum ada data Love Gift</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {bankData.slice(0, 3).map((bank, index) => {
                // mapping fleksibel ke beberapa kemungkinan nama field dari API
                const bankName = pick(bank, "bank_name", "nama_bank", "bank_name_api", "bank") || "Bank";
                const bankLogoRaw = pick(bank, "bank_logo", "logo", "bank_logo_path", "logo_path");
                const bankLogo = resolveLogo(bankLogoRaw);
                const norek = pick(bank, "no_rekening", "norek", "account", "no_rek") || "-";
                const atasNama = pick(bank, "pemilik_bank", "atas_nama", "atasNama", "owner") || "-";

                return (
                  <div 
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-sm transition-transform duration-300 hover:scale-105"
                  >
                    <img 
                      src={bankLogo} 
                      alt={bankName}
                      className="mx-auto rounded-lg w-40 h-12 object-contain mb-4"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x80?text=No+Logo"; }}
                    />
                    <div className="text-center">
                      <p className="text-gray-700 mb-1">No. Rekening {norek}</p>
                      <p className="text-gray-600 mb-4">a.n {atasNama}</p>
                      <button 
                        onClick={() => salinRekening(norek, bankName)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition duration-300"
                      >
                        {copied === bankName ? 'Tersalin!' : 'Salin No. Rekening'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
