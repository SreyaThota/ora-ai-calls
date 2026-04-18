import {
  Bot,
  Users,
  Phone,
  PhoneCall,
  Sparkles,
  ClipboardCheck,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const topStats = [
  { label: "Total calls today", value: "247", icon: Phone, tone: "neutral" as const },
  { label: "Handled by AI alone", value: "189", sub: "77%", icon: Bot, tone: "ai" as const },
  { label: "AI-assisted human calls", value: "41", sub: "17%", icon: Sparkles, tone: "info" as const },
  { label: "Escalated to human only", value: "17", sub: "6%", icon: Users, tone: "warning" as const },
];

const agents = [
  { name: "Maya R.", initials: "MR", status: "On call", calls: 32, score: 92, hint: "uses AI suggestions frequently" },
  { name: "Daniel K.", initials: "DK", status: "Available", calls: 24, score: 88, hint: "consistent with AI guidance" },
  { name: "Sofia T.", initials: "ST", status: "Break", calls: 18, score: 81, hint: "occasionally overrides AI" },
  { name: "Liam J.", initials: "LJ", status: "On call", calls: 27, score: 95, hint: "top AI collaborator" },
];

const metrics = [
  { label: "Intent prediction accuracy", value: 94, suffix: "%" },
  { label: "Resolutions without escalation", value: 77, suffix: "%" },
  { label: "Avg handle time reduction", value: 38, suffix: "%" },
  { label: "Customer satisfaction (CSAT)", value: 96, display: "4.8 / 5" },
  { label: "Proactive issues caught", value: 70, display: "14" },
];

const stages = [
  { label: "Pre-call briefing", icon: ClipboardCheck },
  { label: "Call starts", icon: PlayCircle },
  { label: "AI co-pilot active", icon: Sparkles },
  { label: "Resolution suggested", icon: PhoneCall },
  { label: "Auto-summary", icon: Bot },
];

const statusTone = (s: string) =>
  s === "On call"
    ? "bg-info-soft text-info-soft-foreground"
    : s === "Available"
    ? "bg-success-soft text-success-soft-foreground"
    : "bg-secondary text-muted-foreground";

export const TeamOverview = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Team & AI Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          How your humans and Ora are working together today.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {topStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card rounded-xl border shadow-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
                <div
                  className={cn(
                    "h-7 w-7 rounded-lg flex items-center justify-center",
                    s.tone === "ai" && "bg-ai-soft text-ai",
                    s.tone === "info" && "bg-info-soft text-info",
                    s.tone === "warning" && "bg-warning-soft text-warning",
                    s.tone === "neutral" && "bg-secondary text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tabular-nums">{s.value}</span>
                {s.sub && <span className="text-xs text-muted-foreground">{s.sub}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Team */}
        <div className="bg-card rounded-xl border shadow-card">
          <div className="px-5 py-3 border-b flex items-center justify-between">
            <div className="font-semibold text-sm">Your Team</div>
            <div className="text-xs text-muted-foreground">4 agents</div>
          </div>
          <div className="p-3 space-y-2">
            {agents.map((a) => (
              <div
                key={a.name}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-ai text-ai-foreground flex items-center justify-center text-sm font-semibold">
                  {a.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm">{a.name}</div>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                        statusTone(a.status)
                      )}
                    >
                      {a.status}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {a.calls} calls today · AI-assist {a.score}% — {a.hint}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI metrics */}
        <div className="bg-card rounded-xl border shadow-card">
          <div className="px-5 py-3 border-b flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-ai" />
            <div className="font-semibold text-sm">AI Performance Today</div>
          </div>
          <div className="p-5 space-y-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-foreground/80">{m.label}</span>
                  <span className="font-semibold tabular-nums">
                    {m.display ?? `${m.value}${m.suffix ?? ""}`}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-ai rounded-full transition-all duration-700"
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lifecycle */}
      <div className="bg-card rounded-xl border shadow-card p-5">
        <div className="font-semibold text-sm mb-5">Call lifecycle with Ora</div>
        <div className="flex items-center justify-between gap-2">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="h-11 w-11 rounded-full bg-ai-soft text-ai flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-medium text-center text-foreground/80">{s.label}</div>
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mb-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
