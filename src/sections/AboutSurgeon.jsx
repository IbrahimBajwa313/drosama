import { useRef } from 'react'
import { about, doctor } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import ImageReveal from '../components/anim/ImageReveal'
import SectionHeading from '../components/anim/SectionHeading'
import AnimatedCounter from '../components/anim/AnimatedCounter'

export default function AboutSurgeon() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const mm = gsap.matchMedia()

      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, () => {
        gsap.from(q('.about-bio p'), {
          y: 36,
          opacity: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: EASE.out,
          scrollTrigger: { trigger: q('.about-bio')[0], start: 'top 85%', once: true },
        })
        q('.cred').forEach((item) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 90%', once: true } })
          tl.from(item.querySelector('.cred-rule'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }).from(
            item.querySelectorAll('.cred-label-text, .cred-note'),
            { opacity: 0, y: 12, duration: 1, stagger: 0.1, ease: EASE.out },
            0.4,
          )
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="about" className="about" data-nav="light" aria-labelledby="about-title">
      <div className="about-grid container">
        <div className="about-media">
          <div className="about-sticky">
            <ImageReveal image={about.portrait} from="bottom" className="about-portrait" sizes="(min-width: 1024px) 40vw, 90vw" />
            <p className="about-caption">
              <span>{doctor.name}</span>
              <span>{doctor.specialty}</span>
            </p>
          </div>
        </div>

        <div className="about-body">
          <SectionHeading index="04" eyebrow={about.eyebrow} title={about.title} id="about-title" />
          <div className="about-bio">
            {about.bio.map((p, i) => (
              <p key={i} className={i === 0 ? 'lead' : ''}>
                {p}
              </p>
            ))}
          </div>

          <dl className="creds">
            {about.credentials.map((c) => (
              <div className="cred" key={c.label}>
                <dt className="cred-label">
                  <span className="cred-rule" aria-hidden="true" />
                  <span className="cred-label-text">{c.label}</span>
                </dt>
                <dd className="cred-value">
                  <AnimatedCounter value={c.value} suffix={c.suffix} placeholder={c.placeholder} />
                </dd>
                <dd className="cred-note">{c.note}</dd>
              </div>
            ))}
          </dl>

          <dl className="about-details">
            {about.details.map((d) => (
              <div className="about-detail-row" key={d.label}>
                <dt>{d.label}</dt>
                {d.items.map((item) => (
                  <dd key={item}>{item}</dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
