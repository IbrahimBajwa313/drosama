import { useRef } from 'react'
import { resources } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import SectionHeading from '../components/anim/SectionHeading'
import Img from '../components/Img'
import { Arrow } from '../components/anim/MagneticButton'

const pad = (n) => String(n).padStart(2, '0')

export default function Resources() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        q('.res-card').forEach((card, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
          tl.from(card.querySelector('.res-rule'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut', delay: (i % 2) * 0.12 })
            .fromTo(
              card.querySelector('.res-media'),
              { clipPath: i % 2 ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
              0.2,
            )
            .from(card.querySelectorAll('.res-num, .res-topic, .res-text, .res-go'), { y: 24, opacity: 0, duration: 1.1, stagger: 0.07, ease: EASE.out }, 0.5)
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="resources" className="res" data-nav="light" aria-labelledby="res-title">
      <div className="container">
        <div className="res-head">
          <SectionHeading index="10" eyebrow={resources.eyebrow} title={resources.title} id="res-title" />
          <p className="res-intro">{resources.intro}</p>
        </div>

        <ul className="res-grid">
          {resources.items.map((r, i) => (
            <li key={r.topic}>
              <a href={r.href} className="res-card" data-cursor="view">
                <span className="res-rule" aria-hidden="true" />
                <span className="res-num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span className="res-media" aria-hidden="true">
                  <Img image={r.image} sizes="(min-width: 1024px) 16vw, 40vw" />
                </span>
                <span className="res-body">
                  <span className="res-topic">{r.topic}</span>
                  <span className="res-text">{r.text}</span>
                </span>
                <span className="res-go" aria-hidden="true">
                  <Arrow />
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
