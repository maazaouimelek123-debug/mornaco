import { SIGNATURES, fmt } from '../data/menu.js'
import { Icon } from './Icons.jsx'

export default function Signatures() {
  return (
    <section className="signatures" id="signatures">
      <div className="section-head reveal">
        <span className="bubble-label">La maison</span>
        <h2>Les spécialités MORNACO</h2>
        <p>Chaque famille de la carte a sa création signée MORNACO.</p>
      </div>

      <div className="signatures__grid">
        {SIGNATURES.map((s, i) => (
          <article className="sig-card reveal" style={{ transitionDelay: `${i * 60}ms` }} key={s.name}>
            <div className="sig-card__icon">
              <Icon name={s.icon} />
            </div>
            <span className="sig-card__cat">{s.cat}</span>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
            <span className="sig-card__price">
              {fmt(s.price)} <small>DT</small>
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
