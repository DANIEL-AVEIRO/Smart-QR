import { useState } from 'react'
import CartButton from '../components/CartButton'
import CartDrawer from '../components/CartDrawer'
import Logo from '../components/Logo'
import MenuSection from '../components/MenuSection'
import OrderConfirm from '../components/OrderConfirm'
import OrderStatusBar from '../components/OrderStatusBar'
import { getActiveOrderId, setActiveOrderId } from '../utils/activeOrder'

export default function MenuPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [trackedOrderId, setTrackedOrderId] = useState(() => getActiveOrderId())

  return (
    <div className="min-h-svh w-full pb-40 sm:pb-32">
      <Logo />
      <main>
        <MenuSection />
      </main>

      <OrderStatusBar
        orderId={trackedOrderId}
        onClear={() => setTrackedOrderId(null)}
      />
      <CartButton onClick={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false)
          setConfirmOpen(true)
        }}
      />
      <OrderConfirm
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onPlaced={(id) => {
          setActiveOrderId(id)
          setTrackedOrderId(id)
        }}
      />
    </div>
  )
}
