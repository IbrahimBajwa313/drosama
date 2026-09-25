import { useRef } from 'react'
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from '../../lib/motion'

export function Arrow({ className = '' }) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/**
 * Button/link that leans gently toward the pointer. Renders <a> when
 * `href` is set, otherwise <button>. `cursor` sets the custom-cursor label.
 */
export default function MagneticButton({
  href,
  children,
  variant = 'solid',
  cursor = 'view',
  strength = 0.3,
  arrow = true,
  className = '',
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!isFinePointer() || prefersReducedMotion()) return
      const el = ref.current
      const label = el.querySelector('.mbtn-label')
      const opts = { duration: 0.8, ease: 'power3.out' }
      const xTo = gsap.quickTo(el, 'x', opts)
      const yTo = gsap.quickTo(el, 'y', opts)
      const lxTo = gsap.quickTo(label, 'x', opts)
      const lyTo = gsap.quickTo(label, 'y', opts)

      const move = (e) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        xTo(dx * strength)
        yTo(dy * strength)
        lxTo(dx * strength * 0.3)
        lyTo(dy * strength * 0.3)
      }
      const leave = () => [xTo, yTo, lxTo, lyTo].forEach((fn) => fn(0))

      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    },
    { scope: ref },
  )

  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      ref={ref}
      href={href}
      type={href ? undefined : 'button'}
      className={`mbtn mbtn--${variant} ${className}`}
      data-cursor={cursor}
      {...rest}
    >
      <span className="mbtn-label">
        <span className="mbtn-text">{children}</span>
        {arrow && (
          <span className="mbtn-arrow" aria-hidden="true">
            <Arrow />
            <Arrow />
          </span>
        )}
      </span>
    </Tag>
  )
}
