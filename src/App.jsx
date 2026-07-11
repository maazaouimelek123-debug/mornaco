import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Signatures from './components/Signatures.jsx'
import MenuSection from './components/MenuSection.jsx'
import Ambiance from './components/Ambiance.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { useReveal } from './hooks/useReveal.js'

export default function App() {
  useReveal()
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
