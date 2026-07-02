// App logo: a solid rounded green locker with a single sprout
// growing out of the top. Minimal, flat, inline SVG.
export default function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="Plant Locker logo"
      role="img"
    >
      {/* sprout */}
      <path
        d="M24 13.5V7.5"
        stroke="#2F8050"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M24 9.2C24 6 21.4 3.6 17.6 3.5c.2 3.4 2.8 5.7 6.4 5.7Z"
        fill="#3E9B5F"
      />
      <path
        d="M24 9.2c0-3.2 2.6-5.6 6.4-5.7-.2 3.4-2.8 5.7-6.4 5.7Z"
        fill="#57B274"
      />
      {/* locker body */}
      <rect x="10" y="13" width="28" height="32" rx="7" fill="#2F8050" />
      {/* vents */}
      <rect x="18" y="20" width="12" height="2.6" rx="1.3" fill="#E6F4EB" />
      <rect x="18" y="26" width="12" height="2.6" rx="1.3" fill="#E6F4EB" />
      {/* handle */}
      <rect x="21" y="34" width="6" height="3.4" rx="1.7" fill="#B9DFC7" />
    </svg>
  )
}
