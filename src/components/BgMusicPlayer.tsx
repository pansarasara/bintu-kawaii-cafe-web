
import React from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa9609.mp3"; // A cute café-like royalty-free track

const BgMusicPlayer: React.FC = () => {
  const [muted, setMuted] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try autoplay
    if (!muted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { /* ignore autoplay rejection */ });
      }
    } else {
      audio.pause();
    }
  }, [muted]);

  // Loop when ended
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const toggleMute = () => {
    setMuted(m => !m);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_URL}
        loop
        autoPlay
        muted={muted}
        preload="auto"
      />
      <button
        className="fixed bottom-4 right-4 z-50 bg-kawaii-gold p-3 rounded-full shadow-lg border-2 border-kawaii-purple text-amber-900 hover:bg-amber-200 transition-all"
        style={{ fontSize: 22 }}
        onClick={toggleMute}
        aria-label={muted ? "Unmute background music" : "Mute background music"}
      >
        {muted ? <VolumeX className="w-6 h-6" /> : <Music className="w-6 h-6 animate-pulse" />}
      </button>
    </>
  );
};

export default BgMusicPlayer;
