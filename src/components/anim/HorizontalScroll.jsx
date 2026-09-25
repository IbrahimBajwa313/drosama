import { useRef } from 'react'
import { gsap, useGSAP, MEDIA, EASE } from '../../lib/motion'

/**
 * Pins its section and translates the track horizontally as the user
 * scrolls vertically (desktop). On touch / small screens and with
 * reduced motion, the track becomes a native swipe carousel via CSS.
 *
 * `onUpdate(progress)` fires on every scroll frame while pinned.
 */
export default function HorizontalScroll({ className = '', trackClassName = '', children, onUpdate, label, before, after, ...rest }) {
  const ref = useRef(null)
  const cb = useRef(onUpdate)
  cb.current = onUpdate

  useGSAP(
    () => {
      const section = ref.current
      const track = section.querySelector('.hs-track')
      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: EASE.scrub,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: () => cb.current?.(),
            onRefresh: () => cb.current?.(),
          },
        })
        // scrub smoothing continues after scroll stops; keep derived effects in sync
        const tick = () => tween.scrollTrigger.isActive && cb.current?.()
        gsap.ticker.add(tick)
        return () => gsap.ticker.remove(tick)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className={`hs ${className}`} {...rest}>
      {before}
      <div className={`hs-track ${trackClassName}`} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      {after}
    </section>
  )
}
