import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hitam2App from "./themes/Hitam2/App";

export default function Hitam2Preview() {
  const { slugId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slugId) {
      setError("Slug tidak ditemukan di URL.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");

        // During local development, Vite proxies /cms-api to the real CMS.
        // This bypasses browser CORS and keeps the real invitation slug.
        const localProxyUrl = `/cms-api/slug/${encodeURIComponent(slugId)}/listapi`;
        const productionUrl =
          `https://cms.royalweddinginvitiation.com/api/slug/${encodeURIComponent(slugId)}/listapi`;

        const url = import.meta.env.DEV ? localProxyUrl : productionUrl;

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        const text = await response.text();
        let result;

        try {
          result = JSON.parse(text);
        } catch {
          throw new Error(
            `API tidak mengembalikan JSON. HTTP ${response.status}. Response: ${text.slice(0, 180)}`
          );
        }

        if (!response.ok) {
          throw new Error(
            result?.message || result?.error || `HTTP ${response.status}`
          );
        }

        if (!result?.success || !result?.data) {
          throw new Error("Struktur API tidak sesuai: success/data tidak ditemukan.");
        }

        console.log("[Hitam2 Preview] slug:", slugId);
        console.log("[Hitam2 Preview] API data:", result.data);
        setData(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("[Hitam2 Preview] API error:", err);
          setError(err.message || "Gagal mengambil data CMS.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slugId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1f1f1f] p-8 text-center text-white">
        Mengambil data CMS untuk slug: <strong>{slugId}</strong>...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1f1f1f] p-6 text-white">
        <div className="mx-auto max-w-xl rounded-xl border border-red-400 bg-red-950/40 p-5">
          <h1 className="text-xl font-bold text-red-300">Hitam2 API Preview Error</h1>
          <p className="mt-3 break-words text-sm">{error}</p>
          <p className="mt-4 text-xs text-white/70">Slug: {slugId || "-"}</p>
          <p className="mt-1 text-xs text-white/70">
            Endpoint: /api/slug/{slugId || "SLUG"}/listapi
          </p>
        </div>
      </div>
    );
  }

  return <Hitam2App data={data} />;
}
