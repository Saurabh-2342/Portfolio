import Reveal from './Reveal'
import { RESUME_URL } from '../data'
import { useTilt, useMagnetic } from '../hooks/usePointerFX'

export default function Resume({ finePointer }) {
  const tilt = useTilt(finePointer)
  const magDl = useMagnetic(finePointer)
  const magView = useMagnetic(finePointer)
  return (
    <section id="resume" className="section section--mid">
      <Reveal className="resume-card" data-tilt {...tilt}>
        <div className="card-glow" data-glow style={{ background: 'radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(var(--a1-rgb),.16), transparent 60%)' }} />
        <div className="resume-copy">
          <div className="mono eyebrow">06 — Résumé</div>
          <h2>Grab the full<br />picture.</h2>
          <p>Experience, skills, and project detail — condensed to a single page. Download the latest copy as a PDF.</p>
        </div>
        <div className="resume-actions">
          <a href={RESUME_URL} download="Saurabh_Singh_Resume.pdf" className="pill pill--cta" data-magnetic {...magDl}>
            ↓ Download résumé
          </a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="pill pill--outline" data-magnetic {...magView}>
            View in browser ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}
