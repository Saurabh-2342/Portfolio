import { useMagnetic } from '../hooks/usePointerFX'

export default function Footer({ finePointer }) {
  const mag = useMagnetic(finePointer)
  return (
    <footer className="footer">
      <span>© 2026 Saurabh Singh</span>
      <span>Designed &amp; built with intent.</span>
      <a href="#top" data-magnetic {...mag}>Back to top ↑</a>
    </footer>
  )
}
