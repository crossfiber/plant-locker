// ============================================================
// PlantArt: flat inline SVG plant illustrations.
// No external images anywhere in the app; every "photo" is one
// of these motifs on a soft brand-palette background, so nothing
// can ever look broken.
//
// Props:
//   art   - motif key from species data (e.g. 'monstera', 'snake')
//   stage - 'sprout' | 'young' | 'full' (timeline progression)
//   tint  - 'mint' | 'sage' | 'sand' | 'peach' background tone
//   className - sizing/rounding from the caller
// ============================================================

const TINTS = {
  mint: { bg: '#E6F4EB', deco: '#D3ECDC' },
  sage: { bg: '#DFE9E2', deco: '#CCDCD1' },
  sand: { bg: '#F4EFE3', deco: '#EAE1CE' },
  peach: { bg: '#FDEDE4', deco: '#F8DBCA' },
}

const G = { dark: '#256B42', mid: '#3E9B5F', light: '#57B274' }

function Pot({ wide = false }) {
  const x = wide ? 30 : 34
  const w = wide ? 40 : 32
  return (
    <g>
      <ellipse cx="50" cy="90" rx={w / 2 + 6} ry="3" fill="rgba(29,53,39,0.08)" />
      <path
        d={`M${x + 2} 72 L${x + w - 2} 72 L${x + w - 5} 88 Q${x + w - 6} 90 ${x + w - 8} 90 L${x + 8} 90 Q${x + 6} 90 ${x + 5} 88 Z`}
        fill="#FFFFFF"
      />
      <rect x={x} y="68" width={w} height="6" rx="3" fill="#FFFFFF" />
      <rect x={x} y="68" width={w} height="6" rx="3" fill="rgba(37,107,66,0.12)" />
    </g>
  )
}

