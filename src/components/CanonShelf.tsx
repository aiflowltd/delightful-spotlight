import type { CSSProperties, ReactNode } from "react";

/**
 * Books lying flat in a pile, bottom to top, grouped like the ladder:
 * L1 sources at the base, L2 in the middle, L3 on top. Sizes are desktop px
 * (x = left offset, w = length, h = thickness); phones scale them down.
 */
const books = [
  { title: "The Four Steps to the Epiphany", author: "Blank", color: "#2B2A35", x: 0, w: 430, h: 46 },
  { title: "Talking to Humans", author: "Constable & Rimalovski", color: "#3D3F9E", x: 18, w: 400, h: 38 },
  { title: "The Mom Test", author: "Fitzpatrick", color: "#B8300F", x: 6, w: 380, h: 36 },
  { title: "Competing Against Luck", author: "Christensen", color: "#1F70BA", x: 24, w: 410, h: 42 },
  { title: "Testing with Humans", author: "Constable & Rimalovski", color: "#561D96", x: 10, w: 390, h: 38 },
  { title: "The Startup Owner's Manual", author: "Blank & Dorf", color: "#4B4560", x: 30, w: 395, h: 44 },
  { title: "The Lean Startup", author: "Ries", color: "#18171F", x: 16, w: 400, h: 38 },
  { title: "Value Proposition Design", author: "Osterwalder", color: "#18A2C6", x: 40, w: 420, h: 40 },
];

/** `caption` sits to the right of the pile on wide screens, below it otherwise. */
export function CanonShelf({ caption }: { caption?: ReactNode }) {
  return (
    <figure aria-label="The books the Discovery Ladder builds on, stacked in a pile">
      <div className="flex items-center border-b-[3px]" style={{ borderColor: "var(--ink)" }}>
        <div className="flex shrink-0 flex-col-reverse w-[calc(460px*0.55)] sm:w-[460px]">
          {books.map((b) => (
            <div
              key={b.title}
              className="flex items-center justify-between gap-3 px-2 sm:px-3.5 ml-[calc(var(--x)*0.55px)] sm:ml-[calc(var(--x)*1px)] w-[calc(var(--w)*0.55px)] sm:w-[calc(var(--w)*1px)] h-[calc(var(--h)*0.6px)] sm:h-[calc(var(--h)*1px)]"
              style={{ background: b.color, "--x": b.x, "--w": b.w, "--h": b.h } as CSSProperties}
              title={`${b.title} — ${b.author}`}
            >
              <span className="truncate font-display font-medium text-[9.5px] sm:text-[15px] leading-none text-white">
                {b.title}
              </span>
              <span className="hidden sm:inline shrink-0 font-mono text-[10px] tracking-wide text-white/75 whitespace-nowrap">
                {b.author}
              </span>
            </div>
          ))}
        </div>
        {caption && (
          <div className="hidden lg:block flex-1 pl-16 max-w-xl">{caption}</div>
        )}
      </div>
      {caption && <div className="mt-8 lg:hidden">{caption}</div>}
    </figure>
  );
}
