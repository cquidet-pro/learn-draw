// The Learn to Draw brand: a friendly crayon mascot + a colourful, crayon-
// coloured wordmark. Built for little artists — and with them. Used on the home
// header.

// Crayon palette, cycled across the wordmark's letters like a pack of crayons.
const PALETTE = ["#e63946", "#f4a300", "#06d6a0", "#118ab2", "#9b5de5"];
const WORDMARK = "Learn to Draw";

function CrayonMascot() {
  return (
    <svg
      className="brand-mascot"
      viewBox="0 0 60 76"
      role="img"
      aria-label="Learn to Draw crayon"
    >
      {/* tip */}
      <path
        d="M30,3 L41,22 L19,22 Z"
        fill="#fb8500"
        stroke="#3a2a20"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* body */}
      <rect x="17" y="21" width="26" height="50" rx="7" fill="#ffd23f" stroke="#3a2a20" strokeWidth="2" />
      {/* paper label band */}
      <rect x="17" y="27" width="26" height="9" fill="#fff3c4" stroke="#3a2a20" strokeWidth="1.5" />
      {/* cheeks */}
      <ellipse cx="21" cy="54" rx="3" ry="2.2" fill="#ff9eb1" />
      <ellipse cx="39" cy="54" rx="3" ry="2.2" fill="#ff9eb1" />
      {/* eyes */}
      <circle cx="25" cy="49" r="2.4" fill="#3a2a20" />
      <circle cx="35" cy="49" r="2.4" fill="#3a2a20" />
      {/* smile */}
      <path d="M25,55 Q30,60 35,55" fill="none" stroke="#3a2a20" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Brand() {
  // Colour each letter, cycling the crayon palette but only advancing on real
  // letters so spaces between words don't shift the colours.
  let colorIndex = 0;
  return (
    <header className="brand">
      <div className="brand-row">
        <CrayonMascot />
        <h1 className="brand-name" aria-label={WORDMARK}>
          {[...WORDMARK].map((ch, i) =>
            ch === " " ? (
              <span key={i} className="brand-space" aria-hidden="true">
                {" "}
              </span>
            ) : (
              <span
                key={i}
                style={{ color: PALETTE[colorIndex++ % PALETTE.length] }}
                aria-hidden="true"
              >
                {ch}
              </span>
            ),
          )}
        </h1>
      </div>
      <span className="brand-stripes" aria-hidden="true" />
      <p className="brand-tagline">
        Let's learn to draw — built with little artists 💛
      </p>
    </header>
  );
}
