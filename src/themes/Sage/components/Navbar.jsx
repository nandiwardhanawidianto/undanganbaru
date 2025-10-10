import { motion } from "framer-motion";
import { FaHouseChimney, FaChildren, FaGift } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoChatbubblesOutline, IoImagesOutline } from "react-icons/io5";

export default function Navbar() {
  const navItems = [
    { id: "home", icon: <FaHouseChimney />, label: "Home" },
    { id: "mempelai", icon: <FaChildren />, label: "Mempelai" },
    { id: "tanggal", icon: <FaCalendarAlt />, label: "Tanggal" },
    { id: "galeri", icon: <IoImagesOutline />, label: "Galeri" },
    { id: "lovegift", icon: <FaGift />, label: "Love Gift" },
    { id: "ucapan", icon: <IoChatbubblesOutline />, label: "Ucapan" },
  ];

  const handleScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl bg-hijau-500 text-white shadow-lg">
      <ul className="flex justify-around">
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ y: -4, scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              onClick={() => handleScroll(item.id)}
              className="flex flex-col items-center py-2 focus:outline-none"
            >
              <motion.div
                whileHover={{
                  rotate: [0, -10, 10, -8, 8, 0],
                  transition: { duration: 0.6 },
                }}
              >
                {item.icon}
              </motion.div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
