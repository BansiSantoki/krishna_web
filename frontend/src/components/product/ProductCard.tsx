import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, GitCompareIcon, HeartIcon, RotateCw as RotateIcon, ShoppingBagIcon, VideoIcon } from 'lucide-react';
import type { Product } from '../../types';
import { emiPerMonth, formatGrams, formatINR, priceBreakup } from '../../utils/pricing';
import { useStore } from '../../contexts/StoreContext';
import { Rating } from '../ui/Rating';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onQuickView, className }: ProductCardProps) {
  const { toggleWishlist, toggleCompare, isWishlisted, isCompared, addToCart } = useStore();
  const [hovered, setHovered] = useState(false);
  const breakup = priceBreakup(product);
  const secondary = product.images[1] ?? product.images[0];

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn('group relative flex flex-col bg-white', className)}>
      
      <div className="relative overflow-hidden bg-beige">
        <Link to={`/product/${product.slug}`} aria-label={product.name} className="block">
          <div className="relative aspect-[4/5] w-full">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out',
                hovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
              )} />
            
            <img
              src={secondary}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-out',
                hovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
              )} />
            
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2">
          {product.badge &&
          <span className="bg-ink px-2.5 py-1 text-[10px] uppercase tracking-luxe text-gold">{product.badge}</span>
          }
          {product.discountPct > 0 &&
          <span className="bg-gold px-2.5 py-1 text-[10px] uppercase tracking-luxe text-ink">
              {product.discountPct}% off
            </span>
          }
          {!product.inStock &&
          <span className="bg-white/90 px-2.5 py-1 text-[10px] uppercase tracking-luxe text-ink-muted">
              Made to order
            </span>
          }
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <IconAction
            label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            active={isWishlisted(product.id)}
            onClick={() => toggleWishlist(product)}
            visible={hovered || isWishlisted(product.id)}>
            
            <HeartIcon className={cn('h-4 w-4', isWishlisted(product.id) && 'fill-current')} />
          </IconAction>
          <IconAction
            label={isCompared(product.id) ? 'Remove from compare' : 'Add to compare'}
            active={isCompared(product.id)}
            onClick={() => toggleCompare(product)}
            visible={hovered || isCompared(product.id)}>
            
            <GitCompareIcon className="h-4 w-4" />
          </IconAction>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 flex gap-1.5 text-[10px] uppercase tracking-widest text-white">
          {product.has360 &&
          <span className="glass-dark flex items-center gap-1 px-2 py-1">
              <RotateIcon className="h-3 w-3" /> 360°
            </span>
          }
          {product.hasVideo &&
          <span className="glass-dark flex items-center gap-1 px-2 py-1">
              <VideoIcon className="h-3 w-3" /> Video
            </span>
          }
        </div>

        <motion.div
          initial={false}
          animate={{ y: hovered ? 0 : 56, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 flex">
          
          {onQuickView &&
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="flex flex-1 items-center justify-center gap-2 bg-white/95 py-3 text-[10px] uppercase tracking-luxe text-ink transition-colors hover:bg-beige">
            
              <EyeIcon className="h-3.5 w-3.5" /> Quick view
            </button>
          }
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex flex-1 items-center justify-center gap-2 bg-ink py-3 text-[10px] uppercase tracking-luxe text-gold transition-colors hover:bg-ink-soft">
            
            <ShoppingBagIcon className="h-3.5 w-3.5" /> Add to bag
          </button>
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-4">
        <p className="eyebrow text-ink-muted">{product.metalLabel}</p>
        <h3 className="font-serif text-lg leading-snug text-ink">
          <Link to={`/product/${product.slug}`} className="transition-colors hover:text-gold-deep">
            {product.name}
          </Link>
        </h3>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-serif text-xl text-ink">{formatINR(breakup.total)}</span>
          {breakup.savings > 0 &&
          <span className="text-sm text-ink-muted line-through">{formatINR(breakup.mrp)}</span>
          }
        </div>
        <p className="text-xs text-ink-muted">
          {formatGrams(product.weight)} · {product.purity} · Making {product.makingPct}%
        </p>
        <p className="text-xs text-gold-deep">EMI from {formatINR(emiPerMonth(breakup.total))}/mo</p>
      </div>
    </motion.article>);

}

function IconAction({
  children,
  label,
  onClick,
  active,
  visible






}: {children: React.ReactNode;label: string;onClick: () => void;active: boolean;visible: boolean;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex h-9 w-9 items-center justify-center border transition-all duration-300',
        active ? 'border-gold bg-gold text-ink' : 'border-ink/10 bg-white/90 text-ink hover:border-gold hover:text-gold-deep',
        visible ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'
      )}>
      
      {children}
    </button>);

}