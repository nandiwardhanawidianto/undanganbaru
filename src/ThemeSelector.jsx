// src/ThemeSelector.jsx
import React from "react";

// Import semua tema yang sudah ada
import VioletApp from "./themes/Violet/App";
import Sageapp from "./themes/Sage/App";
import Brownapp from "./themes/Brown/App";

export default function ThemeSelector({ data }) {
  const theme = data?.slug?.theme?.toLowerCase() || "violet";
  switch (theme) {
    case "violet":
      return <VioletApp data={data} />;
    case "sage":
      return <Sageapp data={data} />;
    case "brown":
      return <Brownapp data={data} />;

    default:
      console.warn(`⚠️ Theme "${theme}" not found, fallback to Violet`);
      return <VioletApp data={data} />;
  }
}
