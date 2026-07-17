import {
  Activity,
  AlertOctagon,
  ArrowDownRight,
  ArrowUpRight,
  Ban,
  Bitcoin,
  CheckCircle2,
  FileLock2,
  KeyRound,
  LockKeyhole,
  RefreshCcw,
  ShieldCheck,
  Siren,
  Vault,
} from 'lucide-react'
import { Reveal, SectionHeading } from './Reveal'

export function TradingSafety() {
  return (
    <section className="section section-shell trading-section" id="trading" aria-labelledby="trading-heading">
      <div className="trading-intro">
        <SectionHeading
          eyebrow="Trading Safety Layer"
          title="The order is never stronger than the guardrail."
          description="Connect to supported broker environments, keep confirmations explicit, and retain an immutable trail from intent to execution."
        />
        <span id="trading-heading" className="sr-only">Trading safety and broker support</span>
        <Reveal className="trading-disclaimer">
          <AlertOctagon size={18} aria-hidden="true" />
          <p><strong>Live trading involves real financial risk.</strong> Use paper or testnet environments first. Nothing on this page is financial advice, and this demo never submits orders.</p>
        </Reveal>
      </div>

      <div className="trading-grid">
        <Reveal className="broker-cockpit">
          <div className="cockpit-header">
            <span><Activity size={16} aria-hidden="true" /> BROKER COCKPIT</span>
            <strong><i className="status-dot" aria-hidden="true" /> GUARDS ARMED</strong>
          </div>
          <div className="broker-tabs" aria-label="Supported brokers">
            <button type="button" className="is-active"><span className="alpaca-glyph">A</span>Alpaca<small>US equities</small></button>
            <button type="button"><Bitcoin size={18} aria-hidden="true" />Binance<small>Crypto</small></button>
          </div>
          <div className="broker-balance">
            <span>Paper buying power</span><strong>$100,000.00</strong><small>Illustrative balance</small>
          </div>
          <div className="order-ticket">
            <div><span>Symbol</span><strong>AAPL</strong></div>
            <div><span>Quantity</span><strong>10</strong></div>
            <div><span>Order type</span><strong>MARKET</strong></div>
            <div><span>Environment</span><strong className="paper-badge">PAPER</strong></div>
          </div>
          <div className="order-actions">
            <button type="button"><ArrowUpRight size={15} aria-hidden="true" /> Preview buy</button>
            <button type="button"><ArrowDownRight size={15} aria-hidden="true" /> Preview sell</button>
          </div>
          <p><ShieldCheck size={14} aria-hidden="true" /> Confirmation is required inside FinCLI. Buttons above are inert product previews.</p>
        </Reveal>

        <div className="risk-guard-column">
          <Reveal className="guardrail-card guardrail-card--position">
            <div><span>MAX POSITION SIZE</span><strong>20%</strong></div>
            <div className="guardrail-meter"><i style={{ width: '20%' }} /></div>
            <p>Per-position exposure cannot exceed the configured safety default.</p>
          </Reveal>
          <Reveal className="guardrail-card guardrail-card--loss" delay={0.06}>
            <div><span>DAILY LOSS LIMIT</span><strong>5%</strong></div>
            <div className="guardrail-meter"><i style={{ width: '5%' }} /></div>
            <p>New orders stop when the daily loss boundary is reached.</p>
          </Reveal>
          <Reveal className="kill-switch" delay={0.1}>
            <div className="kill-switch-icon"><Siren size={22} aria-hidden="true" /></div>
            <div><span>Emergency command</span><code>/trading kill</code><small>Blocks all new orders immediately</small></div>
            <Ban size={21} aria-hidden="true" />
          </Reveal>
        </div>

        <Reveal className="safety-ledger">
          <div className="safety-ledger-heading"><span>Execution doctrine</span><strong>04 controls</strong></div>
          {[
            [CheckCircle2, 'Paper + testnet first', 'Alpaca paper and Binance testnet let workflows prove themselves before live use.'],
            [ShieldCheck, 'Risk guard', 'Position and loss boundaries are checked before any supported order.'],
            [FileLock2, 'Immutable audit log', 'Order events remain append-only—never silently updated or deleted.'],
            [RefreshCcw, 'Automatic defense', 'No leverage in paper mode and disconnect on suspicious activity.'],
          ].map(([Icon, title, text]) => {
            const ItemIcon = Icon as typeof CheckCircle2
            return <div className="ledger-row" key={String(title)}><ItemIcon size={17} aria-hidden="true" /><span><strong>{String(title)}</strong><p>{String(text)}</p></span></div>
          })}
        </Reveal>
      </div>

      <Reveal className="security-vault-band">
        <div className="vault-visual" aria-hidden="true">
          <div className="vault-ring"><Vault size={34} /></div>
          <i /><i /><i /><i />
        </div>
        <div className="vault-copy">
          <span>Security Vault · local-first defense</span>
          <h3>Secrets belong behind the terminal wall.</h3>
          <p>Credentials are encrypted at rest and never exposed by this static site or browser demo. FinCLI provides scan, rotation, lockdown, purge, and complete history-cleanup flows.</p>
        </div>
        <div className="vault-controls">
          <span><LockKeyhole size={15} aria-hidden="true" /> PBKDF2-SHA256 encrypted secrets</span>
          <span><KeyRound size={15} aria-hidden="true" /> <code>/secrets rotate</code></span>
          <span><Siren size={15} aria-hidden="true" /> <code>/security lockdown</code></span>
          <span><FileLock2 size={15} aria-hidden="true" /> <code>/security purge</code></span>
        </div>
      </Reveal>
    </section>
  )
}
