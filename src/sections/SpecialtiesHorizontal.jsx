import { useRef, useState } from 'react'
import { specialties } from '../data/content'
import { gsap } from '../lib/motion'
import HorizontalScroll from '../components/anim/HorizontalScroll'
import SectionHeading from '../components/anim/SectionHeading'
import Img from '../components/Img'
import { Arrow } from '../components/anim/MagneticButton'

const pad = (n) => String(n).padStart(2, '0')
const clamp = gsap.utils.clamp(0, 1)

export default function SpecialtiesHorizontal() {
  const setters = useRef(null)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const total = specialties.items.length

  // Build quickSetters lazily (first update) so they bind to mounted nodes.
  const getSetters = () => {
    if (setters.current) return setters.current
    const root = trackRef.current
    if (!root) return null
    setters.current = {
      root,
      bar: gsap.quickSetter(root.closest('.spec').querySelector('.spec-progress-fill'), 'scaleX'),
      cards: [...root.querySelectorAll('.spec-card')].map((card) => ({
        card,
        scale: gsap.quickSetter(card, 'scale'),
        dim: gsap.quickSetter(card.querySelector('.spec-dim'), 'opacity'),
        imgX: gsap.quickSetter(card.querySelector('.spec-img'), 'xPercent'),
        imgScale: gsap.quickSetter(card.querySelector('.spec-img'), 'scale'),
        textX: gsap.quickSetter(card.querySelector('.spec-text'), 'x', 'px'),
        numX: gsap.quickSetter(card.querySelector('.spec-num'), 'x', 'px'),
      })),
    }
    return setters.current
  }

  // Runs every frame while the section is pinned.
  const onUpdate = () => {
    const s = getSetters()
    if (!s) return
    const vw = window.innerWidth
    const centre = vw / 2
    // read everything first…
    const offsets = s.cards.map(({ card }) => {
      const r = card.getBoundingClientRect()
      return (r.left + r.width / 2 - centre) / vw
    })
    // …then write
    let nearest = 0
    offsets.forEach((d, i) => {
      const c = s.cards[i]
      const a = clamp(Math.abs(d) / 0.45)
      c.scale(1 - a * 0.2)
      c.dim(a * 0.7)
      c.imgX(d * -14)
      c.imgScale(1.18 - (1 - a) * 0.1)
      c.textX(d * 140)
      c.numX(d * 260)
      if (Math.abs(d) < Math.abs(offsets[nearest])) nearest = i
    })
    const first = offsets[0]
    const last = offsets[offsets.length - 1]
    s.bar(clamp(-first / (last - first || 1)))
    if (nearest !== activeRef.current) {
      activeRef.current = nearest
      setActive(nearest)
    }
  }

  return (
    <HorizontalScroll
      id="specialties"
      className="spec"
      data-nav="dark"
      aria-labelledby="spec-title"
      label="Areas of care"
      onUpdate={onUpdate}
      before={
        <div className="spec-intro spec-intro--compact container">
          <SectionHeading index="02" eyebrow={specialties.eyebrow} title={specialties.title} />
          <p className="spec-intro-text">{specialties.intro}</p>
        </div>
      }
      after={
        <div className="spec-progress container" aria-hidden="true">
          <span className="spec-count">
            <span className="spec-count-now">{pad(active + 1)}</span> / {pad(total)}
          </span>
          <span className="spec-progress-track">
            <span className="spec-progress-fill" />
          </span>
          <span className="spec-progress-name">{specialties.items[active].name}</span>
        </div>
      }
    >
      <div ref={trackRef} className="spec-rail">
        <div className="spec-intro spec-intro--rail">
          <SectionHeading index="02" eyebrow={specialties.eyebrow} title={specialties.title} id="spec-title" />
          <p className="spec-intro-text">{specialties.intro}</p>
          <p className="spec-hint" aria-hidden="true">
            <span className="spec-hint-line" /> Scroll
          </p>
        </div>

        {specialties.items.map((item, i) => (
          <article key={item.name} className={`spec-card ${i % 2 ? 'spec-card--alt' : ''}`} aria-labelledby={`spec-${i}`}>
            <div className="spec-media" data-cursor="image">
              <div className="spec-img">
                <Img image={item.image} sizes="(min-width: 1024px) 45vw, 85vw" />
              </div>
              <span className="spec-dim" aria-hidden="true" />
            </div>
            <span className="spec-num" aria-hidden="true">
              {pad(i + 1)}
            </span>
            <div className="spec-text">
              <p className="spec-index">
                {pad(i + 1)} / {pad(total)}
              </p>
              <h3 id={`spec-${i}`} className="spec-name">
                {item.name}
              </h3>
              <p className="spec-desc">{item.text}</p>
            </div>
          </article>
        ))}

        <div className="spec-end">
          <p className="spec-end-text">Every recommendation follows an individual evaluation.</p>
          <a href="#contact" className="spec-end-link ulink" data-cursor="book">
            Discuss your options <Arrow />
          </a>
        </div>
      </div>
    </HorizontalScroll>
  )
}
