import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// Interactive walkthrough of the Ladder: pick a rung, see only that level.
// Desktop: vertical ladder on the left, detail panel on the right.
// Mobile: rungs become a horizontal, scrollable tab row above the panel.

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
  /** Text color on top of `color`. */
  onColor: string;
};

// Climbing order: L0 → L4. Prev/Next follow this order.
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
    onColor: "var(--ink)",
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
    onColor: "white",
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
    onColor: "#1a1a1a",
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
    onColor: "#0a2229",
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
    onColor: "white",
  },
];

export function LadderExplorer() {
  const [active, setActive] = useState(1); // start at Level 1
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const level = levels[active];

  const select = (i: number, focus = false) => {
    const next = Math.max(0, Math.min(levels.length - 1, i));
    setActive(next);
    const tab = tabRefs.current[next];
    if (focus) tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      select(active + 1, true);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      select(active - 1, true);
    }
  };


  return (
    <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-6 lg:gap-12 items-stretch">
      {/* Rungs */}
      <div
        role="tablist"
        aria-label="Discovery Ladder levels"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex lg:flex-col-reverse gap-2 overflow-x-auto lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0 pb-1 snap-x"
      >
        {levels.map((l, i) => {
          const selected = i === active;
          return (
            <button
              key={l.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`ladder-tab-${l.id}`}
              aria-selected={selected}
              aria-controls="ladder-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className="snap-start shrink-0 flex items-center gap-3 rounded-sm border px-3 py-2.5 text-left transition-colors lg:w-full"
              style={{
                borderColor: selected ? l.color : "var(--rule)",
                background: selected ? "var(--violet-tint)" : "var(--background)",
              }}
            >
              <span
                className="grid place-items-center h-9 w-11 rounded-sm font-display text-sm shrink-0"
                style={{ background: l.color, color: l.onColor }}
              >
                {l.short}
              </span>
              <span className="whitespace-nowrap lg:whitespace-normal">
                <span className="block font-display text-base leading-tight text-ink">
                  {l.title}
                </span>
                <span className="hidden lg:block text-xs text-muted-foreground mt-0.5">
                  Ship → {l.ship}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        id="ladder-panel"
        role="tabpanel"
        aria-labelledby={`ladder-tab-${level.id}`}
        className="relative rounded-sm border p-6 sm:p-10 flex flex-col"
        style={{ borderColor: "var(--rule)" }}
      >
        <div
          className="absolute left-0 top-0 h-1 w-full rounded-t-sm"
          style={{ background: level.color }}
          aria-hidden="true"
        />
        <div className="text-sm text-muted-foreground">
          {level.label}
          {active > 0 ? ` of ${levels.length - 1}` : " · the foundation"}
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

        <div className="mt-auto pt-8 flex items-center justify-between gap-4 text-sm">
          <button
            type="button"
            onClick={() => select(active - 1)}
            disabled={active === 0}
            className="font-medium disabled:invisible hover:underline text-left"
            style={{ color: "var(--violet)" }}
          >
            ← {active > 0 ? levels[active - 1].title : ""}
          </button>
          <button
            type="button"
            onClick={() => select(active + 1)}
            disabled={active === levels.length - 1}
            className="font-medium disabled:invisible hover:underline text-right"
            style={{ color: "var(--violet)" }}
          >
            {active < levels.length - 1 ? levels[active + 1].title : ""} →
          </button>
        </div>
      </div>
    </div>
  );
}
