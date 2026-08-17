import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { productById } from '../../data/products';
import { ButtonLink } from '../ui/Button';

export function CompareTray() {
  const { compare, toggleCompare, clearCompare } = useStore();
  const items = compare.map(productById).filter(Boolean);

  return (
    <AnimatePresence>
      {items.length > 0 &&
      <motion.div
        initial={{ y: 120 }}
        animate={{ y: 0 }}
        exit={{ y: 120 }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/40 bg-white/95 backdrop-blur-xl">
        
          <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
            <p className="eyebrow hidden text-gold-deep sm:block">Compare ({items.length}/4)</p>
            <ul className="flex flex-1 items-center gap-3 overflow-x-auto">
              {items.map((product) =>
            <li key={product!.id} className="relative shrink-0">
                  <img src={product!.images[0]} alt={product!.name} className="h-14 w-14 object-cover" />
                  <button
                type="button"
                onClick={() => toggleCompare(product!)}
                aria-label={`Remove ${product!.name} from compare`}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-ink text-white">
                
                    <XIcon className="h-3 w-3" />
                  </button>
                </li>
            )}
            </ul>
            <button
            type="button"
            onClick={clearCompare}
            className="hidden text-[11px] uppercase tracking-luxe text-ink-muted hover:text-ink sm:block">
            
              Clear
            </button>
            <ButtonLink to="/compare" variant="ink" size="sm">
              Compare
            </ButtonLink>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}