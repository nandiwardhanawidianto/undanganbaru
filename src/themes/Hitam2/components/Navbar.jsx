import { FaHouseChimney, FaRingsWedding, FaCalendarDays, FaImages, FaComments } from "react-icons/fa6";

export default function Navbar() {
  const items = [
    { id: "home", label: "Cover", icon: <FaHouseChimney /> },
    { id: "mempelai", label: "Couple", icon: <FaRingsWedding /> },
    { id: "tanggal", label: "Event", icon: <FaCalendarDays /> },
    { id: "galeri", label: "Gallery", icon: <FaImages /> },
    { id: "ucapan", label: "Wishes", icon: <FaComments /> },
  ];

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[80] w-full max-w-[430px] px-1">
      <div className="grid grid-cols-5 overflow-hidden rounded-t-[18px] bg-[#3d3c3b] text-white shadow-2xl">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            className="flex min-h-[58px] flex-col items-center justify-center gap-1 border-r border-white/70 px-1 text-[11px] last:border-r-0"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
