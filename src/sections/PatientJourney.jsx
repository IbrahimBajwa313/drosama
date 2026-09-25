import { useRef } from 'react'
import { journey } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import SectionHeading from '../components/anim/SectionHeading'

const pad = (n) => String(n).padStart(2, '0')

export default function PatientJourney() {
  const ref = useRef(null)
  const n = journey.steps.length

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const steps = q('.jr-step')
      const mm = gsap.matchMedia()

      const revealStep = (tl, step, at) =>
        tl
          .to(step.querySelector('.jr-dot'), { backgroundColor: '#141515', scale: 1, duration: 0.3 }, at)
          .from(step.querySelectorAll('.jr-inner'), { yPercent: 110, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, at)
          .from(step.querySelector('.jr-text'), { opacity: 0, y: 16, duration: 0.5 }, at + 0.15)

      mm.add(MEDIA.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE.scrub },
          scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=220%', pin: true, scrub: 1 },
        })
        gsap.set(q('.jr-dot'), { scale: 0.6, backgroundColor: 'rgba(20,21,21,0)' })
        gsap.set(q('.jr-line-fill'), { scaleX: 0 })
        steps.forEach((step, i) => {
          const at = i * 1
          if (i > 0) tl.to(q('.jr-line-fill'), { scaleX: i / (n - 1), duration: 0.9, ease: 'power1.inOut' }, at - 0.9)
          revealStep(tl, step, at)
        })
        tl.to({}, { duration: 0.6 })
      })

      mm.add(MEDIA.mobile, () => {
        gsap.fromTo(
          q('.jr-line-fill'),
          { scaleY: 0 },
          { scaleY: 1, ease: EASE.scrub, scrollTrigger: { trigger: q('.jr-list')[0], start: 'top 70%', end: 'bottom 60%', scrub: true } },
        )
        gsap.set(q('.jr-dot'), { scale: 0.6, backgroundColor: 'rgba(20,21,21,0)' })
        steps.forEach((step) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 70%', once: true } })
          revealStep(tl, step, 0)
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="journey" className="journey" data-nav="light" aria-labelledby="journey-title">
      <div className="journey-inner container">
        <div className="journey-head">
          <SectionHeading index="08" eyebrow={journey.eyebrow} title={journey.title} id="journey-title" />
          <p className="journey-note">From the first conversation to the last follow-up, you will know what comes next — and who to ask.</p>
        </div>

        <div className="jr">
          <span className="jr-line" aria-hidden="true">
            <span className="jr-line-fill" />
          </span>
          <ol className="jr-list">
            {journey.steps.map((s, i) => (
              <li className="jr-step" key={s.name}>
                <span className="jr-dot" aria-hidden="true" />
                <span className="jr-mask">
                  <span className="jr-inner jr-num">{pad(i + 1)}</span>
                </span>
                <h3 className="jr-name jr-mask">
                  <span className="jr-inner">{s.name}</span>
                </h3>
                <p className="jr-text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
