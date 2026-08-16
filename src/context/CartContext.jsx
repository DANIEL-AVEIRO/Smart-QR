import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = ({ menuItem, selections, quantity, variantLabels, lineTotal, notes = '' }) => {
    const unitPrice = Math.round(lineTotal / quantity)
    const note = String(notes).trim()
    const cartKey = `${menuItem.id}:${JSON.stringify(selections)}:${note}`

    setItems((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey)
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity + quantity,
                lineTotal: item.unitPrice * (item.quantity + quantity),
              }
            : item,
        )
      }

      return [
        ...prev,
        {
          cartKey,
          menuItemId: menuItem.id,
          name: menuItem.name,
          image: menuItem.image,
          quantity,
          unitPrice,
          lineTotal,
          selections,
          variantLabels,
          notes: note,
        },
      ]
    })
  }

  const updateQty = (cartKey, quantity) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity,
                lineTotal: item.unitPrice * quantity,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (cartKey) => {
    setItems((prev) => prev.filter((item) => item.cartKey !== cartKey))
  }

  const clear = () => setItems([])

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.lineTotal, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      count,
      total,
      addItem,
      updateQty,
      removeItem,
      clear,
    }),
    [items, count, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
