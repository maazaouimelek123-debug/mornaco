import { INITIAL_ORDERS } from '../data/ordersData.js'
import { MENU } from '../data/menu.js'

const SESSION_KEY = 'mornaco_adm_session'
const ORDERS_KEY = 'mornaco_adm_orders'
const PRODUCTS_KEY = 'mornaco_adm_products'
const USERS_KEY = 'mornaco_adm_users'

// Helper for SHA-256 Hashing
export async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// Initial Admin Users
const DEFAULT_USERS = [
  {
    id: 'u1',
    username: 'admin',
    display_name: 'Gérant Mornaco',
    role: 'admin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'u2',
    username: 'superadmin',
    display_name: 'Direction Mornaco',
    role: 'superadmin',
    created_at: new Date().toISOString(),
  },
]

// Default Menu flatten into Products
function extractDefaultProducts() {
  const products = []
  MENU.forEach((cat) => {
    cat.sections.forEach((sec) => {
      sec.items.forEach((item, idx) => {
        products.push({
          id: `${cat.id}-${sec.title.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
          name: item.name,
          category: cat.label,
          price: item.price ? item.price / 1000 : 5.0,
          visible: true,
          featured: !!item.star,
        })
      })
    })
  })
  return products
}

// Session Utilities
export function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function setSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

// Authentication
export async function login(username, password) {
  if (!username || !password) {
    throw new Error('Identifiant et mot de passe requis')
  }

  // Pre-hashed default password checks for demo convenience or custom added users
  const isSuper = username.toLowerCase() === 'superadmin'
  const isDefaultAdmin = username.toLowerCase() === 'admin'

  let valid = false
  if (isSuper && (password === 'super2026' || password === 'mornaco2026')) valid = true
  if (isDefaultAdmin && (password === 'mornaco2026' || password === 'admin')) valid = true

  const users = getUsers()
  const found = users.find((u) => u.username.toLowerCase() === username.toLowerCase())

  if (!valid && !found) {
    throw new Error('Identifiant ou mot de passe incorrect')
  }

  const user = found || {
    id: isSuper ? 'u2' : 'u1',
    username: username,
    display_name: isSuper ? 'Direction Mornaco' : 'Gérant Mornaco',
    role: isSuper ? 'superadmin' : 'admin',
    token: `token-${Date.now()}`,
  }

  setSession(user)
  return user
}

// Orders Management
export function getOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_KEY)
    if (!saved) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS))
      return INITIAL_ORDERS
    }
    return JSON.parse(saved)
  } catch {
    return INITIAL_ORDERS
  }
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders()
  const idx = orders.findIndex((o) => o.id === orderId)
  if (idx !== -1) {
    orders[idx].status = newStatus
    saveOrders(orders)
  }
  return orders
}

export function clearAllOrders() {
  localStorage.setItem(ORDERS_KEY, JSON.stringify([]))
  return []
}

// Products Management
export function getProducts() {
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY)
    if (!saved) {
      const def = extractDefaultProducts()
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(def))
      return def
    }
    return JSON.parse(saved)
  } catch {
    return extractDefaultProducts()
  }
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export function addProduct(product) {
  const products = getProducts()
  const newProd = {
    id: `custom-${Date.now()}`,
    name: product.name,
    category: product.category,
    price: parseFloat(product.price),
    visible: true,
    featured: !!product.featured,
  }
  products.push(newProd)
  saveProducts(products)
  return products
}

export function updateProduct(id, fields) {
  const products = getProducts()
  const idx = products.findIndex((p) => p.id === id)
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...fields }
    saveProducts(products)
  }
  return products
}

export function deleteProduct(id) {
  const products = getProducts().filter((p) => p.id !== id)
  saveProducts(products)
  return products
}

// Users Management (Superadmin)
export function getUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY)
    if (!saved) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS))
      return DEFAULT_USERS
    }
    return JSON.parse(saved)
  } catch {
    return DEFAULT_USERS
  }
}

export function addUser(username, password, role) {
  const users = getUsers()
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('Cet utilisateur existe déjà')
  }
  const newUser = {
    id: `u-${Date.now()}`,
    username,
    display_name: username,
    role: role || 'admin',
    created_at: new Date().toISOString(),
  }
  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return users
}

export function deleteUser(userId) {
  const users = getUsers().filter((u) => u.id !== userId)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return users
}
