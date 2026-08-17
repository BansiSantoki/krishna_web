import React from 'react';
import { toast } from 'sonner';
import { Share2Icon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { productById } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button, ButtonLink } from '../components/ui/Button';
import type { Product } from '../types';

export function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.map(productById).filter(Boolean) as Product[];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-gold-deep">Saved pieces</p>
          <h1 className="mt-3 font-serif text-4xl text-ink">Your Wishlist</h1>
          <p className="mt-2 text-sm text-ink-muted">{items.length} pieces saved</p>
        </div>
        {items.length > 0 &&
        <Button
          variant="outline"
          onClick={() => toast.success('Wishlist link copied', { description: 'Share it with family before the wedding.' })}>
          
            <Share2Icon className="h-4 w-4" /> Share wishlist
          </Button>
        }
      </div>

      <div className="mt-12">
        {items.length === 0 ?
        <div className="flex flex-col items-center gap-4 border border-dashed border-ink/15 py-24 text-center">
            <p className="font-serif text-2xl text-ink">Nothing saved yet</p>
            <p className="max-w-sm text-sm text-ink-muted">
              Tap the heart on any piece to keep it here — your list is shareable, which helps when the family is
              deciding together.
            </p>
            <ButtonLink to="/shop" variant="gold">
              Browse the collection
            </ButtonLink>
          </div> :

        <ProductGrid products={items} columns={4} />
        }
      </div>
    </div>);

}