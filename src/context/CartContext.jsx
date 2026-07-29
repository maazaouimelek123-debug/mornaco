import { createContext, useContext, useState } from 'react'
import { createOrder } from '../services/adminService.js'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [lastOrderRef, setLastOrderRef] = useState('')

  const addToCart = (item) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.name === item.name)
      if (existingIdx !== -1) {
        const updated = [...prev]
        updated[existingIdx].qty += 1
        return updated
      }
      return [
        ...prev,
        {
          id: item.id || `item-${Date.now()}-${Math.random()}`,
          name: item.name,
          price: typeof item.price === 'number' ? (item.price > 100 ? item.price / 1000 : item.price) : 5.0,
          qty: 1,
        },
      ]
    })
    setIsOpen(true)
  }

  const updateQty = (name, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.name === name) {
            const newQty = i.qty + delta
            return newQty > 0 ? { ...i, qty: newQty } : null
          }
          return i
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((i) => i.name !== name))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const handleSubmitOrder = async (tableName) => {
    if (cart.length === 0) return

    const orderData = {
      ref: `#MNC-${Math.floor(1000 + Math.random() * 9000)}`,
      total: totalAmount.toFixed(3),
      items: cart.map((i) => ({
        name: i.name + (tableName ? ` [Table ${tableName}]` : ''),
        qty: i.qty,
        price: i.price,
      })),
    }

    const created = await createOrder(orderData)
    setLastOrderRef(created.ref)
    setIsSubmitted(true)
    clearCart()
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalAmount,
        totalCount,
        isOpen,
        setIsOpen,
        handleSubmitOrder,
        isSubmitted,
        setIsSubmitted,
        lastOrderRef,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
