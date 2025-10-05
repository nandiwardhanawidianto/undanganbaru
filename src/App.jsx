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
  const { data, loading, slug } = useInvitationData();

  const handleBukaUndangan = () => {
    setShowModal(false);
    document.body.style.overflow = 'unset';
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading data...</p>;

  return (
    <>
      {showModal && <ModalUndangan data={data} onBukaUndangan={handleBukaUndangan} />}

      {/* Background Global */}
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <Navbar />
      <MusicPlayer />
      <Hero data={data} />
      <Counttanggal data={data} />
      <Mempelai data={data} />
      <Tanggal data={data} />
      <Galeri data={data} />
      <Lovegift data={data} />
      <Ucapan data={data} />
      <Footer data={data} />
    </>
  );
}

export default App;
