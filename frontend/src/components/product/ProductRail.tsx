import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickView } from './QuickView';

interface ProductRailProps {
  products: Product[];
}

export function ProductRail({ products }: ProductRailProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const scrollBy = (direction: 1 | -1) => {
    scroller.current?.scrollBy({ left: direction * 340, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        
        {products.map((product) =>
        <div key={product.id} className="w-[70vw] shrink-0 snap-start sm:w-[300px]">
            <ProductCard product={product} onQuickView={setQuickView} />
          </div>
        )}
      </div>
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold-deep">
          
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-gold hover:text-gold-deep">
          
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>);

}