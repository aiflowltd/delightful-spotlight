import { useEffect, useRef, useState } from "react";

// Discovery → Insight → Build. Under it, the old hard part (execution, Insight→Build)
// stays put, and the new hard part (judgment, Discovery→Insight) draws in from right to
// left on a loop, so the move keeps replaying. Starts when scrolled into view.
// Reduced motion: both shown, no animation.

export function HardPartDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const steps = ["Discovery", "Insight", "Build"];
  return (
    <div ref={ref} className={`hard-part w-full${live ? " is-live" : ""}`}>
      <div className="relative mx-auto max-w-3xl">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center text-center">
              <div className="chip text-muted-foreground">
                <span className="chip-dot" style={{ background: "var(--muted-foreground)" }} />
                Step {i + 1}
              </div>
              <div
                className="mt-3 w-full rounded-sm border px-4 py-6 font-display text-xl"
                style={{ borderColor: "var(--rule)" }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* Old hard part: Insight → Build */}
        <div className="mt-6 grid grid-cols-3 gap-4 sm:gap-8">
          <div className="col-start-2 col-span-2">
            <div
              className="border-t-2 border-dashed pt-2 text-center text-xs uppercase tracking-[0.14em] text-muted-foreground"
              style={{ borderColor: "#c9c6d3" }}
            >
              Old hard part · execution
            </div>
          </div>
        </div>

        {/* New hard part: Discovery → Insight (animated) */}
        <div className="mt-4 grid grid-cols-3 gap-4 sm:gap-8">
          <div className="col-start-1 col-span-2">
            <div className="hp-line h-0.5" style={{ background: "var(--violet)" }} />
            <div
              className="hp-label pt-2 text-center text-xs uppercase tracking-[0.14em] font-semibold"
              style={{ color: "var(--violet)" }}
            >
              New hard part · judgment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
