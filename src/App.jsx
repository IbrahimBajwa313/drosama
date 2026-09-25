import { useEffect } from 'react'
import { ScrollTrigger, startSmoothScroll, scrollToTarget } from './lib/motion'
import CustomCursor from './components/anim/CustomCursor'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import Introduction from './sections/Introduction'
import SpecialtiesHorizontal from './sections/SpecialtiesHorizontal'
import SurgeonStory from './sections/SurgeonStory'
import AboutSurgeon from './sections/AboutSurgeon'
import Approach from './sections/Approach'
import ZindagiCare from './sections/ZindagiCare'
import OperatingRoom from './sections/OperatingRoom'
import PatientJourney from './sections/PatientJourney'
import Testimonials from './sections/Testimonials'
import Resources from './sections/Resources'
import FinalCTA from './sections/FinalCTA'
import FinalPortrait from './sections/FinalPortrait'
import Footer from './sections/Footer'

export default function App() {
  useEffect(() => {
    const stop = startSmoothScroll()

    // In-page links glide (or jump, with reduced motion) and move focus.
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const hash = a.getAttribute('href')
      const target = hash === '#top' ? document.getElementById('top') : hash.length > 1 && document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      scrollToTarget(target)
      history.replaceState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    // Recalculate pin positions once fonts and lazy images settle layout.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      stop()
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Introduction />
        <SpecialtiesHorizontal />
        <SurgeonStory />
        <AboutSurgeon />
        <Approach />
        <ZindagiCare />
        <OperatingRoom />
        <PatientJourney />
        <Testimonials />
        <Resources />
        <FinalCTA />
        <FinalPortrait />
      </main>
      <Footer />
    </>
  )
}
