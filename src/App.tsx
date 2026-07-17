import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Capabilities } from './components/Capabilities'
import { Hero } from './components/Hero'
import { ProviderSystem, ResearchEngine } from './components/Intelligence'
import { LocalWeb } from './components/LocalWeb'
import { Commands, FinalCta, Footer, Install, Roadmap } from './components/Operations'
import { AmbientBackdrop, Navbar } from './components/Shell'
import { TradingSafety } from './components/Trading'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem('fincli-theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [showToTop, setShowToTop] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('fincli-theme', theme)
    const themeMeta = document.querySelector('meta[name="theme-color"]')
    themeMeta?.setAttribute('content', theme === 'dark' ? '#090a0c' : '#f2eee6')
  }, [theme])

  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AmbientBackdrop />
      <Navbar theme={theme} onThemeToggle={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} />
      <div className="chapter-rail" aria-hidden="true"><span>FINCLI IMPERIUM</span><i /><b>MMXXVI</b></div>

      <main id="main-content">
        <Hero />
        <Capabilities />
        <LocalWeb />
        <ResearchEngine />
        <ProviderSystem />
        <TradingSafety />
        <Install />
        <Commands />
        <Roadmap />
        <FinalCta />
      </main>

      <Footer />
      <button
        type="button"
        className={`to-top ${showToTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })}
        aria-label="Back to top"
        tabIndex={showToTop ? 0 : -1}
      >
        <ArrowUp size={17} aria-hidden="true" />
      </button>
    </>
  )
}

export default App
