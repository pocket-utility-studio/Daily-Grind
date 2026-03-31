/**
 * DiamondSpinner — round brilliant cut gem (top view), spinning.
 *
 * Geometry (viewBox 0 0 100 100, centre 50,50):
 *   Girdle circle      r = 45
 *   Table octagon      r = 28  (corners at 22.5° + n×45°)
 *   Girdle primaries   r = 45  (0° + n×45°)    — kite apex
 *   Girdle secondaries r = 45  (22.5° + n×45°) — star apex
 *
 * Angles clockwise from 12 o'clock: x = 50 + r·sinθ, y = 50 − r·cosθ
 */

export default function DiamondSpinner({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="dg-diamond-spin"
      aria-hidden="true"
    >
      {/* ── Girdle circle ───────────────────────────────────────── */}
      <circle cx="50" cy="50" r="45" strokeWidth="2.5" />

      {/* ── Table octagon (r=28) ────────────────────────────────── */}
      {/*   T1=22.5° T2=67.5° T3=112.5° T4=157.5°                  */}
      {/*   T5=202.5° T6=247.5° T7=292.5° T8=337.5°                */}
      <polygon
        points="60.7,24.1 75.9,39.3 75.9,60.7 60.7,75.9 39.3,75.9 24.1,60.7 24.1,39.3 39.3,24.1"
        strokeWidth="1.2"
      />

      {/* ── Bezel/kite lines: each girdle primary → two flanking table corners ── */}
      <path strokeWidth="1.2" d="
        M 50,5     L 39.3,24.1   M 50,5     L 60.7,24.1
        M 81.8,18.2 L 60.7,24.1  M 81.8,18.2 L 75.9,39.3
        M 95,50    L 75.9,39.3   M 95,50    L 75.9,60.7
        M 81.8,81.8 L 75.9,60.7  M 81.8,81.8 L 60.7,75.9
        M 50,95    L 60.7,75.9   M 50,95    L 39.3,75.9
        M 18.2,81.8 L 39.3,75.9  M 18.2,81.8 L 24.1,60.7
        M 5,50     L 24.1,60.7   M 5,50     L 24.1,39.3
        M 18.2,18.2 L 24.1,39.3  M 18.2,18.2 L 39.3,24.1
      " />

      {/* ── Star facet lines: table corner → same-angle girdle secondary ── */}
      <path strokeWidth="1.2" d="
        M 60.7,24.1 L 67.2,8.4
        M 75.9,39.3 L 91.6,32.8
        M 75.9,60.7 L 91.6,67.2
        M 60.7,75.9 L 67.2,91.6
        M 39.3,75.9 L 32.8,91.6
        M 24.1,60.7 L 8.4,67.2
        M 24.1,39.3 L 8.4,32.8
        M 39.3,24.1 L 32.8,8.4
      " />

      {/* ── Upper girdle facets: secondary → two flanking primaries ── */}
      <path strokeWidth="0.8" d="
        M 67.2,8.4  L 50,5      M 67.2,8.4  L 81.8,18.2
        M 91.6,32.8 L 81.8,18.2 M 91.6,32.8 L 95,50
        M 91.6,67.2 L 95,50     M 91.6,67.2 L 81.8,81.8
        M 67.2,91.6 L 81.8,81.8 M 67.2,91.6 L 50,95
        M 32.8,91.6 L 50,95     M 32.8,91.6 L 18.2,81.8
        M 8.4,67.2  L 18.2,81.8 M 8.4,67.2  L 5,50
        M 8.4,32.8  L 5,50      M 8.4,32.8  L 18.2,18.2
        M 32.8,8.4  L 18.2,18.2 M 32.8,8.4  L 50,5
      " />
    </svg>
  )
}
