import { useRef } from 'react'
import { hero } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import Img from '../components/Img'
import RevealText from '../components/anim/RevealText'
import MagneticButton from '../components/anim/MagneticButton'

export default function Hero() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const mm = gsap.matchMedia()

      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, ({ conditions }) => {
        const { desktop } = conditions

        // ── Entrance ──────────────────────────────────────────
        const intro = gsap.timeline({ defaults: { ease: EASE.out } })
        intro
          .fromTo(q('.hero-bg img'), { scale: 1.3, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 2.6 }, 0)
          .fromTo(
            q('.hero-portrait'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' },
            0.15,
          )
          .fromTo(q('.hero-portrait img'), { scale: 1.35 }, { scale: 1.05, duration: 2.6 }, 0.15)
          .from(q('.hero-title .rt-inner'), { yPercent: 115, duration: 1.6, stagger: 0.12 }, 0.55)
          .from(q('.hero-eyebrow, .hero-body, .hero-ctas > *'), { y: 24, opacity: 0, duration: 1.4, stagger: 0.08 }, 0.95)
          .from(q('.hero-scroll > span'), { opacity: 0, duration: 1.2 }, 1.3)

        // ── Scroll: layers separate, then the next section slides over ──
        const tl = gsap.timeline({
          defaults: { ease: EASE.scrub },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: desktop ? 1 : true,
            pin: desktop,
            pinSpacing: false,
          },
        })
        tl.to(q('.hero-bg'), { yPercent: desktop ? -12 : 18, scale: 1.08 }, 0)
          .to(q('.hero-portrait'), { yPercent: desktop ? -22 : 10 }, 0)
          .to(q('.hero-portrait-inner'), { scale: 1.22 }, 0)
          .to(q('.hero-title'), { yPercent: desktop ? 38 : -10, xPercent: desktop ? -4 : 0 }, 0)
          .to(q('.hero-fade'), { opacity: 0, y: -40, duration: 0.45 }, 0)
          .to(q('.hero-ctas'), { opacity: 0, y: -24, duration: 0.55 }, 0.05)
          .to(q('.hero-scroll'), { opacity: 0, duration: 0.25 }, 0)
          .to(q('.hero-veil'), { opacity: 0.85 }, 0)
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="top" className="hero" data-nav="dark" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <Img image={hero.background} eager sizes="100vw" />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="hero-fade">
            <p className="hero-eyebrow eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              {hero.eyebrow}
            </p>
          </div>
          <RevealText as="h1" id="hero-title" lines={hero.headline} mode="manual" className="hero-title display" />
          <div className="hero-fade">
            <p className="hero-body">{hero.body}</p>
          </div>
          <div className="hero-ctas">
            <MagneticButton
              href={hero.primaryCta.href}
              cursor="book"
              variant="light"
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.primaryCta.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </MagneticButton>
          </div>
        </div>

        <figure className="hero-portrait" data-cursor="image">
          <div className="hero-portrait-inner">
            <Img image={hero.portrait} eager sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </figure>
      </div>

      <a href="#introduction" className="hero-scroll" aria-label="Scroll to explore">
        <span className="hero-scroll-line" aria-hidden="true" />
        <span aria-hidden="true">Scroll to explore</span>
      </a>

      <div className="hero-veil" aria-hidden="true" />
    </section>
  )
}
