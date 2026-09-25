import { useRef } from 'react'
import { gsap, useGSAP, MEDIA, EASE } from '../../lib/motion'
import Img from '../Img'

const FROM = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  center: 'inset(28% 28% 28% 28%)',
}

/**
 * Image hidden behind a rectangular mask. As it enters, the mask expands
 * from `from` while the image settles from a slight zoom; afterwards the
 * image keeps drifting with scroll (parallax).
 */
export default function ImageReveal({ image, from = 'bottom', sizes, className = '', parallax = 7, eager }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      const move = el.querySelector('.ir-move')
      const pic = el.querySelector('img')
      const mm = gsap.matchMedia()

      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, ({ conditions }) => {
        const { desktop } = conditions
        const reveal = gsap.timeline({
          defaults: { ease: EASE.inOut },
          scrollTrigger: desktop
            ? { trigger: el, start: 'top 92%', end: 'top 40%', scrub: 1 }
            : { trigger: el, start: 'top 85%', once: true },
        })
        reveal
          .fromTo(el, { clipPath: FROM[from] }, { clipPath: 'inset(0% 0% 0% 0%)', duration: desktop ? 1 : 1.4 }, 0)
          .fromTo(pic, { scale: 1.3 }, { scale: 1, duration: desktop ? 1 : 1.8, ease: EASE.out }, 0)

        if (parallax) {
          const p = parallax * (desktop ? 1 : 0.5)
          gsap.fromTo(
            move,
            { yPercent: -p },
            {
              yPercent: p,
              ease: EASE.scrub,
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`ir ${className}`} data-cursor="image">
      <div className="ir-move">
        <Img image={image} sizes={sizes} eager={eager} />
      </div>
    </div>
  )
}
