import { useEffect, useState } from 'react'
import { Monogram } from '../Logo.jsx'
import {
  clearAllOrders,
  clearSession,
  getOrders,
  getProducts,
  getSession,
  login,
  updateOrderStatus,
} from '../../services/adminService.js'
import RevenueModal from './RevenueModal.jsx'
import ProductsModal from './ProductsModal.jsx'
import UsersModal from './UsersModal.jsx'

const STATUSES = ['en attente', 'en preparation', 'pret', 'servi']
const STATUS_LABELS = {
  'en attente': 'En attente',
  'en preparation': 'En préparation',
  pret: 'Prêt ✓',
  servi: 'Servi',
}

export default function AdminPage({ onBackToSite }) {
  const [currentUser, setCurrentUser] = useState(null)

  // Login Gate inputs
  const [loginUser, setLoginUser] = useState('')
  const [loginPwd, setLoginPwd] = useState('')
  const [loginErr, setLoginErr] = useState('')

  // Dashboard Data
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')

  // Modals
  const [isRevenueOpen, setIsRevenueOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isUsersOpen, setIsUsersOpen] = useState(false)

  useEffect(() => {
    const session = getSession()
    if (session) {
      setCurrentUser(session)
      loadDashboardData()
    }
  }, [])

  const loadDashboardData = () => {
    setOrders(getOrders())
    setProducts(getProducts())
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoginErr('')
    try {
      const user = await login(loginUser, loginPwd)
      setCurrentUser(user)
      loadDashboardData()
    } catch (err) {
      setLoginErr(err.message || 'Échec de connexion')
    }
  }

  const handleLogout = () => {
    clearSession()
    setCurrentUser(null)
  }

  const handleSetStatus = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus)
    setOrders(updated)
  }

  const handleClearOrders = () => {
    if (confirm('Voulez-vous vraiment effacer toutes les commandes enregistrées ?')) {
      const updated = clearAllOrders()
      setOrders(updated)
    }
  }

  // Filtered Orders
  const filteredOrders =
    currentFilter === 'all' ? orders : orders.filter((o) => o.status === currentFilter)

  const pendingCount = orders.filter((o) => o.status === 'en attente').length
  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0)
  const doneCount = orders.filter((o) => o.status === 'servi').length

  // Render Gate if not logged in
  if (!currentUser) {
    return (
      <div className="admin-gate">
        <div className="gate-card">
          <div className="gate-logo">
            <Monogram size={56} />
            <span className="wordmark">MORNACO</span>
          </div>
          <h2 className="gate-title">Espace Administration</h2>
          <p className="gate-sub">Accès réservé au personnel du restaurant</p>

          {loginErr && <div className="gate-err">{loginErr}</div>}

          <form className="gate-form" onSubmit={handleLoginSubmit}>
            <div className="gate-field">
              <label>Identifiant</label>
              <input
                type="text"
                className="gate-input"
                placeholder="Ex: admin"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                autoFocus
              />
            </div>
            <div className="gate-field">
              <label>Mot de passe</label>
              <input
                type="password"
                className="gate-input"
                placeholder="••••••••"
                value={loginPwd}
                onChange={(e) => setLoginPwd(e.target.value)}
              />
            </div>
            <button type="submit" className="gate-btn">
              Se connecter
            </button>
          </form>

          <div className="gate-hint">
            <small>Identifiants démo: <code>admin</code> / <code>mornaco2026</code></small>
          </div>

          <button className="gate-back-btn" onClick={onBackToSite}>
            ← Retourner sur le site
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-wrapper">
      {/* Header Bar */}
      <header className="admin-header">
        <div className="admin-header__brand">
          <Monogram size={34} />
          <span className="wordmark">MORNACO</span>
          <span className="admin-badge">ADMIN</span>
        </div>

        <div className="admin-header__right">
          <span className="live-indicator" title="Serveur en direct">
            <span className="live-dot" /> En direct
          </span>

          <span className="order-count-badge">
            {orders.length} {orders.length === 1 ? 'commande' : 'commandes'}
          </span>

          <div className="header-user-info">
            <span className="header-user-name">{currentUser.display_name || currentUser.username}</span>
            <span className={`header-role-pill role-pill--${currentUser.role}`}>
              {currentUser.role === 'superadmin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>

          <button className="header-action-btn" onClick={() => setIsProductsOpen(true)}>
            📖 Carte & Produits
          </button>

          {currentUser.role === 'superadmin' && (
            <button className="header-action-btn" onClick={() => setIsUsersOpen(true)}>
              👥 Utilisateurs
            </button>
          )}

          <button className="header-action-btn header-action-btn--danger" onClick={handleClearOrders}>
            🗑️ Purger
          </button>

          <button className="header-action-btn" onClick={onBackToSite} title="Voir le site public">
            🌐 Site
          </button>

          <button className="header-action-btn header-action-btn--logout" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Stats Grid */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="s-label">Total Commandes</div>
            <div className="s-value">{orders.length}</div>
            <div className="s-sub">historique</div>
          </div>

          <div className="stat-card">
            <div className="s-label">En attente</div>
            <div className="s-value s-value--warning">{pendingCount}</div>
            <div className="s-sub">à préparer</div>
          </div>

          <div
            className="stat-card stat-card--clickable"
            onClick={() => setIsRevenueOpen(true)}
            title="Cliquez pour voir le graphique détaillé"
          >
            <div className="s-label">Chiffre d'affaires</div>
            <div className="s-value s-value--teal">{totalRevenue.toFixed(3)}</div>
            <div className="s-sub">dinars · voir courbe ↗</div>
          </div>

          <div className="stat-card">
            <div className="s-label">Commandes servies</div>
            <div className="s-value s-value--success">{doneCount}</div>
            <div className="s-sub">complétées</div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-bar">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'en attente', label: 'En attente' },
            { id: 'en preparation', label: 'En préparation' },
            { id: 'pret', label: 'Prêt' },
            { id: 'servi', label: 'Servi' },
          ].map((btn) => (
            <button
              key={btn.id}
              className={`filter-btn ${currentFilter === btn.id ? 'active' : ''}`}
              onClick={() => setCurrentFilter(btn.id)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="orders-container">
          {filteredOrders.length === 0 ? (
            <div className="empty-orders-card">
              <span className="empty-icon">☕</span>
              <p>
                Aucune commande {currentFilter !== 'all' ? 'dans cette catégorie' : 'pour le moment'}
              </p>
            </div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map((o) => (
                <div
                  key={o.id}
                  className={`order-card ${o.status === 'servi' ? 'order-card--done' : ''} ${
                    o.verified ? 'order-card--priority' : ''
                  }`}
                >
                  <div className="order-card-header">
                    <div>
                      <div className="order-ref">{o.ref || `#MNC-${o.id}`}</div>
                      <div className="order-time">
                        {o.date} · {o.time}
                      </div>
                      <span className={`verify-badge ${o.verified ? 'verified' : 'unverified'}`}>
                        <span className="verify-dot" />
                        {o.verified ? 'Vérifié' : 'En ligne'}
                      </span>
                    </div>
                    <span className={`status-pill status-pill--${o.status.replace(/\s+/g, '-')}`}>
                      {STATUS_LABELS[o.status]}
                    </span>
                  </div>

                  <div className="order-items">
                    {o.items &&
                      o.items.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <span className="order-item-name">{item.name}</span>
                          <span className="order-item-qty">× {item.qty}</span>
                        </div>
                      ))}
                  </div>

                  <div className="phase-actions">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        className={`phase-btn phase-btn--${s.replace(/\s+/g, '-')} ${
                          o.status === s ? 'active' : ''
                        }`}
                        onClick={() => handleSetStatus(o.id, s)}
                      >
                        {STATUS_LABELS[s].replace(' ✓', '')}
                      </button>
                    ))}
                  </div>

                  <div className="order-card-footer">
                    <div>
                      <div className="order-total-label">Total</div>
                      <div className="order-total">{parseFloat(o.total || 0).toFixed(3)} DT</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <RevenueModal
        isOpen={isRevenueOpen}
        onClose={() => setIsRevenueOpen(false)}
        orders={orders}
      />

      <ProductsModal
        isOpen={isProductsOpen}
        onClose={() => setIsProductsOpen(false)}
        products={products}
        onRefresh={loadDashboardData}
      />

      <UsersModal
        isOpen={isUsersOpen}
        onClose={() => setIsUsersOpen(false)}
        currentUser={currentUser}
      />
    </div>
  )
}
