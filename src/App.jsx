// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Counttanggal from './components/Counttanggal';
import Mempelai from './components/Mempelai';
import Tanggal from './components/Tanggal';
import Galeri from './components/Galeri';
import Ucapan from './components/Ucapan';
import Footer from './components/Footer';
import Lovegift from './components/Lovegift';
import ModalUndangan from './components/Modalundangan';
import MusicPlayer from './components/MusicPlayer';
import bgImage from './assets/BG.png';

import { useState } from 'react';
import useInvitationData from './hooks/useInvitationData';

function App() {
  const [showModal, setShowModal] = useState(true);
  const { data, loading, error } = useInvitationData();

  const handleBukaUndangan = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading data...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!data) return <p className="text-center mt-10 text-white">No data available...</p>;

  return (
    <>
      {/* Modal Awal */}
      {showModal && <ModalUndangan data={data} onBukaUndangan={handleBukaUndangan} />}

      {/* Background Global */}
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Komponen Utama */}
      <Navbar />
      <MusicPlayer />
      <Hero data={data} />
      <Counttanggal data={data} />
      <Mempelai data={data} />
      <Tanggal data={data} />
      <Galeri data={data} />
      <Lovegift data={data} />

      {/* Kirim slugListId untuk ucapan */}
      <Ucapan slugId={data?.slug?.slug} />

      <Footer data={data} />
    </>
  );
}

export default App;
