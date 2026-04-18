import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Phone,
  PhoneOff,
  Hand,
  Bot,
  Check,
  Package,
  TrendingUp,
  Cake,
  ShieldAlert,
  CheckCircle2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const HINTS = [
  { at: 0, text: "Customer confirmed order #4821. Delay caused by warehouse issue in Memphis." },
  { at: 7, text: "Offer express reship — estimated delivery Dec 13. Cost: $0 to customer." },
  { at: 14, text: "She mentioned her daughter's birthday. Acknowledge this — high empathy moment." },
  { at: 21, text: "Sentiment positive. She accepted the reship offer. Begin closing." },
  { at: 28, text: "Suggest $20 store credit as goodwill gesture. 94% satisfaction rate for this segment." },
];

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

const Typewriter = ({ text, start, speed = 28 }: { text: string; start: boolean; speed?: number }) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [start, text, speed]);
  return (
    <span className={cn(out.length < text.length && start && "caret")}>
      {start ? out : ""}
    </span>
  );
};

export const LiveCalls = () => {
  const [seconds, setSeconds] = useState(0);
  const [aiHandling, setAiHandling] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const visibleHints = useMemo(() => HINTS.filter((h) => seconds >= h.at), [seconds]);

  const steps = [
    { label: "Confirm order delay and apologize", at: 5 },
    { label: "Offer free express reship", at: 15 },
    { label: "Apply $20 goodwill credit", at: 28 },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 p-6 max-w-[1400px] mx-auto">
      {/* LEFT — Customer Intel */}
      <section className="col-span-3 space-y-4">
        <div className="bg-card rounded-xl border shadow-card p-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-ai text-ai-foreground flex items-center justify-center font-semibold">
              SC
            </div>
            <div>
              <div className="font-semibold text-foreground">Sarah Chen</div>
              <div className="text-xs text-muted-foreground tabular-nums">+1 (415) 555-0291</div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ai-soft text-ai-soft-foreground text-xs font-medium px-2.5 py-1">
            <Sparkles className="h-3 w-3" />
            Delayed order enquiry · 91% confidence
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-secondary p-2">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">LTV</div>
              <div className="text-sm font-semibold">$2,840</div>
            </div>
            <div className="rounded-lg bg-secondary p-2">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Calls</div>
              <div className="text-sm font-semibold">3</div>
            </div>
            <div className="rounded-lg bg-success-soft p-2">
              <div className="text-[10px] uppercase tracking-wide text-success-soft-foreground">Mood</div>
              <div className="text-sm font-semibold text-success-soft-foreground">Positive</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <Package className="h-3.5 w-3.5" /> Last Order
          </div>
          <div className="mt-2 font-semibold text-sm">Order #4821 — Wireless Headphones</div>
          <div className="mt-1 text-xs text-warning-soft-foreground bg-warning-soft inline-block px-2 py-0.5 rounded-full">
            3 days delayed · Expected Dec 12
          </div>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-md bg-ai-soft flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-ai" />
            </div>
            <div className="text-sm font-semibold">AI Briefing</div>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li className="flex gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-ai shrink-0" />
              <span className="text-foreground/80">High-value customer, handle with priority</span>
            </li>
            <li className="flex gap-2">
              <ShieldAlert className="h-4 w-4 mt-0.5 text-ai shrink-0" />
              <span className="text-foreground/80">
                Mention express reship — <span className="font-medium">78% acceptance rate</span>
              </span>
            </li>
            <li className="flex gap-2">
              <Cake className="h-4 w-4 mt-0.5 text-ai shrink-0" />
              <span className="text-foreground/80">Her daughter's birthday is Dec 15 — time-sensitive</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CENTER — Live Call */}
      <section className="col-span-6 space-y-4">
        <div className="bg-card rounded-xl border shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b bg-surface">
            <div className="flex items-center gap-2 text-sm">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              <span className="font-medium">Call in progress</span>
            </div>
            <div className="text-sm tabular-nums font-mono text-muted-foreground">{formatTime(seconds)}</div>
          </div>

          {/* Waveform */}
          <div className="flex items-end justify-center gap-1.5 h-28 px-6">
            {[0.6, 0.9, 0.5, 1.1, 0.75].map((d, i) => (
              <div
                key={i}
                className="wave-bar w-2 rounded-full bg-gradient-ai"
                style={{
                  height: "60%",
                  animationDuration: `${d}s`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>

          {aiHandling ? (
            <div className="mx-5 mb-4 rounded-lg bg-info-soft text-info-soft-foreground text-xs px-3 py-2 flex items-center gap-2">
              <Bot className="h-3.5 w-3.5" />
              AI is handling this call autonomously
            </div>
          ) : (
            <div className="mx-5 mb-4 rounded-lg bg-success-soft text-success-soft-foreground text-xs px-3 py-2 flex items-center gap-2">
              <Hand className="h-3.5 w-3.5" />
              You have control — AI is listening
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl border shadow-card">
          <div className="flex items-center justify-between px-5 py-3 border-b">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-ai flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-ai-foreground" />
              </div>
              <div className="font-semibold text-sm">AI Co-Pilot</div>
            </div>
            <div className="text-xs text-muted-foreground">{visibleHints.length} suggestions</div>
          </div>

          <div className="p-4 space-y-2.5 max-h-[280px] overflow-y-auto">
            {visibleHints.length === 0 && (
              <div className="text-xs text-muted-foreground text-center py-6">Listening for cues…</div>
            )}
            {visibleHints.map((h, i) => (
              <div
                key={i}
                className="animate-fade-slide-in flex gap-3 rounded-lg bg-ai-soft/60 border border-ai-soft px-3 py-2.5"
              >
                <Sparkles className="h-4 w-4 text-ai shrink-0 mt-0.5" />
                <div className="text-sm text-foreground/90 leading-relaxed">{h.text}</div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <button
              onClick={() => setAiHandling((v) => !v)}
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white transition-colors",
                aiHandling
                  ? "bg-info hover:bg-info/90"
                  : "bg-success hover:bg-success/90"
              )}
            >
              {aiHandling ? <Bot className="h-4 w-4" /> : <Hand className="h-4 w-4" />}
              {aiHandling ? "AI Handling Call · Take Over" : "You Have Control · Hand back to AI"}
            </button>
          </div>
        </div>
      </section>

      {/* RIGHT — Resolution */}
      <section className="col-span-3 space-y-4">
        <div className="bg-card rounded-xl border shadow-card p-5">
          <div className="text-sm font-semibold mb-4">Suggested Resolution</div>
          <ul className="space-y-3">
            {steps.map((step, i) => {
              const checked = seconds >= step.at;
              return (
                <li
                  key={i}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 transition-all",
                    checked ? "bg-success-soft border-success/20" : "bg-secondary border-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors mt-0.5",
                      checked ? "bg-success border-success" : "border-muted-foreground/40"
                    )}
                  >
                    {checked && <Check className="h-3 w-3 text-success-foreground" strokeWidth={3} />}
                  </div>
                  <span
                    className={cn(
                      "text-sm",
                      checked ? "text-success-soft-foreground line-through" : "text-foreground/80"
                    )}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-card rounded-xl border shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-sm font-semibold">Auto-filling CRM</div>
            <span className="text-[10px] uppercase tracking-wide text-ai font-medium bg-ai-soft px-1.5 py-0.5 rounded">
              live
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Issue type</div>
              <div className="rounded-md bg-secondary px-3 py-2 min-h-[36px]">
                <Typewriter text="Delayed delivery" start={seconds >= 3} />
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Resolution</div>
              <div className="rounded-md bg-secondary px-3 py-2 min-h-[36px]">
                <Typewriter text="Express reship + credit" start={seconds >= 20} />
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Outcome</div>
              <div className="rounded-md bg-secondary px-3 py-2 min-h-[36px]">
                <Typewriter text="Resolved — customer satisfied" start={seconds >= 32} />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSummary(true)}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground py-3 text-sm font-medium transition-colors"
        >
          <PhoneOff className="h-4 w-4" />
          End Call & Auto-Summarize
        </button>
      </section>

      {showSummary && <SummaryModal seconds={seconds} onClose={() => setShowSummary(false)} />}
    </div>
  );
};

const SummaryModal = ({ seconds, onClose }: { seconds: number; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-slide-in">
    <div className="bg-card rounded-xl shadow-soft border w-full max-w-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-ai" />
          <div className="font-semibold">Call Summary — Auto-generated</div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-ai text-ai-foreground flex items-center justify-center font-semibold text-sm">
            SC
          </div>
          <div>
            <div className="font-medium text-sm">Sarah Chen · Order #4821</div>
            <div className="text-xs text-muted-foreground tabular-nums">
              Duration: {formatTime(seconds)}
            </div>
          </div>
        </div>

        <div className="text-sm leading-relaxed text-foreground/85 bg-secondary rounded-lg p-3.5">
          Sarah called regarding her delayed wireless headphones order. Apologized for the
          warehouse delay in Memphis, offered a complimentary express reship arriving Dec 13 in
          time for her daughter's birthday, and applied a $20 store credit as a goodwill gesture.
          Customer expressed satisfaction and confirmed the resolution.
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-success-soft p-2">
            <div className="text-[10px] uppercase tracking-wide text-success-soft-foreground">Outcome</div>
            <div className="text-xs font-semibold text-success-soft-foreground mt-0.5">Resolved</div>
          </div>
          <div className="rounded-lg bg-ai-soft p-2">
            <div className="text-[10px] uppercase tracking-wide text-ai-soft-foreground">Sentiment</div>
            <div className="text-xs font-semibold text-ai-soft-foreground mt-0.5">Positive</div>
          </div>
          <div className="rounded-lg bg-info-soft p-2">
            <div className="text-[10px] uppercase tracking-wide text-info-soft-foreground">CSAT</div>
            <div className="text-xs font-semibold text-info-soft-foreground mt-0.5">5 / 5</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-success text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" />
          Synced to CRM
        </div>
      </div>
      <div className="px-5 py-3 border-t bg-surface flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-90"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);
