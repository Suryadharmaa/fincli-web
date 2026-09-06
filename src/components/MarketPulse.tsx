import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, CandlestickChart, Clock3, Gauge, Radio, ShieldCheck, SlidersHorizontal, TrendingUp, Waves } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Reveal } from './Reveal'

type Metric = 'price' | 'rsi' | 'macd' | 'volume'
type Timeframe = '1D' | '1W' | '1M' | '1Y'
type Quote = { symbol: string; name: string; price: string; change: string; percent: string; positive: boolean; volume: string; range: string; rsi: string; macd: string; series: number[] }

const quotes: Quote[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$234.41', change: '+2.84', percent: '+1.23%', positive: true, volume: '48.2M', range: '$230.18 — $235.67', rsi: '58.4', macd: '+1.26', series: [34, 37, 35, 40, 38, 43, 46, 45, 50, 54, 52, 58, 61, 60, 66, 70] },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$142.68', change: '+4.19', percent: '+3.03%', positive: true, volume: '132.7M', range: '$137.42 — $143.12', rsi: '64.2', macd: '+2.18', series: [30, 33, 31, 36, 39, 37, 43, 48, 46, 52, 56, 55, 62, 67, 65, 73] },
  { symbol: 'BTC', name: 'Bitcoin / USD', price: '$109,842', change: '-1,260', percent: '-1.13%', positive: false, volume: '31.8B', range: '$108,420 — $111,204', rsi: '44.8', macd: '-0.84', series: [69, 72, 68, 70, 64, 67, 61, 63, 58, 60, 55, 57, 52, 50, 48, 46] },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: '$601.27', change: '+1.06', percent: '+0.18%', positive: true, volume: '22.6M', range: '$598.90 — $602.04', rsi: '53.7', macd: '+0.42', series: [42, 43, 42, 45, 44, 47, 46, 49, 50, 49, 53, 55, 54, 57, 58, 60] },
]

const timeframeLabels: Record<Timeframe, string> = { '1D': '09:30 — 16:00 ET', '1W': 'Mon — Fri', '1M': '30 sessions', '1Y': '12 months' }

function MarketChart({ values, positive, metric, timeframe }: { values: number[]; positive: boolean; metric: Metric; timeframe: Timeframe }) {
  const points = useMemo(() => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = max - min || 1
    return values.map((value, index) => `${(index / (values.length - 1)) * 100},${42 - ((value - min) / span) * 32}`).join(' ')
  }, [values])
  const bars = values.map((value, index) => ({ x: 2 + index * 6.4, height: 5 + (value % 12) }))
  return (
    <div className="dashboard-chart-wrap">
      <svg className="pulse-chart dashboard-chart" viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={`${metric} chart for ${timeframe}`}>
        {metric === 'volume' ? bars.map((bar) => <rect key={bar.x} x={bar.x} y={45 - bar.height} width="3.8" height={bar.height} rx=".8" className={positive ? 'volume-bar volume-bar--up' : 'volume-bar volume-bar--down'} />) : <polyline points={points} fill="none" className={positive ? 'pulse-line pulse-line--up' : 'pulse-line pulse-line--down'} vectorEffect="non-scaling-stroke" />}
      </svg>
      <div className="pulse-visual-labels"><span>{timeframeLabels[timeframe]}</span><span>{metric === 'rsi' ? 'RSI (14)' : metric === 'macd' ? 'MACD signal' : metric === 'volume' ? 'Relative volume' : 'Illustrative price'}</span></div>
    </div>
  )
}

export function MarketPulse() {
  const [activeSymbol, setActiveSymbol] = useState('AAPL')
  const [timeframe, setTimeframe] = useState<Timeframe>('1D')
  const [metric, setMetric] = useState<Metric>('price')
  const active = quotes.find((quote) => quote.symbol === activeSymbol) ?? quotes[0]
  const metricValue = metric === 'rsi' ? active.rsi : metric === 'macd' ? active.macd : metric === 'volume' ? active.volume : active.price

  return (
    <section className="market-pulse section-shell" aria-labelledby="pulse-heading">
      <Reveal className="pulse-header">
        <div><p className="section-kicker"><Radio size={13} aria-hidden="true" /> Market pulse · interactive preview</p><h2 id="pulse-heading">See the signal before you run the command.</h2></div>
        <span className="pulse-status"><i aria-hidden="true" /> Illustrative data · not live</span>
      </Reveal>
      <Reveal className="pulse-ticker market-dashboard" delay={0.05}>
        <aside className="pulse-symbols" role="tablist" aria-label="Illustrative market symbols">
          <span className="dashboard-aside-label"><SlidersHorizontal size={13} /> Watchlist</span>
          {quotes.map((quote) => <button key={quote.symbol} type="button" role="tab" aria-selected={quote.symbol === activeSymbol} className={quote.symbol === activeSymbol ? 'is-active' : ''} onClick={() => setActiveSymbol(quote.symbol)}><span>{quote.symbol}</span><strong>{quote.price}</strong><small className={quote.positive ? 'is-positive' : 'is-negative'}>{quote.percent}</small></button>)}
          <div className="dashboard-aside-footer"><ShieldCheck size={13} /><span>Provider routes<br /><strong>5 / 6 healthy</strong></span></div>
        </aside>
        <div className="pulse-detail">
          <div className="pulse-detail-heading"><div><span>{active.symbol} · {active.name}</span><strong>{metricValue}</strong></div><span className={active.positive ? 'pulse-change is-positive' : 'pulse-change is-negative'}>{active.positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{active.change} ({active.percent})</span></div>
          <div className="dashboard-toolbar"><div className="dashboard-control-group" role="group" aria-label="Timeframe selector">{(['1D', '1W', '1M', '1Y'] as Timeframe[]).map((item) => <button key={item} type="button" className={timeframe === item ? 'is-active' : ''} onClick={() => setTimeframe(item)}>{item}</button>)}</div><div className="dashboard-control-group" role="group" aria-label="Metric selector">{([['price', TrendingUp], ['rsi', Gauge], ['macd', Waves], ['volume', BarChart3]] as const).map(([item, Icon]) => <button key={item} type="button" className={metric === item ? 'is-active' : ''} onClick={() => setMetric(item)}><Icon size={13} /> <span>{item}</span></button>)}</div></div>
          <MarketChart values={active.series} positive={active.positive} metric={metric} timeframe={timeframe} />
          <div className="pulse-stats"><span><BarChart3 size={14} aria-hidden="true" /><small>Volume</small><strong>{active.volume}</strong></span><span><Activity size={14} aria-hidden="true" /><small>Session range</small><strong>{active.range}</strong></span><span><CandlestickChart size={14} aria-hidden="true" /><small>Signal state</small><strong>{active.positive ? 'AUSPICIUM FAVOURABLE' : 'RISK ELEVATED'}</strong></span><span><Clock3 size={14} aria-hidden="true" /><small>Routing</small><strong>Provider-aware</strong></span></div>
        </div>
      </Reveal>
    </section>
  )
}
