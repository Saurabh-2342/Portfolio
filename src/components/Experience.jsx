import { useEffect, useRef } from 'react'
import Reveal from './Reveal'
import { EXPERIENCE } from '../data'

export default function Experience() {
  const tlRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const tl = tlRef.current
      const fill = fillRef.current
      if (!tl || !fill) return
      const r = tl.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the top reaches 70% of the viewport, 1 when the bottom does
      const p = Math.max(0, Math.min(1, (0.7 * vh - r.top) / (r.height || 1)))
      fill.style.height = `${p * 100}%`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="experience" className="section section--narrow">
      <Reveal className="section-head">
        <span className="mono idx">04</span>
        <h2>Experience</h2>
      </Reveal>
      <div className="timeline" ref={tlRef}>
        <div className="timeline-track" />
        <div className="timeline-fill" ref={fillRef} />
        {EXPERIENCE.map((e) => (
          <Reveal key={e.role} className="tl-item">
            <span className="node" />
            <div className="date">{e.date}</div>
            <div className="role">{e.role}</div>
            <div className="org">{e.org}</div>
            <p>{e.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
