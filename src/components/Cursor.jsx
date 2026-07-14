import { useEffect, useRef } from 'react'

// Custom dot + trailing ring + mouse-following light. Desktop only — mounted
// by App solely when a fine pointer is present.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const light = useRef(null)

  useEffect(() => {
    document.body.classList.add('fine-pointer')
    let mx = innerWidth / 2, my = innerHeight / 2
    let rx = mx, ry = my, lx = mx, ly = my
    let raf

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16
      lx += (mx - lx) * 0.08; ly += (my - ly) * 0.08
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`
      if (light.current) light.current.style.transform = `translate(${lx}px,${ly}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(loop)

    // grow ring over interactive elements
    const interactive = 'a,button,[data-magnetic],[data-tilt]'
    const enter = () => ring.current?.classList.add('hover')
    const leave = () => ring.current?.classList.remove('hover')
    const els = Array.from(document.querySelectorAll(interactive))
    els.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      document.body.classList.remove('fine-pointer')
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <>
      <div ref={light} className="mouse-light" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
