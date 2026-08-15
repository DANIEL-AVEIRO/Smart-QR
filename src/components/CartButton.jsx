import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '../data/menu'
import { useCart } from '../context/CartContext'

export default function CartButton({ onClick }) {
  const { count, total } = useCart()

  if (count === 0) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-citrus shadow-[0_12px_40px_rgba(20,24,22,0.28)] transition hover:bg-leaf hover:text-white sm:bottom-8"
    >
      <span className="relative">
        <ShoppingBag className="size-5" />
        <span className="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-citrus px-1 text-[10px] font-bold text-ink">
          {count}
        </span>
      </span>
      <span>View cart</span>
      <span className="text-white/80">{formatPrice(total)}</span>
    </button>
  )
}
