import { AnimatePresence, motion } from 'framer-motion'
import {
  Beef,
  Coffee,
  Cookie,
  Fish,
  Flame,
  LayoutGrid,
  Leaf,
  Pizza,
  Salad,
  Shell,
  UtensilsCrossed,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { categories, menuItems } from '../data/menu'
import MenuCard from './MenuCard'
import VariantModal from './VariantModal'

const ALL_ID = 'all'

const iconMap = {
  [ALL_ID]: LayoutGrid,
  burgers: Beef,
  pizza: Pizza,
  pasta: UtensilsCrossed,
  salads: Salad,
  seafood: Fish,
  grilled: Flame,
  sushi: Shell,
  desserts: Cookie,
  drinks: Coffee,
  breakfast: Leaf,
}

const filterCategories = [
  {
    id: ALL_ID,
    name: 'All',
    description: 'Every dish from every kitchen.',
  },
  ...categories,
]

export default function MenuSection() {
  const [active, setActive] = useState(ALL_ID)
  const [selectedItem, setSelectedItem] = useState(null)

  const activeCategory = useMemo(
    () => filterCategories.find((c) => c.id === active) ?? filterCategories[0],
    [active],
  )

  const filtered = useMemo(
    () =>
      active === ALL_ID
        ? menuItems
        : menuItems.filter((item) => item.categoryId === active),
    [active],
  )

  return (
    <section id="menu" className="relative px-3 pb-8 pt-5 sm:px-5 sm:pb-8 sm:pt-8 md:px-8 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="sticky top-0 z-20 -mx-3 bg-paper/90 px-3 py-2 backdrop-blur-md sm:-mx-5 sm:px-5 md:static md:mx-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
          <div
            id="categories"
            className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filterCategories.map((category) => {
              const Icon = iconMap[category.id]
              const selected = category.id === active

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActive(category.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                    selected
                      ? 'bg-ink text-citrus'
                      : 'bg-white text-ink-soft ring-1 ring-mist hover:bg-mist'
                  }`}
                >
                  <Icon className="size-3.5 sm:size-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-2 sm:mt-8 sm:gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {activeCategory.name}
            </h3>
            <p className="mt-1 text-sm text-smoke sm:text-base">{activeCategory.description}</p>
          </div>
          <p className="text-xs font-medium text-leaf sm:text-sm">{filtered.length} dishes</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <VariantModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  )
}
