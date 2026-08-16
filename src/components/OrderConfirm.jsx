import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatPrice } from '../data/menu'
import { useCart } from '../context/CartContext'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

export default function OrderConfirm({ open, onClose, onPlaced }) {
  const { items, total, clear } = useCart()
  const [tableNo, setTableNo] = useState('T1')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successId, setSuccessId] = useState(null)

  useEffect(() => {
    if (!open) return undefined
    lockScroll()
    setError('')
    setSuccessId(null)
    setSubmitting(false)
    setNotes('')
    return () => unlockScroll()
  }, [open])

  const placeOrder = async () => {
    setError('')
    setSubmitting(true)

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local')
      setSubmitting(false)
      return
    }

    if (items.length === 0) {
      setError('Cart is empty.')
      setSubmitting(false)
      return
    }

    const trimmedTable = tableNo.trim() || 'T1'

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        table_no: trimmedTable,
        status: 'new',
        total_mmk: total,
        notes: notes.trim(),
      })
      .select('id')
      .single()

    if (orderError || !order) {
      setError(orderError?.message || 'Could not create order.')
      setSubmitting(false)
      return
    }

    const rows = items.map((item) => ({
      order_id: order.id,
      name: item.name,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      variants: item.variantLabels ?? [],
      line_total: item.lineTotal,
      notes: item.notes ?? '',
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(rows)

    if (itemsError) {
      setError(itemsError.message || 'Order created but items failed to save.')
      setSubmitting(false)
      return
    }

    clear()
    setSuccessId(order.id)
    setSubmitting(false)
    onPlaced?.(order.id)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close confirm"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <div className="relative flex h-full items-end justify-center sm:items-center sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 flex max-h-[min(92svh,100%)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-paper shadow-2xl sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-mist px-4 py-3.5 sm:px-5 sm:py-4">
                <h2 id="confirm-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {successId ? 'Order sent' : 'Confirm order'}
                </h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="grid size-9 place-items-center rounded-full bg-mist text-ink transition hover:bg-ink hover:text-citrus"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden">
                {successId ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <span className="grid size-14 place-items-center rounded-full bg-leaf/15 text-leaf">
                      <CheckCircle2 className="size-7" />
                    </span>
                    <p className="mt-4 font-display text-xl font-semibold text-ink">Sent to kitchen</p>
                    <p className="mt-2 text-sm text-smoke">
                      Track it on the menu — kitchen will update as they cook.
                    </p>
                    <p className="mt-2 text-sm text-smoke">
                      Order ID: <span className="font-mono text-ink">{successId.slice(0, 8)}</span>
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-citrus transition hover:bg-leaf hover:text-white"
                    >
                      Back to menu
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="block text-sm font-semibold text-ink">
                      Table number
                      <input
                        type="text"
                        value={tableNo}
                        onChange={(e) => setTableNo(e.target.value)}
                        className="mt-2 w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-ink ring-1 ring-mist outline-none focus:ring-2 focus:ring-leaf"
                        placeholder="T1"
                      />
                    </label>

                    <ul className="mt-5 space-y-3">
                      {items.map((item) => (
                        <li
                          key={item.cartKey}
                          className="flex items-start justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-mist"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-ink">
                              {item.quantity}× {item.name}
                            </p>
                            {item.variantLabels?.length > 0 && (
                              <p className="mt-1 text-xs text-smoke">
                                {item.variantLabels.map((v) => v.name).join(' · ')}
                              </p>
                            )}
                            {item.notes ? (
                              <p className="mt-1 text-xs italic text-leaf">{item.notes}</p>
                            ) : null}
                          </div>
                          <span className="shrink-0 text-sm font-semibold">
                            {formatPrice(item.lineTotal)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <label className="mt-5 block text-sm font-semibold text-ink">
                      Note for kitchen
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value.slice(0, 180))}
                        rows={2}
                        placeholder="Allergy, extra napkins, wait 10 minutes…"
                        className="mt-2 w-full resize-none rounded-2xl border-0 bg-white px-4 py-3 text-sm font-normal text-ink ring-1 ring-mist outline-none placeholder:text-smoke/70 focus:ring-2 focus:ring-leaf"
                      />
                    </label>

                    {error && (
                      <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
                        {error}
                      </p>
                    )}
                  </>
                )}
              </div>

              {!successId && (
                <div className="shrink-0 border-t border-mist px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-smoke">Total</span>
                    <span className="font-display text-lg font-bold text-ink">{formatPrice(total)}</span>
                  </div>
                  <button
                    type="button"
                    disabled={submitting || items.length === 0}
                    onClick={placeOrder}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-citrus transition hover:bg-leaf hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Placing order…
                      </>
                    ) : (
                      'Place order'
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
