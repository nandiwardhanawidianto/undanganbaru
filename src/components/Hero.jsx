// import { FaCalendarCheck } from "react-icons/fa";

// export default function Hero() {
//     return (
//       <section id="home" className="h-screen flex flex-col items-center justify-center bg-black text-white">
//         <h1 className="text-5xl font-display italic text-gold">Nandi & Mia</h1>
//         <p className="mt-4 text-xl text-gold">Rabu, 15 Maret 2023</p>
//         <span className="mt-8 animate-bounce"><i className="fas fa-chevron-down"></i> Scroll Down</span>
//       </section>
//     );
//   }
  

import { FaChevronDown, FaCalendarCheck } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex flex-col items-center justify-center bg-black text-white"
    >
      <h1 className="text-5xl font-display italic text-gold">
        Nandi & Mia
      </h1>
      <p className="mt-4 text-xl text-gold">Rabu, 15 Maret 2023</p>

      {/* Tombol Save The Date */}
      <a
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=The%20Wedding%20of%20Nandi%20and%20Mia&details=The%20Wedding%20of%20Nandi%20and%20Mia%20%7C%2015%20Maret%202023%20%7C%20Lokasi%20Undangan&dates=20230315T100000/20230315T110000"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white px-4 py-2 text-sm text-white shadow hover:bg-gold hover:text-black transition"
      >
        <FaCalendarCheck />
        Save The Date
      </a>

      {/* Scroll Down */}
      <span className="mt-8 flex flex-col items-center animate-bounce text-gold">
        <FaChevronDown className="text-2xl" />
        <span className="text-sm">Scroll Down</span>
      </span>
    </section>
  );
}
