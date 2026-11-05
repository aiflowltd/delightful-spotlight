import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { MASCOT_FEET_Y, MASCOT_SEAT_Y, MASCOT_W, MascotShape } from "@/components/Mascot";

const MASCOT_SCALE = 0.72;

/** Mascot's centre x per step: ground, L1 middle, L2 left, L3 right, descent (L2 left), L4 middle. */
const SEAT_X = [190, 190, 166, 214, 166, 190];

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
  ship: { name: string; note: string };
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
        The ladder stands on a specific person, not a market. The ICP is never finished; it
        gets sharper every week.
      </>
    ),
    discover: "ICP",
    ship: { name: "Continuously", note: "Disqualify people outside it in two minutes." },
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
      name: "Customer Persona",
      note: "Evidence-backed: quotes and behavior, not a guess.",
    },
    color: "var(--red)",
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
    ship: { name: "MVP Scope", note: "One page: the wedge job, and the say-no list." },
    color: "var(--amber)",
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
    ship: { name: "Experiments", note: "Disposable code, durable learning." },
    color: "var(--teal)",
  },
  {
    id: "l4",
    short: "L4",
    label: "Level 4",
    title: "Growth Discovery",
    question: "Can you reach them, repeatably and affordably?",
    body: (
      <>
        This is advanced discovery: the same muscle as Level 1, pointed at higher-stakes
        assumptions. It branches by industry and often runs in parallel with Level 3.
      </>
    ),
    discover: "Growth",
    ship: { name: "GTM", note: "A path to customers you can repeat." },
    color: "var(--green)",
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
  { you: 4, carried: [1, 2, 3], now: 4, msg: "Level 4 · Growth, carrying L1–L3" },
];
const DESCENT_STEP = 4;

/** Scroll distance per step while the section is pinned (desktop). */
const STEP_VH = 55;
const STEP_COUNT = STEPS.length; // 6: L0, L1, L2, L3, descent, L4

/**
 * Desktop (≥980px): the section pins under the nav for STEP_COUNT steps of page scroll.
 * Title, intro, ladder and the current card stay on screen; invisible sentinels in the
 * tall outer box tell an IntersectionObserver which step is in the middle of the viewport.
 * Below 980px: no pinning, no ladder; the cards stack.
 */
