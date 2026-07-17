export type TerminalMetric = {
  label: string
  value: string
  tone?: 'positive' | 'warning' | 'neutral' | 'danger'
}

export type TerminalScenario = {
  command: string
  label: string
  eyebrow: string
  title: string
  summary: string
  metrics: TerminalMetric[]
  tags: string[]
  details: string[]
  chart?: number[]
}

export const terminalScenarios: TerminalScenario[] = [
  {
    command: '/research AAPL --deep',
    label: 'Deep research',
    eyebrow: 'Research Oracle · structured preview',
    title: 'AAPL / Deep Research Brief',
    summary:
      'Momentum remains constructive, while valuation and provider coverage keep conviction below the maximum trust threshold.',
    metrics: [
      { label: 'Signal', value: 'Constructive', tone: 'positive' },
      { label: 'Risk', value: 'Medium', tone: 'warning' },
      { label: 'Trust', value: '82 / 100', tone: 'positive' },
    ],
    tags: ['Snapshot', 'Signal', 'Risk', 'Trust Gate', 'Missing Data', 'Source Scores'],
    details: [
      'Verified fact · Price holds above the 20-session trend in this static demo.',
      'Inference · Services resilience may offset softer hardware cycles.',
      'Missing data · Real-time options flow is unavailable on the selected plan.',
    ],
    chart: [32, 35, 33, 39, 42, 40, 46, 51, 49, 56, 59, 63, 61, 68, 72, 70],
  },
  {
    command: '/chart AAPL 1d --overlay rsi,macd',
    label: 'Chart + overlays',
    eyebrow: 'Technical chamber · daily timeframe',
    title: 'AAPL / 1D Technical Map',
    summary:
      'Trend structure is intact. RSI is balanced and MACD momentum remains positive without an overbought reading.',
    metrics: [
      { label: 'RSI (14)', value: '58.4', tone: 'neutral' },
      { label: 'MACD', value: '+1.26', tone: 'positive' },
      { label: 'ATR', value: '2.18%', tone: 'warning' },
    ],
    tags: ['Snapshot', 'Signal', 'Risk'],
    details: [
      'EMA 20 is positioned above EMA 50 in the illustrative series.',
      'Nearest tactical support is mapped below the current consolidation.',
      'Indicators are simulated for product demonstration only.',
    ],
    chart: [27, 31, 29, 36, 34, 41, 45, 43, 48, 46, 54, 58, 56, 61, 65, 69],
  },
  {
    command: '/scan sp500 rsi<30',
    label: 'Market scan',
    eyebrow: 'Screener · S&P 500 demo universe',
    title: 'Oversold Candidates',
    summary:
      'Four symbols pass the illustrative RSI threshold. Results still require provider verification and independent analysis.',
    metrics: [
      { label: 'Matched', value: '4', tone: 'positive' },
      { label: 'Universe', value: 'S&P 500', tone: 'neutral' },
      { label: 'Coverage', value: '98.6%', tone: 'positive' },
    ],
    tags: ['Snapshot', 'Signal', 'Missing Data'],
    details: [
      'NKE · RSI 28.7 · below resistance',
      'UPS · RSI 29.1 · volume stabilizing',
      'MDT · RSI 29.6 · volatility elevated',
    ],
  },
  {
    command: '/portfolio risk',
    label: 'Portfolio risk',
    eyebrow: 'Risk Shield · Portfolio Risk v3',
    title: 'Portfolio Exposure Review',
    summary:
      'Technology concentration is the primary risk contributor; the health score remains usable inside the configured risk budget.',
    metrics: [
      { label: 'Health', value: '78 / 100', tone: 'positive' },
      { label: '1D VaR', value: '2.4%', tone: 'warning' },
      { label: 'Drawdown', value: '-7.8%', tone: 'warning' },
    ],
    tags: ['Snapshot', 'Risk', 'Trust Gate', 'Missing Data'],
    details: [
      'Largest sector exposure · Technology 42%',
      'Concentration alert · top position contributes 18%',
      'VaR view · historical and parametric estimates available',
    ],
  },
  {
    command: '/trading live connect alpaca paper',
    label: 'Paper broker',
    eyebrow: 'Trade Phalanx · safe connection flow',
    title: 'Alpaca Paper Connected',
    summary:
      'Paper mode is armed with risk guardrails. This landing-page interaction never reaches a broker or submits an order.',
    metrics: [
      { label: 'Mode', value: 'Paper', tone: 'positive' },
      { label: 'Max position', value: '20%', tone: 'neutral' },
      { label: 'Daily stop', value: '5%', tone: 'warning' },
    ],
    tags: ['Risk', 'Trust Gate', 'Audit Log'],
    details: [
      'Kill switch · ready',
      'Leverage · disabled in paper mode',
      'Immutable audit trail · enabled',
    ],
  },
  {
    command: '/provider status',
    label: 'Provider health',
    eyebrow: 'Provider Legion · quality-aware routing',
    title: 'Provider Health Overview',
    summary:
      'Primary routes are healthy. yfinance remains available as a delayed fallback when entitled real-time sources are unavailable.',
    metrics: [
      { label: 'Healthy', value: '5 / 6', tone: 'positive' },
      { label: 'Fallback', value: 'Ready', tone: 'neutral' },
      { label: 'AI cap', value: '86%', tone: 'positive' },
    ],
    tags: ['Trust Gate', 'Missing Data', 'Source Scores'],
    details: [
      'Finnhub · healthy · illustrative latency 118ms',
      'Twelve Data · healthy · quality score 91',
      'Alpha Vantage · rate-limited · fallback available',
    ],
  },
]

