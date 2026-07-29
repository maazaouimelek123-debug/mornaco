import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Signatures from './components/Signatures.jsx'
import MenuSection from './components/MenuSection.jsx'
import Ambiance from './components/Ambiance.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import AdminPage from './components/Admin/AdminPage.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { useReveal } from './hooks/useReveal.js'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  useReveal(isAdmin)

  useEffect(() => {
    const checkHash = () => {
      const isAdm = window.location.hash === '#admin' || window.location.pathname === '/admin'
      setIsAdmin(isAdm)
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
          window.scrollTo({ top: 0, behavior: 'instant' })
          setIsAdmin(false)
        }}
      />
    )
  }

  return (
    <CartProvider>
      <Nav />
      <main>
        <Hero />
        <Signatures />
        <MenuSection />
        <Ambiance />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
