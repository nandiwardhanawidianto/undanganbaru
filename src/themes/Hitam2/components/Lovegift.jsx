import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaGift, FaCopy, FaBoxOpen } from "react-icons/fa";

const normalize = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return typeof raw === "object" ? [raw] : [];
};

const pick = (obj, ...keys) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) return obj[key];
  }
  return "";
};

export default function LoveGift({ data }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState("");
  const banks = useMemo(
    () => normalize(data?.lovegift ?? data?.loveGift ?? data?.love_gift ?? data?.lovegift_list),
    [data]
  );
  const kirimKado = data?.kirimKado || null;

  if (!banks.length && !kirimKado) return null;

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(""), 1500);
    } catch {}
  };

  return (
    <section id="lovegift" className="bg-[#f7f7f5] px-7 py-16 text-center text-[#555]">
      <motion.h2
        className="font-display text-4xl text-[#666]"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        Wedding Gift
      </motion.h2>
      <motion.p
        className="mx-auto mt-4 max-w-sm text-sm leading-6 tracking-wide"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
      >
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Jika ingin memberikan tanda kasih,
        Anda dapat mengirimkannya melalui:
      </motion.p>

      <motion.button
        onClick={() => setShow((v) => !v)}
        className="mt-6 inline-flex items-center gap-2 bg-[#c9954f] px-5 py-3 text-sm font-semibold text-white"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <FaGift /> Kirim Hadiah
      </motion.button>

      {show && (
        <div className="mx-auto mt-7 max-w-sm space-y-4 text-left">
          {banks.map((bank, i) => {
            const name = pick(bank, "bank_name", "nama_bank", "bank") || "Bank";
            const no = pick(bank, "no_rekening", "norek", "account", "no_rek") || "-";
            const owner = pick(bank, "pemilik_bank", "atas_nama", "owner") || "-";
            return (
              <div key={i} className="rounded-xl border border-[#ddd] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-[#999]">{name}</p>
                <p className="mt-2 text-lg font-semibold text-[#444]">{no}</p>
                <p className="text-sm text-[#777]">a.n {owner}</p>
                <button
                  onClick={() => copy(no)}
                  className="mt-3 inline-flex items-center gap-2 border border-[#c9954f] px-3 py-2 text-xs text-[#a8793f]"
                >
                  <FaCopy /> {copied === no ? "Tersalin" : "Salin Rekening"}
                </button>
              </div>
            );
          })}

          {kirimKado && (
            <div className="rounded-xl border border-[#ddd] bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold text-[#555]">
                <FaBoxOpen /> Kirim Kado
              </div>
              <p className="text-sm">{kirimKado.nama_penerima}</p>
              <p className="text-sm">{kirimKado.no_hp || kirimKado.no_hp_penerima}</p>
              <p className="mt-1 text-sm leading-5">{kirimKado.alamat_penerima}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
