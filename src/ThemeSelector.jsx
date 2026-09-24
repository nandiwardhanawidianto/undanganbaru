// src/ThemeSelector.jsx

import React, { lazy, Suspense } from "react";

const VioletApp = lazy(() => import("./themes/Violet/App"));
const CustomVioletApp = lazy(() => import("./themes/CustomViolet/App"));
const SageApp = lazy(() => import("./themes/Sage/App"));
const BrownApp = lazy(() => import("./themes/Brown/App"));
const JawaApp = lazy(() => import("./themes/Jawa/App"));
const BiruApp = lazy(() => import("./themes/Biru/App"));
const HitamApp = lazy(() => import("./themes/Hitam/App"));
const PinkApp = lazy(() => import("./themes/Pink/App"));
const BaliApp = lazy(() => import("./themes/Bali/App"));
const BugisApp = lazy(() => import("./themes/Bugis/App"));
const BatakApp = lazy(() => import("./themes/Batak/App"));

export default function ThemeSelector({ data }) {
  const theme = data?.slug?.theme?.toLowerCase()?.trim() || "violet";

  let SelectedTheme;

  switch (theme) {
    case "violet":
      SelectedTheme = VioletApp;
      break;

    case "customviolet":
      SelectedTheme = CustomVioletApp;
      break;

    case "sage":
      SelectedTheme = SageApp;
      break;

    case "brown":
      SelectedTheme = BrownApp;
      break;

    case "jawa":
      SelectedTheme = JawaApp;
      break;

    case "biru":
      SelectedTheme = BiruApp;
      break;

    case "hitam":
      SelectedTheme = HitamApp;
      break;

    case "pink":
      SelectedTheme = PinkApp;
      break;

    case "bali":
      SelectedTheme = BaliApp;
      break;

    case "bugis":
      SelectedTheme = BugisApp;
      break;

    case "batak":
      SelectedTheme = BatakApp;
      break;

    default:
      console.warn(
        `Theme "${theme}" not found, fallback to Violet`
      );
      SelectedTheme = VioletApp;
      break;
  }

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      }
    >
      <SelectedTheme data={data} />
    </Suspense>
  );
}