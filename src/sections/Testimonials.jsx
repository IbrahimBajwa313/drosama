import { useRef } from 'react'
import { testimonials } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'

const pad = (n) => String(n).padStart(2, '0')

export default function Testimonials() {
  const ref = useRef(null)
  const n = testimonials.items.length

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const quotes = q('.tm-item')
      const segs = q('.tm-seg-fill')
      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        gsap.set(quotes.slice(1), { autoAlpha: 0 })
        gsap.set(segs, { scaleX: 0 })
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: { trigger: ref.current, start: 'top top', end: `+=${n * 80}%`, pin: true, scrub: 1 },
        })
        tl.to(segs[0], { scaleX: 1, duration: 1, ease: 'none' })
        for (let i = 1; i < n; i++) {
          const prev = quotes[i - 1]
          const next = quotes[i]
          tl.to(prev.querySelector('blockquote'), { yPercent: -18, opacity: 0, duration: 0.6 })
            .to(prev.querySelector('figcaption'), { opacity: 0, duration: 0.4 }, '<')
            .set(prev, { autoAlpha: 0 })
            .set(next, { autoAlpha: 1 })
            .from(next.querySelector('blockquote'), { yPercent: 18, opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8 })
            .from(next.querySelector('figcaption'), { opacity: 0, y: 12, duration: 0.5 }, '-=0.3')
            .to(q('.tm-roll'), { yPercent: -(100 / n) * i, duration: 0.6 }, '<')
            .to(segs[i], { scaleX: 1, duration: 1, ease: 'none' })
        }
      })

      mm.add(MEDIA.mobile, () => {
        quotes.forEach((item) =>
          gsap.from(item, {
            y: 40,
            opacity: 0,
            duration: 1.4,
            ease: EASE.out,
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
          }),
        )
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="reviews" className="tm" data-nav="light" aria-labelledby="tm-title">
      <div className="tm-inner container">
        <div className="tm-head">
          <p className="eyebrow" id="tm-title">
            <span className="eyebrow-index">09</span>
            <span>{testimonials.eyebrow}</span>
          </p>
          <p className="tm-rating">
            <span className="tm-stars" aria-hidden="true">★★★★★</span>
            <span>
              <strong>{testimonials.rating}</strong> · {testimonials.count} patient reviews
            </span>
          </p>
          <div className="tm-counter" aria-hidden="true">
            <span className="tm-window">
              <span className="tm-roll">
                {testimonials.items.map((_, i) => (
                  <span key={i}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
            <span>/ {pad(n)}</span>
          </div>
        </div>

        <div className="tm-stack">
          {testimonials.items.map((t, i) => (
            <figure className={`tm-item ${t.quote.length > 170 ? 'tm-item--long' : ''}`} key={i}>
              <span className="tm-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                <p lang={t.translation ? 'ur-Latn' : undefined}>{t.quote}</p>
                {t.translation && (
                  <p className="tm-translation">
                    <span className="sr-only">Translation: </span>“{t.translation}”
                  </p>
                )}
              </blockquote>
              <figcaption>
                <span className="tm-author">— {t.author}</span>
                <span className="tm-context">{t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="tm-foot">
          <div className="tm-segs" aria-hidden="true">
            {testimonials.items.map((_, i) => (
              <span className="tm-seg" key={i}>
                <span className="tm-seg-fill" />
              </span>
            ))}
          </div>
          <p className="tm-disclaimer">{testimonials.disclaimer}</p>
        </div>
      </div>
    </section>
  )
}
