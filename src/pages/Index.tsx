import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Sidebar, type Screen } from "@/components/ora/Sidebar";
import { LiveCalls } from "@/components/ora/LiveCalls";
import { Outreach } from "@/components/ora/Outreach";
import { TeamOverview } from "@/components/ora/TeamOverview";
import { ActiveHandoff } from "@/components/ora/ActiveHandoff";
import { ProductInsights } from "@/components/ora/ProductInsights";
import { useAudio } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";

const titles: Record<Screen, string> = {
  live: "Live Calls",
  outreach: "Proactive Outreach",
  team: "Team & AI Overview",
  handoff: "Active Handoff",
  insights: "Product Insights",
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("live");
  const { muted, toggleMute } = useAudio();

  useEffect(() => {
    document.title = `Ora · ${titles[screen]}`;
    const desc =
      "Ora — AI-native phone system for B2C: live AI co-pilot, proactive outreach, and human-AI collaboration.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [screen]);

  return (
    <div className="flex min-h-screen w-full bg-surface">
      <Sidebar active={screen} onChange={setScreen} />
      <main className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
        <header className="h-14 shrink-0 px-6 flex items-center justify-between border-b bg-card/60 backdrop-blur">
          <h1 className="text-sm font-semibold text-foreground">{titles[screen]}</h1>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute audio" : "Mute audio"}
            title={muted ? "Unmute" : "Mute"}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              muted
                ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            {muted ? "Muted" : "Sound on"}
          </button>
        </header>
        <div className="flex-1 min-w-0">
          {screen === "live" && <LiveCalls />}
          {screen === "outreach" && <Outreach />}
          {screen === "team" && <TeamOverview />}
          {screen === "handoff" && <ActiveHandoff />}
          {screen === "insights" && <ProductInsights />}
        </div>
      </main>
    </div>
  );
};

export default Index;
