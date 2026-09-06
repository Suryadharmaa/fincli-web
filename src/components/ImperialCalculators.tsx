import { Calculator, Coins, Landmark, ShieldCheck, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Reveal, SectionHeading } from './Reveal'

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI']

type CalculatorMode = 'compound' | 'position'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function ImperialCalculators() {
  const [mode, setMode] = useState<CalculatorMode>('compound')
  const [principal, setPrincipal] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [returnRate, setReturnRate] = useState(8)
  const [years, setYears] = useState(10)
  const [portfolio, setPortfolio] = useState(100000)
  const [risk, setRisk] = useState(1)
  const [entry, setEntry] = useState(185)
  const [stop, setStop] = useState(174)

  const growth = useMemo(() => {
    const months = years * 12
    const monthlyRate = returnRate / 100 / 12
    return principal * Math.pow(1 + monthlyRate, months) + monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  }, [monthly, principal, returnRate, years])

  const position = useMemo(() => {
    const riskBudget = portfolio * (risk / 100)
    const riskPerShare = Math.max(entry - stop, 0.01)
    const shares = Math.floor(riskBudget / riskPerShare)
    return { riskBudget, riskPerShare, shares, notional: shares * entry }
  }, [entry, portfolio, risk, stop])

  return (
    <section className="section section-shell imperial-calculators" id="calculators" aria-labelledby="calculators-heading">
      <img className="roman-relief-asset" src={`${import.meta.env.BASE_URL}assets/roman-funerary-relief.jpg`} alt="" aria-hidden="true" />
      <div className="calculator-intro">
        <SectionHeading
          eyebrow="Tabula Aurea · Interactive tools"
          title="Measure the empire before you expand it."
          description="Run simple planning scenarios with local, transparent formulas. No market connection, broker action, or financial advice—just a clear decision surface styled for the command center."
        />
        <div className="calculator-motto"><span>Mens sana in pecunia clara</span><small>A clear mind in clear capital</small></div>
      </div>

      <Reveal className="calculator-shell">
        <div className="calculator-tabs" role="tablist" aria-label="Financial calculators">
          <button type="button" role="tab" aria-selected={mode === 'compound'} className={mode === 'compound' ? 'is-active' : ''} onClick={() => setMode('compound')}><Coins size={16} /> <span>{romanNumerals[0]}</span> Compound growth</button>
          <button type="button" role="tab" aria-selected={mode === 'position'} className={mode === 'position' ? 'is-active' : ''} onClick={() => setMode('position')}><ShieldCheck size={16} /> <span>{romanNumerals[1]}</span> Position sizing</button>
        </div>

        {mode === 'compound' ? (
          <div className="calculator-panel">
            <div className="calculator-form">
              <div className="calculator-panel-heading"><span><Landmark size={18} /> Imperium growth ledger</span><small>COMPOUND SCENARIO</small></div>
              <label>Initial capital <input type="number" min="0" value={principal} onChange={(event) => setPrincipal(Number(event.target.value))} /><span>$</span></label>
              <label>Monthly contribution <input type="number" min="0" value={monthly} onChange={(event) => setMonthly(Number(event.target.value))} /><span>$</span></label>
              <label>Annual return <input type="number" min="0" max="100" step="0.1" value={returnRate} onChange={(event) => setReturnRate(Number(event.target.value))} /><span>%</span></label>
              <label>Time horizon <input type="number" min="1" max="60" value={years} onChange={(event) => setYears(Number(event.target.value))} /><span>yr</span></label>
            </div>
            <div className="calculator-result"><span><TrendingUp size={17} /> Projected treasury</span><strong>{formatCurrency(growth)}</strong><div className="result-line"><i style={{ width: `${Math.min(100, Math.max(12, (growth / Math.max(growth, 250000)) * 100))}%` }} /></div><small>Principal + contributions: {formatCurrency(principal + monthly * years * 12)}</small><em>Illustrative calculation only</em></div>
          </div>
        ) : (
          <div className="calculator-panel">
            <div className="calculator-form">
              <div className="calculator-panel-heading"><span><ShieldCheck size={18} /> Praetorian risk ledger</span><small>POSITION SCENARIO</small></div>
              <label>Portfolio value <input type="number" min="0" value={portfolio} onChange={(event) => setPortfolio(Number(event.target.value))} /><span>$</span></label>
              <label>Risk per trade <input type="number" min="0.1" max="10" step="0.1" value={risk} onChange={(event) => setRisk(Number(event.target.value))} /><span>%</span></label>
              <label>Entry price <input type="number" min="0.01" step="0.01" value={entry} onChange={(event) => setEntry(Number(event.target.value))} /><span>$</span></label>
              <label>Stop price <input type="number" min="0.01" step="0.01" value={stop} onChange={(event) => setStop(Number(event.target.value))} /><span>$</span></label>
            </div>
            <div className="calculator-result"><span><Calculator size={17} /> Recommended cohort</span><strong>{position.shares.toLocaleString()} shares</strong><div className="position-metrics"><span><small>Risk budget</small><b>{formatCurrency(position.riskBudget)}</b></span><span><small>Risk/share</small><b>{formatCurrency(position.riskPerShare)}</b></span><span><small>Notional</small><b>{formatCurrency(position.notional)}</b></span></div><em>Illustrative calculation only</em></div>
          </div>
        )}
      </Reveal>
      <p className="calculator-disclaimer">These calculators are educational planning widgets. They do not forecast returns, connect to a broker, or replace independent financial advice.</p>
    </section>
  )
}
