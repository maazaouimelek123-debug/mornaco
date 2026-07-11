import { Icon } from './Icons.jsx'

const CARDS = [
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
  {
    icon: 'phone',
    title: 'Téléphone',
    body: <a href="tel:+21693209930">+216 93 209 930</a>,
  },
  {
    icon: 'instagram',
    title: 'Instagram',
    body: (
      <a href="https://www.instagram.com/mornaco.coffee.lounge/" target="_blank" rel="noopener noreferrer">
        @mornaco.coffee.lounge
      </a>
    ),
  },
  {
    icon: 'facebook',
    title: 'Facebook',
    body: (
      <a href="https://www.facebook.com/Mornaco.coffee.lounge" target="_blank" rel="noopener noreferrer">
        Mornaco Coffee Lounge
      </a>
    ),
  },
  {
    icon: 'mail',
    title: 'E-mail',
    body: <a href="mailto:mornacocafelounge@gmail.com">mornacocafelounge@gmail.com</a>,
  },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-head section-head--light reveal">
        <span className="bubble-label">Venez nous voir</span>
        <h2>Où nous trouver</h2>
      </div>
      <div className="contact__grid">
        {CARDS.map((c, i) => (
          <div className="contact-card reveal" style={{ transitionDelay: `${i * 70}ms` }} key={c.title}>
            <div className="contact-card__icon">
              <Icon name={c.icon} size={26} />
            </div>
            <h3>{c.title}</h3>
            {c.body}
          </div>
        ))}
      </div>
    </section>
  )
}
