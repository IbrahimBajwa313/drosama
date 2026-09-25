import { useRef } from 'react'
import { zindagiCare } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import SectionHeading from '../components/anim/SectionHeading'
import ImageReveal from '../components/anim/ImageReveal'
import MagneticButton from '../components/anim/MagneticButton'

const pad = (n) => String(n).padStart(2, '0')

// Each image layer travels at its own speed (px across the section's passage).
const LAYERS = [
  { speed: -60, from: 'right', sizes: '(min-width: 1024px) 38vw, 90vw' },
  { speed: -220, from: 'bottom', sizes: '(min-width: 1024px) 24vw, 60vw' },
  { speed: 120, from: 'left', sizes: '(min-width: 1024px) 20vw, 50vw' },
  { speed: -140, from: 'top', sizes: '(min-width: 1024px) 26vw, 60vw' },
]

export default function ZindagiCare() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const mm = gsap.matchMedia()

      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, ({ conditions }) => {
        const k = conditions.desktop ? 1 : 0.3
        // dark stage opens up out of the light section above
        gsap.fromTo(
          q('.tech-stage'),
          { clipPath: conditions.desktop ? 'inset(0% 7% 0% 7%)' : 'inset(0% 3% 0% 3%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: EASE.scrub,
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top top', scrub: true },
          },
        )
        q('.tech-layer').forEach((layer, i) => {
          gsap.fromTo(
            layer,
            { y: -LAYERS[i].speed * k },
            {
              y: LAYERS[i].speed * k,
              ease: EASE.scrub,
              scrollTrigger: { trigger: q('.tech-grid')[0], start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
        gsap.from(q('.tech-body > *'), {
          y: 30,
          opacity: 0,
          duration: 1.4,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: q('.tech-body')[0], start: 'top 85%', once: true },
        })
        q('.zc-service').forEach((el, i) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
          tl.from(el.querySelector('.zc-rule'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut', delay: (i % 3) * 0.1 }).from(
            el.querySelectorAll('.zc-num, .zc-name, .zc-text'),
            { y: 20, opacity: 0, duration: 1.1, stagger: 0.07, ease: EASE.out },
            0.4,
          )
        })
        gsap.from(q('.zc-vision .rt-inner'), {
          yPercent: 115,
          duration: 1.5,
          ease: EASE.out,
          scrollTrigger: { trigger: q('.zc-vision')[0], start: 'top 80%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="zindagicare" className="tech zc" data-nav="dark" aria-labelledby="zc-title">
      <div className="tech-stage">
        <div className="tech-grid container">
          <div className="tech-copy">
            <SectionHeading index="06" eyebrow={zindagiCare.eyebrow} title={zindagiCare.title} id="zc-title" className="sh--light" />
            <div className="tech-body">
              <p className="zc-role">
                <span className="eyebrow-dot" aria-hidden="true" />
                {zindagiCare.role}
              </p>
              <p className="zc-lead">{zindagiCare.lead}</p>
              <p>{zindagiCare.body}</p>
              <p className="zc-partner">{zindagiCare.partner}</p>
              <div>
                <MagneticButton
                  href={zindagiCare.cta.href}
                  variant="light"
                  cursor="view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {zindagiCare.cta.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </MagneticButton>
              </div>
            </div>
          </div>

          {zindagiCare.images.map((im, i) => (
            <figure key={im.src} className={`tech-layer tech-layer--${i + 1}`}>
              <ImageReveal
                image={im}
                from={LAYERS[i].from}
                sizes={LAYERS[i].sizes}
                className={im.poster ? 'tech-img tech-img--poster' : 'tech-img'}
                parallax={im.poster ? 0 : 5}
              />
              <figcaption className="tech-cap">{im.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="container">
          <h3 className="zc-services-title eyebrow eyebrow--light">What ZindagiCare offers</h3>
          <ul className="zc-services">
            {zindagiCare.services.map((s, i) => (
              <li className="zc-service" key={s.name}>
                <span className="zc-rule" aria-hidden="true" />
                <span className="zc-num" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span className="zc-name">{s.name}</span>
                <span className="zc-text">{s.text}</span>
              </li>
            ))}
          </ul>

          <blockquote className="zc-vision">
            <p className="eyebrow eyebrow--light">Vision</p>
            <p className="display">
              <span className="rt-line">
                <span className="rt-inner">{zindagiCare.vision}</span>
              </span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
