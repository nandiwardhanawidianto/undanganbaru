// src/ThemeSelector.jsx
import React from "react";

// Import semua tema yang sudah ada
import VioletApp from "./themes/Violet/App";
import Sageapp from "./themes/Sage/App";
import Brownapp from "./themes/Brown/App";
import Jawaapp from "./themes/Jawa/App";
import Biruapp from "./themes/Biru/App";

export default function ThemeSelector({ data }) {
  const theme = data?.slug?.theme?.toLowerCase() || "violet";
  switch (theme) {
    case "violet":
      return <VioletApp data={data} />;
    case "sage":
      return <Sageapp data={data} />;
    case "brown":
      return <Brownapp data={data} />;
    case "jawa":
      return <Jawaapp data={data} />;
    case "biru":
      return <Biruapp data={data} />;

    default:
      console.warn(`⚠️ Theme "${theme}" not found, fallback to Violet`);
      return <VioletApp data={data} />;
  }
}