export type FeatureKey =
  | 'research'
  | 'provider'
  | 'risk'
  | 'trading'
  | 'backtest'
  | 'security'
  | 'commands'

export type Feature = {
  key: FeatureKey
  index: string
  title: string
  subtitle: string
  description: string
  meta: string[]
  preview?: boolean
}

export const features: Feature[] = [
  {
    key: 'research',
    index: 'I',
    title: 'Research Oracle',
    subtitle: 'Research Engine v4',
    description:
      'A structured brief that separates verified facts from inferences, exposes missing data, and scores every source.',
    meta: ['Scenario matrix', 'Trust-capped citations'],
    preview: true,
  },
  {
    key: 'provider',
    index: 'II',
    title: 'Provider Legion',
    subtitle: 'Provider System v3',
    description:
      'Capability-aware routing, quality envelopes, circuit breakers, and confidence caps across six market-data providers.',
    meta: ['Quality 0–100', 'Automatic fallback'],
    preview: true,
  },
  {
    key: 'risk',
    index: 'III',
    title: 'Risk Shield',
    subtitle: 'Portfolio Risk v3',
    description:
      'See exposure, concentration, drawdown, PnL, health score, risk budget, and historical or parametric VaR.',
    meta: ['Concentration map', 'VaR analysis'],
  },
  {
    key: 'trading',
    index: 'IV',
    title: 'Trade Phalanx',
    subtitle: 'Alpaca + Binance',
    description:
      'Connect to paper, testnet, or live environments with confirmations, a risk guard, kill switch, and audit log.',
    meta: ['Broker guardrails', 'Paper-first flow'],
  },
  {
    key: 'backtest',
    index: 'V',
    title: 'Backtest Arena',
    subtitle: 'Strategy proving ground',
    description:
      'Model fees and slippage, compare strategies, run walk-forward checks, and inspect Monte Carlo robustness.',
    meta: ['8 strategies', 'Export-ready'],
  },
  {
    key: 'security',
    index: 'VI',
    title: 'Security Vault',
    subtitle: 'Local-first defense',
    description:
      'Encrypted secrets at rest, token-pattern scans, lockdown and purge flows, with no credential exposed to this site.',
    meta: ['PBKDF2-SHA256', 'Local storage'],
  },
  {
    key: 'commands',
    index: 'VII',
    title: 'Command Codex',
    subtitle: 'Slash registry + plugins',
    description:
      'Discover commands by workflow, use fast aliases, and extend FinCLI through validated sandboxed plugins.',
    meta: ['Searchable registry', 'Sandboxed API'],
  },
]

