import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'
import { formatPrice } from '../data/menu'
import { useCart } from '../context/CartContext'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, total, count, updateQty, removeItem } = useCart()

  useEffect(() => {
    if (!open) return undefined
    lockScroll()
    return () => unlockScroll()
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <div className="relative flex h-full items-end justify-center sm:items-center sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 flex max-h-[min(92svh,100%)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-paper shadow-2xl sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-mist px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-5 text-leaf" />
                  <h2 id="cart-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
                    Your order
                  </h2>
                  <span className="rounded-full bg-mist px-2 py-0.5 text-xs font-semibold text-ink-soft">
                    {count}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="grid size-9 place-items-center rounded-full bg-mist text-ink transition hover:bg-ink hover:text-citrus"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden">
                {items.length === 0 ? (
                  <p className="py-10 text-center text-sm text-smoke">Cart is empty. Add a dish to start.</p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.cartKey}
                      className="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-mist"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-16 shrink-0 rounded-xl object-cover sm:size-20"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-base font-semibold text-ink">{item.name}</h3>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeItem(item.cartKey)}
                            className="grid size-8 shrink-0 place-items-center rounded-full text-smoke transition hover:bg-mist hover:text-ink"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        {item.variantLabels?.length > 0 && (
                          <p className="mt-1 line-clamp-2 text-xs text-smoke">
                            {item.variantLabels.map((v) => v.name).join(' · ')}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-1 rounded-full bg-mist p-0.5">
                            <button
                              type="button"
                              aria-label="Decrease"
                              onClick={() => updateQty(item.cartKey, item.quantity - 1)}
                              className="grid size-7 place-items-center rounded-full bg-white text-ink"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-6 text-center text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase"
                              onClick={() => updateQty(item.cartKey, item.quantity + 1)}
                              className="grid size-7 place-items-center rounded-full bg-white text-ink"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-ink">
                            {formatPrice(item.lineTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="shrink-0 border-t border-mist px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-smoke">Total</span>
                  <span className="font-display text-lg font-bold text-ink">{formatPrice(total)}</span>
                </div>
                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={onCheckout}
                  className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-citrus transition hover:bg-leaf hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Checkout
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
