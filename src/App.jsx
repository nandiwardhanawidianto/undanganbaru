// src/App.jsx
import useInvitationData from "./hooks/useInvitationData";
import ThemeSelector from "./ThemeSelector";

function App() {
  const { data, loading, error, slug } = useInvitationData();

  if (loading) {
    return <p className="text-center mt-10">Loading data untuk {slug}...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <div className="mx-auto max-w-xl rounded-xl border border-red-500 p-5">
          <h1 className="font-bold text-red-400">API Error</h1>
          <p className="mt-2">Slug: {slug}</p>
          <p className="mt-2">{error}</p>
          <p className="mt-3 break-all text-xs text-white/70">
            https://cms.royalweddinginvitiation.com/api/slug/{slug}/listapi
          </p>
        </div>
      </div>
    );
  }

  if (!data) return <p className="text-center mt-10">No data available...</p>;

  return <ThemeSelector data={data} />;
}

export default App;
