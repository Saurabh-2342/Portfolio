import { useEffect, useRef, useState } from 'react'

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Reveals an element once it scrolls into view. Replaces the original
// GSAP + ScrollTrigger reveal with a native IntersectionObserver — no deps,
// far lighter, same effect. Add the `.reveal` class + spread `ref`; the hook
// toggles `.is-visible` when the element enters the viewport.
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, visible]
}

// Small wrapper component for the common reveal case.
export const REDUCE_MOTION = reduceMotion
