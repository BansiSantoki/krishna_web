import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import type { Product } from '../../types';
import { products as allProducts } from '../../data/products';
import { priceBreakup } from '../../utils/pricing';
import { ProductGrid } from './ProductGrid';
import { emptyFilters, FilterPanel, type FilterState } from './FilterPanel';
import { cn } from '../../utils/cn';

export type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'bestselling' | 'featured' | 'popularity';

const sortOptions: Array<{label: string;value: SortKey;}> = [
{ label: 'Newest first', value: 'newest' },
{ label: 'Price: low to high', value: 'price-asc' },
{ label: 'Price: high to low', value: 'price-desc' },
{ label: 'Best selling', value: 'bestselling' },
{ label: 'Featured', value: 'featured' },
{ label: 'Popularity', value: 'popularity' }];


interface BrowserProps {
  /** Restrict the pool before filters apply. */
  pool?: Product[];
  initialFilters?: Partial<FilterState>;
  subCategory?: string;
}

export function Browser({ pool, initialFilters, subCategory }: BrowserProps) {
  const [filters, setFilters] = useState<FilterState>({ ...emptyFilters, ...initialFilters });
  const [sort, setSort] = useState<SortKey>('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const source = pool ?? allProducts;

  const results = useMemo(() => {
    const filtered = source.filter((product) => {
      const total = priceBreakup(product).total;
      if (subCategory && product.subCategory !== subCategory) return false;
      if (total > filters.maxPrice) return false;
      if (product.weight > filters.maxWeight) return false;
      if (filters.category.length > 0 && !filters.category.includes(product.category)) return false;
      if (filters.metal.length > 0 && !filters.metal.includes(product.metal)) return false;
      if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) return false;
      if (filters.offers && product.discountPct <= 0) return false;
      if (filters.occasion.length > 0 && !filters.occasion.some((item) => product.occasion.includes(item))) return false;
      if (filters.stone.length === 1) {
        const wantsStones = filters.stone[0] === 'With stones';
        if (wantsStones !== product.stoneValue > 0) return false;
      }
      if (filters.availability.length === 1) {
        const wantsInStock = filters.availability[0] === 'In stock';
        if (wantsInStock !== product.inStock) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => priceBreakup(a).total - priceBreakup(b).total);
        break;
      case 'price-desc':
        sorted.sort((a, b) => priceBreakup(b).total - priceBreakup(a).total);
        break;
      case 'bestselling':
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'popularity':
        sorted.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
        break;
      case 'newest':
        sorted.sort((a, b) => Number(b.tags.includes('new')) - Number(a.tags.includes('new')));
        break;
      default:
        sorted.sort((a, b) => Number(b.tags.includes('featured')) - Number(a.tags.includes('featured')));
    }
    return sorted;
  }, [source, filters, sort, subCategory]);

  const activeChips = [
  ...filters.category,
  ...filters.metal,
  ...filters.occasion,
  ...filters.gender,
  ...filters.stone,
  ...filters.availability,
  ...(filters.offers ? ['Offers'] : [])];


  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
          <FilterPanel
            value={filters}
            onChange={setFilters}
            onClear={() => setFilters({ ...emptyFilters, ...initialFilters })}
            resultCount={results.length} />
          
        </div>
      </aside>

      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 border border-ink/15 px-4 py-2 text-[11px] uppercase tracking-luxe text-ink lg:hidden">
              
              <SlidersHorizontalIcon className="h-4 w-4" /> Filters
            </button>
            <p className="text-sm text-ink-muted">{results.length} pieces</p>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <span className="eyebrow text-ink-muted">Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-gold">
              
              {sortOptions.map((option) =>
              <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )}
            </select>
          </label>
        </div>

        {activeChips.length > 0 &&
        <div className="mb-8 flex flex-wrap gap-2">
            {activeChips.map((chip) =>
          <span
            key={chip}
            className="flex items-center gap-2 border border-gold/50 bg-gold/10 px-3 py-1 text-xs capitalize text-gold-deep">
            
                {chip}
              </span>
          )}
            <button
            type="button"
            onClick={() => setFilters({ ...emptyFilters, ...initialFilters })}
            className="text-xs uppercase tracking-luxe text-ink-muted underline underline-offset-4 hover:text-ink">
            
              Reset
            </button>
          </div>
        }

        <ProductGrid products={results} />
      </div>

      <AnimatePresence>
        {drawerOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] bg-ink/50 lg:hidden"
          onClick={() => setDrawerOpen(false)}>
          
            <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className={cn('absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white p-6')}>
            
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-xl text-ink">Filters</h2>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close filters">
                  <XIcon className="h-5 w-5 text-ink" />
                </button>
              </div>
              <FilterPanel
              value={filters}
              onChange={setFilters}
              onClear={() => setFilters({ ...emptyFilters, ...initialFilters })}
              resultCount={results.length} />
            
              <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="mt-8 w-full bg-ink py-4 text-[11px] uppercase tracking-luxe text-gold">
              
                Show {results.length} pieces
              </button>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}