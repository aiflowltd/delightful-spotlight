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
  ship: { verb: string; name: string; note: string };
  color: string;
};

// Same palette as the hero ladder. Climbing order: L0 → L4 (index === level number).
const levels: Level[] = [
  {
    id: "l0",
    short: "L0",
    label: "Level 0",
    title: "Ideal Customer Profile · the ground",
    question: "Organizations don't buy things. People do.",
    body: (
      <>
        The ladder stands on a specific person, not a market. Inside every company-wide problem
        that nobody owns, find the one human with agency over a slice of the workflow and a
        hair-on-fire relationship to it. The ICP is never finished; it gets sharper every week.
      </>
    ),
    discover: "ICP",
    ship: { verb: "Refine", name: "Continuously", note: "Disqualify people outside it in two minutes." },
    color: "#ECEBF1",
  },
  {
    id: "l1",
    short: "L1",
    label: "Level 1",
    title: "Problem Discovery",
    question: "Is there a painful problem, and who has it?",
    body: (
      <>
        Score the customer's relationship to the problem with the <strong>Pain Scale</strong>.
        Target zone: <strong>Hair on Fire</strong> and Incremental Improvement. Ask about past
        behavior, not future hypotheticals; people say yes to hypotheticals to be nice.
      </>
    ),
    discover: "Problem",
    ship: {
      verb: "Ships",
      name: "Customer Persona",
      note: "Evidence-backed: quotes and behavior, not a guess.",
    },
    color: "#3B1460",
  },
  {
    id: "l2",
    short: "L2",
    label: "Level 2",
    title: "Jobs Discovery",
    question: "Of everything they struggle with, which job is worth building for?",
    body: (
      <>
        Map the customer's current way of getting the job done. Identify the wedge — where pain
        is real <em>and</em> current solutions are weak.
      </>
    ),
    discover: "Jobs",
    ship: { verb: "Ships", name: "MVP Scope", note: "One page: the wedge job, and the say-no list." },
    color: "#3D43A4",
  },
  {
    id: "l3",
    short: "L3",
    label: "Level 3",
    title: "Value Discovery",
    question: "Does it deliver value, and will they fire their old way to get it?",
    body: (
      <>
        Retire the word MVP. Run a minimum viable experiment: one hypothesis, a customer in front
        of it, and a kill criterion written before you build. <strong>Skin in the Game</strong>{" "}
        is the bar.
      </>
    ),
    discover: "Value",
    ship: { verb: "Ships", name: "Experiments", note: "Disposable code, durable learning." },
    color: "#1F74BE",
  },
  {
    id: "l4",
    short: "L4",
    label: "Level 4",
    title: "GTM Discovery",
    question: "Can you reach them, repeatably and affordably?",
    body: (
      <>
        GTM is advanced discovery: the same muscle as Level 1, pointed at higher-stakes
        assumptions. It branches by industry and often runs in parallel with Level 3.
      </>
    ),
    discover: "GTM",
    ship: { verb: "Ships", name: "Growth Engine", note: "A path to customers you can repeat." },
    color: "#18A7CC",
  },
];

const RUNG_Y: Record<number, number> = { 1: 392, 2: 296, 3: 200, 4: 104 };
const GROUND_Y = 470;

type StepState = { you: number; carried: number[]; now: number; broke?: number; msg: string };

/** One entry per block on the right, in scroll order (data-step). Step 4 is the descent. */
const STEPS: StepState[] = [
  { you: 0, carried: [], now: 0, msg: "Standing on the ground: your ICP" },
  { you: 1, carried: [], now: 1, msg: "Level 1 · Problem" },
  { you: 2, carried: [1], now: 2, msg: "Level 2 · Jobs, carrying L1" },
  { you: 3, carried: [1, 2], now: 3, msg: "Level 3 · Value, carrying L1 + L2" },
  { you: 2, carried: [1], now: 2, broke: 3, msg: "Descended to L2. That’s the win." },
  { you: 4, carried: [1, 2, 3], now: 4, msg: "Level 4 · GTM, carrying L1–L3" },
];
const DESCENT_STEP = 4;

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

  /** Scroll to a level's block (by level number, not step). */
  const goTo = (level: number) => {
    const el = document.getElementById(`level-${levels[level].id}`);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="min-[980px]:grid min-[980px]:grid-cols-[380px_1fr] min-[980px]:gap-16">
      <aside className="hidden min-[980px]:block self-start sticky top-[104px]">
        <LadderSvg step={step} onSelect={goTo} />
        <p className="mt-2 min-h-5 text-center font-mono text-[13px] font-medium text-muted-foreground" aria-live="polite">
          {STEPS[step].msg}
        </p>
      </aside>

      <div ref={blocksRef} className="flex flex-col gap-5 min-[980px]:gap-7 min-[980px]:pb-[30vh]">
        {levels.slice(0, 4).map((l, i) => (
          <LevelBlock key={l.id} level={l} index={i} step={i} />
        ))}
        <DescentBlock step={DESCENT_STEP} />
        <LevelBlock level={levels[4]} index={4} step={5} />
      </div>
    </div>
  );
}

