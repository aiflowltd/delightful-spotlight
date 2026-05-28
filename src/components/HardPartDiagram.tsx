export function HardPartDiagram() {
  const steps = ["Discovery", "Insight", "Build"];
  return (
    <div className="w-full">
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

        {/* Brackets */}
        <div className="mt-6 grid grid-cols-3 gap-4 sm:gap-8 relative">
          {/* Old hard part: between step 2 and 3 (cols 2-3) */}
          <div className="col-start-2 col-span-2">
            <div className="border-t-2 border-dashed pt-2 text-center text-xs uppercase tracking-[0.14em] text-muted-foreground" style={{ borderColor: "var(--rule)" }}>
              Old hard part · execution
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 sm:gap-8">
          {/* New hard part: between step 1 and 2 (cols 1-2) */}
          <div className="col-start-1 col-span-2">
            <div
              className="border-t-2 pt-2 text-center text-xs uppercase tracking-[0.14em] font-semibold"
              style={{ borderColor: "var(--violet)", color: "var(--violet)" }}
            >
              New hard part · judgment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
