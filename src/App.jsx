import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Signatures from './components/Signatures.jsx'
import MenuSection from './components/MenuSection.jsx'
import Ambiance from './components/Ambiance.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import AdminPage from './components/Admin/AdminPage.jsx'
import { useReveal } from './hooks/useReveal.js'

export default function App() {
  useReveal()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#admin' || window.location.pathname === '/admin')
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  if (isAdmin) {
    return (
      <AdminPage
        onBackToSite={() => {
          window.location.hash = ''
          setIsAdmin(false)
        }}
      />
    )
  }

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Signatures />
        <MenuSection />
        <Ambiance />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
