import { Phone, Music2 } from "lucide-react";

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

export const CustomerView = ({ holdSeconds }: { holdSeconds: number }) => (
  <div className="fixed bottom-5 right-5 z-40 w-72 rounded-xl border bg-card shadow-soft animate-fade-slide-in overflow-hidden">
    <div className="px-3 py-2 bg-secondary text-[10px] uppercase tracking-wide text-muted-foreground font-medium border-b">
      Customer view
    </div>
    <div className="p-4 flex items-center gap-3">
      <div className="h-12 w-12 rounded-full bg-gradient-ai flex items-center justify-center shrink-0">
        <Phone className="h-5 w-5 text-ai-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold flex items-center gap-1.5">
          <Music2 className="h-3.5 w-3.5 text-ai animate-pulse" />
          On hold
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 truncate">
          Connecting you to a specialist
        </div>
        <div className="text-xs tabular-nums font-mono text-muted-foreground mt-1">
          {formatTime(holdSeconds)}
        </div>
      </div>
    </div>
  </div>
);
