import { useRef } from 'react'
import { finalCta, contact, freeCare } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import RevealText from '../components/anim/RevealText'
import MagneticButton from '../components/anim/MagneticButton'

export default function FinalCTA() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 60%', once: true } })
        tl.from(q('.cta-title .rt-inner'), { yPercent: 115, duration: 1.6, stagger: 0.14, ease: EASE.out })
          .from(q('.cta-body, .cta-free, .cta-actions > *, .cta-details > *'), { y: 26, opacity: 0, duration: 1.3, stagger: 0.08, ease: EASE.out }, 0.5)
          .from(q('.cta-rule'), { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, 0.3)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="contact" className="cta" data-nav="dark" aria-labelledby="cta-title">
      <div className="cta-inner container">
        <p className="eyebrow eyebrow--light">
          <span className="eyebrow-index">11</span>
          <span>Consultation</span>
        </p>
        <RevealText as="h2" id="cta-title" lines={finalCta.lines} mode="manual" className="cta-title display" />
        <span className="cta-rule" aria-hidden="true" />
        <div className="cta-row">
          <p className="cta-body">{finalCta.body}</p>
          <div className="cta-actions">
            <MagneticButton
              href={contact.bookingHref}
              cursor="book"
              variant="light"
              className="mbtn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {finalCta.primary}
              <span className="sr-only"> (opens in a new tab)</span>
            </MagneticButton>
            <MagneticButton href={finalCta.secondaryHref} cursor="view" variant="ghost-light">
              {finalCta.secondary}
            </MagneticButton>
          </div>
        </div>
        <p className="cta-free">
          <span className="eyebrow-dot" aria-hidden="true" />
          <span>
            <strong>Free consultation.</strong> {freeCare.long}
          </span>
        </p>
        <dl className="cta-details">
          <div>
            <dt>Telephone</dt>
            <dd>
              {contact.phoneHref ? (
                <a href={contact.phoneHref} className="ulink">
                  {contact.phoneDisplay}
                </a>
              ) : (
                contact.phoneDisplay
              )}
            </dd>
          </div>
          {contact.email ? (
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="ulink">
                  {contact.email}
                </a>
              </dd>
            </div>
          ) : (
            <div>
              <dt>Languages</dt>
              <dd>{contact.languages}</dd>
            </div>
          )}
          <div>
            <dt>Practice</dt>
            <dd>{contact.addressLines.join(', ')}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
