import { useRef } from 'react'
import { approach } from '../data/content'
import { gsap, useGSAP, MEDIA, EASE } from '../lib/motion'
import SectionHeading from '../components/anim/SectionHeading'

const pad = (n) => String(n).padStart(2, '0')

export default function Approach() {
  const ref = useRef(null)
  const n = approach.principles.length

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const items = q('.pr-item')
      const list = q('.pr-list')[0]
      const mm = gsap.matchMedia()

      mm.add(MEDIA.desktop, () => {
        const setY = gsap.quickSetter(list, 'y', 'px')
        const setRoll = gsap.quickSetter(q('.pr-roll')[0], 'yPercent')
        const setBar = gsap.quickSetter(q('.pr-bar-fill')[0], 'scaleY')
        const itemSet = items.map((el) => ({
          opacity: gsap.quickSetter(el, 'opacity'),
          scale: gsap.quickSetter(el, 'scale'),
        }))
        let centres = []
        const measure = () => {
          // centre of each item relative to the list, independent of transforms
          centres = items.map((el) => el.offsetTop + el.offsetHeight / 2)
        }

        const state = { idx: 0 }
        const apply = () => {
          const { idx } = state
          const i0 = Math.min(Math.floor(idx), n - 1)
          const f = idx - i0
          const c = centres[i0] + ((centres[i0 + 1] ?? centres[i0]) - centres[i0]) * f
          setY(list.parentElement.offsetHeight / 2 - c)
          setRoll(-idx * (100 / n))
          setBar((idx + 1) / n)
          itemSet.forEach((s, i) => {
            const d = Math.min(1, Math.abs(i - idx))
            s.opacity(1 - d * 0.84)
            s.scale(1 - d * 0.06)
          })
        }

        measure()
        apply()
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (n + 0.4)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: () => (measure(), apply()),
          },
        })
        // hold on each principle, then glide to the next
        tl.to({}, { duration: 0.4 })
        for (let i = 1; i < n; i++) {
          tl.to(state, { idx: i, duration: 1, ease: 'power2.inOut', onUpdate: apply }).to({}, { duration: 0.5 })
        }
      })

      mm.add(MEDIA.mobile, () => {
        items.forEach((el) =>
          gsap.from(el.querySelectorAll('.pr-name-inner, .pr-text, .pr-num'), {
            yPercent: 60,
            opacity: 0,
            duration: 1.3,
            stagger: 0.08,
            ease: EASE.out,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }),
        )
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="approach" className="approach" data-nav="light" aria-labelledby="approach-title">
      <div className="approach-grid container">
        <div className="approach-side">
          <SectionHeading index="05" eyebrow={approach.eyebrow} title={approach.title} id="approach-title" />
          <div className="pr-meter" aria-hidden="true">
            <span className="pr-window">
              <span className="pr-roll">
                {approach.principles.map((_, i) => (
                  <span key={i}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
            <span className="pr-of">/ {pad(n)}</span>
            <span className="pr-bar">
              <span className="pr-bar-fill" />
            </span>
          </div>
        </div>

        <div className="pr-stage">
          <ol className="pr-list">
            {approach.principles.map((p, i) => (
              <li className="pr-item" key={p.name}>
                <span className="pr-num">{pad(i + 1)} —</span>
                <h3 className="pr-name">
                  <span className="pr-name-inner">{p.name}.</span>
                </h3>
                <p className="pr-text">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
