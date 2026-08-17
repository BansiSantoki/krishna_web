import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheckIcon, TruckIcon, XIcon } from 'lucide-react';
import type { Product } from '../../types';
import { formatINR, priceBreakup } from '../../utils/pricing';
import { useStore } from '../../contexts/StoreContext';
import { PriceBreakdown } from '../ui/PriceBreakdown';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  return (
    <AnimatePresence>
      {product &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view — ${product.name}`}>
        
          <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative grid max-h-[88vh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-white md:grid-cols-2">
          
            <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 text-ink transition-colors hover:text-gold-deep">
            
              <XIcon className="h-4 w-4" />
            </button>
            <div className="bg-beige">
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-8">
              <div>
                <p className="eyebrow text-gold-deep">{product.metalLabel}</p>
                <h2 className="mt-2 font-serif text-2xl text-ink">{product.name}</h2>
              </div>
              <Rating value={product.rating} reviews={product.reviews} />
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-ink">{formatINR(priceBreakup(product).total)}</span>
                {product.discountPct > 0 &&
              <span className="text-ink-muted line-through">{formatINR(priceBreakup(product).mrp)}</span>
              }
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{product.description}</p>
              <PriceBreakdown product={product} defaultOpen />
              <div className="grid grid-cols-2 gap-3 text-xs text-ink-muted">
                <span className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 text-gold-deep" /> {product.hallmark}
                </span>
                <span className="flex items-center gap-2">
                  <TruckIcon className="h-4 w-4 text-gold-deep" /> Delivers in {product.deliveryDays} days
                </span>
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Button variant="gold" onClick={() => addToCart(product)}>
                  Add to bag
                </Button>
                <Button variant="outline" onClick={() => toggleWishlist(product)}>
                  {isWishlisted(product.id) ? 'Saved' : 'Wishlist'}
                </Button>
                <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="self-center text-[11px] uppercase tracking-luxe text-gold-deep underline underline-offset-4">
                
                  Full details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}