export type ResearchStage = {
  name: string
  label: string
  detail: string
  value: string
  tone: 'gold' | 'green' | 'crimson' | 'blue'
}

export const researchStages: ResearchStage[] = [
  { name: 'Snapshot', label: 'Market state', detail: 'Price, range, liquidity, and technical state in one deterministic view.', value: '$234.41', tone: 'gold' },
  { name: 'Signal', label: 'Directional read', detail: 'Evidence-weighted direction with a clear confidence boundary.', value: 'Constructive', tone: 'green' },
  { name: 'Risk', label: 'Risk surface', detail: 'Volatility, event, concentration, and downside conditions.', value: 'Medium', tone: 'crimson' },
  { name: 'Context', label: 'Context blend', detail: 'Sector, macro, company, and news context around the market state.', value: 'Supportive', tone: 'blue' },
  { name: 'Trust Gate', label: 'Confidence control', detail: 'Provider reliability and missing fields cap what the AI may assert.', value: '82 / 100', tone: 'gold' },
  { name: 'Verified Facts', label: 'Evidence ledger', detail: 'Claims directly supported by available, scored provider sources.', value: '7 facts', tone: 'green' },
  { name: 'Inferences', label: 'Reasoned layer', detail: 'Interpretations are isolated from factual observations.', value: '3 views', tone: 'blue' },
  { name: 'Missing Data', label: 'Known gaps', detail: 'Unavailable fields remain visible instead of being silently guessed.', value: '1 gap', tone: 'crimson' },
  { name: 'Scenario Matrix', label: 'Outcome map', detail: 'Bull, base, and bear cases with observable conditions.', value: '3 cases', tone: 'gold' },
  { name: 'Source Scores', label: 'Source quality', detail: 'Completeness, freshness, and reliability scored per source.', value: '88 avg', tone: 'green' },
  { name: 'Summary', label: 'Command brief', detail: 'A concise close that preserves caveats and decision points.', value: 'Ready', tone: 'blue' },
]

export type Provider = {
  name: string
  role: string
  latency: number
  quality: number
  fallback: string
  trust: 'Strong' | 'Usable' | 'Limited'
  confidence: number
  status: 'Healthy' | 'Watch' | 'Delayed'
}

export const providers: Provider[] = [
  { name: 'Finnhub', role: 'Market + news', latency: 118, quality: 94, fallback: 'Primary', trust: 'Strong', confidence: 92, status: 'Healthy' },
  { name: 'Twelve Data', role: 'Market data', latency: 142, quality: 91, fallback: 'Warm', trust: 'Strong', confidence: 89, status: 'Healthy' },
  { name: 'Polygon.io', role: 'US market data', latency: 96, quality: 93, fallback: 'Primary', trust: 'Strong', confidence: 91, status: 'Healthy' },
  { name: 'IEX Cloud', role: 'US reference', latency: 164, quality: 87, fallback: 'Warm', trust: 'Usable', confidence: 84, status: 'Healthy' },
  { name: 'Alpha Vantage', role: 'Market fallback', latency: 386, quality: 76, fallback: 'Rate aware', trust: 'Usable', confidence: 72, status: 'Watch' },
  { name: 'yfinance', role: 'Delayed fallback', latency: 522, quality: 68, fallback: 'Last resort', trust: 'Limited', confidence: 64, status: 'Delayed' },
]

export const commandCategories = [
  'All',
  'Research',
  'Portfolio',
  'Trading',
  'Screener',
  'Alerts',
  'AI Assistant',
  'Backtesting',
  'Security',
  'Providers',
  'Plugin system',
] as const

export type CommandCategory = Exclude<(typeof commandCategories)[number], 'All'>

export type RegistryCommand = {
  command: string
  category: CommandCategory
  description: string
}

