import { useEffect, useState } from "react";
import { audio } from "@/lib/audio";

export const useAudio = () => {
  const [muted, setMuted] = useState(audio.muted);

  useEffect(() => {
    return audio.subscribe(setMuted);
  }, []);

  return {
    muted,
    toggleMute: () => audio.toggleMute(),
    playHintChime: () => audio.playHintChime(),
    playConnect: () => audio.playConnect(),
    playDisconnect: () => audio.playDisconnect(),
    playRingtone: (rings?: number) => audio.playRingtone(rings),
    stopRingtone: () => audio.stopRingtone(),
    playHoldMusic: () => audio.playHoldMusic(),
    stopHoldMusic: () => audio.stopHoldMusic(),
    speak: (t: string) => audio.speak(t),
  };
};
