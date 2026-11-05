// The Discovery Ladder mascot: a round violet pebble with a curl on top.
// Drawn in a 62 × 74 box; the body's bottom ("seat") is at y = 64 and the feet at y = 73.
// Used by the canon-shelf walker, the scroll ladder, and the logo.

export const MASCOT_W = 62;
export const MASCOT_SEAT_Y = 64;
export const MASCOT_FEET_Y = 73;

const ARM = "#4A1B86";

export function MascotShape({
  look = "viewer",
  book = false,
  arms = false,
  pose = "stand",
}: {
  /** Where the pupils point. */
  look?: "right" | "viewer";
  /** Carry a red book under the arm. */
  book?: boolean;
  /** Small arms at the sides (when not carrying the book). */
  arms?: boolean;
  /** "sit": legs dangle down in front of whatever it sits on (drawn over the body). */
  pose?: "stand" | "sit";
}) {
  const dx = look === "right" ? 2 : 0;
  return (
    <>
      {pose === "stand" && (
        <g className="walker-legs" fill="var(--violet)">
          <rect className="walker-leg walker-leg-a" x="18" y="58" width="11" height="15" rx="5.5" />
          <rect className="walker-leg walker-leg-b" x="33" y="58" width="11" height="15" rx="5.5" />
        </g>
      )}
      <g className="walker-top" fill="var(--violet)">
        <path
          d="M31 9C29 4 33 1 36 3"
          fill="none"
          stroke="var(--violet)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M31 7C48 7 57 20 57 37C57 54 47 64 31 64C15 64 5 54 5 37C5 20 14 7 31 7Z" />
        <g className="mascot-eyes">
          <circle cx="25" cy="27" r="5" fill="white" />
          <circle cx="38" cy="27" r="5" fill="white" />
          <circle className="walker-pupil" cx={25 + dx} cy="27.5" r="2.3" fill="var(--ink)" />
          <circle className="walker-pupil" cx={38 + dx} cy="27.5" r="2.3" fill="var(--ink)" />
        </g>
        {book && (
          <>
            <g transform="rotate(-10 54 46)">
              <rect x="46" y="34" width="17" height="23" rx="1.5" fill="#B8300F" />
              <rect x="61" y="35.5" width="2.5" height="20" rx="0.8" fill="#F3EDE6" />
              <rect x="49" y="39" width="8" height="1.6" rx="0.8" fill="white" opacity="0.75" />
            </g>
            <ellipse cx="48" cy="46" rx="4.8" ry="7.5" fill={ARM} transform="rotate(-20 48 46)" />
          </>
        )}
        {arms && (
          <>
            <ellipse cx="8" cy="45" rx="4.5" ry="7" fill={ARM} transform="rotate(15 8 45)" />
            <ellipse cx="54" cy="45" rx="4.5" ry="7" fill={ARM} transform="rotate(-15 54 45)" />
          </>
        )}
      </g>
      {pose === "sit" && (
        <g fill="var(--violet)">
          {/* Legs hang over the front of the rung, feet below it */}
          <rect x="17" y="54" width="11" height="38" rx="5.5" transform="rotate(6 22.5 54)" />
          <rect x="34" y="54" width="11" height="38" rx="5.5" transform="rotate(-6 39.5 54)" />
        </g>
      )}
    </>
  );
}

/** Standalone mascot icon (logo). */
export function MascotIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="2 0 64 74"
      width={(size * 64) / 74}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <MascotShape book />
    </svg>
  );
}
