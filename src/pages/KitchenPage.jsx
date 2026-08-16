import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  ChefHat,
  Clock3,
  Loader2,
  Receipt,
  RefreshCw,
  Volume2,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import InvoiceVoucher from '../components/InvoiceVoucher'
import { formatPrice } from '../data/menu'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { playOrderNotify } from '../utils/notifySound'

const STATUSES = ['new', 'preparing', 'ready']

const STATUS_META = {
  new: {
    label: 'New',
    next: 'preparing',
    nextLabel: 'Start',
    badge: 'bg-ink text-citrus',
  },
  preparing: {
    label: 'Preparing',
    next: 'ready',
    nextLabel: 'Mark ready',
    badge: 'bg-leaf/12 text-leaf',
  },
  ready: {
    label: 'Ready',
    next: 'served',
    nextLabel: 'Served',
    badge: 'bg-citrus text-ink',
  },
}

function shortId(id) {
  return id?.slice(0, 8) ?? '—'
}

function timeLabel(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function KitchenPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [invoiceOrder, setInvoiceOrder] = useState(null)
  const [lastRefreshed, setLastRefreshed] = useState(null)

  const fetchOrders = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured. Add keys to .env.local')
      setLoading(false)
      return
    }

    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .neq('status', 'served')
      .order('created_at', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setError('')
      setOrders(data ?? [])
      setLastRefreshed(new Date())
    }
    setLoading(false)
  }, [])

  const handleRefresh = async () => {
    if (refreshing) return
    setRefreshing(true)
    const started = Date.now()
    await fetchOrders()
    const wait = 600 - (Date.now() - started)
    if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait))
    setRefreshing(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    if (!supabase) return undefined

    const channel = supabase
      .channel('kitchen-orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        async (payload) => {
          playOrderNotify()

          // order_items insert lands right after orders INSERT — brief retry
          let data = null
          for (let attempt = 0; attempt < 4; attempt += 1) {
            if (attempt > 0) {
              await new Promise((resolve) => setTimeout(resolve, 200))
            }
            const result = await supabase
              .from('orders')
              .select('*, order_items(*)')
              .eq('id', payload.new.id)
              .single()
            data = result.data
            if (data?.order_items?.length) break
          }

          if (data) {
            setOrders((prev) => {
              if (prev.some((o) => o.id === data.id)) return prev
              return [...prev, data]
            })
          } else {
            fetchOrders()
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          const next = payload.new
          setOrders((prev) => {
            if (next.status === 'served') {
              return prev.filter((o) => o.id !== next.id)
            }
            return prev.map((o) => (o.id === next.id ? { ...o, ...next } : o))
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchOrders])

  const grouped = useMemo(() => {
    const map = { new: [], preparing: [], ready: [] }
    for (const order of orders) {
      if (map[order.status]) map[order.status].push(order)
    }
    return map
  }, [orders])

  const updateStatus = async (orderId, status) => {
    if (!supabase) return
    const current = orders.find((o) => o.id === orderId)
    setUpdatingId(orderId)
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (updateError) {
      setError(updateError.message)
    } else {
      setOrders((prev) => {
        if (status === 'served') return prev.filter((o) => o.id !== orderId)
        return prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      })

      // Ready step done → show invoice voucher
      if (status === 'served' && current) {
        setInvoiceOrder({ ...current, status: 'served' })
      }
    }
    setUpdatingId(null)
  }

  return (
    <div className="min-h-svh w-full bg-paper">
      <header className="sticky top-0 z-20 border-b border-mist bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-ink text-citrus shadow-[0_8px_20px_rgba(26,17,19,0.18)]">
              <ChefHat className="size-5" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">Kitchen</h1>
              <p className="text-xs text-smoke sm:text-sm">
                {lastRefreshed
                  ? `Updated ${timeLabel(lastRefreshed.toISOString())}`
                  : `Live orders · <Daniel./>`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => playOrderNotify()}
              className="grid size-10 place-items-center rounded-full bg-white text-ink ring-1 ring-mist transition hover:bg-mist"
              title="Test sound"
            >
              <Volume2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="grid size-10 place-items-center rounded-full bg-ink text-citrus transition hover:bg-leaf hover:text-white disabled:opacity-70"
              title="Refresh orders"
              aria-label="Refresh orders"
            >
              <RefreshCw className={`size-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <Link
              to="/"
              className="inline-flex rounded-full bg-ink px-3 py-2 text-xs font-semibold text-citrus transition hover:bg-leaf hover:text-white sm:px-4 sm:text-sm"
            >
              Menu
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {error && (
          <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-smoke">
            <Loader2 className="size-5 animate-spin" />
            Loading orders…
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {STATUSES.map((status) => (
              <section key={status} className="min-w-0">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2 className="font-display text-lg font-semibold text-ink">
                    {STATUS_META[status].label}
                  </h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${STATUS_META[status].badge}`}
                  >
                    {grouped[status].length}
                  </span>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {grouped[status].length === 0 ? (
                      <p className="rounded-2xl bg-white/70 px-4 py-10 text-center text-sm text-smoke ring-1 ring-dashed ring-mist">
                        No orders
                      </p>
                    ) : (
                      grouped[status].map((order) => (
                        <motion.article
                          key={order.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(26,17,19,0.05)] ring-1 ring-mist"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-lg font-bold text-ink">
                                Table {order.table_no}
                              </p>
                              <p className="mt-0.5 flex items-center gap-1 text-xs text-smoke">
                                <Clock3 className="size-3" />
                                {timeLabel(order.created_at)} · #{shortId(order.id)}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-leaf">
                              {formatPrice(order.total_mmk)}
                            </span>
                          </div>

                          <ul className="mt-3 space-y-2 border-t border-mist pt-3">
                            {(order.order_items ?? []).map((item) => (
                              <li key={item.id} className="text-sm">
                                <p className="font-semibold text-ink">
                                  <span className="mr-1.5 inline-grid min-w-5 place-items-center rounded-full bg-mist px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-ink-soft">
                                    {item.quantity}
                                  </span>
                                  {item.name}
                                </p>
                                {Array.isArray(item.variants) && item.variants.length > 0 && (
                                  <p className="text-xs text-smoke">
                                    {item.variants.map((v) => v.name || v).join(' · ')}
                                  </p>
                                )}
                                {item.notes ? (
                                  <p className="mt-0.5 text-xs italic text-leaf">{item.notes}</p>
                                ) : null}
                              </li>
                            ))}
                          </ul>

                          {order.notes ? (
                            <p className="mt-3 rounded-xl bg-leaf/10 px-3 py-2 text-xs font-medium text-ink">
                              Note: {order.notes}
                            </p>
                          ) : null}

                          <div className="mt-4 flex flex-col gap-2">
                            {status === 'ready' && (
                              <button
                                type="button"
                                onClick={() => setInvoiceOrder(order)}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-mist transition hover:bg-mist"
                              >
                                <Receipt className="size-4" />
                                Invoice
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={updatingId === order.id}
                              onClick={() => updateStatus(order.id, STATUS_META[status].next)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-citrus transition hover:bg-leaf hover:text-white disabled:opacity-50"
                            >
                              {updatingId === order.id ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Check className="size-4" />
                              )}
                              {STATUS_META[status].nextLabel}
                            </button>
                          </div>
                        </motion.article>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <InvoiceVoucher
        order={invoiceOrder}
        open={Boolean(invoiceOrder)}
        onClose={() => setInvoiceOrder(null)}
      />
    </div>
  )
}
