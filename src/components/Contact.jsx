import Reveal from './Reveal'
import { CONTACT } from '../data'
import { useMagnetic } from '../hooks/usePointerFX'

export default function Contact({ finePointer }) {
  const magMain = useMagnetic(finePointer)
  const magLi = useMagnetic(finePointer)
  const magMail = useMagnetic(finePointer)
  const magCall = useMagnetic(finePointer)
  return (
    <section id="contact" className="section section--mid contact" style={{ padding: '140px 24px 100px' }}>
      <Reveal className="contact-eyebrow">07 — Contact</Reveal>
      <Reveal as="h2">Let&apos;s build something<br />amazing.</Reveal>
      <a href={`mailto:${CONTACT.email}`} className="pill pill--cta" data-magnetic {...magMain}>
        Start a conversation →
      </a>
      <Reveal className="contact-socials">
        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="pill pill--outline" data-magnetic {...magLi}>LinkedIn</a>
        <a href={`mailto:${CONTACT.email}`} className="pill pill--outline" data-magnetic {...magMail}>Email</a>
        <a href={`tel:${CONTACT.phone}`} className="pill pill--outline" data-magnetic {...magCall}>Call</a>
      </Reveal>
    </section>
  )
}
