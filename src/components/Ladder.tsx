interface LadderProps {
  annotated?: boolean;
}

const rungs = [
  { level: "L4", discover: "GTM", ship: "Growth Engine", color: "var(--green)" },
  { level: "L3", discover: "Value", ship: "Product V1", color: "var(--teal)" },
  { level: "L2", discover: "Jobs", ship: "MVP Scope", color: "var(--amber)" },
  { level: "L1", discover: "Problem", ship: "Solution", color: "var(--red)" },
];

export function Ladder({ annotated = false }: LadderProps) {
  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-2xl">
        {/* Rails */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 sm:gap-10">
          {/* Headers */}
          <div className="text-right">
            <span className="chip" style={{ color: "var(--teal)" }}>
              <span className="chip-dot" /> Discover
            </span>
          </div>
          <div className="w-16 sm:w-20" />
          <div className="text-left">
            <span className="chip" style={{ color: "var(--violet)" }}>
              <span className="chip-dot" /> Ship
            </span>
          </div>
        </div>

        <div className="relative mt-6">
          {/* Vertical rails */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-[34px] sm:-translate-x-[40px] w-px"
            style={{ background: "var(--rule)" }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 translate-x-[33px] sm:translate-x-[39px] w-px"
            style={{ background: "var(--rule)" }}
          />

          <ul className="flex flex-col gap-3">
            {rungs.map((r) => (
              <li
                key={r.level}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 sm:gap-10"
              >
                <div className="text-right">
                  <div className="font-display text-lg sm:text-xl text-ink leading-tight">
                    {r.discover}
                  </div>
                  {annotated && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Discovery objective
                    </div>
                  )}
                </div>

                <div className="relative flex items-center justify-center">
                  <div
                    className="w-16 sm:w-20 h-12 sm:h-14 flex items-center justify-center rounded-sm text-white font-display text-base sm:text-lg shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                    style={{ background: r.color, color: r.level === "L2" ? "#1a1a1a" : "white" }}
                  >
                    {r.level}
                  </div>
                </div>

                <div className="text-left">
                  <div className="font-display text-lg sm:text-xl text-ink leading-tight">
                    {r.ship}
                  </div>
                  {annotated && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Build artifact
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* L0 foundation */}
        <div
          className="mt-4 rounded-sm border px-5 py-3 text-center"
          style={{ background: "oklch(0.97 0.005 280)", borderColor: "var(--rule)" }}
        >
          <div className="chip justify-center" style={{ color: "var(--ink)", opacity: 0.7 }}>
            <span className="chip-dot" style={{ background: "var(--muted-foreground)" }} />
            Level 0 · ICP
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Ideal Customer Profile — foundational, continuously refined
          </div>
        </div>
      </div>
    </div>
  );
}
