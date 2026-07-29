import { useEffect, useState } from 'react'
import { Monogram } from './Logo.jsx'

const LINKS = [
  { href: '#signatures', label: 'Spécialités' },
  { href: '#menu', label: 'La carte' },
  { href: '#ambiance', label: 'Ambiance' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <a className="nav__brand" href="#accueil" onClick={() => setOpen(false)}>
        <Monogram size={36} />
        <span className="wordmark">MORNACO</span>
      </a>
      <nav className="nav__links" aria-label="Navigation principale">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
      <button
        className="nav__burger"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
