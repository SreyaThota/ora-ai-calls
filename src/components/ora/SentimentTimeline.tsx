import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

const POINTS = [
  { t: 0, label: "0:00", score: 62 },
  { t: 14, label: "0:14", score: 28 },
  { t: 31, label: "0:31", score: 45 },
  { t: 95, label: "1:35", score: 68 },
  { t: 130, label: "2:10", score: 55 },
  { t: 160, label: "2:40", score: 75 },
  { t: 190, label: "3:10", score: 91 },
  { t: 240, label: "4:00", score: 88 },
  { t: 310, label: "5:10", score: 96 },
];

const GREEN = "#1D9E75";
const AMBER = "#EF9F27";
const RED = "#E24B4A";
const PURPLE = "#8B5CF6";
const DARK_GREEN = "#0F6B4F";

const colorFor = (score: number) =>
  score >= 65 ? GREEN : score >= 45 ? AMBER : RED;

// Build segments so each line piece can be colored individually
const segments = POINTS.slice(0, -1).map((p, i) => {
  const next = POINTS[i + 1];
  return {
    color: colorFor(Math.min(p.score, next.score)),
    data: [p, next],
  };
});

export const SentimentTimeline = () => {
  return (
    <div className="bg-card rounded-xl border shadow-card p-5 animate-fade-slide-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Call sentiment timeline</h3>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: GREEN }} /> Positive
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: AMBER }} /> Neutral
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: RED }} /> Negative
          </span>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={POINTS} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="t"
              type="number"
              domain={[0, 320]}
              ticks={POINTS.map((p) => p.t)}
              tickFormatter={(v) => {
                const p = POINTS.find((x) => x.t === v);
                return p ? p.label : "";
              }}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              stroke="hsl(var(--border))"
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              stroke="hsl(var(--border))"
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelFormatter={(v) => {
                const p = POINTS.find((x) => x.t === v);
                return p ? `Time ${p.label}` : "";
              }}
              formatter={(value: number) => [`${value}`, "Sentiment"]}
            />

            {/* Annotation lines */}
            <ReferenceLine x={31} stroke={PURPLE} strokeDasharray="4 4">
              <Label value="AI" position="top" fill={PURPLE} fontSize={10} fontWeight={600} />
            </ReferenceLine>
            <ReferenceLine x={95} stroke={PURPLE} strokeDasharray="4 4">
              <Label value="AI" position="top" fill={PURPLE} fontSize={10} fontWeight={600} />
            </ReferenceLine>
            <ReferenceLine x={160} stroke={DARK_GREEN} strokeDasharray="4 4">
              <Label value="H" position="top" fill={DARK_GREEN} fontSize={10} fontWeight={700} />
            </ReferenceLine>

            {/* Colored segments */}
            {segments.map((seg, i) => (
              <Line
                key={i}
                type="monotone"
                data={seg.data}
                dataKey="score"
                stroke={seg.color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: seg.color, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
                legendType="none"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="rounded-lg bg-secondary p-3 text-center">
          <div className="text-base font-bold text-foreground tabular-nums">28 → 96</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">
            Sentiment range
          </div>
        </div>
        <div className="rounded-lg bg-secondary p-3 text-center">
          <div className="text-base font-bold text-foreground tabular-nums">2m 26s</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">
            Recovery time
          </div>
        </div>
        <div className="rounded-lg bg-success-soft p-3 text-center">
          <div className="text-base font-bold text-success-soft-foreground">Resolved</div>
          <div className="text-[10px] uppercase tracking-wide text-success-soft-foreground mt-0.5">
            Outcome
          </div>
        </div>
      </div>
    </div>
  );
};
