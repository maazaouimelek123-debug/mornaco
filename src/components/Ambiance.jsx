import { Icon } from './Icons.jsx'
import { galleryImages } from '../data/images.js'

const FEATURES = [
  {
    icon: 'leaf',
    title: 'Mur végétal & néon',
    text: 'Le coin photo de la maison : l’enseigne néon MORNACO sur son mur de verdure.',
  },
  {
    icon: 'marble',
    title: 'Tables en marbre noir',
    text: 'Un cadre soigné, du comptoir aux tables en marbre veiné.',
  },
  {
    icon: 'family',
    title: 'À partager',
    text: 'Mojito familial 6 personnes, trio de cocktails, jwejem — on vient à plusieurs.',
  },
]

export default function Ambiance() {
  return (
    <section className="ambiance" id="ambiance">
      <div className="section-head section-head--light reveal">
        <span className="bubble-label bubble-label--dark">L&rsquo;adresse</span>
        <h2>L&rsquo;ambiance MORNACO</h2>
      </div>

      <div className="ambiance__stage reveal" aria-hidden="true">
        <div className="ambiance__wall">
          <span className="neon wordmark">MORNACO</span>
        </div>
        <div className="ambiance__table" />
      </div>

      <div className="ambiance__gallery">
        {galleryImages.map((photo, i) => (
          <figure
            className={`amb-photo amb-photo--${i + 1} reveal`}
            style={{ transitionDelay: `${i * 70}ms` }}
            key={photo.src}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="ambiance__features">
        {FEATURES.map((f, i) => (
          <div className="amb-card reveal" style={{ transitionDelay: `${i * 80}ms` }} key={f.title}>
            <div className="amb-card__icon">
              <Icon name={f.icon} size={26} />
            </div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
