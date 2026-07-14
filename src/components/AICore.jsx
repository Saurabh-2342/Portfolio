import { useEffect, useRef } from 'react'
import { THEMES } from '../data'

const hex = (s) => parseInt(s.slice(1), 16)

// The floating "AI core" behind the hero. three.js is imported dynamically so
// it ships as its own chunk and never blocks first paint. Skipped entirely on
// touch devices / reduced-motion (App decides whether to mount this).
export default function AICore({ heroRef, themeKey, finePointer }) {
  const canvasRef = useRef(null)
  const ctx = useRef(null) // holds the mutable three.js scene handles

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (disposed || !canvasRef.current) return
      const canvas = canvasRef.current
      const hero = heroRef.current || canvas.parentElement

      const isSmallScreen = innerWidth < 700
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isSmallScreen })
      renderer.setPixelRatio(Math.min(devicePixelRatio, isSmallScreen ? 1.5 : 2))
      const scene = new THREE.Scene()
      const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      cam.position.set(0, 0, 6)

      const t = THEMES[themeKey] || THEMES.ember
      const pal = { a1: hex(t.a1), a2: hex(t.a2), a3: hex(t.a3), soft: hex(t.soft) }

      const group = new THREE.Group()
      scene.add(group)

      const geo = new THREE.IcosahedronGeometry(1.35, 1)
      let coreMat
      try {
        coreMat = new THREE.MeshPhysicalMaterial({ color: 0x0a0a12, metalness: 0.1, roughness: 0.15, transmission: 0.9, thickness: 1.5, transparent: true, opacity: 0.85, clearcoat: 1, clearcoatRoughness: 0.1 })
      } catch {
        coreMat = new THREE.MeshStandardMaterial({ color: 0x1a2540, metalness: 0.3, roughness: 0.2, transparent: true, opacity: 0.7 })
      }
      group.add(new THREE.Mesh(geo, coreMat))

      const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 1), new THREE.MeshBasicMaterial({ color: pal.a1, wireframe: true, transparent: true, opacity: 0.35 }))
      group.add(wire)
      const wire2 = new THREE.Mesh(new THREE.IcosahedronGeometry(2.05, 1), new THREE.MeshBasicMaterial({ color: pal.a2, wireframe: true, transparent: true, opacity: 0.14 }))
      group.add(wire2)

      // fewer particles on small screens
      const N = isSmallScreen ? 450 : 900
      const pos = new Float32Array(N * 3)
      for (let i = 0; i < N; i++) {
        const r = 2.2 + Math.random() * 2.6
        const th = Math.random() * Math.PI * 2
        const ph = Math.acos(2 * Math.random() - 1)
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
        pos[i * 3 + 2] = r * Math.cos(ph)
      }
      const pgeo = new THREE.BufferGeometry()
      pgeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const pmat = new THREE.PointsMaterial({ color: pal.soft, size: 0.03, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
      const points = new THREE.Points(pgeo, pmat)
      scene.add(points)

      scene.add(new THREE.AmbientLight(0x404060, 1.2))
      const l1 = new THREE.PointLight(pal.a1, 8, 30); l1.position.set(4, 3, 5); scene.add(l1)
      const l2 = new THREE.PointLight(pal.a3, 6, 30); l2.position.set(-5, -2, 3); scene.add(l2)
      const l3 = new THREE.PointLight(pal.a2, 5, 30); l3.position.set(0, 4, -4); scene.add(l3)

      const resize = () => {
        const w = hero.clientWidth, h = hero.clientHeight
        renderer.setSize(w, h, false)
        cam.aspect = w / h
        cam.updateProjectionMatrix()
      }
      resize()
      window.addEventListener('resize', resize)

      // pointer-parallax tilt only makes sense with a mouse; on touch devices
      // the core just auto-rotates in place with no hover reaction.
      let tx = 0, ty = 0
      const onMove = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5 }
      if (finePointer) window.addEventListener('mousemove', onMove, { passive: true })

      // pause rendering when the hero scrolls off-screen
      let heroVisible = true
      const io = new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting }, { threshold: 0 })
      io.observe(hero)

      const clock = new THREE.Clock()
      let raf
      const render = () => {
        const et = clock.getElapsedTime()
        group.rotation.y += 0.0025
        group.rotation.x = Math.sin(et * 0.3) * 0.12
        wire.rotation.y -= 0.004
        wire2.rotation.x += 0.003
        points.rotation.y = et * 0.03
        group.position.y = Math.sin(et * 0.7) * 0.12
        cam.position.x += (tx * 1.2 - cam.position.x) * 0.05
        cam.position.y += (-ty * 1.0 - cam.position.y) * 0.05
        cam.lookAt(0, 0, 0)
        if (heroVisible) renderer.render(scene, cam)
        raf = requestAnimationFrame(render)
      }
      raf = requestAnimationFrame(render)

      ctx.current = { THREE, wire: wire.material, wire2: wire2.material, points: pmat, l1, l2, l3 }

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        if (finePointer) window.removeEventListener('mousemove', onMove)
        io.disconnect()
        renderer.dispose()
        geo.dispose()
        pgeo.dispose()
        ctx.current = null
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [heroRef])

  // recolor on theme change without rebuilding the scene
  useEffect(() => {
    const c = ctx.current
    if (!c) return
    const t = THEMES[themeKey] || THEMES.ember
    const pal = { a1: hex(t.a1), a2: hex(t.a2), a3: hex(t.a3), soft: hex(t.soft) }
    c.wire.color.setHex(pal.a1)
    c.wire2.color.setHex(pal.a2)
    c.points.color.setHex(pal.soft)
    c.l1.color.setHex(pal.a1)
    c.l2.color.setHex(pal.a3)
    c.l3.color.setHex(pal.a2)
  }, [themeKey])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
