import { useEffect, useRef, useState } from 'react'
import { THEMES } from './data'
import { REDUCE_MOTION } from './hooks/useReveal'
import { useFinePointer } from './hooks/usePointerFX'

import Background from './components/Background'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Experience from './components/Experience'
import Repositories from './components/Repositories'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Fixed accent palette — Ember (orange). The multi-theme switcher was removed.
const theme = 'ember'

export default function App() {
  const [showCore, setShowCore] = useState(false)
  const finePointer = useFinePointer()
  const heroRef = useRef(null)

  // apply the Ember palette to CSS custom properties on :root
  useEffect(() => {
    const t = THEMES[theme] || THEMES.ember
    const r = document.documentElement.style
    r.setProperty('--a1', t.a1); r.setProperty('--a2', t.a2); r.setProperty('--a3', t.a3)
    r.setProperty('--a-soft', t.soft); r.setProperty('--a2-soft', t.a2soft); r.setProperty('--a3-soft', t.a3soft)
    r.setProperty('--a1-rgb', t.a1rgb); r.setProperty('--a2-rgb', t.a2rgb); r.setProperty('--a3-rgb', t.a3rgb)
  }, [])

  // build the 3D core everywhere except when the user prefers reduced motion —
  // it auto-rotates on its own, so touch/mobile devices still get it without
  // the pointer-parallax tilt (see finePointer gating inside AICore).
  useEffect(() => {
    setShowCore(!REDUCE_MOTION)
  }, [])

  return (
    <>
      <Background />
      {finePointer && <Cursor />}
      <Nav finePointer={finePointer} />
      <main>
        <Hero heroRef={heroRef} showCore={showCore} finePointer={finePointer} themeKey={theme} />
        <About finePointer={finePointer} />
        <Skills />
        <Work finePointer={finePointer} />
        <Experience />
        <Repositories finePointer={finePointer} />
        <Resume finePointer={finePointer} />
        <Contact finePointer={finePointer} />
      </main>
      <Footer finePointer={finePointer} />
    </>
  )
}
