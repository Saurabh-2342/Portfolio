import { useEffect, useState } from 'react'

// True on real pointer devices (desktop). On touch/coarse pointers we skip the
// custom cursor, tilt, magnetic and mouse-light entirely — they add cost and
// feel wrong on mobile.
export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

// Card tilt + glow-follows-cursor. Attach the returned handlers to a card and
// mark the glow child with data-glow.
export function useTilt(enabled) {
  const onMouseMove = (e) => {
    if (!enabled) return
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rotX = (py - 0.5) * -7
    const rotY = (px - 0.5) * 7
    card.style.transition = 'transform .1s ease'
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
    const glow = card.querySelector('[data-glow]')
    if (glow) {
      glow.style.setProperty('--mx', px * 100 + '%')
      glow.style.setProperty('--my', py * 100 + '%')
      glow.style.opacity = '1'
    }
  }
  const onMouseLeave = (e) => {
    if (!enabled) return
    const card = e.currentTarget
    card.style.transition = 'transform .5s ease'
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'
    const glow = card.querySelector('[data-glow]')
    if (glow) glow.style.opacity = '0'
  }
  return enabled ? { onMouseMove, onMouseLeave } : {}
}

// Magnetic pull toward the cursor for buttons/links.
export function useMagnetic(enabled) {
  const onMouseMove = (e) => {
    if (!enabled) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.28}px,${y * 0.34}px)`
  }
  const onMouseLeave = (e) => {
    if (!enabled) return
    e.currentTarget.style.transform = 'translate(0,0)'
  }
  return enabled ? { onMouseMove, onMouseLeave } : {}
}
