import { AnimatePresence, motion } from 'framer-motion'
import { Check, Minus, Plus, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  calcItemTotal,
  formatPrice,
  getDefaultSelections,
  getSelectedVariantLabels,
} from '../data/menu'
import { useCart } from '../context/CartContext'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

export default function VariantModal({ item, onClose }) {
  const { addItem } = useCart()
  const [selections, setSelections] = useState(() =>
    getDefaultSelections(item?.variants ?? []),
  )
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!item) return
    setSelections(getDefaultSelections(item.variants))
    setQuantity(1)
    setNotes('')
  }, [item])

  useEffect(() => {
    if (!item) return undefined

    lockScroll()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [item, onClose])

  useEffect(() => {
    return () => {
      unlockScroll()
    }
  }, [])

  const total = useMemo(
    () => (item ? calcItemTotal(item.price, item.variants, selections, quantity) : 0),
    [item, selections, quantity],
  )

  const selectSingle = (groupId, optionId) => {
    setSelections((prev) => ({ ...prev, [groupId]: optionId }))
  }

  const toggleMulti = (groupId, optionId) => {
    setSelections((prev) => {
      const current = Array.isArray(prev[groupId]) ? prev[groupId] : []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [groupId]: next }
    })
  }

  return (
    <AnimatePresence onExitComplete={unlockScroll}>
      {item && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <div className="relative flex h-full items-end justify-center sm:items-center sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="variant-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 flex max-h-[min(92svh,100%)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-paper shadow-2xl sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-mist px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
                <div className="min-w-0 pr-1">
                  <h2
                    id="variant-title"
                    className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl"
                  >
                    {item.name}
                  </h2>
                  <p className="mt-1 text-xs text-smoke sm:text-sm">{item.desc}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={onClose}
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-ink transition hover:bg-ink hover:text-citrus"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:space-y-6 sm:px-5 sm:py-5 [&::-webkit-scrollbar]:hidden">
                {item.variants.map((group) => (
                  <div key={group.id}>
                    <div className="mb-2.5 flex items-baseline justify-between gap-2 sm:mb-3 sm:gap-3">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-smoke sm:text-sm">
                        {group.label}
                      </h3>
                      <span className="shrink-0 text-[11px] text-smoke sm:text-xs">
                        {group.type === 'multi' ? 'Choose any' : 'Choose one'}
                      </span>
                    </div>

                    <div className="grid gap-2">
                      {group.options.map((option) => {
                        const selected =
                          group.type === 'single'
                            ? selections[group.id] === option.id
                            : (selections[group.id] ?? []).includes(option.id)

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              group.type === 'single'
                                ? selectSingle(group.id, option.id)
                                : toggleMulti(group.id, option.id)
                            }
                            className={`flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-left transition sm:gap-3 sm:px-4 sm:py-3 ${
                              selected
                                ? 'bg-ink text-white'
                                : 'bg-white text-ink ring-1 ring-mist hover:bg-mist'
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                              <span
                                className={`grid size-5 shrink-0 place-items-center rounded-full ${
                                  selected ? 'bg-citrus text-ink' : 'bg-mist text-transparent'
                                }`}
                              >
                                <Check className="size-3" strokeWidth={3} />
                              </span>
                              <span className="truncate text-sm font-medium">{option.name}</span>
                            </span>
                            <span
                              className={`shrink-0 text-xs sm:text-sm ${
                                selected ? 'text-citrus' : 'text-smoke'
                              }`}
                            >
                              {option.priceDelta === 0
                                ? 'Included'
                                : `+${formatPrice(option.priceDelta)}`}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}

                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-smoke">
                    Note
                  </span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, 120))}
                    rows={2}
                    placeholder="No onion, less spicy…"
                    className="mt-2 w-full resize-none rounded-2xl border-0 bg-white px-3 py-2.5 text-sm text-ink ring-1 ring-mist outline-none placeholder:text-smoke/70 focus:ring-2 focus:ring-leaf"
                  />
                </label>
              </div>

              <div className="shrink-0 border-t border-mist px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-mist p-1">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="grid size-9 place-items-center rounded-full bg-white text-ink disabled:opacity-40"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="grid size-9 place-items-center rounded-full bg-white text-ink"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!item) return
                      addItem({
                        menuItem: item,
                        selections,
                        quantity,
                        variantLabels: getSelectedVariantLabels(item.variants, selections),
                        lineTotal: total,
                        notes,
                      })
                      onClose()
                    }}
                    className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-3 py-3 text-sm font-semibold text-citrus transition hover:bg-leaf hover:text-white sm:px-5"
                  >
                    <span className="truncate">Add · {formatPrice(total)}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
