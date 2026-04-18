import { useEffect, useState } from "react";
import { Sidebar, type Screen } from "@/components/ora/Sidebar";
import { LiveCalls } from "@/components/ora/LiveCalls";
import { Outreach } from "@/components/ora/Outreach";
import { TeamOverview } from "@/components/ora/TeamOverview";

const titles: Record<Screen, string> = {
  live: "Live Calls",
  outreach: "Proactive Outreach",
  team: "Team & AI Overview",
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("live");

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
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <header className="sr-only">
          <h1>Ora — {titles[screen]}</h1>
        </header>
        {screen === "live" && <LiveCalls />}
        {screen === "outreach" && <Outreach />}
        {screen === "team" && <TeamOverview />}
      </main>
    </div>
  );
};

export default Index;
