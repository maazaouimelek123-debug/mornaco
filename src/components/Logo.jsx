// Monogramme MORNACO — cercle en trait fin + M géométrique, fidèle au logo du menu.
export function Monogram({ size = 64, stroke = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="monogram"
    >
      <circle cx="32" cy="32" r="30" stroke={stroke} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="23.5" stroke={stroke} strokeWidth="1" opacity="0.55" />
      <path
        d="M21 43 V24 l11 13 11-13 v19"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M25 20.5 a8 8 0 0 1 14 0" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}

export function Wordmark({ className = '' }) {
  return <span className={`wordmark ${className}`}>MORNACO</span>
}
