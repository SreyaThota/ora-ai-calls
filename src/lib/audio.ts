// Audio manager singleton — Web Audio for tones, HTMLAudio for clips
type Listener = (muted: boolean) => void;

class AudioManager {
  private _muted = false;
  private listeners = new Set<Listener>();
  private ctx: AudioContext | null = null;
  private holdEl: HTMLAudioElement | null = null;
  private ringEl: HTMLAudioElement | null = null;

  get muted() {
    return this._muted;
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  toggleMute() {
    this._muted = !this._muted;
    if (this._muted) {
      this.stopHoldMusic();
      this.stopRingtone();
    }
    this.listeners.forEach((l) => l(this._muted));
  }

  private getCtx(): AudioContext | null {
    if (this._muted) return null;
    try {
      if (!this.ctx) {
        const Ctor = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
        this.ctx = new Ctor();
      }
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      return this.ctx;
    } catch {
      return null;
    }
  }

  playTone(freq: number, durationMs: number, volume = 0.08) {
    const ctx = this.getCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const now = ctx.currentTime;
      const dur = durationMs / 1000;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.01);
      gain.gain.linearRampToValueAtTime(volume, now + dur - 0.02);
      gain.gain.linearRampToValueAtTime(0, now + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur);
    } catch {
      // silent
    }
  }

  playSequence(seq: { freq: number; dur: number }[]) {
    let delay = 0;
    seq.forEach(({ freq, dur }) => {
      setTimeout(() => this.playTone(freq, dur), delay);
      delay += dur;
    });
  }

  playHintChime() {
    this.playTone(800, 200, 0.05);
  }

  playConnect() {
    this.playSequence([
      { freq: 440, dur: 150 },
      { freq: 880, dur: 150 },
    ]);
  }

  playDisconnect() {
    this.playSequence([
      { freq: 880, dur: 150 },
      { freq: 440, dur: 150 },
    ]);
  }

  playRingtone(rings = 2) {
    if (this._muted) return;
    try {
      this.stopRingtone();
      this.ringEl = new Audio("https://www.soundjay.com/phone/sounds/telephone-ring-01a.mp3");
      this.ringEl.volume = 0.4;
      let count = 0;
      const onEnd = () => {
        count++;
        if (count < rings && this.ringEl && !this._muted) {
          this.ringEl.currentTime = 0;
          this.ringEl.play().catch(() => {});
        } else {
          this.stopRingtone();
        }
      };
      this.ringEl.addEventListener("ended", onEnd);
      this.ringEl.play().catch(() => {});
    } catch {
      // silent
    }
  }

  stopRingtone() {
    try {
      if (this.ringEl) {
        this.ringEl.pause();
        this.ringEl.src = "";
        this.ringEl = null;
      }
    } catch {
      // silent
    }
  }

  playHoldMusic() {
    if (this._muted) return;
    try {
      this.stopHoldMusic();
      this.holdEl = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
      this.holdEl.loop = true;
      this.holdEl.volume = 0.3;
      this.holdEl.play().catch(() => {});
    } catch {
      // silent
    }
  }

  stopHoldMusic() {
    try {
      if (this.holdEl) {
        this.holdEl.pause();
        this.holdEl.src = "";
        this.holdEl = null;
      }
    } catch {
      // silent
    }
  }

  speak(text: string) {
    if (this._muted) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.volume = 0.7;
      u.rate = 1;
      window.speechSynthesis.speak(u);
    } catch {
      // silent
    }
  }
}

export const audio = new AudioManager();
