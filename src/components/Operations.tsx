import {
  BellRing,
  Check,
  ChevronRight,
  Clipboard,
  ClipboardCheck,
  Code2,
  GitFork,
  ListFilter,
  PackageOpen,
  PlugZap,
  Search,
  ShieldCheck,
  Terminal,
  TestTubeDiagonal,
  TrendingUp,
  X,
} from 'lucide-react'
import { useMemo, useState, type KeyboardEvent } from 'react'
import { changelog, commandCategories, registryCommands } from '../data'
import { Brand } from './Brand'
import { Reveal, SectionHeading } from './Reveal'

const installTabs = [
  {
    id: 'npm',
    label: 'npm install',
    icon: PackageOpen,
    title: 'Global npm wrapper',
    description: 'The npm package includes Local Web Access dependencies and configures the FinCLI launcher.',
    code: 'npm install -g @drico2008/fincli\nfincli setup\nfincli',
    note: 'Requires Python 3.11+ and Node.js 18+ for the FinCLI product runtime.',
  },
  {
    id: 'source',
    label: 'local source',
    icon: Code2,
    title: 'Editable source install',
    description: 'Clone the core FinCLI repository into a predictable local folder for development.',
    code: 'git clone https://github.com/Suryadharmaa/FinCLI-Renewed.git fincli\ncd fincli\npython -m venv .venv\n# activate .venv for your OS\npip install -e ".[dev]"\nfincli',
    note: 'Use .venv\\Scripts\\activate on Windows or source .venv/bin/activate on macOS/Linux.',
  },
  {
    id: 'web',
    label: 'local web access',
    icon: Terminal,
    title: 'Local Web from Python source',
    description: 'Source users can add the optional web dependencies and start the authenticated local workspace.',
    code: 'pip install -e ".[web]"\nfincli web start\n# or\nfincli --web',
    note: 'The server binds to 127.0.0.1 and uses port 19850 by default. Keep it local unless you understand the risks.',
  },
] as const

