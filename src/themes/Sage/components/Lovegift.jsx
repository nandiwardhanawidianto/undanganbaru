import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import bglovegift from "../assets/UndanganHIjauBG-01.png";

export default function LoveGift({ data: propData }) {
  const { slug } = useParams();
  const [copied, setCopied] = useState(null);
  const [bankData, setBankData] = useState([]);
  const [loading, setLoading] = useState(Boolean(!propData));

  const salinRekening = async (nomer, bank) => {
    try {
      await navigator.clipboard.writeText(nomer || "");
      setCopied(bank);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const normalizeLoveGift = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "object") return [raw];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
    } catch {
      return [];
    }
  };

  const resolveLogo = (logoPath) => {
    const placeholder = "https://via.placeholder.com/300x80?text=No+Logo";
    if (!logoPath) return placeholder;
    if (/^https?:\/\//i.test(logoPath) || logoPath.startsWith("//")) return logoPath;
    const p = logoPath.replace(/^\/+/, "");
    if (p.startsWith("storage/") || p.includes("storage/")) return `${baseUrl}/${p}`;
    if (p.startsWith("bank_logos/") || p.startsWith("bank-logos/") || p.startsWith("banklogos/"))
      return `${baseUrl}/storage/${p}`;
    return `${baseUrl}/${p}`;
  };

  const pick = (bank, ...keys) => {
    for (const k of keys) if (bank && bank[k] !== undefined && bank[k] !== null) return bank[k];
    return "";
  };

  useEffect(() => {
    if (propData) {
      const arr = normalizeLoveGift(
        propData.lovegift ?? propData.loveGift ?? propData.love_gift ?? propData.lovegift_list
      );
      setBankData(arr);
      setLoading(false);
      return;
    }

    if (!slug) {
      setBankData([]);
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
        const arr = normalizeLoveGift(
          json.lovegift ?? json.loveGift ?? json.love_gift ?? json.lovegift_list
        );
        if (mounted) setBankData(arr);
      } catch {
        if (mounted) setBankData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [propData, slug]);

  // Animasi variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#767B6F", color: "#959E89" },
    tap: { scale: 0.95 },
  };

  return (
    <section id="lovegift"
      className="relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${bglovegift})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <div className="container mx-auto px-4 mt-5 relative z-10 py-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-estetik text-5xl mb-6 text-hijau-800">Love Gift</h1>
          <p className="text-hijau-800 mb-8 max-w-2xl mx-auto">
            Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih untuk kami,
            dapat melalui :
          </p>
        </motion.div>

        {loading ? (
          <p className="text-gray-500 text-center">Memuat data...</p>
        ) : bankData.length === 0 ? (
          <p className="text-gray-400 italic text-center">Belum ada data Love Gift</p>
        ) : (
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {bankData.slice(0, 3).map((bank, index) => {
              const bankName = pick(bank, "bank_name", "nama_bank", "bank_name_api", "bank") || "Bank";
              const bankLogoRaw = pick(bank, "bank_logo", "logo", "bank_logo_path", "logo_path");
              const bankLogo = resolveLogo(bankLogoRaw);
              const norek = pick(bank, "no_rekening", "norek", "account", "no_rek") || "-";
              const atasNama = pick(bank, "pemilik_bank", "atas_nama", "atasNama", "owner") || "-";

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-sm"
                >
                  <motion.img
                    src={bankLogo}
                    alt={bankName}
                    className="mx-auto rounded-lg w-40 h-12 object-contain mb-4"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/300x80?text=No+Logo")
                    }
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  />
                  <div className="text-center">
                    <p className="text-gray-700 mb-1">No. Rekening {norek}</p>
                    <p className="text-gray-600 mb-4">a.n {atasNama}</p>

                    <motion.button
                      onClick={() => salinRekening(norek, bankName)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className=" bg-hijau-500 text-white px-4 py-2 rounded-full text-sm transition duration-300"
                    >
                      {copied === bankName ? "Tersalin!" : "Salin No. Rekening"}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
