import { supabase } from './supabase.js'
import { INITIAL_ORDERS } from '../data/ordersData.js'
import { MENU } from '../data/menu.js'

const SESSION_KEY = 'mornaco_adm_session'
const ORDERS_KEY = 'mornaco_adm_orders'
const PRODUCTS_KEY = 'mornaco_adm_products'
const USERS_KEY = 'mornaco_adm_users'

// SHA-256 password hashing helper
export async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// Default Users
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

// Extract default products from local MENU structure
export function extractDefaultProducts() {
  const products = []
  try {
    if (Array.isArray(MENU)) {
      MENU.forEach((cat) => {
        const categoryLabel = cat.label || 'Autres'
        if (Array.isArray(cat.sections)) {
          cat.sections.forEach((sec, sIdx) => {
            const secSlug = sec.title ? sec.title.toLowerCase().replace(/\s+/g, '-') : `s${sIdx}`
            if (Array.isArray(sec.items)) {
              sec.items.forEach((item, idx) => {
                products.push({
                  id: `${cat.id || 'cat'}-${secSlug}-${idx}`,
                  name: item.name + (item.note ? ` (${item.note})` : ''),
                  category: categoryLabel,
                  price: item.price ? item.price / 1000 : 5.0,
                  visible: true,
                  featured: !!item.star,
                })
              })
            }
          })
        }
      })
    }
  } catch (err) {
    console.error('Error extracting default products:', err)
  }
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

// ============================================================
// AUTHENTICATION (SUPABASE + LOCAL FALLBACK)
// ============================================================
export async function login(username, password) {
  if (!username || !password) {
    throw new Error('Identifiant et mot de passe requis')
  }

  const passHash = await sha256(password)

  // 1. Try Supabase admin_login RPC
  try {
    const { data, error } = await supabase.rpc('admin_login', {
      p_username: username,
      p_hash: passHash,
    })

    if (!error && data) {
      const user = {
        id: data.id,
        username: data.username,
        display_name: data.display_name || data.username,
        role: data.role,
        token: data.token,
      }
      setSession(user)
      return user
    }
  } catch (err) {
    console.warn('Supabase login fallback:', err.message)
  }

  // 2. Local Fallback for Demo & Setup
  const isSuper = username.toLowerCase() === 'superadmin'
  const isAdmin = username.toLowerCase() === 'admin'
  let valid = false

  if (isSuper && (password === 'super2026' || password === 'mornaco2026')) valid = true
  if (isAdmin && (password === 'mornaco2026' || password === 'admin')) valid = true

  const users = getUsersLocal()
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

// ============================================================
// ============================================================
// ORDERS (SUPABASE REALTIME + LOCAL MERGE + EVENT SYNC)
// ============================================================
export async function getOrders() {
  let remoteOrders = []
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('id', { ascending: false })

    if (!error && Array.isArray(data)) {
      remoteOrders = data
    }
  } catch (err) {
    console.warn('Supabase getOrders fallback:', err.message)
  }

  const localOrders = getOrdersLocal()
  const map = new Map()

  // Prioritize remote items, then merge local items if missing
  remoteOrders.forEach((o) => map.set(String(o.id), o))
  localOrders.forEach((o) => {
    const key = String(o.id)
    if (!map.has(key)) {
      map.set(key, o)
    }
  })

  const merged = Array.from(map.values()).sort((a, b) => (b.id || 0) - (a.id || 0))
  localStorage.setItem(ORDERS_KEY, JSON.stringify(merged))
  return merged
}

export function subscribeOrders(onUpdate) {
  const refresh = () => {
    getOrders().then(onUpdate)
  }

  let channel = null
  try {
    channel = supabase
      .channel('mornaco-orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, refresh)
      .subscribe()
  } catch {
    // Supabase subscription fallback
  }

  const handleCustomEvent = () => refresh()
  const handleStorageEvent = (e) => {
    if (e.key === ORDERS_KEY) refresh()
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('mornaco_order_changed', handleCustomEvent)
    window.addEventListener('storage', handleStorageEvent)
  }

  return () => {
    if (channel) supabase.removeChannel(channel)
    if (typeof window !== 'undefined') {
      window.removeEventListener('mornaco_order_changed', handleCustomEvent)
      window.removeEventListener('storage', handleStorageEvent)
    }
  }
}

export async function createOrder(orderData) {
  const newOrder = {
    id: orderData.id || Date.now(),
    ref: orderData.ref || `#MNC-${Math.floor(1000 + Math.random() * 9000)}`,
    date: orderData.date || new Date().toLocaleDateString('fr-FR'),
    time:
      orderData.time ||
      new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    status: 'en attente',
    verified: true,
    total: parseFloat(orderData.total || 0),
    items: orderData.items || [],
  }

  try {
    await supabase.from('orders').upsert([newOrder])
  } catch (err) {
    console.warn('Supabase insert order error:', err.message)
  }

  const orders = getOrdersLocal()
  const exists = orders.some((o) => String(o.id) === String(newOrder.id))
  if (!exists) {
    orders.unshift(newOrder)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mornaco_order_changed'))
  }

  return newOrder
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
  } catch (err) {
    console.warn('Supabase updateOrderStatus fallback:', err.message)
  }

  const orders = getOrdersLocal()
  const idx = orders.findIndex((o) => String(o.id) === String(orderId))
  if (idx !== -1) {
    orders[idx].status = newStatus
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mornaco_order_changed'))
  }

  return orders
}

export async function clearAllOrders() {
  try {
    await supabase.from('orders').delete().neq('id', 0)
  } catch (err) {
    console.warn('Supabase clearAllOrders fallback:', err.message)
  }

  localStorage.setItem(ORDERS_KEY, JSON.stringify([]))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mornaco_order_changed'))
  }
  return []
}

