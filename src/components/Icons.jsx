// Icônes SVG de la maison — trait 1.6, arrondi, cohérentes avec le monogramme.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ name, size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const paths = {
  cup: (
    <>
      <path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 5.5c0-1 .8-1 .8-2M11.5 5.5c0-1 .8-1 .8-2" opacity="0.7" />
    </>
  ),
  tea: (
    <>
      <path d="M6 10c0-1 .9-2 2-2h8c1.1 0 2 1 2 2 0 5-2.5 9-6 9s-6-4-6-9z" />
      <path d="M12 8V5.5M12 5.5c2 0 3-1.5 3-2.5-2 0-3 .8-3 2.5z" />
      <path d="M8.5 21h7" opacity="0.7" />
    </>
  ),
  mojito: (
    <>
      <path d="M7 4h10l-1.6 15a2 2 0 0 1-2 1.8h-2.8a2 2 0 0 1-2-1.8L7 4z" />
      <path d="M7.6 9h8.8" opacity="0.7" />
      <path d="M10 12.5l1.5 1.5M13.5 11l-2 2" opacity="0.7" />
      <path d="M13 4l4-2.5" />
    </>
  ),
  turc: (
    <>
      <path d="M8 8h8l-.8 6.5a3 3 0 0 1-3 2.5h-.4a3 3 0 0 1-3-2.5L8 8z" />
      <path d="M16 9.5h1.2a2 2 0 0 1 0 4H15.5" />
      <path d="M6 20h12" opacity="0.7" />
      <path d="M10.5 5c0-.8.6-.8.6-1.6M13 5c0-.8.6-.8.6-1.6" opacity="0.7" />
    </>
  ),
  cocktail: (
    <>
      <path d="M5 4h14l-6 7v7" />
      <path d="M9 20h6" />
      <path d="M7.5 7h9" opacity="0.7" />
      <circle cx="17.5" cy="3.5" r="1.2" opacity="0.7" />
    </>
  ),
  fruit: (
    <>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15.5" cy="13" r="4" opacity="0.7" />
      <path d="M9 9c0-2 1-3.5 3-4.5M12 4.5c1.5-.5 3 0 3.5 1" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-10.4a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: (
    <>
      <path d="M6 3.5h3l1.5 4-2 1.2a10.5 10.5 0 0 0 5 5l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4 5.5a2 2 0 0 1 2-2z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 21v-7.5h2.5l.4-3H14.5V8.4c0-.9.25-1.5 1.55-1.5H17.5V4.3A20 20 0 0 0 15.2 4.2c-2.27 0-3.83 1.38-3.83 3.93v2.37H9v3h2.37V21h3.13z" fill="currentColor" stroke="none" />
  ),
  star: (
    <path d="M12 4l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.3l5-.7L12 4z" />
  ),
  pizza: (
    <>
      <path d="M12 3.5c3.2 0 6.2.8 8.5 2.2L12 21 3.5 5.7A17.5 17.5 0 0 1 12 3.5z" />
      <path d="M5.5 9.2a14 14 0 0 1 13 0" opacity="0.7" />
      <circle cx="10" cy="12.5" r="1.1" opacity="0.8" />
      <circle cx="13.8" cy="14.8" r="0.9" opacity="0.8" />
    </>
  ),
  burger: (
    <>
      <path d="M4.5 10.5c0-3.3 3.3-5.5 7.5-5.5s7.5 2.2 7.5 5.5H4.5z" />
      <path d="M4 13.5h16M6 13.5c1 1 2 1 3 0s2-1 3 0 2 1 3 0 2-1 3 0" opacity="0" />
      <path d="M4.5 13.5h15" />
      <path d="M5 16.5h14v.8a2.2 2.2 0 0 1-2.2 2.2H7.2A2.2 2.2 0 0 1 5 17.3v-.8z" />
      <path d="M9 8h.01M12 7.4h.01M15 8h.01" opacity="0.7" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4.5 7.5 12 13l7.5-5.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14z" />
      <path d="M5 19c3-3 6-6 10-10" opacity="0.7" />
    </>
  ),
  marble: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="1.5" />
      <path d="M4 12l4-4M9 20l7-8M14 20l6-6" opacity="0.6" />
      <path d="M8 8V5.5M16 8V5.5" opacity="0.7" />
    </>
  ),
  family: (
    <>
      <circle cx="8.5" cy="8" r="2.5" />
      <circle cx="16" cy="9" r="2" opacity="0.8" />
      <path d="M4.5 19c0-3 1.8-5 4-5s4 2 4 5" />
      <path d="M13.5 18c.3-2.3 1.3-3.8 2.5-3.8 1.5 0 3 1.8 3 4.3" opacity="0.8" />
    </>
  ),
}