function CopyButton({ value, label = 'Copy command' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" className="copy-button" onClick={copy} aria-label={label}>
      {copied ? <ClipboardCheck size={14} aria-hidden="true" /> : <Clipboard size={14} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function Install() {
  const [activeTab, setActiveTab] = useState('npm')
  const active = installTabs.find((tab) => tab.id === activeTab) ?? installTabs[0]
  const ActiveIcon = active.icon
  const focusInstallTab = (index: number) => {
    const nextIndex = (index + installTabs.length) % installTabs.length
    const next = installTabs[nextIndex]
    setActiveTab(next.id)
    window.requestAnimationFrame(() => document.getElementById(`install-tab-${next.id}`)?.focus())
  }

  const handleInstallKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      focusInstallTab(index + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      focusInstallTab(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusInstallTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusInstallTab(installTabs.length - 1)
    }
  }

  return (
    <section className="section section-shell install-section" id="install" aria-labelledby="install-heading">
      <div className="install-intro">
        <SectionHeading
          eyebrow="Raise the standard"
          title="Three commands. One financial workstation."
          description="Install the published npm package, configure your local providers, and enter the FinCLI cockpit. No cloud account is required."
        />
        <span id="install-heading" className="sr-only">Install FinCLI</span>
        <Reveal className="runtime-plaque">
          <span>Runtime doctrine</span>
          <strong>Python 3.11+</strong>
          <strong>Node.js 18+</strong>
          <small>The website build toolchain uses Node 22 in CI.</small>
        </Reveal>
      </div>

      <Reveal className="install-console">
        <div className="install-tabs" role="tablist" aria-label="FinCLI installation methods">
          {installTabs.map((tab, index) => {
            const Icon = tab.icon
            return (
              <button
                type="button"
                role="tab"
                id={`install-tab-${tab.id}`}
                aria-controls="install-panel"
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                className={activeTab === tab.id ? 'is-active' : ''}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleInstallKey(event, index)}
              >
                <Icon size={16} aria-hidden="true" />{tab.label}
              </button>
            )
          })}
        </div>
        <div className="install-panel" id="install-panel" role="tabpanel" aria-labelledby={`install-tab-${active.id}`}>
          <div className="install-panel-copy">
            <span className="install-panel-icon"><ActiveIcon size={20} aria-hidden="true" /></span>
            <div><span>{active.label}</span><h3>{active.title}</h3><p>{active.description}</p></div>
          </div>
          <div className="code-block">
            <div className="code-bar"><span>shell</span><CopyButton value={active.code} label={`Copy ${active.label} commands`} /></div>
            <pre><code>{active.code}</code></pre>
          </div>
          <p className="install-note"><ShieldCheck size={14} aria-hidden="true" />{active.note}</p>
        </div>
        <div className="install-steps" aria-label="Setup sequence">
          <span className="is-complete"><Check size={13} aria-hidden="true" /> Install</span><i /><span>Configure providers</span><i /><span>Research locally</span>
        </div>
      </Reveal>
    </section>
  )
}

const ecosystemModules = [
  { icon: TestTubeDiagonal, title: 'Backtesting', value: '8 strategies', text: 'Fees, slippage, walk-forward, Monte Carlo, and comparison.' },
  { icon: TrendingUp, title: 'Screener', value: '5 universes', text: 'Scan equities, crypto, forex, commodities, or a watchlist.' },
  { icon: BellRing, title: 'Alerts + watchlist', value: 'Local state', text: 'Organize symbols and route alerts to supported notifications.' },
  { icon: PlugZap, title: 'Plugin system', value: 'Sandboxed', text: 'Validated manifests, lifecycle hooks, and a bounded public API.' },
]

export function Commands() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof commandCategories)[number]>('All')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return registryCommands.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesQuery = !normalized || `${item.command} ${item.description} ${item.category}`.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(command)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      setCopied(null)
    }
  }

  return (
    <section className="section section-shell commands-section" id="commands" aria-labelledby="commands-heading">
      <SectionHeading
        eyebrow="Command Codex"
        title="Find the right command before the market moves."
        description="Search a featured cross-section of FinCLI’s 100+ slash-command registry, filter by workflow, and copy any command into your terminal."
      />
      <span id="commands-heading" className="sr-only">Searchable FinCLI command registry</span>

      <div className="ecosystem-modules">
        {ecosystemModules.map(({ icon: Icon, title, value, text }, index) => (
          <Reveal key={title} delay={index * 0.05}>
            <Icon size={18} aria-hidden="true" /><span><strong>{title}</strong><small>{value}</small></span><p>{text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="registry-shell">
        <div className="registry-toolbar">
          <label className="registry-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search commands</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commands, workflows, or outcomes…" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear command search"><X size={15} aria-hidden="true" /></button>}
          </label>
          <div className="registry-count"><ListFilter size={15} aria-hidden="true" /><strong>{filtered.length}</strong> featured commands</div>
        </div>

        <div className="category-filters" aria-label="Command categories">
          {commandCategories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? 'is-active' : ''}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="command-table" aria-live="polite">
          {filtered.length ? filtered.map((item) => (
            <button
              type="button"
              className="command-row"
              key={item.command}
              onClick={() => copyCommand(item.command)}
              aria-label={`Copy command ${item.command}`}
            >
              <span className="command-category">{item.category}</span>
              <code>{item.command}</code>
              <span className="command-description">{item.description}</span>
              <span className={copied === item.command ? 'copy-state is-copied' : 'copy-state'}>
                {copied === item.command ? <Check size={14} aria-hidden="true" /> : <Clipboard size={14} aria-hidden="true" />}
                {copied === item.command ? 'Copied' : 'Copy'}
              </span>
            </button>
          )) : (
            <div className="registry-empty"><Search size={24} aria-hidden="true" /><strong>No command found</strong><p>Try a broader keyword or choose another category.</p><button type="button" onClick={() => { setQuery(''); setCategory('All') }}>Reset registry</button></div>
          )}
        </div>
      </Reveal>
    </section>
  )
}

export function Roadmap() {
  return (
    <section className="section section-shell roadmap-section" id="roadmap" aria-labelledby="roadmap-heading">
      <div className="roadmap-intro">
        <SectionHeading
          eyebrow="Release ledger"
          title="Built in public. Validated before promotion."
          description="A concise record of the systems that shaped the current command center—and the validated capabilities being prepared next."
        />
        <span id="roadmap-heading" className="sr-only">FinCLI roadmap and changelog</span>
        <a href="https://github.com/Suryadharmaa/FinCLI-Renewed" target="_blank" rel="noreferrer">Full changelog <ChevronRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="release-ledger">
        {changelog.map((release, index) => (
          <Reveal className={`release-entry ${index === 1 ? 'is-current' : ''}`} delay={index * 0.05} key={release.version}>
            <span className="release-marker"><i />{String(index + 1).padStart(2, '0')}</span>
            <div className="release-version"><strong>{release.version}</strong><span>{release.state}</span></div>
            <p>{release.text}</p>
            {index === 1 && <span className="current-badge">CURRENT RELEASE</span>}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="final-cta section-shell" aria-labelledby="final-cta-heading">
      <div className="final-cta-ornament" aria-hidden="true"><i /><span>F</span><i /></div>
      <Reveal className="final-cta-copy">
        <span>Take command locally</span>
        <h2 id="final-cta-heading">Less tab-switching.<br />More disciplined research.</h2>
        <p>Install FinCLI, configure the providers you trust, and bring research, risk, trading, and testing into one terminal-native workflow.</p>
        <div>
          <a className="button button--primary" href="#install">Install FinCLI <ChevronRight size={17} aria-hidden="true" /></a>
          <a className="button button--secondary" href="https://github.com/Suryadharmaa/FinCLI-Renewed" target="_blank" rel="noreferrer"><GitFork size={17} aria-hidden="true" /> Read the docs</a>
        </div>
      </Reveal>
      <div className="final-cta-command"><span>One command away</span><code>npm install -g @drico2008/fincli</code><CopyButton value="npm install -g @drico2008/fincli" label="Copy npm install command" /></div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>A terminal-native financial workstation for research, risk, trading, and market analysis.</p>
          <span><ShieldCheck size={14} aria-hidden="true" /> Local-first · MIT licensed</span>
        </div>
        <div className="footer-links">
          <div><strong>Product</strong><a href="#features">Features</a><a href="#local-web">Local Web</a><a href="#research">Research</a><a href="#trading">Trading</a></div>
          <div><strong>Explore</strong><a href="#commands">Commands</a><a href="#providers">Providers</a><a href="#install">Install</a><a href="#roadmap">Changelog</a></div>
          <div><strong>Project</strong><a href="https://github.com/Suryadharmaa/FinCLI-Renewed" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.npmjs.com/package/@drico2008/fincli" target="_blank" rel="noreferrer">npm</a><a href="https://opensource.org/license/mit" target="_blank" rel="noreferrer">MIT License</a></div>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <p><strong>Important:</strong> AI output is informational only, not financial advice. Live trading involves risk. Data quality depends on your provider and API plan.</p>
        <span>FinCLI v1.9.0 <i /> Built for the local command line</span>
      </div>
    </footer>
  )
}
