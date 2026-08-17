import React, { useState } from 'react';
import { SearchXIcon } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickView } from './QuickView';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../utils/cn';

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  emptyMessage?: string;
}

export function ProductGrid({ products, columns = 3, emptyMessage }: ProductGridProps) {
  const [quickView, setQuickView] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 border border-dashed border-ink/15 py-24 text-center">
        <SearchXIcon className="h-8 w-8 text-gold-deep" />
        <p className="font-serif text-xl text-ink">Nothing matches those filters</p>
        <p className="max-w-sm text-sm text-ink-muted">
          {emptyMessage ?? 'Try widening the price range or clearing a filter to see more of the collection.'}
        </p>
      </div>);

  }

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2',
          columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
        )}>
        
        {products.map((product, index) =>
        <Reveal key={product.id} delay={Math.min(index, 6) * 0.05} as="div">
            <ProductCard product={product} onQuickView={setQuickView} />
          </Reveal>
        )}
      </div>
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>);

}