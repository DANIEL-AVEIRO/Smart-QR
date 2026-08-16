import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, ShoppingBag } from 'lucide-react'
import { formatPrice } from '../data/menu'
import { useCart } from '../context/CartContext'

export default function CartButton({ onClick }) {
  const { count, total, items } = useCart()
  const previews = items.slice(-3).reverse()

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 88, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 88, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:bottom-8 sm:left-1/2 sm:w-auto sm:-translate-x-1/2 sm:px-0 sm:pb-0"
        >
          <button
            type="button"
            onClick={onClick}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-[1.35rem] bg-ink p-2 pr-3 text-left shadow-[0_16px_44px_rgba(26,17,19,0.34)] ring-1 ring-white/10 transition active:scale-[0.98] sm:min-w-88 sm:rounded-full sm:p-1.5 sm:pr-2 sm:hover:bg-leaf"
          >
            <span className="relative flex h-12 shrink-0 items-center pl-1 sm:h-11">
              {previews.length > 0 ? (
                previews.map((item, index) => (
                  <img
                    key={item.cartKey}
                    src={item.image}
                    alt=""
                    className="size-11 rounded-full object-cover ring-[2.5px] ring-ink sm:size-10"
                    style={{
                      marginLeft: index === 0 ? 0 : -12,
                      zIndex: previews.length - index,
                    }}
                  />
                ))
              ) : (
                <span className="grid size-11 place-items-center rounded-full bg-citrus text-ink">
                  <ShoppingBag className="size-5" />
                </span>
              )}
              <span className="absolute -right-1 -top-0.5 z-10 grid min-w-5 place-items-center rounded-full bg-citrus px-1 py-px text-[10px] font-bold leading-4 text-ink ring-2 ring-ink">
                {count}
              </span>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-citrus">View cart</span>
              <span className="block truncate text-[11px] text-white/55">
                {count} {count === 1 ? 'item' : 'items'}
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-citrus py-2 pl-3 pr-2 sm:py-1.5">
              <span className="text-xs font-bold text-ink">{formatPrice(total)}</span>
              <ChevronRight className="size-4 text-ink/70" strokeWidth={2.5} />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
