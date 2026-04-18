import { useState } from "react";
import { Download, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Priority = "high" | "medium";

const ROWS: {
  id: number;
  issue: string;
  customer: string;
  date: string;
  rootCause: string;
  action: string;
  recommendation: string;
  priority: Priority;
  transcript: string;
  handoffMoment: string;
  humanAction: string;
}[] = [
  {
    id: 1,
    issue: "Delivery delay — birthday gift",
    customer: "Sarah Chen",
    date: "Dec 9",
    rootCause: "Warehouse routing bug in Memphis hub",
    action: "Express reship + goodwill credit",
    recommendation: "Fix Memphis routing algorithm",
    priority: "high",
    transcript:
      "Customer called concerned about delayed birthday gift. AI confirmed delay, offered express reship + $20 credit (accepted).",
    handoffMoment: "9:04:12 — emotional signal detected (daughter's birthday)",
    humanAction: "Provided empathy closure, confirmed reship email, thanked for patience.",
  },
  {
    id: 2,
    issue: "Payment retry loop",
    customer: "Marcus Webb",
    date: "Dec 8",
    rootCause: "Payment gateway timeout not handled",
    action: "Manual card re-entry",
    recommendation: "Add retry with exponential backoff",
    priority: "high",
    transcript: "Customer's card failed twice with 504 timeout. AI triaged but could not bypass gateway.",
    handoffMoment: "10:21:08 — third retry failed, escalated",
    humanAction: "Walked customer through manual re-entry, confirmed charge.",
  },
  {
    id: 3,
    issue: "Wrong item delivered",
    customer: "Priya Nair",
    date: "Dec 8",
    rootCause: "SKU mapping error in warehouse",
    action: "Replacement shipped",
    recommendation: "Audit SKU mapping table",
    priority: "high",
    transcript: "Customer received wrong product. AI identified SKU mismatch but lacked auth to issue replacement.",
    handoffMoment: "11:42:55 — replacement requires manager approval",
    humanAction: "Approved replacement, shipped same-day, return label issued.",
  },
  {
    id: 4,
    issue: "Subscription cancellation — price",
    customer: "Tom Okafor",
    date: "Dec 7",
    rootCause: "No discount offer in AI flow",
    action: "Offered 20% discount — retained",
    recommendation: "Add retention discount to AI script",
    priority: "medium",
    transcript: "Customer wanted to cancel due to price. AI processed cancellation request without retention attempt.",
    handoffMoment: "14:15:30 — cancel intent confirmed, no AI retention path",
    humanAction: "Offered 20% loyalty discount — customer retained.",
  },
  {
    id: 5,
    issue: "App login failure",
    customer: "Lisa Huang",
    date: "Dec 7",
    rootCause: "OAuth token expiry bug",
    action: "Manual password reset",
    recommendation: "Fix OAuth refresh token logic",
    priority: "high",
    transcript: "Customer locked out after token expiry. AI could not reset session-level auth.",
    handoffMoment: "15:02:11 — auth required elevated permissions",
    humanAction: "Triggered manual reset, walked through new login.",
  },
  {
    id: 6,
    issue: "Missing refund after 10 days",
    customer: "James Arora",
    date: "Dec 6",
    rootCause: "Refund stuck in processing queue",
    action: "Manually triggered refund",
    recommendation: "Add refund queue monitoring alert",
    priority: "medium",
    transcript: "Customer awaiting refund 10+ days. AI confirmed status as 'processing' with no further action.",
    handoffMoment: "9:33:47 — refund queue stalled, ops needed",
    humanAction: "Force-released refund, confirmed wire same-day.",
  },
  {
    id: 7,
    issue: "Delivery to wrong address",
    customer: "Chloe Martin",
    date: "Dec 6",
    rootCause: "Address validation not catching apt numbers",
    action: "Re-routed delivery",
    recommendation: "Improve address validation regex",
    priority: "medium",
    transcript: "Address missed apartment number, package returned. AI flagged but couldn't re-route in transit.",
    handoffMoment: "12:18:22 — courier coordination required",
    humanAction: "Coordinated with courier, package delivered next day.",
  },
];

const BARS = [
  { label: "Delivery issues", count: 9, pct: 100, cls: "bg-destructive" },
  { label: "Payment issues", count: 5, pct: 56, cls: "bg-warning" },
  { label: "Account / login", count: 4, pct: 44, cls: "bg-info" },
  { label: "Wrong item", count: 3, pct: 33, cls: "bg-ai" },
  { label: "Refund delays", count: 2, pct: 22, cls: "bg-muted-foreground" },
];

const downloadCsv = () => {
  const headers = [
    "#",
    "Issue type",
    "Customer",
    "Date",
    "Root cause",
    "Human action",
    "Product recommendation",
    "Priority",
  ];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...ROWS.map((r) =>
      [
        r.id,
        escape(r.issue),
        escape(r.customer),
        escape(r.date),
        escape(r.rootCause),
        escape(r.action),
        escape(r.recommendation),
        r.priority === "high" ? "High" : "Medium",
      ].join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ora-product-insights-dec2024.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const ProductInsights = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [range, setRange] = useState("7d");

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Product defect insights</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Issues escalated to human agents — exported directly to your product team
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Human escalations", value: "23" },
          { label: "Unique issue types", value: "7" },
          { label: "Avg resolution time", value: "4m 32s" },
          { label: "Issues now prevented by AI", value: "8" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border shadow-card p-4">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              {s.label}
            </div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border shadow-card overflow-hidden">
        <div className="px-5 py-3 border-b">
          <div className="text-sm font-semibold">Escalated issues log</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Issue type</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Root cause</TableHead>
              <TableHead>Human action</TableHead>
              <TableHead>Product recommendation</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => {
              const open = expandedId === r.id;
              return (
                <>
                  <TableRow
                    key={r.id}
                    onClick={() => setExpandedId(open ? null : r.id)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1">
                        {open ? (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        {r.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{r.issue}</TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell className="text-muted-foreground tabular-nums">
                      {r.date}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[220px]">
                      {r.rootCause}
                    </TableCell>
                    <TableCell className="max-w-[200px]">{r.action}</TableCell>
                    <TableCell className="text-ai-soft-foreground max-w-[220px]">
                      {r.recommendation}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full",
                          r.priority === "high"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-warning-soft text-warning-soft-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            r.priority === "high" ? "bg-destructive" : "bg-warning"
                          )}
                        />
                        {r.priority === "high" ? "High" : "Medium"}
                      </span>
                    </TableCell>
                  </TableRow>
                  {open && (
                    <TableRow key={`${r.id}-x`} className="bg-secondary/40 hover:bg-secondary/40">
                      <TableCell colSpan={8} className="p-0">
                        <div className="p-5 space-y-3 animate-fade-slide-in">
                          <div>
                            <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                              Call transcript summary
                            </div>
                            <div className="text-sm text-foreground/85">{r.transcript}</div>
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                              Handoff moment
                            </div>
                            <div className="text-sm font-mono tabular-nums text-ai-soft-foreground">
                              {r.handoffMoment}
                            </div>
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                              Human action taken
                            </div>
                            <div className="text-sm text-foreground/85">{r.humanAction}</div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Bar chart */}
      <div className="bg-card rounded-xl border shadow-card p-5">
        <div className="text-sm font-semibold mb-4">Issue frequency</div>
        <div className="space-y-3">
          {BARS.map((b) => (
            <div key={b.label} className="flex items-center gap-3 text-sm">
              <div className="w-36 shrink-0 text-foreground/80">{b.label}</div>
              <div className="flex-1 h-6 bg-secondary rounded-md overflow-hidden">
                <div
                  className={cn("h-full rounded-md transition-all", b.cls)}
                  style={{ width: `${b.pct}%` }}
                />
              </div>
              <div className="w-16 text-right tabular-nums font-medium">{b.count} cases</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="text-sm font-semibold mb-3">Recommendations for product team</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Fix Memphis warehouse routing",
              impact: "Affects 39% of delayed deliveries",
              save: "Estimated call reduction: 91 calls/month",
              border: "border-l-destructive",
            },
            {
              title: "Payment gateway retry logic",
              impact: "Affects 22% of payment failures",
              save: "Estimated call reduction: 47 calls/month",
              border: "border-l-destructive",
            },
            {
              title: "Add retention discount to AI script",
              impact: "3 cancellations prevented this week",
              save: "Estimated revenue saved: $340/month",
              border: "border-l-warning",
            },
          ].map((c) => (
            <div
              key={c.title}
              className={cn(
                "bg-card rounded-xl border border-l-4 shadow-card p-5",
                c.border
              )}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="font-semibold text-sm">{c.title}</div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Impact</div>
              <div className="text-sm">{c.impact}</div>
              <div className="mt-2 text-xs text-muted-foreground">Outcome if fixed</div>
              <div className="text-sm font-medium text-success-soft-foreground">{c.save}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
