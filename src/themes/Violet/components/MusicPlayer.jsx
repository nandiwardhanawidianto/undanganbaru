import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MusicPlayer({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  // Ambil lagu pertama dari API
  useEffect(() => {
    if (data?.songlist?.length > 0) {
      const firstSong = data.songlist[0].song || data.songlist[0];
      setCurrentSong(firstSong.url);
    }
  }, [data]);

  useEffect(() => {
    // Otomatis play ketika user klik "Buka Undangan"
    const handleUserInteraction = () => {
      if (audioRef.current && currentSong) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.log("Play error:", error));
      }
    };
    window.addEventListener("userInteraction", handleUserInteraction);
    return () => window.removeEventListener("userInteraction", handleUserInteraction);
  }, [currentSong]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Play error:", error);
      }
    }
  };

  if (!currentSong) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src={currentSong} />

      <div className="fixed right-6 bottom-16 z-50">
        <button
          onClick={togglePlayPause}
          className="bg-white/90 hover:bg-white text-hijau-500 rounded-full p-4 shadow-2xl border-2 border-hijau-600 transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
        </button>
      </div>
    </>
  );
}
