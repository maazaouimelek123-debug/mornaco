import { SIGNATURES, fmt } from '../data/menu.js'
import { Icon } from './Icons.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Signatures() {
  const { addToCart } = useCart()

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
            <div className="sig-card__footer">
              <span className="sig-card__price">
                {fmt(s.price)} <small>DT</small>
              </span>
              <button
                className="sig-card__order-btn"
                onClick={() => addToCart({ name: s.name, price: s.price })}
              >
                + Commander
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
