const STORAGE_KEY = 'qr-active-order-id'

export function getActiveOrderId() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setActiveOrderId(id) {
  try {
    if (id) localStorage.setItem(STORAGE_KEY, id)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore quota / private mode
  }
}

export function clearActiveOrderId() {
  setActiveOrderId(null)
}
