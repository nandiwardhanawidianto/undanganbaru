import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import Music1 from "../assets/Music1.mp3";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Listen untuk event userInteraction dari ModalUndangan
    const handleUserInteraction = () => {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.log("Play error:", error));
    };

    window.addEventListener('userInteraction', handleUserInteraction);

    return () => {
      window.removeEventListener('userInteraction', handleUserInteraction);
    };
  }, []);

  const togglePlayPause = async () => {
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

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={Music1} type="audio/mpeg" />
      </audio>

      <div className="fixed right-6 bottom-16 z-50">
        <button
          onClick={togglePlayPause}
          className="bg-white/90 hover:bg-white text-ungu-500 rounded-full p-4 shadow-2xl border-2 border-ungu-500 transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
        </button>
      </div>
    </>
  );
}