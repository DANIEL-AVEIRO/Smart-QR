import { useState } from 'react'
import CartButton from '../components/CartButton'
import CartDrawer from '../components/CartDrawer'
import Logo from '../components/Logo'
import MenuSection from '../components/MenuSection'
import OrderConfirm from '../components/OrderConfirm'

export default function MenuPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="min-h-svh w-full pb-20">
      <Logo />
      <main>
        <MenuSection />
      </main>

      <CartButton onClick={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          setConfirmOpen(true)
        }}
      />
      <OrderConfirm open={confirmOpen} onClose={() => setConfirmOpen(false)} />
    </div>
  )
}
