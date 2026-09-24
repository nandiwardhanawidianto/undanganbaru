import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaClock } from "react-icons/fa";

export default function Ucapan({ slugId, giftSlot = null }) {
  const [form, setForm] = useState({ name: "", attendance: "", message: "" });
  const [items, setItems] = useState([]);
  const [sending, setSending] = useState(false);
  const [visible, setVisible] = useState(5);

  const url = useMemo(
    () => `https://cms.royalweddinginvitiation.com/api/guest-messages/${slugId}`,
    [slugId]
  );

  const load = async () => {
    if (!slugId) return;
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        setItems(
          [...(res.data.data || [])].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
      }
    } catch {}
  };

  useEffect(() => {
    load();
  }, [slugId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.attendance || !form.message) return;
    setSending(true);
    try {
      const res = await axios.post(url, form);
      if (res.data?.success) {
        setForm({ name: "", attendance: "", message: "" });
        await load();
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="ucapan" className="bg-[#efefed] text-[#555]">
      <div className="bg-[#c8c8c8] px-7 py-12">
        <h2 className="font-display text-center text-3xl">Konfirmasi Kehadiran</h2>
        <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-5 tracking-wide">
          Mohon kesediaannya untuk melakukan konfirmasi kehadiran, supaya kami bisa mempersiapkan kehadiran anda dengan baik.
        </p>

        <form onSubmit={submit} className="mx-auto mt-7 max-w-sm space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nama"
            className="w-full border border-[#777] bg-white px-4 py-3 outline-none"
          />
          <select
            value={form.attendance}
            onChange={(e) => setForm({ ...form, attendance: e.target.value })}
            className="w-full border border-[#777] bg-white px-4 py-3 outline-none"
          >
            <option value="">Konfirmasi Kehadiran</option>
            <option value="Hadir">Bersedia Hadir</option>
            <option value="Tidak Hadir">Tidak Hadir</option>
            <option value="Belum Pasti">Belum Pasti</option>
          </select>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Ucapan selamat & doa"
            rows="3"
            className="w-full border border-[#777] bg-white px-4 py-3 outline-none"
          />
          <button
            disabled={sending}
            className="w-full bg-[#333] py-3 text-sm font-semibold text-white"
          >
            {sending ? "Mengirim..." : "Kirim Konfirmasi"}
          </button>
        </form>
      </div>

      {giftSlot}\n\n      <div className="px-7 py-14">
        <div className="mx-auto max-w-sm rounded-xl border border-white bg-white/70 p-6 shadow-inner">
          <h2 className="font-display text-center text-3xl text-[#6d7186]">Friends Wishes</h2>
          <div className="mt-8 text-xs font-semibold uppercase tracking-[0.18em]">
            {Math.min(items.length, 10)} Best Friends Wishes
          </div>
          <div className="mt-2 h-[2px] bg-[#555]" />

          <div className="mt-5 space-y-4">
            {items.slice(0, visible).map((item) => (
              <div key={item.id} className="border-b border-[#d2d2d2] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#de8b76]">{item.name}</span>
                  <FaClock className="text-[10px] text-[#999]" />
                  <span className="text-[10px] text-[#999]">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-5">{item.message}</p>
              </div>
            ))}
            {!items.length && <p className="py-6 text-center text-sm text-[#999]">Belum ada ucapan.</p>}
          </div>

          {visible < items.length && (
            <button
              onClick={() => setVisible((v) => v + 5)}
              className="mx-auto mt-5 block border-2 border-[#de8b76] px-6 py-2 text-sm text-[#de8b76]"
            >
              Muat Lebih Banyak
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
