import { useRef } from 'react'
import { story } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import Img from '../components/Img'
import RevealText from '../components/anim/RevealText'

export default function SurgeonStory() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const section = ref.current
      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        const tl = gsap.timeline({
          defaults: { ease: EASE.scrub },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=170%',
            pin: true,
            scrub: 1,
            // the frame turns light at the end, so the nav should too
            onUpdate: (self) => (section.dataset.nav = self.progress > 0.9 ? 'light' : 'dark'),
          },
        })
        tl.fromTo(q('.story-bg'), { scale: 1.25, yPercent: 4 }, { scale: 1.05, yPercent: -4, duration: 3 }, 0)
          .fromTo(q('.story-fg'), { yPercent: 45 }, { yPercent: -18, duration: 3 }, 0)
          .fromTo(q('.story-fg'), { clipPath: 'inset(18% 12% 18% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2 }, 0)
          .fromTo(q('.story-fg img'), { scale: 1.3 }, { scale: 1, duration: 3 }, 0)
          .from(q('.story-title .rt-inner'), { yPercent: 115, duration: 0.7, stagger: 0.55 }, 0.35)
          .from(q('.story-caption'), { opacity: 0, y: 30, duration: 0.6 }, 1.4)
          .to(q('.story-shade'), { opacity: 0.35, duration: 1.4 }, 1)
          .to(q('.story-light'), { opacity: 1, duration: 0.7 }, 2.3)
          .to(q('.story-copy'), { opacity: 0, y: -40, duration: 0.5 }, 2.3)
      })

      mm.add(MEDIA.mobile, () => {
        gsap.fromTo(
          q('.story-bg'),
          { yPercent: -6 },
          { yPercent: 6, ease: EASE.scrub, scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.from(q('.story-title .rt-inner'), {
          yPercent: 115,
          duration: 1.4,
          stagger: 0.14,
          ease: EASE.out,
          scrollTrigger: { trigger: section, start: 'top 60%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="story" data-nav="dark" aria-labelledby="story-title">
      <div className="story-bg" aria-hidden="true">
        <Img image={story.background} sizes="100vw" />
      </div>
      <div className="story-shade" aria-hidden="true" />

      <div className="story-grid container">
        <div className="story-copy">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow-index">03</span>
            <span>{story.eyebrow}</span>
          </p>
          <RevealText as="h2" id="story-title" lines={story.lines} mode="manual" className="story-title display" />
          <p className="story-caption">{story.caption}</p>
        </div>
        <figure className="story-fg" data-cursor="image">
          <Img image={story.foreground} sizes="(min-width: 1024px) 34vw, 80vw" />
        </figure>
      </div>

      <div className="story-light" aria-hidden="true" />
    </section>
  )
}
