import { useRef } from 'react'
import { gsap, useGSAP, MEDIA, EASE } from '../../lib/motion'

/**
 * Line-by-line masked text reveal.
 *
 * mode="enter"  – plays once when the element scrolls into view.
 * mode="manual" – renders the markup only; a parent timeline animates
 *                 `.rt-inner` (useful for pinned, scrubbed sequences).
 */
export default function RevealText({
  as: Tag = 'h2',
  lines,
  className = '',
  mode = 'enter',
  start = 'top 85%',
  delay = 0,
  stagger = 0.11,
  duration = 1.5,
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (mode !== 'enter') return
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from(ref.current.querySelectorAll('.rt-inner'), {
          yPercent: 115,
          rotate: 0.001, // forces sub-pixel rendering for smoother serif motion
          duration,
          delay,
          stagger,
          ease: EASE.out,
          scrollTrigger: { trigger: ref.current, start, once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [mode] },
  )

  return (
    <Tag ref={ref} className={`rt ${className}`} {...rest}>
      {lines.map((line, i) => (
        <span className="rt-line" key={i}>
          <span className="rt-inner">{line}</span>
          {i < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
