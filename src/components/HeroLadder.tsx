const rungs = [
  { level: "L4", discover: "GTM", ship: "Growth Engine", color: "#18A7CC", accent: true },
  { level: "L3", discover: "Value", ship: "Experiments", color: "#1F74BE" },
  { level: "L2", discover: "Jobs", ship: "MVP Scope", color: "#3D43A4" },
  { level: "L1", discover: "Problem", ship: "Customer Persona", color: "#3B1460" },
];

const RAIL = "var(--ink)";

/**
 * Hero ladder: Discover labels on the left, Ship artifacts on the right,
 * L1–L4 rungs between two rails standing on the L0 (ICP) ground line.
 */
export function HeroLadder() {
  return (
    <figure className="w-full select-none" aria-label="The Discovery Ladder">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 sm:gap-x-6">
        {/* Column headers */}
        <div className="text-right pb-4">
          <div
            className="font-display italic text-2xl leading-none"
            style={{ color: "#127A9C" }}
          >
            Discover
          </div>
          <div className="mt-1 text-xs text-muted-foreground">what you learn</div>
        </div>
        <div className="relative w-16 sm:w-28">
          <Rails />
        </div>
        <div className="text-left pb-4">
          <div
            className="font-display italic text-2xl leading-none"
            style={{ color: "var(--violet)" }}
          >
            Ship
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            what it earns you
          </div>
        </div>

        {rungs.map((r) => (
          <Row key={r.level} {...r} />
        ))}

        {/* Space between L1 and the ground */}
        <div />
        <div className="relative h-12 sm:h-16">
          <Rails />
        </div>
        <div />
      </div>

      {/* L0 ground line */}
      <div className="mx-auto h-[3px] w-[85%]" style={{ background: RAIL }} />
      <figcaption className="mt-5 text-center font-mono text-xs text-muted-foreground">
        L0 · ICP: the ground it stands on
      </figcaption>
    </figure>
  );
}

function Row({
  level,
  discover,
  ship,
  color,
  accent,
}: {
  level: string;
  discover: string;
  ship: string;
  color: string;
  accent?: boolean;
}) {
  return (
    <>
      <div
        className="flex items-center justify-end whitespace-nowrap text-right font-display font-medium text-lg sm:text-[1.5rem] leading-none"
        style={{ color: accent ? "var(--violet)" : "var(--ink)" }}
      >
        {discover}
      </div>
      <div className="relative flex h-20 sm:h-[6.5rem] items-center">
        <Rails />
        <div
          className="relative mx-[3px] sm:mx-1 flex h-8 sm:h-9 w-full items-center justify-center font-display text-sm text-white"
          style={{ background: color }}
        >
          {level}
        </div>
      </div>
      <div
        className="flex items-center whitespace-nowrap text-left font-display italic text-lg sm:text-[1.5rem] leading-none"
        style={{ color: accent ? "var(--violet)" : "var(--ink)" }}
      >
        {ship}
      </div>
    </>
  );
}

function Rails() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] sm:w-1"
        style={{ background: RAIL }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[3px] sm:w-1"
        style={{ background: RAIL }}
      />
    </>
  );
}
