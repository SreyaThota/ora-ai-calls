import { useEffect, useState } from "react";
import { Sparkles, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const HandoffReviewModal = ({ onConnect }: { onConnect: () => void }) => {
  const [count, setCount] = useState(15);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(id);
          setTimeout(onConnect, 200);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onConnect]);

  const progress = (count / 15) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-slide-in p-4">
      <div className="bg-card rounded-2xl shadow-soft border w-full max-w-2xl overflow-hidden">
        <div className="bg-gradient-ai px-6 py-4 text-ai-foreground">
          <div className="flex items-center gap-2 text-sm font-medium opacity-90">
            <Sparkles className="h-4 w-4" />
            Joining call — review AI briefing
          </div>
          <div className="mt-1 text-xs opacity-80">
            Sarah Chen is on hold. You have {count} seconds to review the context below.
          </div>
        </div>

        <div className="px-6 pt-5 flex flex-col items-center">
          <div className="text-7xl font-bold tabular-nums text-foreground transition-all">
            {count}
          </div>
          <div className="w-full mt-3">
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="rounded-lg border bg-secondary p-4 space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-medium text-right">Sarah Chen · LTV $2,840 · Positive</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Predicted intent</span>
              <span className="font-medium text-right">Delayed order #4821</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">AI has done</span>
              <span className="font-medium text-right">
                Confirmed delay, offered express reship (accepted), $20 credit offered
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-warning-soft border border-warning/30 p-3 flex gap-2.5">
            <Heart className="h-4 w-4 text-warning-soft-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-warning-soft-foreground">
              <span className="font-semibold">Personal detail:</span> Daughter's birthday
              Dec 15 — she's stressed about timing.
            </div>
          </div>

          <div className="rounded-lg bg-ai-soft border border-ai/20 p-3 flex gap-2.5">
            <Sparkles className="h-4 w-4 text-ai shrink-0 mt-0.5" />
            <div className="text-sm text-ai-soft-foreground">
              <span className="font-semibold">Suggested next step:</span> Confirm reship
              email sent, thank her for patience.
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-surface flex justify-end">
          <button
            onClick={onConnect}
            className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-sm font-medium transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" />
            I'm ready — connect me now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
