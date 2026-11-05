import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MascotShape } from "@/components/Mascot";

/** Books on the shelf, left to right. `h` is the spine height in px at desktop size. */
const books = [
  { title: "The Four Steps to the Epiphany", author: "Blank", color: "#2B2A35", h: 398 },
  { title: "Talking to Humans", author: "Constable", color: "#3D3F9E", h: 312 },
  { title: "The Mom Test", author: "Fitzpatrick", color: "#B8300F", h: 284 },
  { title: "Competing Against Luck", author: "Christensen", color: "#1F70BA", h: 360 },
  { title: "Testing with Humans", author: "Constable & Rimalovski", color: "#561D96", h: 332 },
  { title: "The Startup Owner's Manual", author: "Blank & Dorf", color: "#4B4560", h: 356 },
  { title: "The Lean Startup", author: "Ries", color: "#18171F", h: 341 },
  { title: "Value Proposition Design", author: "Osterwalder", color: "#18A2C6", h: 379 },
];

/** Rung colors, bottom (L1) to top (L4) — same palette as the hero ladder. */
const rungs = ["var(--red)", "var(--amber)", "var(--teal)", "var(--green)"];

const vertical: CSSProperties = { writingMode: "vertical-rl", transform: "rotate(180deg)" };

export function CanonShelf() {
  return (
    <figure aria-label="The books the Discovery Ladder builds on, with the ladder leaning beside them">
      <div className="flex items-end gap-1 sm:gap-1.5 border-b-[3px]" style={{ borderColor: "var(--ink)" }}>
        {books.map((b) => (
          <div
            key={b.title}
            className="flex w-[27px] sm:w-[54px] shrink-0 flex-col items-center justify-end sm:justify-between py-2.5 sm:py-3 h-[calc(var(--h)*0.62px)] sm:h-[calc(var(--h)*1px)]"
            style={{ background: b.color, "--h": b.h } as CSSProperties}
            title={`${b.title} — ${b.author}`}
          >
            <span
              className="hidden sm:inline font-mono text-[10px] tracking-wide text-white/75 whitespace-nowrap"
              style={vertical}
            >
              {b.author}
            </span>
            <span
              className="font-display font-medium text-[9.5px] sm:text-[15px] leading-none text-white whitespace-nowrap"
              style={vertical}
            >
              {b.title}
            </span>
          </div>
        ))}

        <Walker />
        <LeaningLadder />
      </div>
    </figure>
  );
}

/**
 * A plain violet figure that walks from the books to the foot of the ladder once,
 * when the shelf scrolls into view. Desktop only (the gap is too narrow on phones).
 * Reduced motion: drawn already standing at the ladder.
 */
function Walker() {
  const pathRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"waiting" | "walking" | "arrived">("waiting");

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("arrived");
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase("walking");
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={pathRef} className="relative hidden sm:block flex-1 self-stretch" aria-hidden>
      <div
        className={`walker walker-${phase}`}
        onTransitionEnd={() => setPhase("arrived")}
      >
        <svg viewBox="0 0 62 74" width="62" height="74" className="block overflow-visible">
          <MascotShape look="right" book />
        </svg>
      </div>
    </div>
  );
}

function LeaningLadder() {
  // Rails lean right ~8°. Coordinates in a 120 × 410 box; feet sit on the ground (y = 410).
  const left = { x0: 4, y0: 410, x1: 62, y1: 0 };
  const right = { x0: 46, y0: 410, x1: 104, y1: 6 };
  const at = (r: typeof left, t: number) => ({
    x: r.x0 + (r.x1 - r.x0) * t,
    y: r.y0 + (r.y1 - r.y0) * t,
  });
  const steps = [0.21, 0.42, 0.62, 0.83];

  return (
    <svg
      viewBox="0 0 120 410"
      className="ml-auto sm:ml-0 -mr-[10px] sm:-mr-4 h-[254px] sm:h-[410px] w-auto shrink-0 overflow-visible"
      aria-hidden
    >
      {steps.map((t, i) => {
        const a = at(left, t);
        const b = at(right, t - 0.012);
        return (
          <line
            key={t}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={rungs[i]}
            strokeWidth={6}
          />
        );
      })}
      {[left, right].map((r, i) => (
        <line
          key={i}
          x1={r.x0}
          y1={r.y0}
          x2={r.x1}
          y2={r.y1}
          stroke="var(--ink)"
          strokeWidth={4}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}
