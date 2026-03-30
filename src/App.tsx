import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useStash } from './context/StashContext'
import Journal from './pages/Journal'
import Recommender from './pages/Recommender'
import SessionLog from './pages/SessionLog'
import Guide from './pages/Guide'
import TempGuide from './pages/TempGuide'
import EscapeRope from './pages/EscapeRope'
import AVBGuide from './pages/AVBGuide'
import LawGuide from './pages/LawGuide'
import Settings from './pages/Settings'

function Home() {
  const navigate = useNavigate()
  const { strains } = useStash()
  const inStock = strains.filter((s) => s.inStock).length

  const cards = [
    { to: '/journal',   label: 'Journal',     desc: `${inStock} strain${inStock !== 1 ? 's' : ''} in stock` },
    { to: '/recommend', label: 'Advise',       desc: 'AI strain recommendation' },
    { to: '/sessions',  label: 'Sessions',     desc: 'Log and review your sessions' },
    { to: '/guide',     label: 'Guides',       desc: 'Temp, AVB, calm down, law' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Canopy</h1>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 28px' }}>Your cannabis companion</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {cards.map(({ to, label, desc }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
              padding: '16px', width: '100%', textAlign: 'left', cursor: 'pointer', minHeight: 44,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</div>
            </div>
            <span style={{ color: 'var(--text-dim)', fontSize: 20, marginLeft: 12 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const NAV_ITEMS = [
  { to: '/',          label: 'Home' },
  { to: '/journal',   label: 'Journal' },
  { to: '/recommend', label: 'Advise' },
  { to: '/sessions',  label: 'Sessions' },
  { to: '/settings',  label: 'Settings' },
]

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)', maxWidth: 480, margin: '0 auto' }}>
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 80px' }}>
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/journal"        element={<Journal />} />
            <Route path="/recommend"      element={<Recommender />} />
            <Route path="/sessions"       element={<SessionLog />} />
            <Route path="/guide"          element={<Guide />} />
            <Route path="/guide/temp"     element={<TempGuide />} />
            <Route path="/guide/escape"   element={<EscapeRope />} />
            <Route path="/guide/avb"      element={<AVBGuide />} />
            <Route path="/guide/law"      element={<LawGuide />} />
            <Route path="/settings"       element={<Settings />} />
          </Routes>
        </main>

        <nav style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 480, background: 'var(--surface)',
          borderTop: '1px solid var(--border)', display: 'flex', height: 60,
        }}>
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
                textDecoration: 'none', minHeight: 44,
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </BrowserRouter>
  )
}
