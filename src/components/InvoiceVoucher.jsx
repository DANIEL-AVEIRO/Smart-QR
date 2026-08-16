import { AnimatePresence, motion } from 'framer-motion'
import { Printer, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { formatPrice } from '../data/menu'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

function shortId(id) {
  return id?.slice(0, 8)?.toUpperCase() ?? '—'
}

function formatDateTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function variantText(variants) {
  if (!Array.isArray(variants) || variants.length === 0) return ''
  return variants.map((v) => v.name || v).join(' · ')
}

function buildPrintHtml(order, issuedAt) {
  const items = order.order_items ?? []
  const rows = items
    .map((item) => {
      const variants = variantText(item.variants)
      return `
        <tr>
          <td>
            <strong>${escapeHtml(item.name)}</strong>
            ${variants ? `<div class="muted">${escapeHtml(variants)}</div>` : ''}
            ${item.notes ? `<div class="muted">Note: ${escapeHtml(item.notes)}</div>` : ''}
            <div class="muted">@ ${escapeHtml(formatPrice(item.unit_price))}</div>
          </td>
          <td class="center">${escapeHtml(item.quantity)}</td>
          <td class="right">${escapeHtml(formatPrice(item.line_total))}</td>
        </tr>
      `
    })
    .join('')

  const statusLabel = order.status === 'served' ? 'Served' : order.status

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Invoice #${escapeHtml(shortId(order.id))}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 16px;
      font-family: Georgia, 'Times New Roman', serif;
      color: #1a1113;
      background: #fff;
    }
    .sheet { max-width: 420px; margin: 0 auto; }
    .brand { text-align: center; border-bottom: 1px dashed #7a6c68; padding-bottom: 12px; }
    .brand h1 { margin: 0; font-size: 28px; }
    .brand .eyebrow {
      margin: 6px 0 0;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #7a6c68;
      font-family: system-ui, sans-serif;
    }
    .brand .id {
      margin: 10px 0 0;
      font-family: ui-monospace, monospace;
      font-size: 14px;
      font-weight: 700;
    }
    .meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 12px;
      margin-top: 14px;
      font-family: system-ui, sans-serif;
      font-size: 13px;
    }
    .meta .label { color: #7a6c68; font-size: 11px; }
    .meta .value { font-weight: 600; margin-top: 2px; }
    .meta .right { text-align: right; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
      font-family: system-ui, sans-serif;
      font-size: 13px;
    }
    th {
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #7a6c68;
      border-top: 1px solid #ede4df;
      border-bottom: 1px solid #ede4df;
      padding: 8px 4px;
    }
    th.center, td.center { text-align: center; }
    th.right, td.right { text-align: right; }
    td {
      padding: 10px 4px;
      border-bottom: 1px solid #ede4df;
      vertical-align: top;
    }
    .muted { color: #7a6c68; font-size: 11px; margin-top: 2px; }
    .total {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 2px solid #1a1113;
      font-family: system-ui, sans-serif;
    }
    .total .label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #7a6c68;
    }
    .total .amount {
      font-family: Georgia, serif;
      font-size: 24px;
      font-weight: 700;
    }
    .thanks {
      margin-top: 28px;
      text-align: center;
      font-size: 12px;
      color: #7a6c68;
      font-family: system-ui, sans-serif;
    }
    @page { margin: 12mm; }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="brand">
      <h1>&lt;Daniel./&gt;</h1>
      <p class="eyebrow">Invoice voucher</p>
      <p class="id">#${escapeHtml(shortId(order.id))}</p>
    </div>
    <div class="meta">
      <div>
        <div class="label">Table</div>
        <div class="value">${escapeHtml(order.table_no)}</div>
      </div>
      <div class="right">
        <div class="label">Status</div>
        <div class="value">${escapeHtml(statusLabel)}</div>
      </div>
      <div>
        <div class="label">Ordered</div>
        <div class="value">${escapeHtml(formatDateTime(order.created_at))}</div>
      </div>
      <div class="right">
        <div class="label">Issued</div>
        <div class="value">${escapeHtml(formatDateTime(issuedAt))}</div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th class="center">Qty</th>
          <th class="right">Amount</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="total">
      <span class="label">Total</span>
      <span class="amount">${escapeHtml(formatPrice(order.total_mmk))}</span>
    </div>
    ${order.notes ? `<p class="thanks" style="text-align:left;color:#1a1113">Note: ${escapeHtml(order.notes)}</p>` : ''}
    <p class="thanks">Thank you · Please keep this voucher</p>
  </div>
</body>
</html>`
}

function printInvoice(order, issuedAt) {
  const html = buildPrintHtml(order, issuedAt)
  const frame = document.createElement('iframe')
  frame.setAttribute('aria-hidden', 'true')
  frame.style.cssText =
    'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none;'
  document.body.appendChild(frame)

  const doc = frame.contentDocument
  const win = frame.contentWindow
  if (!doc || !win) {
    frame.remove()
    return
  }

  doc.open()
  doc.write(html)
  doc.close()

  const cleanup = () => {
    frame.remove()
  }

  const triggerPrint = () => {
    try {
      win.focus()
      win.print()
    } finally {
      // Give the print dialog a moment before removing the frame
      window.setTimeout(cleanup, 500)
    }
  }

  // Wait for layout/fonts in the iframe
  if (doc.readyState === 'complete') {
    window.setTimeout(triggerPrint, 50)
  } else {
    frame.onload = () => window.setTimeout(triggerPrint, 50)
  }
}

export default function InvoiceVoucher({ order, open, onClose }) {
  const issuedAtRef = useRef(new Date().toISOString())

  useEffect(() => {
    if (!open) return undefined
    issuedAtRef.current = new Date().toISOString()
    lockScroll()
    return () => unlockScroll()
  }, [open])

  const items = order?.order_items ?? []
  const issuedAt = issuedAtRef.current

  const handlePrint = () => {
    if (!order) return
    printInvoice(order, issuedAt)
  }

  return (
    <AnimatePresence>
      {open && order && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close invoice"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <div className="relative flex h-full items-end justify-center sm:items-center sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="invoice-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 flex max-h-[min(92svh,100%)] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-mist px-4 py-3.5 sm:px-5">
                <h2 id="invoice-title" className="font-display text-xl font-bold text-ink">
                  Invoice voucher
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

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
                <header className="border-b border-dashed border-smoke/40 pb-4 text-center">
                  <p className="font-display text-2xl font-bold tracking-tight text-ink">{'<Daniel./>'}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-smoke">Invoice voucher</p>
                  <p className="mt-3 font-mono text-sm font-semibold text-ink">
                    #{shortId(order.id)}
                  </p>
                </header>

                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-smoke">Table</dt>
                    <dd className="font-semibold text-ink">{order.table_no}</dd>
                  </div>
                  <div className="text-right">
                    <dt className="text-xs text-smoke">Status</dt>
                    <dd className="font-semibold capitalize text-leaf">
                      {order.status === 'served' ? 'Served' : order.status}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-smoke">Ordered</dt>
                    <dd className="text-ink">{formatDateTime(order.created_at)}</dd>
                  </div>
                  <div className="text-right">
                    <dt className="text-xs text-smoke">Issued</dt>
                    <dd className="text-ink">{formatDateTime(issuedAt)}</dd>
                  </div>
                </dl>

                <table className="mt-5 w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-mist text-left text-xs uppercase tracking-wide text-smoke">
                      <th className="py-2 pr-2 font-semibold">Item</th>
                      <th className="py-2 px-1 text-center font-semibold">Qty</th>
                      <th className="py-2 pl-2 text-right font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-mist/80 align-top">
                        <td className="py-2.5 pr-2">
                          <p className="font-semibold text-ink">{item.name}</p>
                          {Array.isArray(item.variants) && item.variants.length > 0 && (
                            <p className="mt-0.5 text-xs text-smoke">
                              {item.variants.map((v) => v.name || v).join(' · ')}
                            </p>
                          )}
                          {item.notes ? (
                            <p className="mt-0.5 text-xs italic text-leaf">{item.notes}</p>
                          ) : null}
                          <p className="mt-0.5 text-xs text-smoke">
                            @ {formatPrice(item.unit_price)}
                          </p>
                        </td>
                        <td className="py-2.5 px-1 text-center font-medium text-ink">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 pl-2 text-right font-semibold text-ink">
                          {formatPrice(item.line_total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 flex items-end justify-between border-t-2 border-ink pt-3">
                  <span className="text-sm font-semibold uppercase tracking-wide text-smoke">
                    Total
                  </span>
                  <span className="font-display text-2xl font-bold text-ink">
                    {formatPrice(order.total_mmk)}
                  </span>
                </div>

                {order.notes ? (
                  <p className="mt-4 rounded-xl bg-leaf/10 px-3 py-2 text-xs text-ink">
                    Note: {order.notes}
                  </p>
                ) : null}

                <p className="mt-6 text-center text-xs text-smoke">
                  Thank you · Please keep this voucher
                </p>
              </div>

              <div className="shrink-0 border-t border-mist px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-full bg-mist px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink/10"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-citrus transition hover:bg-leaf hover:text-white"
                  >
                    <Printer className="size-4" />
                    Print
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
