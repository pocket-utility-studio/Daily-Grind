import { useState, useRef } from 'react'
import { Search, Plus, Check } from 'lucide-react'
import { useStash } from '../context/StashContext'
import { lookupStrainData, type StrainLookupResult } from '../services/ai'
import PageHeader from './PageHeader'

interface Props {
  onClose: () => void
}

const TYPE_COLOR: Record<string, string> = {
  sativa: '#6aaa40',
  indica: '#7060c0',
  hybrid: '#c08030',
}

export default function StrainSearch({ onClose }: Props) {
  const { addStrain, strains } = useStash()
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<(StrainLookupResult & { name: string }) | null>(null)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch() {
    const name = query.trim()
    if (!name) return
    setLoading(true)
    setResult(null)
    setAdded(false)
    setError('')
    try {
      const data = await lookupStrainData(name)
      setResult({ ...data, name })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : ''
      setError(msg === 'NO_KEY' ? 'Add your Gemini API key in Settings first.' : 'Search failed. Check your connection and API key.')
    } finally {
      setLoading(false)
    }
  }

  function handleAdd() {
    if (!result) return
    addStrain({
      name: result.name,
      thc: result.thc,
      cbd: result.cbd,
      type: result.type,
      terpenes: result.terpenes,
      effects: result.effects,
      inStock: true,
    })
    setAdded(true)
  }

  const alreadyInStash = result
    ? strains.some((s) => s.name.toLowerCase() === result.name.toLowerCase())
    : false

  const typeColor = result?.type ? TYPE_COLOR[result.type] : 'var(--border)'

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '13px 16px',
    borderBottom: '1px solid var(--border)',
  }

  return (
    <div style={{ padding: '20px 16px 40px' }}>
      <PageHeader title="Strain Search" onBack={onClose} />

      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>
        Type a strain name — AI will look up its profile so you can add it to your stash.
      </p>

      {/* Search input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={15} strokeWidth={2} style={{
            position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', pointerEvents: 'none',
          }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setResult(null); setAdded(false); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. Blue Dream, OG Kush…"
            style={{
              width: '100%',
              background: 'var(--surface)',
              border: '2px solid var(--border)',
              borderRadius: 10,
              color: 'var(--text)',
              fontSize: 15,
              padding: '13px 14px 13px 36px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          style={{
            background: query.trim() && !loading ? 'var(--accent)' : 'var(--border)',
            border: 'none',
            borderRadius: 10,
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            padding: '0 18px',
            minHeight: 50,
            cursor: query.trim() && !loading ? 'pointer' : 'default',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? <SearchSpinner /> : 'Look up'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#fff5f5', border: '2px solid #e05555',
          borderRadius: 10, padding: '10px 14px', marginBottom: 16,
        }}>
          <p style={{ fontSize: 13, color: '#e05555', margin: 0 }}>{error}</p>
        </div>
      )}

      {/* Result card */}
      {result && (
        <div style={{
          background: 'var(--surface)',
          border: '2px solid var(--border)',
          borderRadius: 12,
          boxShadow: 'var(--shadow)',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          {/* Name + type */}
          <div style={{ padding: '16px 16px 12px', borderBottom: '2px solid var(--border)' }}>
            <h2 style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 24, fontWeight: 700,
              color: 'var(--text)', margin: '0 0 8px',
            }}>
              {result.name}
            </h2>
            {result.type && (
              <span style={{
                display: 'inline-block',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: typeColor, border: `2px solid ${typeColor}`,
                borderRadius: 20, padding: '3px 12px',
              }}>
                {result.type}
              </span>
            )}
          </div>

          {/* Stats */}
          {[
            result.thc != null   && { label: 'THC',      value: `${result.thc}%` },
            result.cbd != null   && { label: 'CBD',      value: `${result.cbd}%` },
            result.terpenes      && { label: 'Terpenes', value: result.terpenes },
            result.effects       && { label: 'Effects',  value: result.effects },
          ].filter(Boolean).map((row, i, arr) => {
            const { label, value } = row as { label: string; value: string }
            return (
              <div key={label} style={{
                ...rowStyle,
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{
                  fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0, paddingRight: 12,
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: 14, color: 'var(--text)', fontWeight: 600,
                  textAlign: 'right', maxWidth: '65%',
                }}>
                  {value}
                </span>
              </div>
            )
          })}

          {/* History */}
          {result.history && (
            <div style={{ padding: '13px 16px', borderTop: '1px solid var(--border)' }}>
              <p style={{
                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--text-muted)', fontWeight: 600, margin: '0 0 6px',
              }}>
                Origin
              </p>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                {result.history}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Add button */}
      {result && (
        added || alreadyInStash ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'var(--accent-dim)', border: '2px solid var(--accent)',
            borderRadius: 10, minHeight: 50, color: 'var(--accent)', fontWeight: 600, fontSize: 14,
          }}>
            <Check size={16} strokeWidth={2.5} />
            {alreadyInStash && !added ? 'Already in your stash' : 'Added to stash'}
          </div>
        ) : (
          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: 10,
              boxShadow: 'var(--shadow)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              minHeight: 50,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Add to stash
          </button>
        )
      )}
    </div>
  )
}

function SearchSpinner() {
  return (
    <div style={{ width: 18, height: 18, margin: '0 auto' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTopColor: '#fff',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}
