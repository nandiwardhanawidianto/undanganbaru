import { useEffect, useMemo, useState } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import ModalUndangan from "./components/Modalundangan";
import Navbar from "./components/Navbar";
import LoveGift from "./components/Lovegift";
import Ucapan from "./components/Ucapan";
import MusicPlayer from "../Hitam/components/MusicPlayer";
import bunga from "../Hitam/assets/bungahitam.png";

const allPhotos = (data) => {
  const g = data?.galeri?.[0] || {};
  return [
    ...(Array.isArray(g.carousel_atas) ? g.carousel_atas : []),
    ...(Array.isArray(g.carousel_bawah) ? g.carousel_bawah : []),
  ].filter(Boolean);
};

const formatEventDate = (dateStr) => {
  if (!dateStr) return { day: "-", date: "-", month: "-", year: "-" };
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    day: d.toLocaleDateString("id-ID", { weekday: "long" }),
    date: d.toLocaleDateString("id-ID", { day: "2-digit" }),
    month: d.toLocaleDateString("id-ID", { month: "long" }),
    year: d.toLocaleDateString("id-ID", { year: "numeric" }),
  };
};

function Countdown({ date }) {
  const calc = () => {
    const target = date ? new Date(`${date}T00:00:00`) : new Date();
    const diff = Math.max(0, target - new Date());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      minutes: Math.floor(diff / 60000) % 60,
      seconds: Math.floor(diff / 1000) % 60,
    };
  };
  const [left, setLeft] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [date]);

  const boxes = [
    ["Days", left.days],
    ["Hours", left.hours],
    ["Minutes", left.minutes],
    ["Seconds", left.seconds],
  ];

  return (
    <div className="mt-5 grid grid-cols-4 gap-2">
      {boxes.map(([label, value]) => (
        <div key={label} className="rounded bg-[#777] px-1 py-2 text-center text-white">
          <div className="text-lg font-semibold">{String(value).padStart(2, "0")}</div>
          <div className="text-[9px]">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Hitam2App({ data }) {
  const [showModal, setShowModal] = useState(true);
  const hero = data?.heroInvitation || {};
  const events = data?.acaras || [];
  const firstEvent = events[0] || {};
  const photos = useMemo(() => allPhotos(data), [data]);
  const heroPhoto =
    photos[0] ||
    data?.counting?.foto_counting ||
    hero?.foto_pria ||
    hero?.foto_wanita ||
    "/Nonfoto.png";

  const dateParts = formatEventDate(firstEvent?.tanggal_acara);
  const story = data?.lovestory || {};
  const storyItems = [
    { title: "Awal Pertemuan", text: story.awal_pertemuan, image: story.gambar_awal },
    { title: "Menjalin Hubungan", text: story.menjalin_hubungan, image: story.gambar_hubungan },
    { title: "Lamaran", text: story.lamaran, image: story.gambar_lamaran },
  ].filter((x) => x.text || x.image);

  const quotePhotos = photos.slice(0, 5);

  if (!data) return <div className="p-10 text-center">404...</div>;

  return (
    <>
      {showModal && (
        <ModalUndangan data={data} onBukaUndangan={() => setShowModal(false)} />
      )}

      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden border-x-[4px] border-[#b7c873] bg-white shadow-2xl">
        <MusicPlayer data={data} />
        <Navbar />

        <section id="home" className="relative bg-[#2f2f2f] pb-10">
          <div className="relative h-[480px] overflow-hidden">
            <img src={heroPhoto} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2f2f2f]" />
            <img src={bunga} alt="" className="absolute -left-20 top-24 w-48 grayscale opacity-60" />
            <img src={bunga} alt="" className="absolute -right-24 top-0 w-52 rotate-180 grayscale opacity-50" />
          </div>

          <div className="relative -mt-28 px-9 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em]">The Wedding Of</p>
            <h1 className="mt-2 font-cursive text-5xl text-[#cda679]">
              {hero?.nama_panggilan_pria || "Mempelai"} &amp; {hero?.nama_panggilan_wanita || ""}
            </h1>

            <div className="mt-7 grid grid-cols-[1fr_62px_1fr] items-center text-sm">
              <div className="border-y border-white/60 py-2 uppercase">{dateParts.month}</div>
              <div className="bg-[#cda679] py-3 text-2xl font-semibold">{dateParts.date}</div>
              <div className="border-y border-white/60 py-2">{dateParts.year}</div>
            </div>

            <p className="mt-5 text-base font-semibold uppercase tracking-[0.25em]">Save The Date</p>
            <Countdown date={firstEvent?.tanggal_acara} />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1f1f1f] px-7 py-16 text-center text-white">
          <div className="absolute -left-28 -top-16 h-28 w-[160%] rounded-[50%] bg-black/70" />
          <img src={bunga} alt="" className="absolute -left-20 top-16 w-48 grayscale opacity-55" />
          <img src={bunga} alt="" className="absolute -right-24 top-0 w-52 rotate-180 grayscale opacity-45" />

          <p className="relative z-10 mx-auto max-w-sm text-sm italic leading-6">
            {data?.counting?.deskripsi_surat ||
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."}
          </p>
          <p className="relative z-10 mt-2 text-xs font-semibold">
            {data?.counting?.nama_surat || "(QS. Ar-Rum: 21)"}
          </p>

          {quotePhotos.length > 0 && (
            <div className="relative z-10 mt-12 flex justify-center -space-x-2">
              {quotePhotos.map((src, i) => (
                <img key={i} src={src} alt="" className="h-20 w-20 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
          )}
        </section>

        <section id="mempelai" className="relative bg-[#efefef] px-8 py-14 text-center text-[#5f5f5f]">
          <img src={bunga} alt="" className="absolute -right-24 -top-14 w-48 grayscale opacity-40" />

          {[
            {
              photo: hero?.foto_pria,
              short: hero?.nama_panggilan_pria,
              full: hero?.nama_lengkap_pria,
              parents: hero?.orangtua_pria,
            },
            {
              photo: hero?.foto_wanita,
              short: hero?.nama_panggilan_wanita,
              full: hero?.nama_lengkap_wanita,
              parents: hero?.orangtua_wanita,
            },
          ].map((person, i) => (
            <div key={i} className={i ? "mt-16" : ""}>
              {person.photo && (
                <img
                  src={person.photo}
                  alt=""
                  className="mx-auto h-44 w-44 rounded-full border-[5px] border-[#d4bc7f] object-cover"
                />
              )}
              <h2 className="mt-3 font-cursive text-5xl text-[#cda679]">{person.short}</h2>
              <h3 className="mt-1 font-display text-2xl text-[#33403d]">{person.full}</h3>
              {person.parents && <p className="mx-auto mt-3 max-w-xs text-sm leading-6">{person.parents}</p>}
              {i === 0 && <div className="mt-10 font-cursive text-5xl text-[#777]">-&amp;-</div>}
            </div>
          ))}
        </section>

        <section id="tanggal" className="relative bg-[#fafafa] px-6 py-14">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="font-display text-5xl leading-[0.8] text-[#888]">Wedding<br />Event</h2>
            <div className="h-px flex-1 bg-[#888]" />
          </div>

          <div className="space-y-12">
            {events.map((event, i) => {
              const p = formatEventDate(event.tanggal_acara);
              return (
                <div
                  key={event.id || i}
                  className="mx-auto min-h-[480px] max-w-[350px] rounded-t-[180px] bg-[#3d3c3b] px-5 pb-10 pt-16 text-center text-white shadow-xl"
                >
                  <h3 className="font-display text-4xl italic">{event.nama_acara}</h3>
                  <div className="mx-auto mt-3 h-[3px] w-36 border-t border-dashed border-white/70" />
                  <p className="mt-8 text-base font-semibold uppercase tracking-[0.14em]">{p.day}</p>
                  <div className="mt-3 grid grid-cols-[1fr_58px_1fr] items-center">
                    <div className="border-y border-white/60 py-2 uppercase">{p.month}</div>
                    <div className="bg-[#cda679] py-3 text-2xl font-semibold">{p.date}</div>
                    <div className="border-y border-white/60 py-2">{p.year}</div>
                  </div>
                  <p className="mt-5 flex items-center justify-center gap-2 text-lg">
                    <FaClock /> {event.pukul_acara}
                  </p>
                  <FaMapMarkerAlt className="mx-auto mt-7 text-3xl" />
                  <p className="mt-2 text-sm font-semibold">{event.alamat_acara}</p>
                  {event.link_acara && (
                    <a
                      href={event.link_acara}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto mt-7 inline-flex items-center gap-2 bg-[#f6f2ea] px-4 py-2 text-sm font-semibold text-[#777]"
                    >
                      <FaMapMarkerAlt /> GOOGLE MAPS
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {storyItems.length > 0 && (
          <section className="bg-[#515151] px-4 py-12 text-center text-white">
            <h2 className="font-display text-5xl">Love Story</h2>
            <div className="mx-auto mt-8 max-w-sm space-y-10">
              {storyItems.map((item, i) => (
                <div key={i}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt=""
                      className="h-52 w-full rounded-[55px_55px_12px_55px] border-2 border-white object-cover"
                    />
                  )}
                  <h3 className="mt-6 text-base font-bold uppercase tracking-[0.12em]">{item.title}</h3>
                  {item.text && <p className="mt-4 text-sm leading-5">{item.text}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {photos.length > 0 && (
          <section id="galeri" className="bg-[#fbfbfb] px-3 py-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-36 bg-[#888]" />
              <h2 className="font-display text-5xl italic text-[#768096]">Gallery</h2>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={`w-full object-cover ${i % 5 === 3 ? "col-span-2 h-56" : "h-60"}`}
                />
              ))}
            </div>
          </section>
        )}

        <Ucapan slugId={data?.slug?.slug} />
        <LoveGift data={data} />

        <footer className="relative bg-[#f3f3f3] px-8 pb-24 pt-16 text-center text-[#777]">
          <p className="mx-auto max-w-sm text-sm leading-6">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir
            dan memberikan doa restu kepada kedua mempelai.
          </p>
          <p className="mt-7 text-sm">The Wedding of</p>
          <h2 className="mt-5 font-cursive text-5xl text-[#6f6f6f]">
            {hero?.nama_panggilan_pria || ""} &amp; {hero?.nama_panggilan_wanita || ""}
          </h2>
          <div className="mt-10 border-t border-[#aaa] pt-6 text-xs">
            © 2026 Made With Love by Royal Wedding Invitation
          </div>
        </footer>
      </div>
    </>
  );
}
