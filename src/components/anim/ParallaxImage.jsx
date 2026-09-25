import { useRef } from 'react'
import { gsap, useGSAP, MEDIA, EASE } from '../../lib/motion'
import Img from '../Img'

/**
 * Image that drifts inside its frame as the frame crosses the viewport.
 * `speed` is the travel in percent of the (oversized) image layer.
 */
export default function ParallaxImage({ image, speed = 8, sizes, className = '', eager, zoom = 0, children }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, ({ conditions }) => {
        const k = conditions.desktop ? 1 : 0.4
        gsap.fromTo(
          ref.current.querySelector('.pi-move'),
          { yPercent: -speed * k, scale: 1 + zoom },
          {
            yPercent: speed * k,
            scale: 1,
            ease: EASE.scrub,
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`pi ${className}`} data-cursor="image">
      <div className="pi-move">
        <Img image={image} sizes={sizes} eager={eager} />
      </div>
      {children}
    </div>
  )
}
