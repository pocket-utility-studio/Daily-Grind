import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStash } from '../context/StashContext'
import PageHeader from '../components/PageHeader'

type Feedback = 'idle' | 'saved' | 'loaded' | 'error'

export default function Settings() {
  const navigate = useNavigate()
  const { strains } = useStash()

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '')
  const [keySaved, setKeySaved] = useState(false)
  const [exportFb, setExportFb] = useState<Feedback>('idle')
  const [importFb, setImportFb] = useState<Feedback>('idle')
  const [confirmClear, setConfirmClear] = useState(false)

  function saveKey() {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim())
    } else {
      localStorage.removeItem('gemini_api_key')
    }
    setKeySaved(true)
    setTimeout(() => setKeySaved(false), 2000)
  }

  function exportData() {
    const data = { strains, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dailygrind-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExportFb('saved')
    setTimeout(() => setExportFb('idle'), 2000)
  }

  function importData(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (data.strains && Array.isArray(data.strains)) {
          localStorage.setItem('canopy_stash', JSON.stringify(data.strains))
          setImportFb('loaded')
          setTimeout(() => window.location.reload(), 1000)
        } else {
          setImportFb('error')
        }
      } catch {
        setImportFb('error')
      }
    }
    reader.readAsText(file)
  }

  function clearData() {
    localStorage.removeItem('canopy_stash')
    window.location.reload()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface)',
    border: '2px solid var(--border)',
    borderRadius: 10,
    color: 'var(--text)',
    fontSize: 14,
    padding: '13px 14px',
    outline: 'none',
    fontFamily: 'monospace',
  }

  const sectionLabel: React.CSSProperties = {
    fontFamily: "'Caveat', cursive",
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--text)',
    margin: '0 0 12px',
    display: 'block',
  }

  const outlineBtn: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface)',
    border: '2px solid var(--border)',
    borderRadius: 10,
    boxShadow: 'var(--shadow-sm)',
    color: 'var(--text)',
    fontSize: 14,
    fontWeight: 600,
    minHeight: 50,
    cursor: 'pointer',
    justifyContent: 'center',
  }

  return (
    <div style={{ padding: '20px 16px 40px' }}>
      <PageHeader title="Settings" onBack={() => navigate('/')} />

      {/* API Key */}
      <section style={{ marginBottom: 32 }}>
        <span style={sectionLabel}>Gemini API key</span>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
          Required for AI recommendations and strain lookup. Get a free key at aistudio.google.com.
        </p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="AIza..."
          style={inputStyle}
        />
        <button
          onClick={saveKey}
          style={{
            marginTop: 10,
            width: '100%',
            background: keySaved ? 'var(--accent-dim)' : 'var(--accent)',
            border: `2px solid ${keySaved ? 'var(--accent)' : 'var(--border)'}`,
            boxShadow: keySaved ? 'none' : 'var(--shadow)',
            borderRadius: 10,
            color: keySaved ? 'var(--accent)' : '#fff',
            fontSize: 14,
            fontWeight: 700,
            minHeight: 50,
            cursor: 'pointer',
            justifyContent: 'center',
          }}
        >
          {keySaved ? 'Saved ✓' : 'Save key'}
        </button>
      </section>

      {/* Data */}
      <section style={{ marginBottom: 32 }}>
        <span style={sectionLabel}>Data</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={exportData}
            style={{
              ...outlineBtn,
              color: exportFb === 'saved' ? 'var(--accent)' : 'var(--text)',
              borderColor: exportFb === 'saved' ? 'var(--accent)' : 'var(--border)',
            }}
          >
            {exportFb === 'saved' ? 'Exported ✓' : 'Export backup'}
          </button>

          <label style={{
            ...outlineBtn,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: importFb === 'loaded' ? 'var(--accent)' : importFb === 'error' ? '#e05555' : 'var(--text)',
            borderColor: importFb === 'loaded' ? 'var(--accent)' : importFb === 'error' ? '#e05555' : 'var(--border)',
          }}>
            {importFb === 'loaded' ? 'Imported — reloading...' : importFb === 'error' ? 'Invalid file' : 'Import backup'}
            <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
          </label>
        </div>
      </section>

      <p style={{ fontSize: 12, color: 'var(--text-dim)', margin: '0 0 32px' }}>
        Version {__APP_VERSION__}
      </p>

      {/* Danger zone */}
      <section>
        <span style={{ ...sectionLabel, color: '#c03333' }}>Danger zone</span>
        {!confirmClear ? (
          <button
            onClick={() => setConfirmClear(true)}
            style={{ ...outlineBtn, color: 'var(--text-muted)', borderColor: 'var(--text-dim)' }}
          >
            Clear all data
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setConfirmClear(false)}
              style={{ flex: 1, background: 'var(--surface)', border: '2px solid var(--border)', borderRadius: 10, color: 'var(--text-muted)', fontSize: 14, minHeight: 50, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              onClick={clearData}
              style={{
                flex: 1, background: '#e05555',
                border: '2px solid #c03333',
                boxShadow: '3px 3px 0 #c03333',
                borderRadius: 10, color: '#fff',
                fontSize: 14, fontWeight: 700, minHeight: 50, cursor: 'pointer',
              }}
            >
              Confirm clear
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
