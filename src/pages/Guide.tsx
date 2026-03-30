import { useNavigate } from 'react-router-dom'

const GUIDES = [
  { to: '/guide/temp',    label: 'Temperature guide',  desc: 'Find your ideal vape temp and what it does' },
  { to: '/guide/escape',  label: 'Calm down',           desc: 'Breathing exercises, sounds, and techniques' },
  { to: '/guide/avb',     label: 'AVB guide',           desc: '6 ways to use already-vaped bud' },
  { to: '/guide/law',     label: 'Law guide',           desc: 'UK and Spain cannabis law reference' },
]

export default function Guide() {
  const navigate = useNavigate()

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 24px' }}>Guides</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {GUIDES.map(({ to, label, desc }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '16px',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              minHeight: 44,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
            </div>
            <span style={{ color: 'var(--text-dim)', fontSize: 18, marginLeft: 12, flexShrink: 0 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
