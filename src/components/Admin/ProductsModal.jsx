import { useState } from 'react'
import { addProduct, deleteProduct, updateProduct } from '../../services/adminService.js'

export default function ProductsModal({ isOpen, onClose, products, onRefresh }) {
  const [catFilter, setCatFilter] = useState('all')
  const [newProdName, setNewProdName] = useState('')
  const [newProdCat, setNewProdCat] = useState('Cafés')
  const [customCat, setCustomCat] = useState('')
  const [newProdPrice, setNewProdPrice] = useState('')
  const [newProdFeatured, setNewProdFeatured] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const categories = ['all', ...new Set(products.map((p) => p.category).filter(Boolean))]

  const filteredProducts =
    catFilter === 'all' ? products : products.filter((p) => p.category === catFilter)

  const handlePriceBlur = (id, newPriceVal) => {
    const val = parseFloat(newPriceVal)
    if (isNaN(val) || val < 0) return
    updateProduct(id, { price: val })
    onRefresh()
  }

  const handleToggleVisible = (id, currentVisible) => {
    updateProduct(id, { visible: !currentVisible })
    onRefresh()
  }

  const handleToggleFeatured = (id, currentFeatured) => {
    updateProduct(id, { featured: !currentFeatured })
    onRefresh()
  }

  const handleDelete = (id) => {
    if (confirm('Supprimer ce produit du menu ?')) {
      deleteProduct(id)
      onRefresh()
    }
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    setErrorMsg('')
    const name = newProdName.trim()
    const category = newProdCat === '__new__' ? customCat.trim() : newProdCat
    const price = parseFloat(newProdPrice)

    if (!name) {
      setErrorMsg('Le nom du produit est requis.')
      return
    }
    if (!category) {
      setErrorMsg('La catégorie est requise.')
      return
    }
    if (isNaN(price) || price < 0) {
      setErrorMsg('Le prix indiqué est invalide.')
      return
    }

    addProduct({ name, category, price, featured: newProdFeatured })
    setNewProdName('')
    setNewProdPrice('')
    setNewProdFeatured(false)
    if (newProdCat === '__new__') setNewProdCat(category)
    onRefresh()
  }

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal admin-modal--large" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <div>
            <h3 className="admin-modal__title">Gestion de la Carte</h3>
            <p className="admin-modal__sub">{products.length} produit(s) enregistrés</p>
          </div>
          <button className="admin-modal__close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        {/* Category Pills */}
        <div className="prod-cat-filter">
          {categories.map((c) => (
            <button
              key={c}
              className={`prod-cat-btn ${catFilter === c ? 'active' : ''}`}
              onClick={() => setCatFilter(c)}
            >
              {c === 'all' ? 'Tous les produits' : c}
            </button>
          ))}
        </div>

        {/* Products List */}
        <div className="prod-list">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">Aucun produit dans cette catégorie</div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className={`prod-item ${p.visible === false ? 'prod-item--hidden' : ''}`}
              >
                <div className="prod-item__info">
                  <span className="prod-item__name">{p.name}</span>
                  <span className="prod-item__cat">{p.category}</span>
                </div>
                <div className="prod-item__price-box">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    defaultValue={parseFloat(p.price || 0).toFixed(3)}
                    onBlur={(e) => handlePriceBlur(p.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                    className="prod-item__price-input"
                  />
                  <span className="prod-item__currency">DT</span>
                </div>
                <div className="prod-item__actions">
                  <button
                    className={`prod-icon-btn ${p.featured ? 'active' : ''}`}
                    title={p.featured ? 'Retirer des incontournables' : 'Mettre en avant'}
                    onClick={() => handleToggleFeatured(p.id, p.featured)}
                  >
                    {p.featured ? '⭐' : '☆'}
                  </button>
                  <button
                    className="prod-icon-btn"
                    title={p.visible === false ? 'Afficher' : 'Masquer'}
                    onClick={() => handleToggleVisible(p.id, p.visible)}
                  >
                    {p.visible === false ? '🙈' : '👁️'}
                  </button>
                  <button
                    className="prod-icon-btn prod-icon-btn--danger"
                    title="Supprimer"
                    onClick={() => handleDelete(p.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Product Form */}
        <div className="prod-add-section">
          <h4 className="prod-add-title">Ajouter un nouveau produit</h4>
          {errorMsg && <div className="admin-err">{errorMsg}</div>}
          <form className="prod-add-grid" onSubmit={handleAddProduct}>
            <input
              type="text"
              className="admin-input"
              placeholder="Nom du produit"
              value={newProdName}
              onChange={(e) => setNewProdName(e.target.value)}
            />
            <select
              className="admin-input"
              value={newProdCat}
              onChange={(e) => setNewProdCat(e.target.value)}
            >
              {categories
                .filter((c) => c !== 'all')
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              <option value="__new__">+ Nouvelle catégorie…</option>
            </select>

            {newProdCat === '__new__' && (
              <input
                type="text"
                className="admin-input"
                placeholder="Nom de la nouvelle catégorie"
                value={customCat}
                onChange={(e) => setCustomCat(e.target.value)}
              />
            )}

            <input
              type="number"
              step="0.1"
              min="0"
              className="admin-input"
              placeholder="Prix (DT)"
              value={newProdPrice}
              onChange={(e) => setNewProdPrice(e.target.value)}
            />

            <label className="prod-add-checkbox">
              <input
                type="checkbox"
                checked={newProdFeatured}
                onChange={(e) => setNewProdFeatured(e.target.checked)}
              />
              Incontournable ⭐
            </label>

            <button type="submit" className="admin-btn admin-btn--primary">
              + Ajouter au menu
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
