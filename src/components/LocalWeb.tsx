import {
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Command,
  History,
  Laptop,
  Lock,
  MessageSquareText,
  Moon,
  Plus,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  Sun,
  Wifi,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { DemoNotice } from './Shell'
import { Reveal, SectionHeading } from './Reveal'

type ConversationKey = 'research' | 'risk' | 'provider'

const conversations = {
  research: {
    label: 'AAPL research brief',
    time: 'Now',
    command: '/research AAPL --report',
    response: 'Structured report complete. The Trust Gate capped confidence at 82 because options-flow coverage is missing.',
    chips: ['7 verified facts', '3 inferences', '1 data gap'],
  },
  risk: {
    label: 'Portfolio risk review',
    time: '18m',
    command: '/portfolio risk',
    response: 'Portfolio health is 78/100. Technology concentration is the main risk contributor; estimated 1-day VaR is 2.4%.',
    chips: ['42% technology', '18% top position', '2.4% 1D VaR'],
  },
  provider: {
    label: 'Provider trust check',
    time: '1h',
    command: '/provider trust',
    response: 'Five routes are healthy. Alpha Vantage is rate-aware and yfinance remains the delayed last-resort fallback.',
    chips: ['5 healthy', '1 rate-aware', 'AI cap 86%'],
  },
} satisfies Record<ConversationKey, { label: string; time: string; command: string; response: string; chips: string[] }>

const paletteCommands = ['/research AAPL --deep', '/portfolio risk', '/provider status', '/backtest AAPL sma_cross 1y']

export function LocalWeb() {
  const [active, setActive] = useState<ConversationKey>('research')
  const [mockTheme, setMockTheme] = useState<'dark' | 'light'>('dark')
  const [paletteOpen, setPaletteOpen] = useState(true)
  const [composer, setComposer] = useState('/')
  const [sentPrompt, setSentPrompt] = useState<string | null>(null)
  const current = conversations[active]
  const filteredPalette = useMemo(() => {
    const query = composer.replace('/', '').toLowerCase()
    return paletteCommands.filter((command) => command.toLowerCase().includes(query))
  }, [composer])

  return (
    <section className="section section-shell local-web-section" id="local-web" aria-labelledby="local-web-heading">
      <div className="local-web-intro">
        <SectionHeading
          eyebrow="Local Web Access · v1.9.0"
          title="The terminal now has a command chamber."
          description="An authenticated browser workspace at http://localhost:19850 for local conversations, research shortcuts, provider visibility, and safe access to the same command router."
        />
        <span id="local-web-heading" className="sr-only">FinCLI Local Web Access</span>
        <Reveal className="local-web-facts">
          <div><Lock size={17} aria-hidden="true" /><span><strong>Authenticated</strong>Token-gated browser session</span></div>
          <div><Laptop size={17} aria-hidden="true" /><span><strong>Local-only</strong>Binds to 127.0.0.1 by default</span></div>
          <div><Wifi size={17} aria-hidden="true" /><span><strong>Streaming-ready</strong>SSE response architecture</span></div>
        </Reveal>
      </div>

      <Reveal className="web-chamber-wrap">
        <div className={`web-chamber web-chamber--${mockTheme}`}>
          <div className="web-chamber-bar">
            <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
            <div className="local-address"><Lock size={12} aria-hidden="true" /><span>http://localhost:19850</span></div>
            <div className="web-window-actions">
              <span><i aria-hidden="true" /> AUTHENTICATED</span>
              <button
                type="button"
                onClick={() => setMockTheme((value) => value === 'dark' ? 'light' : 'dark')}
                aria-label={`Switch Local Web mock to ${mockTheme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {mockTheme === 'dark' ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="web-chamber-layout">
            <aside className="web-sidebar" aria-label="Conversation history">
              <div className="web-sidebar-brand"><Command size={18} aria-hidden="true" /><strong>Command Chamber</strong></div>
              <button
                className="new-chat"
                type="button"
                onClick={() => { setComposer(''); setSentPrompt(null); setPaletteOpen(false) }}
              >
                <Plus size={15} aria-hidden="true" /> New conversation
              </button>
              <div className="history-label"><History size={13} aria-hidden="true" /> History <span>LOCAL</span></div>
              {(Object.keys(conversations) as ConversationKey[]).map((key) => {
                const conversation = conversations[key]
                return (
                  <button key={key} type="button" className={key === active ? 'is-active' : ''} onClick={() => { setActive(key); setSentPrompt(null) }}>
                    <MessageSquareText size={14} aria-hidden="true" />
                    <span>{conversation.label}<small>{conversation.time}</small></span>
                  </button>
                )
              })}
              <div className="sidebar-system">
                <span><i className="status-dot" aria-hidden="true" /> Local server</span><strong>ONLINE</strong>
              </div>
            </aside>

            <div className="web-chat">
              <header className="web-chat-header">
                <div><Bot size={18} aria-hidden="true" /><span><strong>FinCLI Assistant</strong><small>Finance-grounded workspace</small></span></div>
                <button type="button">OpenRouter · Auto <ChevronDown size={13} aria-hidden="true" /></button>
              </header>

              <div className="web-chat-scroll" aria-live="polite">
                <div className="chat-date"><span>LOCAL SESSION · TODAY</span></div>
                <div className="chat-message chat-message--user">
                  <span className="chat-avatar">SD</span><div><small>You · command</small><code>{sentPrompt ?? current.command}</code></div>
                </div>
                <div className="chat-message chat-message--assistant">
                  <span className="chat-avatar"><Sparkles size={14} aria-hidden="true" /></span>
                  <div>
                    <small>FinCLI · grounded response</small>
                    <p>{sentPrompt ? 'Demo command received locally. In FinCLI, this request would be routed through the authenticated command bridge with provider-aware context.' : current.response}</p>
                    <div className="chat-chips">
                      {(sentPrompt ? ['static simulation', 'no broker action', 'no credentials'] : current.chips).map((chip) => <span key={chip}><Check size={11} aria-hidden="true" />{chip}</span>)}
                    </div>
                    <div className="chat-sources"><span>Source scores</span><i /><i /><i /><strong>88 avg</strong></div>
                  </div>
                </div>
              </div>

              <form
                className="web-composer"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (composer.trim()) {
                    setSentPrompt(composer.trim())
                    setPaletteOpen(false)
                  }
                }}
              >
                {paletteOpen && (
                  <div className="command-palette">
                    <div><Command size={13} aria-hidden="true" /><strong>Slash command palette</strong><span>{filteredPalette.length} matches</span></div>
                    {filteredPalette.map((command) => (
                      <button key={command} type="button" onClick={() => { setComposer(command); setPaletteOpen(false) }}>
                        <code>{command}</code><span>↵</span>
                      </button>
                    ))}
                  </div>
                )}
                <div className="composer-field">
                  <Search size={15} aria-hidden="true" />
                  <input
                    value={composer}
                    onFocus={() => setPaletteOpen(true)}
                    onChange={(event) => { setComposer(event.target.value); setPaletteOpen(event.target.value.startsWith('/')) }}
                    aria-label="Mock Local Web command"
                    placeholder="Ask about a market or type / for commands"
                  />
                  <button type="submit" aria-label="Send simulated command"><Send size={15} aria-hidden="true" /></button>
                </div>
                <span><Clock3 size={11} aria-hidden="true" /> Conversation saved locally</span>
              </form>
            </div>

            <aside className="web-context" aria-label="Provider and safety status">
              <div className="context-heading"><span>Session context</span><i aria-hidden="true" /></div>
              <div className="context-card">
                <span>Provider status</span>
                <strong><i className="status-dot" aria-hidden="true" /> 5 / 6 healthy</strong>
                <small>Fallback routing ready</small>
              </div>
              <div className="context-card">
                <span>AI model</span>
                <strong>Auto · grounded</strong>
                <small>Confidence cap 86%</small>
              </div>
              <div className="safety-confirmation">
                <ShieldAlert size={18} aria-hidden="true" />
                <span><strong>Sensitive command gate</strong><code>/security purge</code><small>Browser confirmation required</small></span>
              </div>
              <div className="local-only-stamp"><Lock size={13} aria-hidden="true" /> LOCAL ONLY</div>
            </aside>
          </div>
        </div>
        <DemoNotice />
      </Reveal>

      <div className="local-web-benefits">
        {[
          ['One router', 'Terminal and browser slash commands use the same local command services.'],
          ['Safe history', 'Raw credentials remain terminal-only and never enter browser session history.'],
          ['Theme aware', 'Responsive dark and light modes keep long research sessions readable.'],
          ['Explicit control', 'State-changing commands pause for confirmation before local execution.'],
        ].map(([title, text], index) => (
          <Reveal key={title} delay={index * 0.05}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></Reveal>
        ))}
      </div>
    </section>
  )
}
