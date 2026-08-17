import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import type { Product } from '../../types';
import { formatGrams, formatINR, priceBreakup, rateFor } from '../../utils/pricing';
import { cn } from '../../utils/cn';

interface PriceBreakdownProps {
  product: Product;
  defaultOpen?: boolean;
  collapsible?: boolean;
  className?: string;
}

export function PriceBreakdown({ product, defaultOpen = false, collapsible = true, className }: PriceBreakdownProps) {
  const [open, setOpen] = useState(defaultOpen);
  const breakup = priceBreakup(product);
  const isOpen = collapsible ? open : true;

  const rows = [
  {
    label: `${product.metalLabel} · ${formatGrams(product.weight)} × ${formatINR(rateFor(product.metal))}/g`,
    value: breakup.metalValue
  },
  ...(breakup.stoneValue > 0 ?
  [{ label: product.stoneDetail ? `Stones · ${product.stoneDetail}` : 'Stones', value: breakup.stoneValue }] :
  []),
  { label: `Making charges · ${product.makingPct}%`, value: breakup.making },
  { label: 'GST · 3%', value: breakup.gst }];


  return (
    <div className={cn('border border-ink/10 bg-beige/60', className)}>
      {collapsible &&
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-4 py-3 text-left">
        
          <span className="eyebrow text-gold-deep">Transparent price breakup</span>
          <ChevronDownIcon className={cn('h-4 w-4 text-ink-muted transition-transform', isOpen && 'rotate-180')} />
        </button>
      }
      <AnimatePresence initial={false}>
        {isOpen &&
        <motion.div
          initial={collapsible ? { height: 0, opacity: 0 } : false}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="overflow-hidden">
          
            <dl className="px-4 pb-4 pt-1 text-sm">
              {rows.map((row) =>
            <div
              key={row.label}
              className="flex items-start justify-between gap-6 border-b border-ink/10 py-2.5 last:border-0">
              
                  <dt className="text-ink-muted">{row.label}</dt>
                  <dd className="whitespace-nowrap font-medium text-ink">{formatINR(row.value)}</dd>
                </div>
            )}
              {breakup.savings > 0 &&
            <div className="flex items-center justify-between gap-6 border-t border-ink/10 py-2.5 text-gold-deep">
                  <dt>Festival discount · {product.discountPct}%</dt>
                  <dd className="font-medium">− {formatINR(breakup.savings)}</dd>
                </div>
            }
              <div className="mt-1 flex items-center justify-between gap-6 border-t border-gold/40 pt-3">
                <dt className="font-serif text-lg text-ink">Total payable</dt>
                <dd className="font-serif text-xl text-gold-deep">{formatINR(breakup.total)}</dd>
              </div>
            </dl>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}