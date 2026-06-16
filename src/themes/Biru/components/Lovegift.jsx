import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import bglovegift from "../assets/Bg_all.png";
import kadobrown from "../assets/kadobrown.png";

export default function LoveGift({ data: propData }) {
  const { slug } = useParams();
  const [copied, setCopied] = useState(null);
  const [bankData, setBankData] = useState([]);
  const [kirimKado, setKirimKado] = useState(null);
  const [loading, setLoading] = useState(Boolean(!propData));
  const baseUrl = "http://127.0.0.1:8000";

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
      setKirimKado(propData.kirimKado || null);
      setLoading(false);
      return;
    }

    if (!slug) {
      setBankData([]);
      setKirimKado(null);
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
          json.data?.lovegift ??
            json.data?.loveGift ??
            json.data?.love_gift ??
            json.data?.lovegift_list
        );

        if (mounted) {
          setBankData(arr);
          setKirimKado(json.data?.kirimKado || null);
        }
      } catch {
        if (mounted) {
          setBankData([]);
          setKirimKado(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [propData, slug]);

  // Kalau keduanya kosong, return null → section tidak muncul
  if (!loading && bankData.length === 0 && !kirimKado) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#7B5B38", color: "#fff" },
    tap: { scale: 0.95 },
  };

  return (
    <section
      id="lovegift"
      className="relative py-16 overflow-hidden bg-krem bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bglovegift})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 mt-28 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-biru-500/70 backdrop-blur-md border rounded-3xl shadow-md inline-block px-8 py-6 mb-28 max-w-2xl mx-auto">
            <h1 className="font-estetik text-5xl mb-4 text-white">Love Gift</h1>
            <p className="text-white leading-relaxed">
              Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih untuk kami,
              dapat melalui :
            </p>
          </div>
        </motion.div>

        {loading ? (
          <p className="text-gray-500 text-center">Memuat data...</p>
        ) : (
          <>
            {/* 💰 BANK LIST */}
            {bankData.length > 0 && (
              <motion.div
                className="flex flex-wrap justify-center gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {bankData.map((bank, index) => {
                  const bankName = pick(bank, "bank_name", "nama_bank", "bank_name_api", "bank") || "Bank";
                  const bankLogo = resolveLogo(pick(bank, "bank_logo", "logo", "bank_logo_path", "logo_path"));
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
                      />
                      <div className="text-center">
                        <p className="text-gray-700 mb-1">No. Rekening {norek}</p>
                        <p className="text-gray-600 mb-4">a.n {atasNama}</p>

                        <motion.button
                          onClick={() => salinRekening(norek, bankName)}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm transition duration-300"
                        >
                          {copied === bankName ? "Tersalin!" : "Salin No. Rekening"}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* 🎁 KIRIM KADO */}
            {kirimKado && (
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 max-w-lg w-full text-center">
                  <img
                    src={kadobrown}
                    alt="Kado"
                    className="mx-auto mb-4 w-48 h-48 object-contain"
                  />
                  <p className="text-gray-700 mb-2">
                    {kirimKado.nama_penerima}, {kirimKado.no_hp}
                  </p>
                  <p className="text-gray-700">{kirimKado.alamat_penerima}</p>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
