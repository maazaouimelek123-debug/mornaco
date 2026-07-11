import { useState } from 'react'
import { MENU, fmt } from '../data/menu.js'
import { Monogram } from './Logo.jsx'

function Item({ item }) {
  return (
    <li className={`menu-item ${item.star ? 'menu-item--star' : ''}`}>
      <span className="menu-item__name">
        {item.name}
        {item.star && (
          <span className="menu-item__badge" title="Spécialité de la maison">
            <Monogram size={14} />
          </span>
        )}
        {item.note && <em className="menu-item__note">{item.note}</em>}
      </span>
      <span className="menu-item__dots" aria-hidden="true" />
      <span className="menu-item__price">{fmt(item.price)}</span>
    </li>
  )
}

export default function MenuSection() {
  const [active, setActive] = useState(MENU[0].id)
  const cat = MENU.find((c) => c.id === active)

  return (
    <section className="menu" id="menu">
      <div className="section-head reveal">
        <span className="bubble-label">Notre carte</span>
        <h2>Le menu</h2>
        <p>Prix en dinars tunisiens — service en salle &amp; terrasse.</p>
      </div>

      <div className="menu__tabs reveal" role="tablist" aria-label="Catégories du menu">
        {MENU.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={c.id === active}
            className={`chip ${c.id === active ? 'chip--active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* key force le remount pour rejouer l'animation d'entrée à chaque changement */}
      <div className="menu__panel" key={cat.id}>
        {cat.sections.map((sec) => (
          <div className="menu__group" key={sec.title || cat.label}>
            {sec.title && <h3 className="bubble-title">{sec.title}</h3>}
            <ul className="menu__list">
              {sec.items.map((item, i) => (
                <Item item={item} key={`${item.name}-${i}`} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
