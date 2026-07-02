// Small inline SVG icon set drawn for this app (no icon font,
// no comfort-zone defaults). Stroke-based, 24x24 grid.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 20, children, label }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} role="img" aria-label={label}>
      {children}
    </svg>
  )
}

export const SunIcon = (p) => (
  <Svg {...p} label="Light">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
  </Svg>
)

export const DropIcon = (p) => (
  <Svg {...p} label="Water">
    <path d="M12 3.5c3.5 4.2 6 7.4 6 10.5a6 6 0 0 1-12 0c0-3.1 2.5-6.3 6-10.5Z" />
    <path d="M9.5 14.5a2.6 2.6 0 0 0 2 2.4" />
  </Svg>
)

export const MistIcon = (p) => (
  <Svg {...p} label="Humidity">
    <path d="M4 9.5h9M7 13.5h13M4 17.5h11" />
    <path d="M17.5 4.5c1 1.3 1.8 2.3 1.8 3.3a1.8 1.8 0 1 1-3.6 0c0-1 .8-2 1.8-3.3Z" />
  </Svg>
)

export const GaugeIcon = (p) => (
  <Svg {...p} label="Difficulty">
    <path d="M5 16.5a8 8 0 1 1 14 0" />
    <path d="M12 13.5l3.5-3.5" />
    <circle cx="12" cy="14.5" r="1.6" />
  </Svg>
)

export const BackIcon = (p) => (
  <Svg {...p} label="Back">
    <path d="M14.5 5.5 8 12l6.5 6.5" />
  </Svg>
)

export const SearchIcon = (p) => (
  <Svg {...p} label="Search">
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15.5 15.5 4.5 4.5" />
  </Svg>
)

export const PlusIcon = (p) => (
  <Svg {...p} label="Add">
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const GlobeIcon = (p) => (
  <Svg {...p} label="Public">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5s-1.3 6.1-3.9 8.5c-2.6-2.4-3.9-5.2-3.9-8.5S9.4 5.9 12 3.5Z" />
  </Svg>
)

export const PeopleIcon = (p) => (
  <Svg {...p} label="Friends">
    <circle cx="9" cy="9" r="3.2" />
    <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
    <path d="M15.5 6.2a3.2 3.2 0 0 1 0 5.9M17.5 14.6c1.6.7 2.7 2.2 3 4.4" />
  </Svg>
)

export const LockIcon = (p) => (
  <Svg {...p} label="Private">
    <rect x="5.5" y="10.5" width="13" height="9" rx="2.5" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
  </Svg>
)

export const SproutIcon = (p) => (
  <Svg {...p} label="Sprout">
    <path d="M12 20v-7" />
    <path d="M12 13c0-3.5-2.6-6-6.5-6 .3 3.7 3 6 6.5 6ZM12 11c0-3 2.3-5.2 5.8-5.3-.3 3.3-2.6 5.3-5.8 5.3Z" />
  </Svg>
)

export const CalendarIcon = (p) => (
  <Svg {...p} label="Date">
    <rect x="4" y="6" width="16" height="14" rx="2.5" />
    <path d="M4 10.5h16M8.5 3.5v4M15.5 3.5v4" />
  </Svg>
)
