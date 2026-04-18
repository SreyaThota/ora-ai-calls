import { useEffect, useState } from "react";
import {
  Sparkles,
  User,
  ArrowLeftRight,
  CheckCircle2,
  Database,
  Clock,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AI_TIMELINE = [
  { time: "9:02:14", text: "Call received from Sarah Chen" },
  { time: "9:02:15", text: "Customer identified, history loaded" },
  { time: "9:02:16", text: "Intent predicted: delayed order (91% conf.)" },
  { time: "9:02:45", text: "Confirmed order #4821 delay with customer" },
  { time: "9:03:10", text: "Offered express reship — customer accepted" },
  { time: "9:03:28", text: "Applied $20 goodwill credit to account" },
  { time: "9:03:55", text: "Detected emotional signal (birthday mention)" },
  { time: "9:04:12", text: "Flagged for human: empathy closure needed" },
];

const EXTRACTED = [
  ["Issue type", "Delayed delivery"],
  ["Order", "#4821"],
  ["Product", "Wireless Headphones"],
  ["Resolution agreed", "Express reship + $20 credit"],
  ["Customer emotion", "Concerned → Relieved"],
  ["Outstanding", "Emotional reassurance, confirmation email"],
];

const TRANSCRIPT = [
  {
    who: "Maya",
    text: "Hi Sarah, I've just joined — I can see you've been so patient and I completely understand the timing concern with your daughter's birthday.",
  },
  { who: "Sarah", text: "Yes, I really need it before the 15th." },
  {
    who: "Maya",
    text: "I've confirmed the express reship is already processing — you'll have it by Dec 13th guaranteed. And the $20 credit is in your account right now.",
  },
  { who: "Sarah", text: "Oh that's such a relief, thank you." },
  { who: "Maya", text: "Of course! Is there anything else I can help with today?" },
];

export const ActiveHandoff = () => {
  const [visibleLines, setVisibleLines] = useState(1);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (visibleLines >= TRANSCRIPT.length) return;
    const id = setTimeout(() => setVisibleLines((v) => v + 1), 6000);
    return () => clearTimeout(id);
  }, [visibleLines]);

  const handleResolve = () => {
    toast({
      title: "Call returned to AI",
      description: "Maya has handed control back. Auto-summary in progress.",
    });
    setNotes("");
    setVisibleLines(1);
  };

  return (
    <div className="relative grid grid-cols-2 gap-0 max-w-[1400px] mx-auto p-6">
      {/* LEFT — AI workspace */}
      <section className="bg-info-soft/30 rounded-l-xl border border-r-0 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-ai flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-ai-foreground" />
            </div>
            <div>
              <div className="font-semibold text-sm">Ora AI</div>
              <div className="text-[11px] text-muted-foreground">AI workspace</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-success-soft text-success-soft-foreground px-2.5 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Active
          </span>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            <Clock className="h-3.5 w-3.5" /> AI actions timeline
          </div>
          <ol className="relative border-l-2 border-ai/20 ml-1.5 space-y-3">
            {AI_TIMELINE.map((e, i) => (
              <li key={i} className="pl-4 relative">
                <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-ai border-2 border-card" />
                <div className="text-[11px] tabular-nums text-muted-foreground font-mono">
                  {e.time}
                </div>
                <div className="text-sm text-foreground/85">{e.text}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            <Database className="h-3.5 w-3.5" /> Data extracted
          </div>
          <div className="space-y-2 text-sm">
            {EXTRACTED.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-medium bg-success-soft text-success-soft-foreground px-3 py-1.5 rounded-full">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Passed to human at 9:04:12
        </div>
      </section>

      {/* CENTER divider */}
      <div className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-px bg-border z-10 flex flex-col items-center pointer-events-none">
        <div className="sticky top-1/2 -translate-y-1/2 bg-card border rounded-full px-3 py-1.5 shadow-card flex items-center gap-2 text-[11px] font-medium whitespace-nowrap pointer-events-auto">
          <ArrowLeftRight className="h-3.5 w-3.5 text-ai" />
          Handoff point: 9:04:12
        </div>
      </div>

      {/* RIGHT — Human workspace */}
      <section className="bg-success-soft/30 rounded-r-xl border p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-semibold">
              MR
            </div>
            <div>
              <div className="font-semibold text-sm flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Maya R.
              </div>
              <div className="text-[11px] text-muted-foreground">Human workspace</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-success-soft text-success-soft-foreground px-2.5 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Live
          </span>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Context received from AI
          </div>
          <div className="text-sm text-foreground/85 leading-relaxed">
            Sarah Chen, high-LTV. Order #4821 delayed (Memphis warehouse). Already offered
            express reship (accepted) + $20 credit. Daughter's birthday Dec 15 — needs
            empathy closure.
          </div>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Live transcript
          </div>
          <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
            {TRANSCRIPT.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className="animate-fade-slide-in flex gap-2 text-sm"
              >
                <span
                  className={
                    line.who === "Maya"
                      ? "shrink-0 font-semibold text-success-soft-foreground w-14"
                      : "shrink-0 font-semibold text-ai w-14"
                  }
                >
                  {line.who}:
                </span>
                <span className="text-foreground/85 leading-relaxed">{line.text}</span>
              </div>
            ))}
            {visibleLines < TRANSCRIPT.length && (
              <div className="text-xs text-muted-foreground italic">Listening…</div>
            )}
          </div>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Notes
          </div>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add real-time notes…"
            className="min-h-[80px] resize-none"
          />
        </div>

        <button
          onClick={handleResolve}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-success hover:bg-success/90 text-success-foreground py-3 text-sm font-medium transition-colors"
        >
          <CheckCircle2 className="h-4 w-4" />
          Resolve & Return to AI
        </button>
      </section>
    </div>
  );
};
