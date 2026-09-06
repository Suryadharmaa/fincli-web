import { GitFork, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Brand } from './Brand'

const navItems = [
  ['Features', '#features'],
  ['Local Web', '#local-web'],
  ['Commands', '#commands'],
  ['Research', '#research'],
  ['Trading', '#trading'],
  ['Security', '#security'],
  ['Install', '#install'],
] as const

export function Navbar({ theme, onThemeToggle }: { theme: 'dark' | 'light'; onThemeToggle: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-shell">
        <a className="brand-link" href="#top" aria-label="FinCLI home" onClick={() => setOpen(false)}>
          <Brand />
        </a>

        <nav id="mobile-navigation" className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-github"
            href="https://github.com/Suryadharmaa/fincli-web"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            <GitFork size={15} aria-hidden="true" /> GitHub
          </a>
          <a className="nav-install" href="#install" onClick={() => setOpen(false)}>
            Install FinCLI
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={onThemeToggle}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export function AmbientBackdrop() {
  return (
    <div className="ambient-backdrop" aria-hidden="true">
      <img className="roman-column-asset" src={`${import.meta.env.BASE_URL}assets/roman-marble-column.jpg`} alt="" />
      <div className="ambient-grid" />
      <div className="ambient-orbit ambient-orbit--one" />
      <div className="ambient-orbit ambient-orbit--two" />
      <div className="ambient-glow ambient-glow--gold" />
      <div className="ambient-glow ambient-glow--crimson" />
    </div>
  )
}

export function DemoNotice() {
  return (
    <p className="demo-notice">
      <span aria-hidden="true" /> Static product simulation — no market API, credentials, or broker connection is used.
    </p>
  )
}
