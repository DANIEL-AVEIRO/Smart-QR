import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ChefHat, Clock3, CookingPot, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { clearActiveOrderId } from '../utils/activeOrder'

const STATUS_COPY = {
  new: {
    label: 'Received',
    detail: 'Kitchen has your order',
    Icon: Clock3,
  },
  preparing: {
    label: 'Preparing',
    detail: 'Your food is being cooked',
    Icon: CookingPot,
  },
  ready: {
    label: 'Ready',
    detail: 'Please wait — food is on the way',
    Icon: ChefHat,
  },
  served: {
    label: 'Served',
    detail: 'Enjoy your meal',
    Icon: CheckCircle2,
  },
}

export default function OrderStatusBar({ orderId, onClear }) {
  const { count } = useCart()
  const [order, setOrder] = useState(null)
  const [open, setOpen] = useState(false)
  const onClearRef = useRef(onClear)
  onClearRef.current = onClear

  const loadOrder = useCallback(async (id) => {
    if (!id || !isSupabaseConfigured || !supabase) return

    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .single()

    if (error || !data) {
      clearActiveOrderId()
      onClearRef.current?.()
      setOrder(null)
      return
    }

    setOrder(data)
  }, [])

  useEffect(() => {
    if (!orderId) {
      setOrder(null)
      setOpen(false)
      return undefined
    }

    loadOrder(orderId)
    return undefined
  }, [orderId, loadOrder])

  useEffect(() => {
    if (!orderId || !supabase) return undefined

    const channel = supabase
      .channel(`guest-order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder((prev) => (prev ? { ...prev, ...payload.new } : payload.new))
          if (payload.new?.status === 'ready' || payload.new?.status === 'served') {
            setOpen(true)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [orderId])

  if (!order) return null

  const meta = STATUS_COPY[order.status] ?? STATUS_COPY.new
  const Icon = meta.Icon
  const items = order.order_items ?? []
  const offset = count > 0
    ? 'bottom-[calc(5.4rem+env(safe-area-inset-bottom))] sm:bottom-28'
    : 'bottom-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-8'

  return (
    <div className={`pointer-events-none fixed inset-x-0 z-30 px-3 ${offset}`}>
      <motion.div
        layout
        className="pointer-events-auto mx-auto w-full max-w-lg overflow-hidden rounded-[1.35rem] bg-white shadow-[0_12px_36px_rgba(26,17,19,0.14)] ring-1 ring-mist"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-3 px-3.5 py-3 text-left"
        >
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-full ${
              order.status === 'ready' || order.status === 'served'
                ? 'bg-leaf text-white'
                : 'bg-ink text-citrus'
            }`}
          >
            <Icon className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-ink">{meta.label}</span>
            <span className="block truncate text-[11px] text-smoke">{meta.detail}</span>
          </span>
          <span className="shrink-0 text-[11px] font-medium text-smoke">
            #{order.id.slice(0, 8)}
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t border-mist px-3.5 pb-3 pt-2">
                <p className="text-[11px] font-medium text-smoke">
                  Table {order.table_no}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {items.map((item) => (
                    <li key={item.id} className="text-sm text-ink">
                      <span className="font-medium">
                        {item.quantity}× {item.name}
                      </span>
                      {item.notes ? (
                        <span className="mt-0.5 block text-[11px] italic text-leaf">
                          {item.notes}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {order.notes ? (
                  <p className="mt-2 rounded-xl bg-leaf/10 px-3 py-2 text-xs text-ink">
                    {order.notes}
                  </p>
                ) : null}
                {order.status === 'served' && (
                  <button
                    type="button"
                    onClick={() => {
                      clearActiveOrderId()
                      onClear?.()
                    }}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-mist py-2 text-xs font-semibold text-ink"
                  >
                    <X className="size-3.5" />
                    Dismiss
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
