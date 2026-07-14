import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../data'
import { useMagnetic } from '../hooks/usePointerFX'

export default function Nav({ finePointer }) {
  const [compact, setCompact] = useState(false)
  const magnetic = useMagnetic(finePointer)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${compact ? ' compact' : ''}`}>
      <a href="#top" className="nav-logo">
        <span className="dot" />
        SS
      </a>

      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>

      <a href="#contact" className="pill pill--solid nav-cta" data-magnetic {...magnetic}>
        Let&apos;s talk
      </a>
    </nav>
  )
}
