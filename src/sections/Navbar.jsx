import { useEffect, useRef, useState } from 'react'
import { doctor, nav, contact } from '../data/content'
import { gsap, useGSAP, lockScroll, MEDIA } from '../lib/motion'
import MagneticButton from '../components/anim/MagneticButton'

const PROBE_Y = 36 // vertical centre of the nav bar

export default function Navbar() {
  const ref = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const [theme, setTheme] = useState('dark')
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  // Nav colour follows whatever section currently sits beneath it.
  useEffect(() => {
    let raf = 0
    const sections = () => document.querySelectorAll('[data-nav]')
    const linkIds = nav.links.map((l) => l.href.slice(1))

    const update = () => {
      raf = 0
      let nextTheme = 'dark'
      let nextActive = ''
      const mid = window.innerHeight * 0.45
      for (const s of sections()) {
        const r = s.getBoundingClientRect()
        if (r.top <= PROBE_Y && r.bottom > PROBE_Y) nextTheme = s.dataset.nav
        if (linkIds.includes(s.id) && r.top <= mid && r.bottom > mid) nextActive = s.id
      }
      setTheme(nextTheme)
      setActive(nextActive)
    }
    const onScroll = () => (raf ||= requestAnimationFrame(update))
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Entrance
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.nav-inner > *', { yPercent: -120, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.08, delay: 1.1 })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  // Mobile menu: lock scroll, animate, trap Escape, restore focus
  useEffect(() => {
    lockScroll(open)
    const menu = menuRef.current
    if (!open) return
    const items = menu.querySelectorAll('.menu-item')
    gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
    gsap.fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay: 0.35 })
    menu.querySelector('a')?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = [toggleRef.current, ...menu.querySelectorAll('a')]
        const i = f.indexOf(document.activeElement)
        if (e.shiftKey && i <= 0) (e.preventDefault(), f[f.length - 1].focus())
        else if (!e.shiftKey && i === f.length - 1) (e.preventDefault(), f[0].focus())
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Close the menu when the viewport grows past the mobile layout
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header ref={ref} className={`nav nav--${open ? 'menu' : theme}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label={`${doctor.name} — home`}>
          <span className="nav-logo-name">{doctor.name}</span>
          <span className="nav-logo-spec">{doctor.specialty}</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <ul>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="ulink" aria-current={active === l.href.slice(1) ? 'true' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MagneticButton
          href={nav.cta.href}
          variant="nav"
          cursor="book"
          className="nav-cta"
          arrow={false}
          target="_blank"
          rel="noopener noreferrer"
        >
          {nav.cta.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </MagneticButton>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle-text">{open ? 'Close' : 'Menu'}</span>
          <span className="nav-toggle-lines" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="menu"
        hidden={!open}
        onClick={(e) => e.target.closest('a') && setOpen(false)}
      >
        <nav aria-label="Mobile">
          <ul className="menu-list">
            {[...nav.links, nav.cta].map((l, i) => (
              <li key={l.label} className="menu-mask">
                <a
                  href={l.href}
                  className="menu-item"
                  {...(l.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="menu-index">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-foot">
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          <span>{contact.addressLines.join(', ')}</span>
          {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
        </div>
      </div>
    </header>
  )
}
