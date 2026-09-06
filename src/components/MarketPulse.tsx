import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, Clock3, Radio } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Reveal } from './Reveal'

type Quote = {
  symbol: string
  name: string
  price: string
  change: string
  percent: string
  positive: boolean
  volume: string
  range: string
  series: number[]
}

const quotes: Quote[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$234.41', change: '+2.84', percent: '+1.23%', positive: true, volume: '48.2M', range: '$230.18 — $235.67', series: [34, 37, 35, 40, 38, 43, 46, 45, 50, 54, 52, 58, 61, 60, 66, 70] },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$142.68', change: '+4.19', percent: '+3.03%', positive: true, volume: '132.7M', range: '$137.42 — $143.12', series: [30, 33, 31, 36, 39, 37, 43, 48, 46, 52, 56, 55, 62, 67, 65, 73] },
  { symbol: 'BTC', name: 'Bitcoin / USD', price: '$109,842', change: '-1,260', percent: '-1.13%', positive: false, volume: '31.8B', range: '$108,420 — $111,204', series: [69, 72, 68, 70, 64, 67, 61, 63, 58, 60, 55, 57, 52, 50, 48, 46] },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: '$601.27', change: '+1.06', percent: '+0.18%', positive: true, volume: '22.6M', range: '$598.90 — $602.04', series: [42, 43, 42, 45, 44, 47, 46, 49, 50, 49, 53, 55, 54, 57, 58, 60] },
]

function MiniChart({ values, positive }: { values: number[]; positive: boolean }) {
  const points = useMemo(() => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = max - min || 1
    return values.map((value, index) => `${(index / (values.length - 1)) * 100},${42 - ((value - min) / span) * 32}`).join(' ')
  }, [values])
  return (
    <svg className="pulse-chart" viewBox="0 0 100 46" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" className={positive ? 'pulse-line pulse-line--up' : 'pulse-line pulse-line--down'} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function MarketPulse() {
  const [activeSymbol, setActiveSymbol] = useState('AAPL')
  const active = quotes.find((quote) => quote.symbol === activeSymbol) ?? quotes[0]

  return (
    <section className="market-pulse section-shell" aria-labelledby="pulse-heading">
      <Reveal className="pulse-header">
        <div>
          <p className="section-kicker"><Radio size={13} aria-hidden="true" /> Market pulse · interactive preview</p>
          <h2 id="pulse-heading">See the signal before you run the command.</h2>
        </div>
        <span className="pulse-status"><i aria-hidden="true" /> Illustrative data · not live</span>
      </Reveal>
      <Reveal className="pulse-ticker" delay={0.05}>
        <div className="pulse-symbols" role="tablist" aria-label="Illustrative market symbols">
          {quotes.map((quote) => (
            <button key={quote.symbol} type="button" role="tab" aria-selected={quote.symbol === activeSymbol} className={quote.symbol === activeSymbol ? 'is-active' : ''} onClick={() => setActiveSymbol(quote.symbol)}>
              <span>{quote.symbol}</span><strong>{quote.price}</strong><small className={quote.positive ? 'is-positive' : 'is-negative'}>{quote.percent}</small>
            </button>
          ))}
        </div>
        <div className="pulse-detail">
          <div className="pulse-detail-heading"><div><span>{active.symbol} · {active.name}</span><strong>{active.price}</strong></div><span className={active.positive ? 'pulse-change is-positive' : 'pulse-change is-negative'}>{active.positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{active.change} ({active.percent})</span></div>
          <div className="pulse-visual"><MiniChart values={active.series} positive={active.positive} /><div className="pulse-visual-labels"><span>09:30</span><span>16:00 ET</span></div></div>
          <div className="pulse-stats"><span><BarChart3 size={14} aria-hidden="true" /><small>Volume</small><strong>{active.volume}</strong></span><span><Activity size={14} aria-hidden="true" /><small>Session range</small><strong>{active.range}</strong></span><span><Clock3 size={14} aria-hidden="true" /><small>Refresh model</small><strong>Provider-aware</strong></span></div>
        </div>
      </Reveal>
    </section>
  )
}
