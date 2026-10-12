// src/App.jsx
import useInvitationData from "./hooks/useInvitationData";
import ThemeSelector from "./ThemeSelector";

function App() {
  const { data, loading, error } = useInvitationData();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
        <p className="text-center text-white/80">Memuat undangan...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/5 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-semibold">Undangan tidak ditemukan</h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Link undangan tidak valid atau undangan sudah tidak tersedia.
            Silakan periksa kembali link yang Anda terima.
          </p>
        </div>
      </div>
    );
  }

  return <ThemeSelector data={data} />;
}

export default App;
