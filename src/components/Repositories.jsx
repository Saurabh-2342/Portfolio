import Reveal from './Reveal'
import { REPOS, CONTACT } from '../data'
import { useTilt } from '../hooks/usePointerFX'

function Repo({ r, finePointer }) {
  const tilt = useTilt(finePointer)
  return (
    <a href={r.href} target="_blank" rel="noopener noreferrer" className="repo" data-tilt {...tilt}>
      <div className="card-glow" data-glow style={{ background: `radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(${r.glow},.14), transparent 60%)` }} />
      <div className="head">
        <span className="name">{r.name}</span>
        <span className="arr">↗</span>
      </div>
      <p>{r.desc}</p>
      <div className="lang mono"><span className="bullet">●</span> {r.lang}</div>
    </a>
  )
}

export default function Repositories({ finePointer }) {
  return (
    <section id="github" className="section section--wide">
      <Reveal className="section-head" style={{ marginBottom: 12 }}>
        <span className="mono idx">05</span>
        <h2>Featured repositories</h2>
      </Reveal>
      <Reveal as="p" style={{ color: 'rgba(255,255,255,.5)', maxWidth: 560, marginBottom: 40, fontSize: 15, lineHeight: 1.6 }}>
        A few open-source builds worth a closer look. More on{' '}
        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--a-soft)' }}>@Saurabh-2342</a>.
      </Reveal>
      <Reveal className="repo-grid">
        {REPOS.map((r) => (
          <Repo key={r.name} r={r} finePointer={finePointer} />
        ))}
      </Reveal>
    </section>
  )
}
