import Reveal from './Reveal'
import { PROJECTS, CONTACT } from '../data'
import { useTilt, useMagnetic } from '../hooks/usePointerFX'

function Project({ p, finePointer }) {
  const tilt = useTilt(finePointer)
  const magLive = useMagnetic(finePointer)
  const magGh = useMagnetic(finePointer)
  return (
    <Reveal as="article" className="project" data-tilt {...tilt}>
      <div className="card-glow project-glow" data-glow />
      <span className="project-accent" style={{ background: p.grad }} />
      <span className="project-num">{p.n}</span>
      <div className="project-body">
        <div>
          <div className="project-tag">{p.tag}</div>
          <h3>{p.title}</h3>
          <p className="project-desc">{p.desc}</p>
        </div>
        <div>
          <div className="project-stack">
            <div className="label">Stack</div>
            <div className="items">
              {p.tech.map((t) => (
                <span key={t}><span className="bullet" />{t}</span>
              ))}
            </div>
          </div>
          <div className="project-links">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="pill pill--solid" data-magnetic {...magLive}>
                Live demo ↗
              </a>
            )}
            {p.gh && (
              <a href={p.gh} target="_blank" rel="noopener noreferrer" className="pill pill--outline" data-magnetic {...magGh}>
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Work({ finePointer }) {
  return (
    <section id="work" className="section section--wide">
      <Reveal className="section-head">
        <span className="mono idx">03</span>
        <h2>Featured work</h2>
      </Reveal>
      <div className="projects">
        {PROJECTS.map((p) => (
          <Project key={p.n} p={p} finePointer={finePointer} />
        ))}
      </div>
      <p className="work-more">
        More on{' '}
        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--a-soft)' }}>
          github.com/Saurabh-2342
        </a>
      </p>
    </section>
  )
}
