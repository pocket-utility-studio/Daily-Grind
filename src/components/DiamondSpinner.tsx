/**
 * DiamondSpinner — round brilliant cut gem (top view), spinning.
 * fill="none" so all facets are transparent (background shows through).
 * stroke="currentColor" so it inherits whatever text colour is set on the parent.
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
      {/* ── Outer girdle circle ─────────────────────────────── */}
      <circle cx="50" cy="50" r="45" strokeWidth="2.2" />

      {/* ── Table octagon ──────────────────────────────────── */}
      {/* corners at r=18, angles 22.5°+n×45° */}
      <polygon
        points="66.6,56.9 56.9,66.6 43.1,66.6 33.4,56.9 33.4,43.1 43.1,33.4 56.9,33.4 66.6,43.1"
        strokeWidth="1.1"
      />

      {/* ── Bezel / kite facet lines (girdle primary → table corners) ── */}
      {/* Each girdle primary point connects to its two flanking table corners  */}
      <path strokeWidth="1.0" d="
        M 96,50   L 66.6,43.1
        M 96,50   L 66.6,56.9
        M 82.5,82.5 L 66.6,56.9
        M 82.5,82.5 L 56.9,66.6
        M 50,96   L 56.9,66.6
        M 50,96   L 43.1,66.6
        M 17.5,82.5 L 43.1,66.6
        M 17.5,82.5 L 33.4,56.9
        M 4,50    L 33.4,56.9
        M 4,50    L 33.4,43.1
        M 17.5,17.5 L 33.4,43.1
        M 17.5,17.5 L 43.1,33.4
        M 50,4    L 43.1,33.4
        M 50,4    L 56.9,33.4
        M 82.5,17.5 L 56.9,33.4
        M 82.5,17.5 L 66.6,43.1
      " />

      {/* ── Star facet lines (table corner → girdle secondary) ── */}
      {/* Each table corner also shoots a line to the girdle secondary at the same angle */}
      <path strokeWidth="1.0" d="
        M 66.6,56.9 L 92.5,67.6
        M 56.9,66.6 L 67.6,92.5
        M 43.1,66.6 L 32.4,92.5
        M 33.4,56.9 L  7.5,67.6
        M 33.4,43.1 L  7.5,32.4
        M 43.1,33.4 L 32.4, 7.5
        M 56.9,33.4 L 67.6, 7.5
        M 66.6,43.1 L 92.5,32.4
      " />

      {/* ── Upper girdle facets (girdle secondary → adjacent girdle primaries) ── */}
      <path strokeWidth="0.75" d="
        M 92.5,67.6 L 96,50
        M 92.5,67.6 L 82.5,82.5
        M 67.6,92.5 L 82.5,82.5
        M 67.6,92.5 L 50,96
        M 32.4,92.5 L 50,96
        M 32.4,92.5 L 17.5,82.5
        M  7.5,67.6 L 17.5,82.5
        M  7.5,67.6 L 4,50
        M  7.5,32.4 L 4,50
        M  7.5,32.4 L 17.5,17.5
        M 32.4, 7.5 L 17.5,17.5
        M 32.4, 7.5 L 50,4
        M 67.6, 7.5 L 50,4
        M 67.6, 7.5 L 82.5,17.5
        M 92.5,32.4 L 82.5,17.5
        M 92.5,32.4 L 96,50
      " />
    </svg>
  )
}
