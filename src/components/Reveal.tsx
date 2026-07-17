import { useEffect, useRef } from 'react'
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'

type RevealProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  delay?: number
}

let revealObserver: IntersectionObserver | null = null

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
  }
  return revealObserver
}

export function Reveal({ children, delay = 0, className = '', ...props }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return
    }

    const observer = getRevealObserver()
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [])

  const style = {
    ...props.style,
    '--reveal-delay': `${delay}s`,
  } as CSSProperties

  return (
    <div
      ref={elementRef}
      className={`reveal ${className}`}
      {...props}
      style={style}
    >
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <span className="eyebrow"><i aria-hidden="true" />{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </Reveal>
  )
}
