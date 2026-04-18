import { Phone, Radar, Users, AudioWaveform } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Screen = "live" | "outreach" | "team";

const items: { id: Screen; label: string; icon: React.ElementType }[] = [
  { id: "live", label: "Live Calls", icon: Phone },
  { id: "outreach", label: "Proactive Outreach", icon: Radar },
  { id: "team", label: "Team Overview", icon: Users },
];

export const Sidebar = ({ active, onChange }: { active: Screen; onChange: (s: Screen) => void }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col h-screen border-r border-sidebar-border">
      <div className="px-5 pt-6 pb-8 flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-gradient-ai flex items-center justify-center shadow-soft">
          <AudioWaveform className="h-5 w-5 text-ai-foreground" />
        </div>
        <div>
          <div className="text-sidebar-primary-foreground font-semibold text-lg leading-none">Ora</div>
          <div className="text-[11px] text-sidebar-foreground/60 mt-1">AI in every call.</div>
        </div>
      </div>

      <nav className="px-3 flex-1 space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-primary-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "text-sidebar-primary")} />
              <span className="font-medium">{it.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-2.5 px-2">
          <span className="relative inline-flex h-2 w-2 text-success">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-medium text-sidebar-primary-foreground">AI Status: Active</span>
        </div>
        <div className="px-2 text-[11px] text-sidebar-foreground/60 tabular-nums">
          {time.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} ·{" "}
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </aside>
  );
};
