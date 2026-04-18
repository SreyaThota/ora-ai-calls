import { useState } from "react";
import { ChevronDown, Bot, CheckCircle2, Clock, Radar } from "lucide-react";
import { cn } from "@/lib/utils";

type Row = {
  id: number;
  name: string;
  initials: string;
  trigger: string;
  action: string;
  status: "resolved" | "in-progress" | "pending";
  outcome: string;
  transcript?: { speaker: "AI" | "Customer"; text: string }[];
  meta?: string;
};

const rows: Row[] = [
  {
    id: 1,
    name: "Marcus Webb",
    initials: "MW",
    trigger: "Order delayed 4 days",
    action: "AI called at 9:02am",
    status: "resolved",
    outcome: "Accepted reship, no escalation",
    transcript: [
      {
        speaker: "AI",
        text: "Hi Marcus, this is Ora calling from ShopCo. I'm reaching out because I noticed your order #3892 is running 4 days behind schedule — I wanted to get ahead of this for you...",
      },
      { speaker: "Customer", text: "Oh wow, I hadn't even noticed yet." },
      {
        speaker: "AI",
        text: "We'd like to offer you a free express reship arriving tomorrow, at no cost. Would that work?",
      },
      { speaker: "Customer", text: "Yes, that's perfect, thank you." },
      { speaker: "AI", text: "Done — you'll get a confirmation in 2 minutes. Have a great day." },
    ],
    meta: "Call duration: 1m 12s · Resolved without human intervention",
  },
  {
    id: 2,
    name: "Priya Nair",
    initials: "PN",
    trigger: "Payment failed x2",
    action: "AI called at 9:15am",
    status: "resolved",
    outcome: "Updated card details",
  },
  {
    id: 3,
    name: "Tom Okafor",
    initials: "TO",
    trigger: "Subscription about to expire",
    action: "AI calling now…",
    status: "in-progress",
    outcome: "—",
  },
  {
    id: 4,
    name: "Lisa Huang",
    initials: "LH",
    trigger: "Product recalled (safety)",
    action: "AI called at 10:30am",
    status: "resolved",
    outcome: "Replacement shipped",
  },
  {
    id: 5,
    name: "James Arora",
    initials: "JA",
    trigger: "3 failed login attempts",
    action: "Scheduled 11:00am",
    status: "pending",
    outcome: "—",
  },
  {
    id: 6,
    name: "Chloe Martin",
    initials: "CM",
    trigger: "Shipping address invalid",
    action: "AI called at 8:45am",
    status: "resolved",
    outcome: "Address corrected",
  },
];

const StatusPill = ({ status }: { status: Row["status"] }) => {
  if (status === "resolved")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-success-soft text-success-soft-foreground">
        <CheckCircle2 className="h-3 w-3" /> Resolved
      </span>
    );
  if (status === "in-progress")
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-info-soft text-info-soft-foreground">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-info opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-info" />
        </span>
        In progress
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
      <Clock className="h-3 w-3" /> Pending
    </span>
  );
};

export const Outreach = () => {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-5">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Radar className="h-6 w-6 text-ai" />
            AI Outreach — Today
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI identified <span className="font-medium text-foreground">14 customers</span> who
            need proactive contact
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Resolved by AI" value="11" tone="success" />
          <StatCard label="Escalated to human" value="2" tone="warning" />
          <StatCard label="Avg call time" value="1m 8s" tone="info" />
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-card overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1.4fr_1.4fr_1fr_1.6fr_32px] gap-3 px-5 py-3 border-b bg-surface text-[11px] uppercase tracking-wide font-medium text-muted-foreground">
          <div>Customer</div>
          <div>Trigger Signal</div>
          <div>AI Action</div>
          <div>Status</div>
          <div>Outcome</div>
          <div />
        </div>

        {rows.map((r) => {
          const isOpen = open === r.id;
          return (
            <div key={r.id} className="border-b last:border-b-0">
              <button
                onClick={() => setOpen(isOpen ? null : r.id)}
                className={cn(
                  "w-full grid grid-cols-[1.4fr_1.4fr_1.4fr_1fr_1.6fr_32px] gap-3 px-5 py-3.5 text-left items-center text-sm transition-colors",
                  isOpen ? "bg-secondary/60" : "hover:bg-secondary/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-gradient-ai text-ai-foreground flex items-center justify-center text-xs font-semibold">
                    {r.initials}
                  </div>
                  <div className="font-medium">{r.name}</div>
                </div>
                <div className="text-foreground/80">{r.trigger}</div>
                <div className="flex items-center gap-1.5 text-foreground/80">
                  <Bot className="h-3.5 w-3.5 text-ai" />
                  {r.action}
                </div>
                <div>
                  <StatusPill status={r.status} />
                </div>
                <div className="text-foreground/80">{r.outcome}</div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 bg-secondary/30 animate-fade-slide-in">
                  {r.transcript ? (
                    <div className="rounded-lg bg-card border p-4 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        <Sparkle /> Call transcript
                      </div>
                      {r.transcript.map((t, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <div
                            className={cn(
                              "shrink-0 w-16 text-xs font-semibold pt-0.5",
                              t.speaker === "AI" ? "text-ai" : "text-muted-foreground"
                            )}
                          >
                            {t.speaker}
                          </div>
                          <div className="text-foreground/85 leading-relaxed">{t.text}</div>
                        </div>
                      ))}
                      {r.meta && (
                        <div className="pt-3 mt-1 border-t text-xs text-muted-foreground">
                          {r.meta}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground italic px-1">
                      Transcript not available for this call.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Sparkle = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-ai">
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
  </svg>
);

const StatCard = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "success" | "warning" | "info";
}) => {
  const map = {
    success: "bg-success-soft text-success-soft-foreground",
    warning: "bg-warning-soft text-warning-soft-foreground",
    info: "bg-info-soft text-info-soft-foreground",
  } as const;
  return (
    <div className="bg-card rounded-xl border shadow-card px-4 py-3 min-w-[160px]">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xl font-semibold tabular-nums">{value}</span>
        <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", map[tone])}>
          today
        </span>
      </div>
    </div>
  );
};
