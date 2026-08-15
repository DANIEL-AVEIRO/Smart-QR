import { motion } from 'framer-motion'
import { QrCode } from 'lucide-react'

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-1 sm:px-5 sm:pt-8 sm:pb-2 md:pt-10"
    >
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <span className="grid size-12 place-items-center rounded-full bg-ink text-citrus shadow-[0_10px_28px_rgba(20,24,22,0.18)] sm:size-14 md:size-16">
          <QrCode className="size-6 sm:size-7 md:size-8" strokeWidth={2.25} />
        </span>
        <span className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl md:text-3xl">
          Smart QR
        </span>
      </div>
    </motion.div>
  )
}
