import { Icon } from './Icons.jsx'

// Cartes info (conservées telles quelles) : adresse + horaires.
const INFO_CARDS = [
  {
    icon: 'pin',
    title: 'Adresse',
    body: (
      <>
        <p>Route de Chala, Centre Feryel<br />Mornag, Ben Arous, Tunisie</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Mornaco+Coffee+Lounge+Mornag+Ben+Arous"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir sur Google Maps →
        </a>
      </>
    ),
  },
  {
    icon: 'clock',
    title: 'Horaires',
    body: <p>Tous les jours<br />7h00 – 23h00</p>,
  },
]

// Contacts rapides — rendus en boutons ronds.
const SOCIALS = [
  {
    icon: 'phone',
    label: 'Téléphone',
    value: '+216 93 209 930',
    href: 'tel:+21693209930',
  },
  {
    icon: 'instagram',
    label: 'Instagram',
    value: '@mornaco.coffee.lounge',
    href: 'https://www.instagram.com/mornaco.coffee.lounge/',
    external: true,
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    value: 'Mornaco Coffee Lounge',
    href: 'https://www.facebook.com/Mornaco.coffee.lounge',
    external: true,
  },
  {
    icon: 'mail',
    label: 'E-mail',
    value: 'mornacocafelounge@gmail.com',
    href: 'mailto:mornacocafelounge@gmail.com',
  },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-head section-head--light reveal">
        <span className="bubble-label">Venez nous voir</span>
        <h2>Où nous trouver</h2>
      </div>

      <div className="contact__cards">
        {INFO_CARDS.map((c, i) => (
          <div className="contact-card reveal" style={{ transitionDelay: `${i * 70}ms` }} key={c.title}>
            <div className="contact-card__icon">
              <Icon name={c.icon} size={26} />
            </div>
            <h3>{c.title}</h3>
            {c.body}
          </div>
        ))}
      </div>

      <div className="contact__socials reveal">
        {SOCIALS.map((s) => (
          <a
            className="social-round"
            key={s.label}
            href={s.href}
            aria-label={`${s.label} — ${s.value}`}
            {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="social-round__circle">
              <Icon name={s.icon} size={26} />
            </span>
            <span className="social-round__label">{s.label}</span>
            <span className="social-round__value">{s.value}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
