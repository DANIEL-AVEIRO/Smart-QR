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
              className="relative z-10 flex max-h-[min(92svh,100%)] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] bg-paper shadow-2xl sm:rounded-3xl"
            >
              <div className="flex justify-center pt-2 sm:hidden">
                <span className="h-1.5 w-10 rounded-full bg-mist" />
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 px-4 pb-3 pt-2 sm:border-b sm:border-mist sm:px-5 sm:pb-4 sm:pt-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="grid size-9 place-items-center rounded-full bg-leaf/12 text-leaf">
                      <ShoppingBag className="size-4" />
                    </span>
                    <h2 id="cart-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
                      Your order
                    </h2>
                  </div>
                  <p className="mt-1 pl-11 text-xs text-smoke">
                    {count} {count === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-ink transition hover:bg-ink hover:text-citrus"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-3 py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:space-y-3 sm:px-5 sm:py-4 [&::-webkit-scrollbar]:hidden">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <span className="grid size-14 place-items-center rounded-full bg-mist text-smoke">
                      <ShoppingBag className="size-6" />
                    </span>
                    <p className="mt-4 text-sm font-medium text-ink">Cart is empty</p>
                    <p className="mt-1 text-xs text-smoke">Add a dish to start your order.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.cartKey}
                      className="flex gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-mist sm:p-3"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-[4.5rem] rounded-xl object-cover sm:size-20"
                        />
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.cartKey)}
                          className="absolute -right-1.5 -top-1.5 grid size-7 place-items-center rounded-full bg-white text-smoke shadow-sm ring-1 ring-mist transition hover:bg-ink hover:text-citrus"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                        <div>
                          <h3 className="font-display text-[15px] font-semibold leading-snug text-ink sm:text-base">
                            {item.name}
                          </h3>
                          {item.variantLabels?.length > 0 && (
                            <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-smoke">
                              {item.variantLabels.map((v) => v.name).join(' · ')}
                            </p>
                          )}
                          {item.notes ? (
                            <p className="mt-1 line-clamp-2 text-[11px] italic text-leaf">
                              {item.notes}
                            </p>
                          ) : null}
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center rounded-full bg-mist p-0.5">
                            <button
                              type="button"
                              aria-label="Decrease"
                              onClick={() => updateQty(item.cartKey, item.quantity - 1)}
                              className="grid size-8 place-items-center rounded-full bg-white text-ink active:bg-mist"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-7 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase"
                              onClick={() => updateQty(item.cartKey, item.quantity + 1)}
                              className="grid size-8 place-items-center rounded-full bg-white text-ink active:bg-mist"
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

              <div className="shrink-0 border-t border-mist bg-paper px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-smoke">Total</p>
                    <p className="font-display text-xl font-bold leading-tight text-ink">
                      {formatPrice(total)}
                    </p>
                  </div>
                  <p className="pb-0.5 text-xs text-smoke">
                    {count} {count === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={onCheckout}
                  className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-citrus transition hover:bg-leaf hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
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
