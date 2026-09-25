import { useRef } from 'react'
import { gsap, useGSAP, MEDIA, EASE } from '../../lib/motion'

/**
 * Counts up to `value` when scrolled into view. If `value` is not a
 * number (unverified data), the `placeholder` text is shown instead,
 * revealed with the same mask motion — nothing is fabricated.
 */
export default function AnimatedCounter({ value, suffix = '', placeholder, className = '' }) {
  const ref = useRef(null)
  const isNumber = typeof value === 'number'

  useGSAP(
    () => {
      const el = ref.current
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        tl.from(el.querySelector('.ac-inner'), { yPercent: 110, duration: 1.3, ease: EASE.out })
        if (isNumber) {
          const num = el.querySelector('.ac-num')
          const obj = { v: 0 }
          tl.to(
            obj,
            {
              v: value,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => (num.textContent = Math.round(obj.v).toLocaleString()),
            },
            0,
          )
        }
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [value] },
  )

  return (
    <span ref={ref} className={`ac ${className}`}>
      <span className="ac-inner">
        {isNumber ? (
          <>
            <span className="sr-only">{value.toLocaleString() + suffix}</span>
            <span aria-hidden="true">
              <span className="ac-num">{value.toLocaleString()}</span>
              {suffix}
            </span>
          </>
        ) : (
          placeholder
        )}
      </span>
    </span>
  )
}