export function ScrollLadder({ header }: { header: ReactNode }) {
  const [step, setStep] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || typeof IntersectionObserver === "undefined") return;
    const sentinels = outer.querySelectorAll<HTMLElement>("[data-sentinel]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.sentinel));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sentinels.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /** Rung click: scroll the page so that level's step is active. */
  const goTo = (level: number) => {
    const target = level === 4 ? 5 : level; // L4 comes after the descent step
    const el = outerRef.current?.querySelector<HTMLElement>(`[data-sentinel="${target}"]`);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = el.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + r.top + r.height / 2 - window.innerHeight / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const cards = [
    ...levels.slice(0, 4).map((l, i) => <LevelBlock key={l.id} level={l} index={i} step={i} />),
    <DescentBlock key="descent" step={DESCENT_STEP} />,
    <LevelBlock key={levels[4].id} level={levels[4]} index={4} step={5} />,
  ];

  return (
    <div
      ref={outerRef}
      className="sl-outer relative"
      style={{ ["--sl-steps" as string]: STEP_COUNT, ["--sl-step-vh" as string]: `${STEP_VH}vh` }}
    >
      {/* Step sentinels (desktop only) */}
      {Array.from({ length: STEP_COUNT }, (_, i) => (
        <div
          key={i}
          data-sentinel={i}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 hidden min-[980px]:block"
          style={{ top: `${i * STEP_VH}vh`, height: `${STEP_VH}vh` }}
        />
      ))}

      <div className="sl-stage mx-auto max-w-6xl px-6 pt-24 pb-16 min-[980px]:pt-10 min-[980px]:pb-8">
        {header}

        <div className="mt-10 min-[980px]:mt-8 min-[980px]:grid min-[980px]:grid-cols-[auto_1fr] min-[980px]:gap-14 min-[980px]:items-center">
          <aside className="hidden min-[980px]:block">
            <LadderSvg step={step} onSelect={goTo} />
            <p
              className="mt-1 min-h-5 text-center font-mono text-[13px] font-medium text-muted-foreground"
              aria-live="polite"
            >
              {STEPS[step].msg}
            </p>
          </aside>

          {/* Cards: stacked on phones; one at a time on desktop */}
          <div className="sl-cards relative flex flex-col gap-5 min-[980px]:block">
            {cards.map((card, i) => (
              <div key={i} className={`sl-card${i === step ? " is-active" : ""}`}>
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LevelBlock({ level, index, step }: { level: Level; index: number; step: number }) {
  const chipText = index === 0 || level.color === "var(--amber)" ? "var(--ink)" : "white";
  // L0 is the ground, not a rung: a compact card so it doesn't add a screen of scrolling.
  const compact = index === 0;
  return (
    <article
      id={`level-${level.id}`}
      data-step={step}
      className={`flex flex-col bg-white scroll-mt-28 ${
        compact ? "gap-3 p-6 sm:p-8" : "gap-4 p-6 sm:p-9"
      }`}
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
      <h3
        className={`font-display leading-[1.08] tracking-[-0.02em] text-ink ${
          compact ? "text-[1.4rem] sm:text-[1.75rem]" : "text-[1.6rem] sm:text-[2.1rem]"
        }`}
      >
        {level.question}
      </h3>
      <p className="max-w-[620px] text-base sm:text-[17px] leading-relaxed text-muted-foreground">
        {level.body}
      </p>
      <div
        className="mt-2 flex flex-wrap items-baseline gap-x-3.5 gap-y-1 border-t-[1.5px] pt-3.5"
        style={{ borderColor: "var(--ink)" }}
      >
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
      className="flex flex-col gap-4 p-6 sm:p-9 scroll-mt-28"
      style={{ background: "#FCF6F8", boxShadow: "inset 0 0 0 1px #F2DCE5" }}
    >
      <div className="flex items-center gap-3 font-mono text-[13px] font-medium text-muted-foreground">
        <span
          className="inline-grid h-6 min-w-7 place-items-center px-1.5 text-xs font-semibold text-white"
          style={{ background: "var(--red)" }}
        >
          ↓
        </span>
        The descent
      </div>
      <h3 className="font-display text-[1.6rem] sm:text-[2.1rem] leading-[1.08] tracking-[-0.02em] text-ink">
        Treat the descent as the win.
      </h3>
      <figure className="max-w-[620px]">
        <blockquote className="font-display text-[21px] sm:text-[23px] leading-snug text-ink">
          “Honestly the matching is fine. What kills me is chasing the clients for the
          remittance slips.”
        </blockquote>
        <figcaption className="mt-2 text-sm text-muted-foreground">
          — Solo bookkeeper, interview #031, midway through an L3 experiment
        </figcaption>
      </figure>
      <p className="max-w-[620px] text-base sm:text-[17px] leading-relaxed text-muted-foreground">
        New evidence breaks an earlier level, so you step back down to Jobs and re-rank. Going
        back because the evidence sent you there is the framework working.
      </p>
      <p
        className="mt-2 border-t-[1.5px] pt-3.5 font-display text-[19px] italic"
        style={{ borderColor: "var(--ink)", color: "#A3174A" }}
      >
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
  // On the ground it stands (feet on the ground line); on a rung it sits with its
  // body on the rung's top edge, at a different spot per step.
  const seatY =
    st.you === 0
      ? GROUND_Y - (MASCOT_FEET_Y - MASCOT_SEAT_Y) * MASCOT_SCALE
      : RUNG_Y[st.you] - 9;
  const seatDx = SEAT_X[step] - 190;

  return (
    <svg
      viewBox="0 0 420 520"
      className={`scroll-ladder block h-[clamp(280px,calc(100vh-430px),470px)] w-auto overflow-visible font-display${st.broke ? " desc" : ""}`}
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
            {/* Snapped plank, shown when this rung breaks during the descent */}
            <g className="sl-broken" aria-hidden="true">
              <path
                className="sl-piece sl-piece-l"
                d={`M140 ${y - 9} H187 L182 ${y - 3} L189 ${y + 2} L184 ${y + 9} H140 Z`}
              />
              <path
                className="sl-piece sl-piece-r"
                d={`M240 ${y - 9} H193 L188 ${y - 3} L195 ${y + 2} L190 ${y + 9} H240 Z`}
              />
            </g>
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
      <g className="sl-return" aria-hidden="true">
        <path className="sl-return-line" d="M226 214 C240 236 238 260 214 276" pathLength="100" />
        <path className="sl-return-head" d="M222 279 L213 277 L216 268" />
      </g>

      {/* "You": the mascot. Stands on the ground at L0, sits on the current rung otherwise. */}
      <g
        className={`sl-you${st.you === 0 ? "" : " mascot-blink"}`}
        style={{ transform: `translate(${seatDx}px, ${seatY}px)` }}
        aria-hidden="true"
      >
        <g transform={`translate(${190 - (MASCOT_W * MASCOT_SCALE) / 2} ${-MASCOT_SEAT_Y * MASCOT_SCALE}) scale(${MASCOT_SCALE})`}>
          <MascotShape book pose={st.you === 0 ? "stand" : "sit"} />
        </g>
      </g>
    </svg>
  );
}
