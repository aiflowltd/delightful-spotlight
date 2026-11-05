import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// "A ladder, not a checklist": a sticky ladder (desktop) that tracks which level block
// is in the middle of the viewport. One IntersectionObserver, state changes only on step
// change: no scroll-scrubbing, no scroll-jacking. Below 980px the ladder is hidden and
// the level blocks simply stack.

type Level = {
  id: string;
  short: string;
  label: string;
  title: string;
  question: string;
  body: ReactNode;
  discover: string;
  ship: string;
  color: string;
};

// Climbing order: L0 → L4. Index === data-step.
const levels: Level[] = [
  {
    id: "l0",
    short: "L0",
    label: "Level 0",
    title: "Ideal Customer Profile",
    question: "Who actually has the problem?",
    body: (
      <>
        The foundation under every rung. Your ICP is a working answer, refined with every
        interview and reconfirmed at each level above it — the customer you validated in March
        may not be the customer in June.
      </>
    ),
    discover: "Who has the problem",
    ship: "Continuously refined",
    color: "oklch(0.93 0.005 280)",
  },
  {
    id: "l1",
    short: "L1",
    label: "Level 1",
    title: "Problem Discovery",
    question: "Is the pain real?",
    body: (
      <>
        Score the customer's relationship to the problem with the <strong>Pain Scale</strong>.
        Target zone: <strong>Hair on Fire</strong> and Incremental Improvement.
      </>
    ),
    discover: "Problem",
    ship: "Solution concept",
    color: "var(--red)",
  },
  {
    id: "l2",
    short: "L2",
    label: "Level 2",
    title: "Jobs Discovery",
    question: "Of all the things they struggle with, which specific job is worth building for?",
    body: (
      <>
        Map the customer's current way of getting the job done. Identify the wedge — where pain
        is real <em>and</em> current solutions are weak.
      </>
    ),
    discover: "Jobs",
    ship: "MVP Scope, constrained",
    color: "var(--amber)",
  },
  {
    id: "l3",
    short: "L3",
    label: "Level 3",
    title: "Value Discovery",
    question: "Will they fire their old way for your new way?",
    body: (
      <>
        Run probes that test value, not usability. <strong>Skin in the Game</strong> is the bar.
      </>
    ),
    discover: "Value",
    ship: "Product V1",
    color: "var(--teal)",
  },
  {
    id: "l4",
    short: "L4",
    label: "Level 4",
    title: "GTM Discovery",
    question: "Can you reach them, repeatably?",
    body: <>De-risk the path to customer. Test channel, motion, unit economics.</>,
    discover: "GTM",
    ship: "Growth Engine",
    color: "var(--green)",
  },
];

/** Rung centre y in the SVG for L1..L4; the ground (step 0) is 470. */
const RUNG_Y: Record<number, number> = { 1: 392, 2: 296, 3: 200, 4: 104 };
const GROUND_Y = 470;

const STATUS = [
  "Standing on the ground: your ICP",
  "Level 1 · Problem",
  "Level 2 · Jobs, carrying L1",
  "Level 3 · Value, carrying L1 + L2",
  "Level 4 · GTM, carrying L1–L3",
];

