import { Plus } from 'lucide-react'
import { formatPrice } from '../data/menu'

export default function MenuCard({ item, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white text-left shadow-[0_8px_24px_rgba(26,17,19,0.05)] ring-1 ring-mist/80 transition active:scale-[0.98] sm:rounded-2xl sm:shadow-[0_10px_30px_rgba(26,17,19,0.06)] sm:hover:-translate-y-1 sm:hover:shadow-[0_18px_40px_rgba(26,17,19,0.1)] sm:active:scale-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/45 to-transparent" />
        <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-ink/90 px-2.5 py-1 text-[10px] font-semibold text-citrus backdrop-blur-sm sm:bottom-3 sm:left-3 sm:text-xs">
          {formatPrice(item.price)}
        </span>
      </div>

      <div className="flex flex-1 items-start justify-between gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="min-w-0">
          <h3 className="font-display line-clamp-2 text-sm font-semibold leading-snug text-ink sm:text-lg">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-smoke sm:text-sm">
            {item.desc}
          </p>
        </div>
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-mist text-ink transition group-hover:bg-leaf group-hover:text-white sm:size-9">
          <Plus className="size-3.5 sm:size-4" strokeWidth={2.5} />
        </span>
      </div>
    </button>
  )
}
