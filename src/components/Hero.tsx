import { ArrowDown, ArrowRight, GitFork, ShieldCheck, Sparkles } from 'lucide-react'
import { LaurelSeal } from './Brand'
import { CommandConsole } from './CommandConsole'

const heroStats = [
  ['Research Engine v4', 'Validated preview'],
  ['Provider System v3', 'Validated preview'],
  ['Windows desktop', 'v2.0.0'],
  ['100+ Commands', 'Slash registry'],
  ['Alpaca + Binance', 'Paper · testnet · live'],
  ['Python 3.11+ / Node 18+', 'Cross-platform'],
] as const

export function Hero() {
  return (
    <section className="hero section-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-architecture" aria-hidden="true">
        <span className="column column--left" />
        <span className="column column--right" />
        <span className="legion-banner">F</span>
      </div>

      <div className="hero-copy">
        <div className="release-pill">
          <span><i aria-hidden="true" /> FinCLI v2.0.0</span>
          <span>Windows desktop + local web</span>
        </div>
        <p className="hero-motto">Per scientiam ad imperium <span>·</span> Through knowledge, command</p>
        <p className="hero-overline"><Sparkles size={14} aria-hidden="true" /> The financial command line, re-forged</p>
        <h1 id="hero-title">
          Command markets with
          <span>clarity, not noise.</span>
        </h1>
        <p className="hero-lead">
          A local-first financial workstation. Research, trade, and analyze markets from your shell or a Windows desktop app.
        </p>
        <p className="hero-support">
          Provider-aware intelligence, portfolio risk, backtesting, authenticated Local Web Access, and a bundled `fincli.exe` path—grounded in the data available to you.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#install">Get Started <ArrowRight size={17} aria-hidden="true" /></a>
          <a className="button button--secondary" href="#commands">Explore Commands</a>
          <a className="button button--text" href="https://github.com/Suryadharmaa/fincli-web" target="_blank" rel="noreferrer">
            <GitFork size={17} aria-hidden="true" /> View GitHub
          </a>
        </div>
        <div className="hero-trustline">
          <span><ShieldCheck size={15} aria-hidden="true" /> Local-first storage</span>
          <span>No cloud lock-in</span>
          <span>MIT licensed</span>
        </div>
      </div>

      <div className="hero-seal hero-seal--enter">
        <LaurelSeal />
        <div className="floating-market-card floating-market-card--one">
          <span>PORTFOLIO HEALTH</span><strong>78</strong><small>Risk budget intact</small>
        </div>
        <div className="floating-market-card floating-market-card--two">
          <span>PROVIDER TRUST</span><strong>STRONG</strong><small>Confidence capped</small>
        </div>
      </div>

      <div className="hero-console-wrap">
        <CommandConsole />
      </div>

      <div className="hero-stats" aria-label="FinCLI capabilities">
        {heroStats.map(([value, label]) => (
          <div key={value}>
            <strong>{value}</strong><span>{label}</span>
          </div>
        ))}
      </div>

      <a className="scroll-cue" href="#features" aria-label="Scroll to features">
        <span>Enter the command center</span><ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  )
}
