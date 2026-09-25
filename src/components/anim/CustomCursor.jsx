import { useEffect, useRef, useState } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../../lib/motion'

const LABELS = { book: 'Book', view: 'View' }

/**
 * Small trailing circle (desktop, fine pointer only).
 * Expands with a label over CTAs (`data-cursor="book" | "view"`),
 * softly over images (`data-cursor="image"`).
 */
export default function CustomCursor() {
  const ref = useRef(null)
  const [enabled] = useState(() => isFinePointer() && !prefersReducedMotion())
  const [state, setState] = useState('default')

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    const root = document.documentElement
    root.classList.add('has-cursor')
    gsap.set(el, { xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    let visible = false
    const show = () => {
      if (visible) return
      visible = true
      el.dataset.visible = ''
      root.classList.add('cursor-active') // native cursor hidden only while ours is showing
    }
    const hide = () => {
      if (!visible) return
      visible = false
      delete el.dataset.visible
      root.classList.remove('cursor-active')
    }
    const move = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return hide()
      if (!visible) gsap.set(el, { x: e.clientX, y: e.clientY })
      show()
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor], a, button')
      setState(t ? t.dataset.cursor || 'link' : 'default')
    }
    // Scrolling and pinned sections fire leave/out events while the pointer is
    // still inside the window, so only hide when it has genuinely left.
    const out = (e) => {
      if (e.relatedTarget) return
      const { clientX: x, clientY: y } = e
      if (x <= 0 || y <= 0 || x >= window.innerWidth - 1 || y >= window.innerHeight - 1) hide()
    }
    // data-* attributes, not classes: React owns className and rewrites it on every state change
    const down = () => (el.dataset.down = '')
    const up = () => delete el.dataset.down

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerout', out, { passive: true })
    window.addEventListener('blur', hide)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      root.classList.remove('has-cursor', 'cursor-active')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      window.removeEventListener('blur', hide)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={ref} className={`cursor cursor--${state}`} aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-label">{LABELS[state] || ''}</span>
    </div>
  )
}