function LevelBlock({ level, index, step }: { level: Level; index: number; step: number }) {
  const chipText = index === 0 ? "var(--ink)" : "white";
  return (
    <article
      id={`level-${level.id}`}
      data-step={step}
      className="flex flex-col gap-5 bg-white p-6 sm:p-10 min-[980px]:min-h-[62vh] scroll-mt-28"
    >
      <div className="flex items-center gap-3 font-mono text-[13px] font-medium text-muted-foreground">
        <span
          className="inline-grid h-6 min-w-7 place-items-center px-1.5 text-xs font-semibold"
          style={{
            background: level.color,
            color: chipText,
            boxShadow: index === 0 ? "inset 0 0 0 1px var(--rule)" : undefined,
          }}
        >
          {level.short}
        </span>
        {level.title}
      </div>
      <h3 className="font-display text-[1.75rem] sm:text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-ink">
        {level.question}
      </h3>
      <p className="max-w-[620px] text-base sm:text-[17px] leading-relaxed text-muted-foreground">
        {level.body}
      </p>
      <div
        className="mt-auto flex flex-wrap items-baseline gap-x-3.5 gap-y-1 border-t-[1.5px] pt-3.5"
        style={{ borderColor: "var(--ink)" }}
      >
        <span className="font-mono text-xs" style={{ color: "var(--violet)" }}>
          {level.ship.verb}
        </span>
        <b className="font-display text-[22px] font-medium italic text-ink">{level.ship.name}</b>
        <span className="text-[15px] text-muted-foreground">{level.ship.note}</span>
      </div>
    </article>
  );
}

function DescentBlock({ step }: { step: number }) {
  return (
    <article
      id="level-descent"
      data-step={step}
      className="flex flex-col gap-5 p-6 sm:p-10 text-white min-[980px]:min-h-[62vh] scroll-mt-28"
      style={{ background: "var(--ink)" }}
    >
      <div className="flex items-center gap-3 font-mono text-[13px] font-medium" style={{ color: "#B9B6C6" }}>
        <span
          className="inline-grid h-6 min-w-7 place-items-center px-1.5 text-xs font-semibold text-white"
          style={{ background: "#E2552D" }}
        >
          ↓
        </span>
        The descent
      </div>
      <h3 className="font-display text-[2.25rem] sm:text-[3.25rem] leading-none tracking-[-0.03em] text-white">
        Treat the descent as the win.
      </h3>
      <figure className="p-4" style={{ background: "rgba(255,255,255,0.06)" }}>
        <blockquote className="font-display text-[19px] leading-snug">
          “Honestly the matching is fine. What kills me is chasing the clients for the
          remittance slips.”
        </blockquote>
        <figcaption className="mt-1.5 font-mono text-[11px]" style={{ color: "#B9B6C6" }}>
          Interview #031 · during an L3 experiment · contradicts the L2 wedge
        </figcaption>
      </figure>
      <p className="max-w-[620px] text-base sm:text-[17px] leading-relaxed" style={{ color: "#CFCCDA" }}>
        New evidence breaks an earlier level, so you step back down to Jobs and re-rank. Going
        back because the evidence sent you there is the framework working.
      </p>
      <p className="mt-auto font-mono text-[13px] font-medium" style={{ color: "#FFB49A" }}>
        You just saved a quarter of building the wrong thing.
      </p>
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
  const st = STEPS[step];
  const markerY = st.you === 0 ? GROUND_Y : RUNG_Y[st.you];

  return (
    <svg
      viewBox="0 0 420 520"
      width="380"
      className={`scroll-ladder block h-auto w-[380px] overflow-visible font-display${st.broke ? " desc" : ""}`}
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
        const state =
          i === st.broke
            ? "broke"
            : st.carried.includes(i)
              ? "carried"
              : i === st.now
                ? "now"
                : "future";
        return (
          <g
            key={l.id}
            className={`sl-rung ${state}`}
            style={{ ["--c" as string]: l.color }}
            role="button"
            tabIndex={0}
            aria-label={`Go to ${l.label}: ${l.title}`}
            aria-current={state === "now" ? "step" : undefined}
            onClick={() => onSelect(i)}
            onKeyDown={onKey(i)}
          >
            <rect x="0" y={y - 40} width="420" height="80" fill="transparent" />
            <rect className="sl-focus" x="132" y={y - 17} width="116" height="34" rx="4" />
            <rect className="sl-bar" x="140" y={y - 9} width="100" height="18" />
            <path className="sl-x" d={`M170 ${y - 12} L210 ${y + 12} M210 ${y - 12} L170 ${y + 12}`} />
            <text x="126" y={y + 6} textAnchor="end" className="sl-label">
              {l.discover}
            </text>
            <text x="254" y={y + 6} className="sl-label sl-ship">
              {l.ship.name}
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
        aria-current={st.now === 0 ? "step" : undefined}
        onClick={() => onSelect(0)}
        onKeyDown={onKey(0)}
      >
        <rect className="sl-focus" x="150" y="486" width="80" height="26" rx="4" />
        <text x="190" y="504" textAnchor="middle" className="sl-ground-label">
          L0 · ICP
        </text>
      </g>

      {/* Descent arrow: from L3 down to L2 */}
      <path className="sl-down" d="M190 214 V276 M182 268 L190 278 L198 268" aria-hidden="true" />

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
