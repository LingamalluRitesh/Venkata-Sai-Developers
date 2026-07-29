import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Founder from './components/Founder'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Coverage from './components/Coverage'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPortal from './components/AdminPortal'
import WelcomeSplash from './components/WelcomeSplash'
import { SiteProvider } from './context/SiteContext'

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
    <SiteProvider>
      <div className="min-h-screen bg-[#f0f8ff] text-[#001e3c] font-sans antialiased selection:bg-cyan-500 selection:text-white">
        {/* Welcome Splash Screen Animation */}
        <WelcomeSplash />

        <Navbar scrolled={scrolled} />
        <main>
          <Hero />
          <Founder />
          <Services />
          <WhyUs />
          <Coverage />
          <Contact />
        </main>
        <Footer />
        <AdminPortal />
      </div>
    </SiteProvider>
  )
}
