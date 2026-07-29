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
// ORDERS (SUPABASE REALTIME + LOCAL FALLBACK)
// ============================================================
export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('verified', { ascending: false })
      .order('id', { ascending: false })

    if (!error && data && data.length > 0) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(data))
      return data
    }
  } catch (err) {
    console.warn('Supabase getOrders fallback:', err.message)
  }

  return getOrdersLocal()
}

export function subscribeOrders(onUpdate) {
  try {
    const channel = supabase
      .channel('mornaco-orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        getOrders().then(onUpdate)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  } catch {
    return () => {}
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  const session = getSession()

  // 1. Try Supabase update
  try {
    if (session?.token) {
      await supabase.rpc('admin_set_order_status', {
        p_token: session.token,
        p_order_id: orderId,
        p_status: newStatus,
      })
    } else {
      await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    }
  } catch (err) {
    console.warn('Supabase updateOrderStatus fallback:', err.message)
  }

  // 2. Update local state
  const orders = getOrdersLocal()
  const idx = orders.findIndex((o) => o.id === orderId)
  if (idx !== -1) {
    orders[idx].status = newStatus
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }
  return orders
}

export async function clearAllOrders() {
  const session = getSession()

  try {
    if (session?.token) {
      await supabase.rpc('admin_clear_orders', { p_token: session.token })
    } else {
      await supabase.from('orders').delete().neq('id', 0)
    }
  } catch (err) {
    console.warn('Supabase clearAllOrders fallback:', err.message)
  }

  localStorage.setItem(ORDERS_KEY, JSON.stringify([]))
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
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category')
      .order('sort_order', { ascending: true })

    if (!error && data && data.length > 0) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data))
      return data
    }
  } catch (err) {
    console.warn('Supabase getProducts fallback:', err.message)
  }

  return getProductsLocal()
}

export async function addProduct(product) {
  const session = getSession()

  try {
    if (session?.token) {
      await supabase.rpc('admin_product_save', {
        p_token: session.token,
        p_id: null,
        p_name: product.name,
        p_category: product.category,
        p_price: parseFloat(product.price),
        p_visible: true,
        p_featured: !!product.featured,
        p_photo: null,
      })
    } else {
      await supabase.from('products').insert([
        {
          name: product.name,
          category: product.category,
          price: parseFloat(product.price),
          visible: true,
          featured: !!product.featured,
        },
      ])
    }
  } catch (err) {
    console.warn('Supabase addProduct fallback:', err.message)
  }

  const products = getProductsLocal()
  const newProd = {
    id: `custom-${Date.now()}`,
    name: product.name,
    category: product.category,
    price: parseFloat(product.price),
    visible: true,
    featured: !!product.featured,
  }
  products.push(newProd)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return products
}

export async function updateProduct(id, fields) {
  const session = getSession()

  try {
    if (session?.token) {
      await supabase.rpc('admin_product_save', {
        p_token: session.token,
        p_id: id,
        p_name: fields.name || null,
        p_category: fields.category || null,
        p_price: fields.price !== undefined ? parseFloat(fields.price) : null,
        p_visible: fields.visible !== undefined ? fields.visible : null,
        p_featured: fields.featured !== undefined ? fields.featured : null,
        p_photo: null,
      })
    } else {
      await supabase.from('products').update(fields).eq('id', id)
    }
  } catch (err) {
    console.warn('Supabase updateProduct fallback:', err.message)
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
  const session = getSession()

  try {
    if (session?.token) {
      await supabase.rpc('admin_product_delete', { p_token: session.token, p_id: id })
    } else {
      await supabase.from('products').delete().eq('id', id)
    }
  } catch (err) {
    console.warn('Supabase deleteProduct fallback:', err.message)
  }

  const products = getProductsLocal().filter((p) => p.id !== id)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  return products
}

function getProductsLocal() {
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
