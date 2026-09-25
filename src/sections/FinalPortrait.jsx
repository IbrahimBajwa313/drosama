import { useRef } from 'react'
import { doctor } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import Img from '../components/Img'

export default function FinalPortrait() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const mm = gsap.matchMedia()
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, ({ conditions }) => {
        const st = { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true }
        gsap.fromTo(q('.fp-media'), { scale: 1.35 }, { scale: 1.1, ease: EASE.scrub, scrollTrigger: st })
        gsap.fromTo(
          q('.fp-portrait'),
          { clipPath: 'inset(18% 14% 18% 14%)', yPercent: conditions.desktop ? 14 : 6 },
          { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, ease: EASE.scrub, scrollTrigger: st },
        )
        gsap.fromTo(q('.fp-portrait img'), { scale: 1.3 }, { scale: 1, ease: EASE.scrub, scrollTrigger: st })
        gsap.from(q('.fp-name .rt-inner'), {
          yPercent: 115,
          duration: 1.6,
          ease: EASE.out,
          scrollTrigger: { trigger: ref.current, start: 'top 35%', once: true },
        })
        gsap.from(q('.fp-meta > *'), {
          opacity: 0,
          y: 16,
          duration: 1.2,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: ref.current, start: 'top 30%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="fp" data-nav="dark" aria-label={`${doctor.name}, ${doctor.specialty}`}>
      <div className="fp-frame" aria-hidden="true">
        <div className="fp-media">
          <Img image={{ ...doctor.portrait, alt: '' }} sizes="50vw" />
        </div>
        <div className="fp-shade" />
      </div>

      <figure className="fp-portrait" data-cursor="image">
        <Img image={doctor.portrait} sizes="(min-width: 1024px) 30vw, 70vw" />
      </figure>

      <div className="fp-copy container">
        <p className="fp-name display">
          <span className="rt-line">
            <span className="rt-inner">{doctor.name}</span>
          </span>
        </p>
        <div className="fp-meta">
          <span>{doctor.specialty}</span>
          <span>{doctor.signatureLine}</span>
        </div>
      </div>
    </section>
  )
}
