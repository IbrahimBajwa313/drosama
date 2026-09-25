import { useRef } from 'react'
import { introduction } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import RevealText from '../components/anim/RevealText'

export default function Introduction() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const lines = q('.intro-title .rt-inner')
      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE.scrub },
          scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=160%', pin: true, scrub: 1 },
        })
        tl.from(q('.intro-rule'), { scaleX: 0, duration: 1 }, 0)
        lines.forEach((line, i) => {
          const at = 0.2 + i * 1
          tl.fromTo(
            line.parentElement,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% -20% 0%)', duration: 0.9, ease: 'power2.out' },
            at,
          ).from(line, { yPercent: 70, duration: 0.9, ease: 'power2.out' }, at)
          // earlier lines recede so the newest statement leads
          if (i > 0) tl.to(lines.slice(0, i), { color: '#b3ada2', duration: 0.6 }, at)
        })
        tl.to(lines, { color: '#141515', duration: 0.6 }, '+=0.2')
          .from(q('.intro-body, .intro-meta'), { y: 40, opacity: 0, duration: 0.8, stagger: 0.15 }, '<')
          .to({}, { duration: 0.6 })
      })

      mm.add(MEDIA.mobile, () => {
        gsap.from(lines, {
          yPercent: 115,
          duration: 1.4,
          stagger: 0.14,
          ease: EASE.out,
          scrollTrigger: { trigger: q('.intro-title')[0], start: 'top 80%', once: true },
        })
        gsap.from(q('.intro-body, .intro-meta'), {
          y: 30,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: q('.intro-body')[0], start: 'top 90%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="introduction" className="intro" data-nav="light" aria-labelledby="intro-title">
      <div className="intro-inner container">
        <p className="eyebrow intro-eyebrow">
          <span className="eyebrow-index">01</span>
          <span>Philosophy</span>
        </p>
        <span className="intro-rule" aria-hidden="true" />
        <RevealText as="h2" id="intro-title" lines={introduction.lines} mode="manual" className="intro-title display" />
        <div className="intro-foot">
          <p className="intro-meta eyebrow">A personal note</p>
          <p className="intro-body">{introduction.body}</p>
        </div>
      </div>
    </section>
  )
}
