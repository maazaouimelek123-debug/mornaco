import { Monogram } from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <Monogram size={44} />
      <span className="wordmark footer__name">MORNACO</span>
      <p>Coffee Lounge · Restaurant — Mornag, Ben Arous, Tunisie</p>
      <p className="footer__copy">© 2026 MORNACO. Tous droits réservés.</p>
    </footer>
  )
}