/* Each motif draws foliage rising from y=70 in a 100x100 viewBox. */
const MOTIFS = {
  monstera: (
    <g>
      <path d="M50 70 C48 56 44 46 34 38" stroke={G.dark} strokeWidth="2.5" fill="none" />
      <path d="M50 70 C52 54 56 44 66 36" stroke={G.dark} strokeWidth="2.5" fill="none" />
      <path
        d="M34 38 C20 30 18 12 34 10 C50 8 54 26 44 40 C40 44 36 42 34 38 Z"
        fill={G.mid}
      />
      <path
        d="M66 36 C80 28 82 10 66 8 C50 6 46 24 56 38 C60 42 64 40 66 36 Z"
        fill={G.dark}
      />
      {/* fenestrations */}
      <path d="M31 32 L21 26" stroke="#E6F4EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M35 24 L27 17" stroke="#E6F4EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M69 30 L79 24" stroke="#E6F4EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M65 22 L73 15" stroke="#E6F4EB" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  snake: (
    <g>
      <path d="M42 70 C38 52 38 36 42 22 C46 34 46 54 46 70 Z" fill={G.dark} />
      <path d="M50 70 C46 48 47 28 52 12 C57 28 56 50 54 70 Z" fill={G.mid} />
      <path d="M58 70 C56 54 57 40 62 28 C66 42 64 58 62 70 Z" fill={G.dark} />
      <path d="M35 70 C33 58 34 48 38 40 C41 50 39 62 39 70 Z" fill={G.light} />
      <path d="M65 70 C64 60 66 52 70 46 C72 56 69 64 68 70 Z" fill={G.light} />
    </g>
  ),
  trailing: (
    <g>
      <path d="M38 70 C30 74 24 82 22 92" stroke={G.mid} strokeWidth="2.4" fill="none" />
      <path d="M62 70 C70 74 76 80 78 90" stroke={G.mid} strokeWidth="2.4" fill="none" />
      <path d="M50 70 C48 58 46 48 40 40" stroke={G.dark} strokeWidth="2.4" fill="none" />
      <path d="M50 70 C54 58 58 50 64 44" stroke={G.dark} strokeWidth="2.4" fill="none" />
      {[
        [40, 38, G.mid], [30, 50, G.light], [64, 42, G.dark], [72, 52, G.mid],
        [24, 84, G.dark], [76, 82, G.light], [46, 52, G.dark], [58, 56, G.light],
      ].map(([x, y, c], i) => (
        <path
          key={i}
          d={`M${x} ${y} c-6 -7 2 -13 6 -7 c4 -6 12 0 6 7 c-3 4 -9 4 -12 0 Z`}
          fill={c}
        />
      ))}
    </g>
  ),
  palm: (
    <g>
      <ellipse cx="50" cy="66" rx="10" ry="9" fill="#D9C29A" />
      <path d="M47 58 L47 42 L53 42 L53 58 Z" fill="#C9B084" />
      <path d="M50 42 C36 40 26 30 24 18 C38 22 48 30 50 42 Z" fill={G.mid} />
      <path d="M50 42 C64 40 74 30 76 18 C62 22 52 30 50 42 Z" fill={G.mid} />
      <path d="M50 42 C42 32 40 20 44 8 C52 16 54 30 50 42 Z" fill={G.dark} />
      <path d="M50 42 C58 32 60 20 56 8 C48 16 46 30 50 42 Z" fill={G.light} />
    </g>
  ),
  zz: (
    <g>
      <path d="M46 70 C42 54 40 40 42 26" stroke={G.dark} strokeWidth="2.4" fill="none" />
      <path d="M54 70 C58 56 60 44 58 30" stroke={G.dark} strokeWidth="2.4" fill="none" />
      {[
        [42, 28, -1], [41, 38, -1], [42, 48, -1], [44, 58, -1],
        [58, 32, 1], [59, 42, 1], [58, 52, 1], [56, 62, 1],
      ].map(([x, y, d], i) => (
        <g key={i}>
          <ellipse cx={x - d * 6} cy={y - 2} rx="5" ry="3.4" fill={i % 2 ? G.mid : G.light}
            transform={`rotate(${-d * 30} ${x - d * 6} ${y - 2})`} />
          <ellipse cx={x + d * 5} cy={y + 2} rx="5" ry="3.4" fill={i % 2 ? G.dark : G.mid}
            transform={`rotate(${d * 30} ${x + d * 5} ${y + 2})`} />
        </g>
      ))}
    </g>
  ),
  fiddle: (
    <g>
      <path d="M50 70 L50 20" stroke="#7A5C43" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 26 C36 26 30 14 34 6 C46 6 52 14 50 26 Z" fill={G.mid} />
      <path d="M50 40 C64 40 72 30 68 20 C56 20 48 28 50 40 Z" fill={G.dark} />
      <path d="M50 54 C36 54 28 46 32 36 C44 36 52 42 50 54 Z" fill={G.light} />
      <path d="M50 64 C62 64 68 56 66 48 C56 48 50 54 50 64 Z" fill={G.mid} />
    </g>
  ),
  rubber: (
    <g>
      <path d="M50 70 L50 24" stroke={G.dark} strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="38" cy="30" rx="12" ry="7" fill={G.dark} transform="rotate(-32 38 30)" />
      <ellipse cx="63" cy="26" rx="12" ry="7" fill={G.mid} transform="rotate(28 63 26)" />
      <ellipse cx="36" cy="50" rx="12" ry="7" fill={G.mid} transform="rotate(-28 36 50)" />
      <ellipse cx="64" cy="46" rx="12" ry="7" fill={G.dark} transform="rotate(26 64 46)" />
      <ellipse cx="50" cy="16" rx="6" ry="9" fill="#A9553F" transform="rotate(4 50 16)" />
    </g>
  ),
  spider: (
    <g>
      {[
        [-38, G.mid], [-24, G.light], [-10, G.dark], [4, G.mid],
        [18, G.light], [32, G.dark],
      ].map(([a, c], i) => (
        <path
          key={i}
          d="M50 70 C50 50 50 36 50 24"
          stroke={c}
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
          transform={`rotate(${a} 50 70)`}
        />
      ))}
      <path d="M50 70 C30 62 20 48 18 34" stroke={G.light} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M50 70 C70 62 80 48 82 34" stroke={G.mid} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  ),
  lily: (
    <g>
      <path d="M46 70 C38 58 34 46 36 34 C44 42 48 54 48 70 Z" fill={G.dark} />
      <path d="M54 70 C62 58 66 46 64 34 C56 42 52 54 52 70 Z" fill={G.mid} />
      <path d="M50 70 C46 56 46 42 50 30 C54 42 54 56 50 70 Z" fill={G.light} />
      <path d="M62 38 C62 24 70 14 80 12 C82 24 74 36 64 40 Z" fill="#FFFFFF" stroke="#E3E9E4" strokeWidth="1" />
      <path d="M66 36 L66 70" stroke={G.dark} strokeWidth="2.4" fill="none" />
      <rect x="68" y="22" width="3.4" height="12" rx="1.7" fill="#EFC97E" />
    </g>
  ),
  aloe: (
    <g>
      <path d="M50 70 C46 52 46 36 50 24 C54 36 54 52 50 70 Z" fill={G.mid} />
      <path d="M44 70 C36 58 32 46 34 34 C42 44 46 56 46 70 Z" fill={G.dark} />
      <path d="M56 70 C64 58 68 46 66 34 C58 44 54 56 54 70 Z" fill={G.dark} />
      <path d="M38 70 C30 64 26 56 26 48 C34 54 38 62 40 70 Z" fill={G.light} />
      <path d="M62 70 C70 64 74 56 74 48 C66 54 62 62 60 70 Z" fill={G.light} />
    </g>
  ),
  pilea: (
    <g>
      <path d="M50 70 L50 56" stroke={G.dark} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M50 58 C42 54 34 46 32 36" stroke={G.dark} strokeWidth="2" fill="none" />
      <path d="M50 58 C58 54 66 46 68 36" stroke={G.dark} strokeWidth="2" fill="none" />
      <path d="M50 58 C48 48 46 40 46 30" stroke={G.dark} strokeWidth="2" fill="none" />
      <path d="M50 58 C54 50 58 42 60 32" stroke={G.dark} strokeWidth="2" fill="none" />
      <circle cx="30" cy="32" r="9" fill={G.mid} />
      <circle cx="70" cy="32" r="10" fill={G.dark} />
      <circle cx="45" cy="25" r="8" fill={G.light} />
      <circle cx="61" cy="27" r="7" fill={G.mid} />
      <circle cx="37" cy="46" r="6" fill={G.dark} />
      <circle cx="64" cy="47" r="6" fill={G.light} />
    </g>
  ),
  pearls: (
    // Drawn in front of the pot (see render order below): a mound of
    // pearls above the rim with strands draping down the sides.
    <g>
      <path d="M36 68 C38 58 62 58 64 68 Z" fill={G.mid} />
      {[
        [39, 62], [46, 59], [54, 59], [61, 62], [50, 63],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={i % 2 ? G.dark : G.light} />
      ))}
      {[
        [33, 88, G.mid], [40, 95, G.dark], [60, 96, G.light], [67, 87, G.dark],
      ].map(([x, end, c], i) => (
        <g key={i}>
          <path d={`M${x} 66 C${x - 2} ${(66 + end) / 2} ${x} ${end - 5} ${x} ${end}`}
            stroke={c} strokeWidth="1.5" fill="none" />
          {[0.2, 0.42, 0.64, 0.86].map((t, j) => (
            <circle key={j} cx={x - 1 + (j % 2) * 2} cy={66 + (end - 66) * t} r="2.5" fill={c} />
          ))}
        </g>
      ))}
    </g>
  ),
  bop: (
    <g>
      <path d="M50 70 C48 56 46 44 40 34" stroke={G.dark} strokeWidth="2.6" fill="none" />
      <path d="M50 70 C54 56 58 46 64 38" stroke={G.dark} strokeWidth="2.6" fill="none" />
      <ellipse cx="36" cy="26" rx="9" ry="16" fill={G.mid} transform="rotate(-18 36 26)" />
      <ellipse cx="67" cy="30" rx="9" ry="15" fill={G.dark} transform="rotate(16 67 30)" />
      <path d="M50 70 C50 52 50 38 50 26" stroke={G.dark} strokeWidth="2.6" fill="none" />
      <ellipse cx="50" cy="18" rx="8" ry="13" fill={G.light} />
      {/* the bird: one peach crest on its own stalk, used sparingly */}
      <path d="M58 70 C66 62 71 54 73 46" stroke={G.dark} strokeWidth="2.2" fill="none" />
      <path d="M73 46 L86 38 L79 49 Z" fill="#F0A17D" />
      <path d="M73 46 L84 50 L76 52 Z" fill="#E98B62" />
    </g>
  ),
  calathea: (
    <g>
      {[
        [34, 34, -24, G.dark], [66, 34, 24, G.mid], [50, 24, 0, G.light],
        [40, 52, -12, G.mid], [60, 52, 12, G.dark],
      ].map(([x, y, r, c], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="8.5" ry="15" fill={c} />
          <path d={`M${x} ${y - 12} L${x} ${y + 12}`} stroke="#E6F4EB" strokeWidth="1.4" />
          <path d={`M${x - 4.5} ${y - 6} Q${x} ${y - 4} ${x + 4.5} ${y - 6}`} stroke="#E6F4EB" strokeWidth="1.3" fill="none" />
          <path d={`M${x - 5.5} ${y + 1} Q${x} ${y + 3} ${x + 5.5} ${y + 1}`} stroke="#E6F4EB" strokeWidth="1.3" fill="none" />
          <path d={`M${x - 4} ${y + 8} Q${x} ${y + 10} ${x + 4} ${y + 8}`} stroke="#E6F4EB" strokeWidth="1.3" fill="none" />
        </g>
      ))}
      <path d="M34 48 L44 68 M66 48 L56 68 M50 40 L50 68" stroke={G.dark} strokeWidth="2" />
    </g>
  ),
  jade: (
    <g>
      <path d="M50 70 L50 48 M50 56 C42 52 38 46 36 40 M50 52 C58 48 62 42 64 36"
        stroke="#8A6A4F" strokeWidth="3" fill="none" strokeLinecap="round" />
      {[
        [36, 36, G.mid], [30, 44, G.light], [44, 32, G.dark], [64, 32, G.mid],
        [70, 40, G.dark], [56, 28, G.light], [50, 40, G.mid], [42, 44, G.dark],
        [58, 42, G.light],
      ].map(([x, y, c], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5.6" ry="4.6" fill={c} />
      ))}
    </g>
  ),
  fern: (
    <g>
      {[-44, -28, -12, 4, 20, 36].map((a, i) => (
        <g key={i} transform={`rotate(${a} 50 70)`}>
          <path d="M50 70 C50 52 50 40 50 28" stroke={i % 2 ? G.mid : G.dark} strokeWidth="1.8" fill="none" />
          {[34, 42, 50, 58].map((y, j) => (
            <g key={j}>
              <ellipse cx="46.5" cy={y} rx="4" ry="2" fill={i % 2 ? G.light : G.mid} transform={`rotate(-24 46.5 ${y})`} />
              <ellipse cx="53.5" cy={y + 3} rx="4" ry="2" fill={i % 2 ? G.mid : G.light} transform={`rotate(24 53.5 ${y + 3})`} />
            </g>
          ))}
        </g>
      ))}
    </g>
  ),
  plumeria: (
    <g>
      <path d="M50 70 L50 44 M50 52 C42 48 38 42 37 34 M50 50 C58 46 62 40 63 32"
        stroke="#8A6A4F" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <ellipse cx="34" cy="28" rx="4.5" ry="10" fill={G.dark} transform="rotate(-22 34 28)" />
      <ellipse cx="66" cy="26" rx="4.5" ry="10" fill={G.dark} transform="rotate(22 66 26)" />
      <ellipse cx="44" cy="36" rx="4" ry="9" fill={G.mid} transform="rotate(-10 44 36)" />
      <ellipse cx="57" cy="36" rx="4" ry="9" fill={G.mid} transform="rotate(10 57 36)" />
      {/* five-petal blooms, soft peach centers */}
      {[[50, 22], [40, 16], [60, 16]].map(([x, y], i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx={x} cy={y - 4.2} rx="2.8" ry="4.4" fill="#FFFFFF"
              transform={`rotate(${r} ${x} ${y})`} />
          ))}
          <circle cx={x} cy={y} r="2.2" fill="#F0A17D" />
        </g>
      ))}
    </g>
  ),
}

