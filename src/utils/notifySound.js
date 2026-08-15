let audioCtx = null

function getContext() {
  if (typeof window === 'undefined') return null
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

function playBeep() {
  const ctx = getContext()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const now = ctx.currentTime
  const tones = [
    { freq: 880, start: 0, dur: 0.12 },
    { freq: 1175, start: 0.14, dur: 0.16 },
  ]

  for (const tone of tones) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = tone.freq
    gain.gain.setValueAtTime(0.0001, now + tone.start)
    gain.gain.exponentialRampToValueAtTime(0.22, now + tone.start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.start + tone.dur)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now + tone.start)
    osc.stop(now + tone.start + tone.dur + 0.02)
  }
}

/** Play kitchen new-order notification (mp3 if present, else Web Audio beep). */
export function playOrderNotify() {
  const audio = new Audio('/sounds/order-chime.mp3')
  audio.volume = 0.85

  const playPromise = audio.play()
  if (playPromise?.then) {
    playPromise.catch(() => {
      playBeep()
    })
  } else {
    playBeep()
  }
}