function getOrdersLocal() {
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

// ============================================================
// PRODUCTS MANAGEMENT (SUPABASE + LOCAL FALLBACK)
// ============================================================
export async function getProducts() {
  try {
    const { data, error } = await supabase.from('products').select('*')

    if (!error && Array.isArray(data) && data.length > 0) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data))
      return data
    }
  } catch (err) {
    console.warn('Supabase getProducts fallback:', err.message)
  }

  return getProductsLocal()
}

export async function addProduct(product) {
  const newProd = {
    id: `prod-${Date.now()}`,
    name: product.name,
    category: product.category,
    price: parseFloat(product.price),
    visible: true,
    featured: !!product.featured,
  }

  try {
    await supabase.from('products').upsert([newProd])
  } catch (err) {
    console.warn('Supabase addProduct error:', err.message)
  }

  const products = getProductsLocal()
  products.push(newProd)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return products
}

export async function updateProduct(id, fields) {
  try {
    await supabase.from('products').update(fields).eq('id', id)
  } catch (err) {
    console.warn('Supabase updateProduct error:', err.message)
  }

  const products = getProductsLocal()
  const idx = products.findIndex((p) => p.id === id)
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...fields }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  }
  return products
}

export async function deleteProduct(id) {
  try {
    await supabase.from('products').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase deleteProduct error:', err.message)
  }

  const products = getProductsLocal().filter((p) => p.id !== id)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return products
}

function getProductsLocal() {
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Error reading local products:', err)
  }

  const def = extractDefaultProducts()
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(def))
  return def
}

// ============================================================
// USERS MANAGEMENT (SUPERADMIN - SUPABASE + LOCAL FALLBACK)
// ============================================================
export async function getUsers() {
  const session = getSession()
  try {
    if (session?.id) {
      const { data, error } = await supabase.rpc('admin_list_users', {
        p_requester_id: session.id,
      })
      if (!error && Array.isArray(data) && data.length > 0) {
        localStorage.setItem(USERS_KEY, JSON.stringify(data))
        return data
      }
    }
  } catch (err) {
    console.warn('Supabase getUsers fallback:', err.message)
  }

  return getUsersLocal()
}

export async function addUser(username, password, role) {
  const session = getSession()
  const passHash = await sha256(password)

  try {
    if (session?.id) {
      const { data, error } = await supabase.rpc('admin_create_user', {
        p_username: username,
        p_hash: passHash,
        p_display_name: username,
        p_role: role || 'admin',
        p_requester_id: session.id,
      })
      if (error || (data && data.error)) {
        throw new Error((data && data.error) || (error && error.message))
      }
    }
  } catch (err) {
    console.warn('Supabase addUser fallback:', err.message)
  }

  const users = getUsersLocal()
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

export async function deleteUser(userId) {
  const session = getSession()

  try {
    if (session?.id) {
      await supabase.rpc('admin_delete_user', {
        p_target_id: userId,
        p_requester_id: session.id,
      })
    }
  } catch (err) {
    console.warn('Supabase deleteUser fallback:', err.message)
  }

  const users = getUsersLocal().filter((u) => u.id !== userId)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return users
}

function getUsersLocal() {
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
