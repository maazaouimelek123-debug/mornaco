import { Monogram } from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <Monogram size={44} />
      <span className="wordmark footer__name">MORNACO</span>
      <p>Coffee Lounge · Restaurant — Mornag, Ben Arous, Tunisie</p>
      <p className="footer__copy">
        © 2026 MORNACO. Tous droits réservés. · Réalisé par{' '}
        <a
          href="https://maazaoui-it-services.vercel.app/#top"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--teal)', fontWeight: 700, textDecoration: 'none' }}
        >
          MITS
        </a>
      </p>
    </footer>
  )
}
