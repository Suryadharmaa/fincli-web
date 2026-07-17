import {
  AlertTriangle,
  BadgeCheck,
  CircleGauge,
  Database,
  Gauge,
  Layers3,
  RadioTower,
  ShieldCheck,
  Signal,
} from 'lucide-react'
import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { providers, researchStages } from '../data'
import { DemoNotice } from './Shell'
import { Reveal, SectionHeading } from './Reveal'

export function ResearchEngine() {
  const [activeStage, setActiveStage] = useState(4)
  const active = researchStages[activeStage]

  const focusStage = (index: number) => {
    const nextIndex = (index + researchStages.length) % researchStages.length
    setActiveStage(nextIndex)
    window.requestAnimationFrame(() => document.getElementById(`research-stage-${nextIndex}`)?.focus())
  }

  const handleStageKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      focusStage(index + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      focusStage(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusStage(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusStage(researchStages.length - 1)
    }
  }

  return (
    <section className="section section-shell research-section" id="research" aria-labelledby="research-heading">
      <div className="research-heading-row">
        <SectionHeading
          eyebrow="Research Engine v4 · Validated preview"
          title="Evidence enters first. Conviction comes second."
          description="A structured research chain that makes the boundary between facts, interpretation, missing inputs, and confidence impossible to ignore."
        />
        <span id="research-heading" className="sr-only">Research Engine v4 preview</span>
        <Reveal className="research-command-plaque">
          <span>Invoke the oracle</span><code>/research AAPL --report</code><small>Deterministic snapshot mode remains available.</small>
        </Reveal>
      </div>

      <Reveal className="research-workbench">
        <div className="research-stages" role="tablist" aria-label="Research report stages">
          {researchStages.map((stage, index) => (
            <button
              type="button"
              role="tab"
              id={`research-stage-${index}`}
              aria-controls="research-report-panel"
              aria-selected={index === activeStage}
              tabIndex={index === activeStage ? 0 : -1}
              className={index === activeStage ? 'is-active' : ''}
              key={stage.name}
              onClick={() => setActiveStage(index)}
              onKeyDown={(event) => handleStageKey(event, index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{stage.name}</strong>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>

        <div
          className="research-report"
          id="research-report-panel"
          role="tabpanel"
          aria-labelledby={`research-stage-${activeStage}`}
          aria-live="polite"
        >
          <header className="report-header">
            <div><span>FINCLI RESEARCH DOSSIER</span><strong>AAPL / US EQUITY</strong></div>
            <div><small>Generated</small><strong>STATIC DEMO</strong></div>
          </header>

          <div className="active-stage-card">
            <div className={`stage-glyph stage-glyph--${active.tone}`}><Layers3 size={23} aria-hidden="true" /></div>
            <div><span>{active.label}</span><h3>{active.name}</h3><p>{active.detail}</p></div>
            <strong>{active.value}</strong>
          </div>

          <div className="report-evidence-grid">
            <article>
              <span className="report-card-label"><BadgeCheck size={14} aria-hidden="true" /> Verified facts</span>
              <p>Price structure remains above the illustrative 20-session trend.</p>
              <small><i className="source-mark" /> SRC-01 · quality 94</small>
            </article>
            <article>
              <span className="report-card-label"><Signal size={14} aria-hidden="true" /> Inference</span>
              <p>Momentum may remain constructive if the base-case support zone holds.</p>
              <small><i className="source-mark source-mark--blue" /> INF-02 · confidence 78%</small>
            </article>
            <article className="report-card--warning">
              <span className="report-card-label"><AlertTriangle size={14} aria-hidden="true" /> Missing data</span>
              <p>Real-time options flow is unavailable on the selected demo plan.</p>
              <small><i className="source-mark source-mark--red" /> GAP-01 · medium severity</small>
            </article>
          </div>

          <div className="scenario-matrix">
            <div className="matrix-heading"><span>Scenario matrix</span><small>Conditions, not predictions</small></div>
            <div className="matrix-row matrix-row--bull"><strong>BULL</strong><span>Trend holds + breadth improves</span><b>28%</b></div>
            <div className="matrix-row matrix-row--base"><strong>BASE</strong><span>Range consolidation continues</span><b>52%</b></div>
            <div className="matrix-row matrix-row--bear"><strong>BEAR</strong><span>Support fails + volatility expands</span><b>20%</b></div>
          </div>

          <footer className="report-footer">
            <span><ShieldCheck size={14} aria-hidden="true" /> Trust Gate <strong>82 / 100</strong></span>
            <div role="meter" aria-label="Source score" aria-valuemin={0} aria-valuemax={100} aria-valuenow={88}>
              <i style={{ '--score': '88%' } as CSSProperties} />
            </div>
            <span>Source score <strong>88</strong></span>
          </footer>
        </div>
      </Reveal>

      <div className="research-principles">
        {[
          ['Facts stay facts', 'Verified observations never blend silently with model interpretation.'],
          ['Gaps stay visible', 'Missing coverage lowers confidence instead of inviting invented precision.'],
          ['Scenarios stay conditional', 'Bull, base, and bear paths are framed around observable evidence.'],
        ].map(([title, text], index) => (
          <Reveal key={title} delay={index * 0.06}>
            <span>{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function ProviderSystem() {
  return (
    <section className="section section-shell provider-section" id="providers" aria-labelledby="provider-heading">
      <div className="provider-intro">
        <SectionHeading
          eyebrow="Provider System v3 · Validated preview"
          title="Data quality is part of the answer."
          description="Every response carries freshness, completeness, trust, fallback context, and an explicit ceiling on AI confidence."
        />
        <span id="provider-heading" className="sr-only">Provider System v3 health matrix</span>
        <Reveal className="provider-legend">
          <span><i className="status-dot" aria-hidden="true" /> Healthy route</span>
          <span><i className="status-dot status-dot--watch" aria-hidden="true" /> Watch</span>
          <span><i className="status-dot status-dot--delayed" aria-hidden="true" /> Delayed fallback</span>
        </Reveal>
      </div>

      <Reveal className="provider-matrix">
        <div className="provider-matrix-header">
          <span><RadioTower size={16} aria-hidden="true" /> Provider health matrix</span>
          <small>ILLUSTRATIVE DATA · NOT LIVE STATUS</small>
        </div>
        <div className="provider-table" role="table" aria-label="Illustrative provider health matrix">
          <div className="provider-columns" role="row">
            <span role="columnheader">Provider</span><span role="columnheader">Latency</span><span role="columnheader">Quality</span><span role="columnheader">Fallback state</span><span role="columnheader">Trust</span><span role="columnheader">AI confidence cap</span>
          </div>
          <div className="provider-rows" role="rowgroup">
            {providers.map((provider, index) => (
              <Reveal className="provider-row" delay={index * 0.045} key={provider.name} role="row">
                <div className="provider-name" role="cell">
                  <i className={`status-dot status-dot--${provider.status.toLowerCase()}`} aria-hidden="true" />
                  <span><strong>{provider.name}</strong><small>{provider.role}</small></span>
                  <span className="sr-only">Status: {provider.status}.</span>
                </div>
                <span className="provider-latency" role="cell">{provider.latency}<small> ms</small></span>
                <div className="quality-cell" role="cell"><strong>{provider.quality}</strong><i aria-hidden="true"><b style={{ width: `${provider.quality}%` }} /></i></div>
                <span className="fallback-state" role="cell">{provider.fallback}</span>
                <span className={`trust-level trust-level--${provider.trust.toLowerCase()}`} role="cell">{provider.trust}</span>
                <div className="confidence-cell" role="cell"><CircleGauge size={15} aria-hidden="true" /><strong>{provider.confidence}%</strong></div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="provider-matrix-footer">
          <span><Database size={14} aria-hidden="true" /> ProviderResponse envelope</span>
          <span><Gauge size={14} aria-hidden="true" /> Quality scoring 0–100</span>
          <span><ShieldCheck size={14} aria-hidden="true" /> Circuit-breaker aware</span>
        </div>
      </Reveal>
      <DemoNotice />
    </section>
  )
}
