// src/ThemeSelector.jsx
import React from "react";

// Import semua tema yang sudah ada
import VioletApp from "./themes/Violet/App";
// Kalau nanti kamu punya tema lain, tinggal tambahkan di sini:
// import GreenApp from "./themes/Green/App";
// import GoldApp from "./themes/Gold/App";

export default function ThemeSelector({ data }) {
  const theme = data?.slug?.theme?.toLowerCase() || "violet";
  switch (theme) {
    case "violet":
      return <VioletApp data={data} />;

    // contoh tambahan jika nanti ada theme baru
    // case "green":
    //   return <GreenApp data={data} />;
    // case "gold":
    //   return <GoldApp data={data} />;

    default:
      console.warn(`⚠️ Theme "${theme}" not found, fallback to Violet`);
      return <VioletApp data={data} />;
  }
}
