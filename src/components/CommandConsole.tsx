import { Check, ChevronRight, CircleAlert, Copy, Play, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { terminalScenarios } from '../data'

function Sparkline({ values }: { values: number[] }) {
  const points = useMemo(() => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const span = max - min || 1
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100
        const y = 44 - ((value - min) / span) * 36
        return `${x},${y}`
      })
      .join(' ')
  }, [values])

  return (
    <svg className="terminal-chart" viewBox="0 0 100 48" preserveAspectRatio="none" role="img" aria-label="Illustrative upward price series">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-gold)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--accent-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${points} L 100,48 L 0,48 Z`} fill="url(#chartFill)" />
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function CommandConsole() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [input, setInput] = useState(terminalScenarios[0].command)
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const scenario = terminalScenarios[activeIndex]

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
  }, [])

  const runCommand = (command = input) => {
    const trimmed = command.trim()
    const normalized = trimmed.toLowerCase()
    const matchIndex = terminalScenarios.findIndex((item) => {
      const root = item.command.split(' ')[0].toLowerCase()
      if (root === '/trading') return normalized.startsWith('/trading')
      if (root === '/provider') return normalized.startsWith('/provider')
      if (root === '/portfolio') return normalized.startsWith('/portfolio')
      return normalized.startsWith(root)
    })

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    setInput(command)

    if (!normalized) {
      setRunning(false)
      setError('Enter a command or choose one of the six presets to run the static simulation.')
      return
    }

    setRunning(true)
    setError(null)
    timeoutRef.current = window.setTimeout(() => {
      if (matchIndex >= 0) {
        setActiveIndex(matchIndex)
      } else {
        setError(`“${trimmed}” is outside this landing-page demo. Open the Command Codex below to find a supported FinCLI command.`)
      }
      setRunning(false)
    }, 360)
  }

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(scenario.command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="command-console" id="command-console">
      <div className="console-frame-line" aria-hidden="true" />
      <div className="console-bar">
        <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
        <span className="console-title">fincli / command chamber</span>
        <span className="console-secure"><i aria-hidden="true" /> LOCAL</span>
      </div>

      <div className="console-layout">
        <div className="console-command-list" aria-label="Example FinCLI commands">
          <span className="console-list-label">Command presets</span>
          {terminalScenarios.map((item, index) => (
            <button
              key={item.command}
              className={index === activeIndex ? 'is-active' : ''}
              type="button"
              onClick={() => runCommand(item.command)}
            >
              <ChevronRight size={14} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="console-output" aria-live="polite" aria-busy={running}>
          <div className="console-output-topline">
            <span>{error ? 'Command Codex · simulated router' : scenario.eyebrow}</span>
            {!error && (
              <button type="button" onClick={copyCommand} aria-label="Copy active command">
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {running ? (
            <div className="console-loading">
              <span /><span /><span />
              <p>Routing command through local services…</p>
            </div>
          ) : error ? (
            <div className="console-empty">
              <CircleAlert size={24} aria-hidden="true" />
              <p className="console-prompt"><span>›</span> {input || 'No command entered'}</p>
              <h2>Command not available in this demo</h2>
              <p>{error}</p>
              <a href="#commands">Browse the searchable Command Codex</a>
            </div>
          ) : (
            <div className="console-report">
              <div className="console-report-heading">
                <div>
                  <p className="console-prompt"><span>›</span> {scenario.command}</p>
                  <h2>{scenario.title}</h2>
                </div>
                <span className="report-stamp">DEMO<br />OUTPUT</span>
              </div>

              <p className="console-summary">{scenario.summary}</p>

              <div className="console-metrics">
                {scenario.metrics.map((metric) => (
                  <div key={metric.label}>
                    <span>{metric.label}</span>
                    <strong className={`tone-${metric.tone ?? 'neutral'}`}>{metric.value}</strong>
                  </div>
                ))}
              </div>

              {scenario.chart && <Sparkline values={scenario.chart} />}

              <div className="console-details">
                {scenario.details.map((detail) => (
                  <p key={detail}><span aria-hidden="true">◆</span>{detail}</p>
                ))}
              </div>

              <div className="console-tags" aria-label="Report sections">
                {scenario.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>

      <form
        className="console-input"
        onSubmit={(event) => {
          event.preventDefault()
          runCommand()
        }}
      >
        <span aria-hidden="true">fincli@local:~$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Enter a simulated FinCLI command"
          spellCheck={false}
        />
        <button type="button" onClick={() => setInput('')} aria-label="Clear command">
          <RotateCcw size={15} aria-hidden="true" />
        </button>
        <button type="submit" className="console-run" aria-label="Run simulated command">
          <Play size={14} fill="currentColor" aria-hidden="true" /> Run
        </button>
      </form>
    </div>
  )
}
