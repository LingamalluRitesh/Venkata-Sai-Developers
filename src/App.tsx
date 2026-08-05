import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PropertiesGrid from './components/PropertiesGrid'
import PropertyModal from './components/PropertyModal'
import ScheduleTourModal from './components/ScheduleTourModal'
import MortgageCalculator from './components/MortgageCalculator'
import Neighborhoods from './components/Neighborhoods'
import WhyChooseUs from './components/WhyChooseUs'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import AdminPortal from './components/AdminPortal'
import { RealEstateProvider } from './context/RealEstateContext'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <RealEstateProvider>
      <div className="min-h-screen bg-slate-950 text-white font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
        
        <Navbar scrolled={scrolled} />
        
        <main>
          <Hero />
          <PropertiesGrid />
          <Neighborhoods />
          <MortgageCalculator />
          <WhyChooseUs />
          <ContactSection />
        </main>

        <Footer />

        {/* Interactive Modals */}
        <PropertyModal />
        <ScheduleTourModal />
        <AdminPortal />

      </div>
    </RealEstateProvider>
  )
}
