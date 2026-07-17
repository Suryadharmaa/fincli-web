type BrandProps = {
  compact?: boolean
}

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className="brand-lockup" aria-label="FinCLI v1.9.0">
      <svg className="brand-mark" viewBox="0 0 44 48" aria-hidden="true">
        <path className="brand-shield" d="M22 2.5 39 8v12.7c0 11.7-6.6 20.3-17 24.8C11.6 41 5 32.4 5 20.7V8l17-5.5Z" />
        <path className="brand-ridge" d="M11.5 13.5h21M22 7v33" />
        <path className="brand-command" d="m13.5 19 5 4-5 4m8.5 0h8" />
      </svg>
      {!compact && (
        <span className="brand-copy">
          <span className="brand-name">FinCLI</span>
          <span className="brand-version">v1.9.0</span>
        </span>
      )}
    </span>
  )
}

export function LaurelSeal() {
  return (
    <div className="laurel-seal" aria-hidden="true">
      <svg viewBox="0 0 280 280">
        <defs>
          <linearGradient id="sealBronze" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0cb7b" />
            <stop offset="0.45" stopColor="#a66c2d" />
            <stop offset="1" stopColor="#5a3219" />
          </linearGradient>
        </defs>
        <circle cx="140" cy="140" r="94" className="seal-orbit" />
        <circle cx="140" cy="140" r="72" className="seal-core" />
        <path d="M66 199C29 146 50 79 100 49M77 190l-23 1m31-15-25-7m33-8-24-13m34 0-20-19m31 7-15-23m31 14-8-27m26 25 1-28" className="seal-laurel" />
        <path d="M214 199c37-53 16-120-34-150m23 141 23 1m-31-15 25-7m-33-8 24-13m-34 0 20-19m-31 7 15-23m-31 14 8-27m-26 25-1-28" className="seal-laurel" />
        <path d="m140 78 43 14v32c0 30-17 52-43 63-26-11-43-33-43-63V92l43-14Z" fill="url(#sealBronze)" className="seal-shield" />
        <path d="M111 108h58m-29-20v84" className="seal-engrave" />
        <path d="m117 119 14 11-14 11m23 0h23" className="seal-terminal" />
      </svg>
      <span className="seal-label seal-label-top">INSTRUMENTUM</span>
      <span className="seal-label seal-label-bottom">FINANCIARIUM</span>
    </div>
  )
}
