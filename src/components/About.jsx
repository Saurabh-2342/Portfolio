import Reveal from './Reveal'
import { useTilt } from '../hooks/usePointerFX'

const CARDS = [
  {
    span: true,
    eyebrow: 'Current role', eyebrowVar: 'var(--a-soft)', glow: 'var(--a1-rgb)',
    title: 'ML Engineer & Full-Stack Developer', big: true,
    body: "I build AI systems that ship — from real-time fault-detection pipelines to crop-disease detection apps. I'm drawn to AI agents and automated workflows that connect people, processes, and data, working end-to-end across Python, FastAPI, React, and n8n. Based in Ahmedabad, India.",
  },
  {
    eyebrow: 'Education', eyebrowVar: 'var(--a2-soft)', glow: 'var(--a2-rgb)',
    title: 'B.Tech — CS (AI & ML)', med: true,
    body: 'Adani University, Ahmedabad · Expected May 2027.',
  },
  {
    eyebrow: 'AI focus', eyebrowVar: 'var(--a3-soft)', glow: 'var(--a3-rgb)',
    title: 'AI Agents, CV & Automation', med: true,
    body: 'Agentic workflows, CNN vision models, and FastAPI serving pipelines.',
  },
  {
    span: true, goal: true,
    eyebrow: 'Career goal', eyebrowVar: 'var(--a-soft)', glow: 'var(--a1-rgb)',
    title: 'Design AI agents and automation that connect people, processes, and data — and ship products that stay elegant under the hood.',
  },
]

export default function About({ finePointer }) {
  const tilt = useTilt(finePointer)
  return (
    <section id="about" className="section section--wide">
      <Reveal className="section-head">
        <span className="mono idx">01</span>
        <h2>A bit about me</h2>
      </Reveal>
      <div className="about-grid">
        {CARDS.map((c, i) => (
          <Reveal
            key={i}
            className={`card about-card${c.span ? ' span2' : ''}`}
            data-tilt
            {...tilt}
          >
            <div className="card-glow" data-glow style={{ background: `radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(${c.glow},.16), transparent 60%)` }} />
            <div className="mono eyebrow" style={{ color: c.eyebrowVar }}>{c.eyebrow}</div>
            {c.goal ? (
              <div className="goal">{c.title}</div>
            ) : (
              <>
                <h3 className={c.big ? 'big' : 'med'}>{c.title}</h3>
                {c.body && <p>{c.body}</p>}
              </>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
