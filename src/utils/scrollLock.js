let locks = 0
let savedScrollY = 0

function getScrollbarWidth() {
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth)
}

export function lockScroll() {
  locks += 1
  if (locks > 1) return

  const { body, documentElement } = document
  savedScrollY = window.scrollY
  const scrollbarWidth = getScrollbarWidth()
  const pad = scrollbarWidth > 0 ? `${scrollbarWidth}px` : ''

  documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`)
  documentElement.classList.add('scroll-locked')
  documentElement.style.overflow = 'hidden'
  if (pad) documentElement.style.paddingRight = pad

  body.style.overflow = 'hidden'
  body.style.paddingRight = pad
}

export function unlockScroll() {
  if (locks === 0) return

  locks -= 1
  if (locks > 0) return

  const { body, documentElement } = document

  documentElement.classList.remove('scroll-locked')
  documentElement.style.overflow = ''
  documentElement.style.paddingRight = ''
  documentElement.style.removeProperty('--scrollbar-compensation')

  body.style.overflow = ''
  body.style.paddingRight = ''
}
