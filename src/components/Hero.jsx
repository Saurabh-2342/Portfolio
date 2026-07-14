import { Suspense, lazy } from 'react'
import { useMagnetic } from '../hooks/usePointerFX'

const AICore = lazy(() => import('./AICore'))

export default function Hero({ heroRef, showCore, finePointer, themeKey }) {
  const mag1 = useMagnetic(finePointer)
  const mag2 = useMagnetic(finePointer)

  return (
    <section id="top" className="hero" ref={heroRef}>
      {showCore && (
        <Suspense fallback={null}>
          <AICore heroRef={heroRef} themeKey={themeKey} />
        </Suspense>
      )}

      <div className="hero-kicker">Hello, I&apos;m</div>
      <h1 className="hero-h1">
        <span className="hero-word">SAURABH</span>{' '}
        <span className="hero-word">SINGH</span>
      </h1>
      <div className="hero-role">
        ML Engineer &nbsp;•&nbsp; Full-Stack Developer &nbsp;•&nbsp; AI Agents
      </div>
      <p className="hero-sub">
        Building AI systems that deliver real-world impact — from real-time fault
        detection to intelligent crop-disease apps.
      </p>
      <div className="hero-cta">
        <a href="#work" className="pill pill--solid" data-magnetic {...mag1}>
          Explore my work →
        </a>
        <a href="#contact" className="pill pill--outline" data-magnetic {...mag2}>
          Let&apos;s connect
        </a>
      </div>

      <div className="scroll-ind" aria-hidden="true">
        Scroll
        <span className="bar" />
      </div>
    </section>
  )
}