function Sprout() {
  return (
    <g>
      <path d="M50 70 C50 60 50 52 50 46" stroke={G.mid} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M50 48 C50 38 42 32 32 32 C33 42 41 48 50 48 Z" fill={G.mid} />
      <path d="M50 48 C50 38 58 32 68 32 C67 42 59 48 50 48 Z" fill={G.light} />
    </g>
  )
}

export default function PlantArt({ art = 'monstera', stage = 'full', tint = 'mint', className = '' }) {
  const t = TINTS[tint] || TINTS.mint
  const motif = MOTIFS[art] || MOTIFS.monstera
  const foliage =
    stage === 'sprout' ? (
      <Sprout />
    ) : stage === 'young' ? (
      <g transform="translate(50 70) scale(0.72) translate(-50 -70)">{motif}</g>
    ) : (
      motif
    )
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Plant illustration" preserveAspectRatio="xMidYMax slice">
      <rect width="100" height="100" fill={t.bg} />
      <circle cx="82" cy="16" r="22" fill={t.deco} opacity="0.6" />
      <circle cx="10" cy="78" r="16" fill={t.deco} opacity="0.5" />
      {art === 'pearls' && stage !== 'sprout' ? (
        <>
          <Pot />
          {foliage}
        </>
      ) : (
        <>
          {foliage}
          <Pot wide={art === 'bop' || art === 'fiddle'} />
        </>
      )}
    </svg>
  )
}
