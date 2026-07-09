import { useState } from 'react'
import './App.css'

export default function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url.trim()) return alert('Paste a video link')
    
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url })
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      alert('Error: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="App">
      <h1>hooked.</h1>
      <p>Diagnose why your short-form video underperforms</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Paste YouTube Shorts, TikTok, or Instagram Reels link" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Video'}</button>
      </form>
      {result && <div className="result"><div className="output">{result.analysis.split('\n').map((line, i) => <p key={i}>{line}</p>)}</div></div>}
    </div>
  )
}