export const registryCommands: RegistryCommand[] = [
  { command: '/research AAPL --deep', category: 'Research', description: 'Run source-aware deep research' },
  { command: '/market AAPL 1d', category: 'Research', description: 'Quote, news, and technical brief' },
  { command: '/technical AAPL 1d', category: 'Research', description: 'RSI, MACD, averages, and ATR' },
  { command: '/mtf AAPL 1d,1h,15m', category: 'Research', description: 'Compare multiple timeframes' },
  { command: '/chart AAPL 1d --overlay rsi,macd', category: 'Research', description: 'Render an indicator chart' },
  { command: '/news AAPL', category: 'Research', description: 'Aggregate provider-aware news' },
  { command: '/portfolio risk', category: 'Portfolio', description: 'Review exposure, drawdown, and VaR' },
  { command: '/portfolio correlation', category: 'Portfolio', description: 'Inspect pairwise holding correlation' },
  { command: '/portfolio rebalance', category: 'Portfolio', description: 'Generate equal-weight suggestions' },
  { command: '/portfolio benchmark SPY', category: 'Portfolio', description: 'Compare performance with a benchmark' },
  { command: '/trading live connect alpaca paper', category: 'Trading', description: 'Connect to Alpaca paper mode' },
  { command: '/trading live positions', category: 'Trading', description: 'Read current broker positions' },
  { command: '/trading kill', category: 'Trading', description: 'Block every new order immediately' },
  { command: '/trading audit', category: 'Trading', description: 'Inspect the immutable order log' },
  { command: '/scan sp500 rsi<30 --limit 20', category: 'Screener', description: 'Find oversold S&P 500 symbols' },
  { command: '/scan nasdaq sma_cross', category: 'Screener', description: 'Scan Nasdaq for golden crosses' },
  { command: '/watchlist add AAPL core', category: 'Screener', description: 'Save a symbol to a group' },
  { command: '/alert add AAPL above 200', category: 'Alerts', description: 'Create a local price alert' },
  { command: '/notification add discord alerts', category: 'Alerts', description: 'Configure an alert channel' },
  { command: '/ai What is RSI?', category: 'AI Assistant', description: 'Ask a finance-scoped question' },
  { command: '/ai_model', category: 'AI Assistant', description: 'Choose an AI provider and model' },
  { command: '/backtest AAPL sma_cross 1y', category: 'Backtesting', description: 'Test a strategy with realistic costs' },
  { command: '/backtest compare AAPL sma_cross,rsi_reversion', category: 'Backtesting', description: 'Compare strategy performance' },
  { command: '/journal add AAPL bullish "setup"', category: 'Backtesting', description: 'Record a trade thesis' },
  { command: '/security status', category: 'Security', description: 'Review local protection status' },
  { command: '/security scan', category: 'Security', description: 'Scan for exposed token patterns' },
  { command: '/security purge', category: 'Security', description: 'Clear secrets, history, and caches' },
  { command: '/security lockdown', category: 'Security', description: 'Run the emergency secret wipe' },
  { command: '/provider status', category: 'Providers', description: 'Review provider health' },
  { command: '/provider trust', category: 'Providers', description: 'Inspect trust and AI confidence limits' },
  { command: '/provider compare AAPL', category: 'Providers', description: 'Compare sources for one symbol' },
  { command: '/plugin list', category: 'Plugin system', description: 'List installed local plugins' },
  { command: '/plugin validate', category: 'Plugin system', description: 'Validate plugin manifests and code' },
]

export const changelog = [
  {
    version: 'Next Major',
    state: 'Validated preview',
    text: 'Research Engine v4 and Provider System v3 add structured evidence, source scoring, first-class Polygon/IEX wiring, and provider capability envelopes.',
  },
  {
    version: 'v1.9.0',
    state: 'Current',
    text: 'Authenticated Local Web Access, browser chat, local history, provider/model status, safe command routing, and local-only defaults.',
  },
  {
    version: 'v1.8.5',
    state: 'Cockpit refresh',
    text: 'A clearer TUI cockpit strip, grouped command palette, first-match highlighting, and subtle asynchronous feedback.',
  },
  {
    version: 'v1.8.4',
    state: 'Trust layer',
    text: 'Provider trust summaries, fallback visibility, data-completeness signals, and explicit AI confidence limits.',
  },
]
