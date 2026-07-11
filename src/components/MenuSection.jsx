import { useState, useEffect } from 'react'
import { MENU, fmt } from '../data/menu.js'
import { Monogram } from './Logo.jsx'
import { Icon } from './Icons.jsx'

const countItems = (cat) => cat.sections.reduce((n, s) => n + s.items.length, 0)

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
  const [activeId, setActiveId] = useState(null)
  const cat = activeId ? MENU.find((c) => c.id === activeId) : null

  // Fermeture par Échap + blocage du scroll de fond quand le panneau est ouvert.
  useEffect(() => {
    if (!cat) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cat])

  return (
    <section className="menu" id="menu">
      <div className="section-head reveal">
        <span className="bubble-label">Notre carte</span>
        <h2>Le menu</h2>
        <p>Prix en dinars tunisiens — service en salle &amp; terrasse.</p>
      </div>

      <div className="menu__cats reveal" aria-label="Catégories du menu">
        {MENU.map((c) => (
          <button
            key={c.id}
            className={`cat-card ${c.id === activeId ? 'cat-card--active' : ''}`}
            aria-haspopup="dialog"
            onClick={() => setActiveId(c.id)}
          >
            <span className="cat-card__icon">
              <Icon name={c.icon} size={32} />
            </span>
            <span className="cat-card__label">{c.label}</span>
            <span className="cat-card__count">{countItems(c)} plats</span>
          </button>
        ))}
      </div>

      <p className="menu__hint reveal">Cliquez sur une catégorie pour voir les plats.</p>

      {cat && (
        <div className="menu-overlay" onClick={() => setActiveId(null)}>
          <div
            className="menu-overlay__panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Catégorie ${cat.label}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-overlay__head">
              <div className="menu-overlay__title">
                <Monogram size={26} />
                <h3>{cat.label}</h3>
              </div>
              <button
                className="menu-overlay__close"
                aria-label="Fermer"
                onClick={() => setActiveId(null)}
              >
                ✕
              </button>
            </div>
            <div className="menu-overlay__body">
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
          </div>
        </div>
      )}
    </section>
  )
}