export function ScrollLadder() {
  const [step, setStep] = useState(0);
  const blocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = blocksRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const blocks = root.querySelectorAll<HTMLElement>("[data-step]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = blocksRef.current?.querySelector<HTMLElement>(`[data-step="${i}"]`);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="min-[980px]:grid min-[980px]:grid-cols-[380px_1fr] min-[980px]:gap-16">
      <aside className="hidden min-[980px]:block self-start sticky top-[104px]">
        <LadderSvg step={step} onSelect={goTo} />
        <p className="mt-2 min-h-5 text-center font-mono text-[13px] font-medium text-muted-foreground" aria-live="polite">
          {STATUS[step]}
        </p>
      </aside>

      <div ref={blocksRef} className="flex flex-col gap-6 min-[980px]:gap-0 min-[980px]:pb-[30vh]">
        {levels.map((l, i) => (
          <div
            key={l.id}
            id={`level-${l.id}`}
            data-step={i}
            className="min-[980px]:min-h-[62vh] min-[980px]:flex min-[980px]:flex-col min-[980px]:justify-center"
          >
            <LevelBlock level={l} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LevelBlock({ level, index }: { level: Level; index: number }) {
  return (
    <article className="relative rounded-sm border p-6 sm:p-10" style={{ borderColor: "var(--rule)" }}>
      <div
        className="absolute left-0 top-0 h-1 w-full rounded-t-sm"
        style={{ background: level.color }}
        aria-hidden="true"
      />
      <div className="text-sm text-muted-foreground">
        {level.label}
        {index > 0 ? ` of ${levels.length - 1}` : " · the foundation"}
      </div>
      <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-tight">{level.title}</h3>
      <p className="mt-3 text-lg sm:text-xl italic text-muted-foreground">{level.question}</p>
      <p className="mt-6 text-[1.02rem] leading-relaxed text-ink max-w-2xl">{level.body}</p>

      <dl className="mt-8 grid sm:grid-cols-2 gap-px" style={{ background: "var(--rule)" }}>
        <div className="bg-background py-4 sm:pr-6">
          <dt className="text-xs text-muted-foreground">Discover</dt>
          <dd className="mt-1 font-display text-xl">{level.discover}</dd>
        </div>
        <div className="bg-background py-4 sm:pl-6">
          <dt className="text-xs text-muted-foreground">Ship</dt>
          <dd className="mt-1 font-display text-xl">{level.ship}</dd>
        </div>
      </dl>
    </article>
  );
}

function LadderSvg({ step, onSelect }: { step: number; onSelect: (i: number) => void }) {
  const onKey = (i: number) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(i);
    }
  };
  const markerY = step === 0 ? GROUND_Y : RUNG_Y[step];

  return (
    <svg
      viewBox="0 0 420 520"
      width="380"
      className="scroll-ladder block h-auto w-[380px] overflow-visible font-display"
      role="group"
      aria-label="Discovery Ladder progress"
    >
      {/* Headings */}
      <text x="128" y="22" textAnchor="end" className="sl-heading" fill="#127A9C">
        Discover
      </text>
      <text x="252" y="22" className="sl-heading" fill="var(--violet)">
        Ship
      </text>

      {/* Rails */}
      <line x1="140" y1="30" x2="140" y2="470" stroke="var(--ink)" strokeWidth="4" />
      <line x1="240" y1="30" x2="240" y2="470" stroke="var(--ink)" strokeWidth="4" />

      {/* Rungs L1..L4 */}
      {[1, 2, 3, 4].map((i) => {
        const l = levels[i];
        const y = RUNG_Y[i];
        const state = i < step ? "carried" : i === step ? "now" : "future";
        return (
          <g
            key={l.id}
            className={`sl-rung ${state}`}
            style={{ ["--c" as string]: l.color }}
            role="button"
            tabIndex={0}
            aria-label={`${l.label}: ${l.title}`}
            aria-current={state === "now" ? "step" : undefined}
            onClick={() => onSelect(i)}
            onKeyDown={onKey(i)}
          >
            <rect x="0" y={y - 40} width="420" height="80" fill="transparent" />
            <rect className="sl-focus" x="132" y={y - 17} width="116" height="34" rx="4" />
            <rect className="sl-bar" x="140" y={y - 9} width="100" height="18" />
            <text x="126" y={y + 6} textAnchor="end" className="sl-label">
              {l.discover}
            </text>
            <text x="254" y={y + 6} className="sl-label sl-ship">
              {l.ship}
            </text>
          </g>
        );
      })}

      {/* Ground */}
      <line x1="60" y1="470" x2="320" y2="470" stroke="var(--ink)" strokeWidth="2" />
      <g
        className="sl-ground"
        role="button"
        tabIndex={0}
        aria-label="Level 0: Ideal Customer Profile"
        aria-current={step === 0 ? "step" : undefined}
        onClick={() => onSelect(0)}
        onKeyDown={onKey(0)}
      >
        <rect className="sl-focus" x="150" y="486" width="80" height="26" rx="4" />
        <text x="190" y="504" textAnchor="middle" className="sl-ground-label">
          L0 · ICP
        </text>
      </g>

      {/* "You" marker */}
      <g className="sl-you" style={{ transform: `translateY(${markerY}px)` }} aria-hidden="true">
        <circle cx="190" cy="0" r="13" fill="var(--violet)" stroke="white" strokeWidth="3" />
        <text
          x="190"
          y="4"
          textAnchor="middle"
          fill="white"
          style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600 }}
        >
          you
        </text>
      </g>
    </svg>
  );
}
