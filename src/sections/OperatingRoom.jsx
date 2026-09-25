import { useRef } from 'react'
import { operatingRoom } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import Img from '../components/Img'
import RevealText from '../components/anim/RevealText'

export default function OperatingRoom() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE.scrub },
          scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=160%', pin: true, scrub: 1 },
        })
        // camera pulls back while drifting sideways
        tl.fromTo(q('.or-media'), { scale: 1.45, xPercent: -3 }, { scale: 1.02, xPercent: 3, duration: 3 }, 0)
          .fromTo(q('.or-light--a'), { xPercent: -30, yPercent: -10 }, { xPercent: 40, yPercent: 20, duration: 3 }, 0)
          .fromTo(q('.or-light--b'), { xPercent: 30, yPercent: 30 }, { xPercent: -30, yPercent: -20, duration: 3 }, 0)
          .fromTo(q('.or-light--c'), { xPercent: 0, opacity: 0.2 }, { xPercent: -60, opacity: 0.7, duration: 3 }, 0)
          .from(q('.or-title .rt-inner'), { yPercent: 115, duration: 0.6, stagger: 0.6 }, 0.3)
          .from(q('.or-meta > *'), { opacity: 0, duration: 0.5, stagger: 0.2 }, 1.8)
          .to(q('.or-fade'), { opacity: 0.85, duration: 0.6 }, 2.4)
      })

      mm.add(MEDIA.mobile, () => {
        gsap.fromTo(
          q('.or-media'),
          { scale: 1.25 },
          { scale: 1, ease: EASE.scrub, scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.from(q('.or-title .rt-inner'), {
          yPercent: 115,
          duration: 1.4,
          stagger: 0.14,
          ease: EASE.out,
          scrollTrigger: { trigger: ref.current, start: 'top 55%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="or" data-nav="dark" aria-labelledby="or-title">
      <div className="or-frame">
        <div className="or-media">
          <Img image={operatingRoom.image} sizes="100vw" />
        </div>
        <span className="or-light or-light--a" aria-hidden="true" />
        <span className="or-light or-light--b" aria-hidden="true" />
        <span className="or-light or-light--c" aria-hidden="true" />
        <div className="or-shade" aria-hidden="true" />
        <div className="or-fade" aria-hidden="true" />
      </div>

      <div className="or-copy container">
        <p className="eyebrow eyebrow--light">
          <span className="eyebrow-index">07</span>
          <span>{operatingRoom.eyebrow}</span>
        </p>
        <RevealText as="h2" id="or-title" lines={operatingRoom.lines} mode="manual" className="or-title display" />
        <div className="or-meta" aria-hidden="true">
          {operatingRoom.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
