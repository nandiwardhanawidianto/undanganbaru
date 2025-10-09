// src/App.jsx
import useInvitationData from "./hooks/useInvitationData";
import ThemeSelector from "./ThemeSelector";

function App() {
  const { data, loading, error } = useInvitationData();

  if (loading) return <p className="text-center mt-10 text-white">Loading data...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!data) return <p className="text-center mt-10 text-white">No data available...</p>;

  return <ThemeSelector data={data} />;
}

export default App;
