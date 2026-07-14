import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { CAPABILITIES } from '../data'

function Stage({ cap }) {
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    setAnimate(false)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(id)
  }, [cap])

  return (
    <div className={`cat-stage${animate ? ' animate' : ''}`}>
      <div className="tk-desc" style={{ color: cap.color }}>{cap.desc}</div>
      <div className="tk-flow">
        {cap.skills.map((s, i) => (
          <span key={s} className="tk-skill" style={{ transitionDelay: `${i * 50}ms` }}>
            <span className="dot" style={{ background: cap.color }} />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState(0)
  const cap = CAPABILITIES[active]

  return (
    <section id="skills" className="section section--wide">
      <Reveal className="section-head" style={{ marginBottom: 22 }}>
        <span className="mono idx">02</span>
        <h2>Capabilities</h2>
      </Reveal>
      <Reveal as="p" style={{ color: 'rgba(255,255,255,.5)', maxWidth: 520, marginBottom: 52, fontSize: 15, lineHeight: 1.6 }}>
        Four domains I build across. Hover a discipline to explore the toolkit.
      </Reveal>

      <Reveal className="toolkit">
        <div className="cat-list">
          {CAPABILITIES.map((c, i) => (
            <button
              key={c.label}
              className={`cat-btn${active === i ? ' active' : ''}`}
              style={{ borderLeftColor: active === i ? c.color : 'transparent', borderBottomColor: active === i ? c.color : 'transparent' }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span>{c.label}</span>
              <span className="count" style={{ color: active === i ? c.color : undefined }}>
                {String(c.skills.length).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
        <Stage cap={cap} />
      </Reveal>
    </section>
  )
}
