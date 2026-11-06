/**
 * Illustrative interview records, styled after Evi's interview report:
 * Pain Scale (5 Hair on Fire → 1 Not a Problem) and Signal Quality (5 Trusted → 1 Unusable).
 */

type Tone = "rose" | "green" | "amber";

interface EviRecord {
  id: string;
  segment: string;
  quote: string;
  pain: { score: number; label: string; tone: Tone };
  signal: { score: number; label: string };
  level: string;
  flag?: string;
}

const records: EviRecord[] = [
  {
    id: "#14",
    segment: "Ops lead, logistics",
    quote:
      "Every Monday I rebuild the same spreadsheet by hand. I've stopped telling my boss how long it takes.",
    pain: { score: 4, label: "Incremental Improvement", tone: "green" },
    signal: { score: 5, label: "Trusted" },
    level: "L2",
  },
  {
    id: "#31",
    segment: "Solo bookkeeper",
    quote: "What kills me is chasing the clients for the remittance slips.",
    pain: { score: 5, label: "Hair on Fire", tone: "rose" },
    signal: { score: 4, label: "Usable" },
    level: "L3 → L2",
  },
  {
    id: "#7",
    segment: "Clinic manager",
    quote: "Oh yeah, that would be super useful.",
    pain: { score: 3, label: "Nice to Have", tone: "amber" },
    signal: { score: 2, label: "Directional" },
    level: "L1",
    flag: "Reaction to the idea. Treat as politeness, not evidence.",
  },
];

const tones: Record<Tone, { text: string }> = {
  rose: { text: "#B4233C" },
  green: { text: "#047857" },
  amber: { text: "#92400E" },
};

/** Card placement on large screens: [top, left, rotation]. */
const placement = [
  "lg:absolute lg:top-0 lg:left-0 lg:-rotate-2 lg:z-10",
  "lg:absolute lg:top-40 lg:right-0 lg:rotate-[1.5deg] lg:z-20",
  "lg:absolute lg:top-[21rem] lg:left-10 lg:-rotate-1 lg:z-30",
];

export function EviCards() {
  return (
    <div className="relative flex flex-col gap-4 lg:block lg:h-[36rem]" aria-label="Example Evi interview records">
      {records.map((r, i) => (
        <RecordCard key={r.id} r={r} className={placement[i]} />
      ))}
    </div>
  );
}

function RecordCard({ r, className = "" }: { r: EviRecord; className?: string }) {
  const tone = tones[r.pain.tone];
  return (
    <article
      className={`w-full lg:w-[23rem] rounded-xl border bg-white p-4 shadow-[0_12px_32px_-12px_rgba(20,20,40,0.25)] ${className}`}
      style={{ borderColor: "#E2E8F0" }}
    >
      <header className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-slate-500">Interview {r.id}</span>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={{ background: "#F1F5F9", color: "#475569" }}
        >
          {r.segment}
        </span>
      </header>

      <p className="mt-3 font-display text-[17px] leading-snug text-ink">“{r.quote}”</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div
          className="rounded-lg border px-2.5 py-2"
          style={{ borderColor: "#E2E8F0" }}
        >
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Pain scale
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5" style={{ color: tone.text }}>
            <span className="text-lg font-bold leading-none">{r.pain.score}/5</span>
            <span className="truncate text-[12px] font-semibold">{r.pain.label}</span>
          </div>
        </div>
        <div className="rounded-lg border px-2.5 py-2" style={{ borderColor: "#E2E8F0" }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Signal quality
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5 text-slate-900">
            <SignalBars score={r.signal.score} />
            <span className="text-lg font-bold leading-none">{r.signal.score}/5</span>
            <span className="truncate text-[12px] font-semibold">{r.signal.label}</span>
          </div>
        </div>
      </div>

      {r.flag && (
        <div
          className="mt-2 flex items-start gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] leading-snug"
          style={{ background: "#F8FAFC", color: "#9A3412" }}
        >
          <span aria-hidden>⚑</span>
          <span>{r.flag}</span>
        </div>
      )}

      <footer className="mt-3 flex items-center justify-between border-t pt-2 text-[11px]" style={{ borderColor: "#F1F5F9" }}>
        <span className="font-semibold uppercase tracking-[0.12em] text-slate-400">Level</span>
        <span className="font-mono text-slate-700">{r.level}</span>
      </footer>
    </article>
  );
}

function SignalBars({ score }: { score: number }) {
  return (
    <span className="inline-flex items-end gap-[2px] self-center" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-[1px]"
          style={{ height: 4 + i * 2.5, background: i < score ? "#0F172A" : "#CBD5E1" }}
        />
      ))}
    </span>
  );
}
