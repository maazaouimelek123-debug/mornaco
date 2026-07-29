import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Monogram } from './Logo.jsx'

export default function CartDrawer() {
  const {
    cart,
    totalAmount,
    totalCount,
    isOpen,
    setIsOpen,
    updateQty,
    removeFromCart,
    handleSubmitOrder,
    isSubmitted,
    setIsSubmitted,
    lastOrderRef,
    addedNotice,
  } = useCart()

  const [tableNum, setTableNum] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleConfirmOrder = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await handleSubmitOrder(tableNum)
    setSubmitting(false)
  }

  return (
    <>
      {/* Added Toast Notification */}
      {addedNotice && !isOpen && (
        <div className="cart-toast-notice">
          <span>+1 {addedNotice} ajouté au panier</span>
        </div>
      )}

      {/* Floating Cart Button */}
      {totalCount > 0 && !isOpen && (
        <button
          className="floating-cart-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le panier"
        >
          <span className="cart-badge-count">{totalCount}</span>
          <span className="cart-btn-label">Mon Panier</span>
          <span className="cart-btn-total">{totalAmount.toFixed(3)} DT</span>
        </button>
      )}

      {/* Cart Drawer */}
      {isOpen && (
        <div className="cart-backdrop" onClick={() => setIsOpen(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div className="cart-header__title">
                <Monogram size={28} />
                <h3>Votre Commande</h3>
              </div>
              <button
                className="cart-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            {isSubmitted ? (
              <div className="cart-success-view">
                <div className="cart-success-badge">
                  <Monogram size={48} />
                </div>
                <h3>Commande transmise</h3>
                <p className="cart-success-ref">Référence : <strong>{lastOrderRef}</strong></p>
                <p className="cart-success-desc">
                  Votre commande a été envoyée directement en cuisine. Notre équipe prépare vos consommations.
                </p>
                <button
                  className="cart-success-btn"
                  onClick={() => {
                    setIsSubmitted(false)
                    setIsOpen(false)
                  }}
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div className="cart-body">
                  {cart.length === 0 ? (
                    <div className="cart-empty">
                      <div className="cart-empty-monogram">
                        <Monogram size={38} />
                      </div>
                      <p>Votre panier est vide</p>
                      <small>Sélectionnez des articles sur le menu pour commander.</small>
                    </div>
                  ) : (
                    <div className="cart-items-list">
                      {cart.map((item) => (
                        <div key={item.name} className="cart-item-card">
                          <div className="cart-item-details">
                            <span className="cart-item-title">{item.name}</span>
                            <span className="cart-item-unit">{item.price.toFixed(3)} DT</span>
                          </div>
                          <div className="cart-item-controls">
                            <button
                              className="qty-btn"
                              onClick={() => updateQty(item.name, -1)}
                            >
                              −
                            </button>
                            <span className="qty-val">{item.qty}</span>
                            <button
                              className="qty-btn"
                              onClick={() => updateQty(item.name, 1)}
                            >
                              +
                            </button>
                            <button
                              className="cart-remove-btn"
                              onClick={() => removeFromCart(item.name)}
                              title="Retirer"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <form className="cart-footer" onSubmit={handleConfirmOrder}>
                    <div className="cart-table-field">
                      <label htmlFor="tableNum">Numéro de table / Emplacement</label>
                      <input
                        id="tableNum"
                        type="text"
                        placeholder="Ex: Table 4 ou Terrasse"
                        value={tableNum}
                        onChange={(e) => setTableNum(e.target.value)}
                        className="cart-table-input"
                      />
                    </div>

                    <div className="cart-total-row">
                      <span>Total à payer</span>
                      <span className="cart-total-val">{totalAmount.toFixed(3)} DT</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="cart-submit-btn"
                    >
                      {submitting ? 'Envoi en cours…' : 'Envoyer la commande'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
