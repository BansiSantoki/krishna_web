import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClockIcon, MicIcon, SearchIcon, SparklesIcon, XIcon } from 'lucide-react';
import { products } from '../../data/products';
import { popularSearches } from '../../data/content';
import { formatINR, priceBreakup } from '../../utils/pricing';
import { useStore } from '../../contexts/StoreContext';
import { cn } from '../../utils/cn';

const recentSearches = ['Polki choker', 'Diamond mangalsutra', '10g gold coin'];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!searchOpen) {
      setQuery('');
      setListening(false);
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products.
    filter((product) =>
    [product.name, product.category, product.subCategory, product.metalLabel, ...product.occasion].
    join(' ').
    toLowerCase().
    includes(term)
    ).
    slice(0, 6);
  }, [query]);

  const startVoice = () => {
    setListening(true);
    window.setTimeout(() => {
      setQuery('bridal polki necklace');
      setListening(false);
    }, 1600);
  };

  return (
    <AnimatePresence>
      {searchOpen &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[85] bg-ink/60 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}>
        
          <motion.div
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="max-h-[86vh] overflow-y-auto bg-white"
          role="dialog"
          aria-modal="true"
          aria-label="Search Krishna Jewels">
          
            <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
              <div className="flex items-center gap-3 border-b border-ink/15 pb-4">
                <SearchIcon className="h-5 w-5 text-gold-deep" />
                <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for polki sets, solitaires, mangalsutra…"
                aria-label="Search products"
                className="flex-1 bg-transparent font-serif text-xl text-ink outline-none placeholder:text-ink-muted/60 sm:text-2xl" />
              
                <button
                type="button"
                onClick={startVoice}
                aria-label="Search by voice"
                className={cn(
                  'flex h-10 w-10 items-center justify-center border transition-colors',
                  listening ? 'animate-pulse border-gold bg-gold text-ink' : 'border-ink/15 text-ink hover:border-gold'
                )}>
                
                  <MicIcon className="h-4 w-4" />
                </button>
                <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex h-10 w-10 items-center justify-center text-ink hover:text-gold-deep">
                
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              {listening &&
            <p className="mt-4 text-sm text-gold-deep">Listening… say the piece you are looking for.</p>
            }

              {query.trim().length === 0 ?
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-4 flex items-center gap-2 text-ink-muted">
                      <ClockIcon className="h-3.5 w-3.5" /> Recent searches
                    </p>
                    <ul className="space-y-2">
                      {recentSearches.map((item) =>
                  <li key={item}>
                          <button
                      type="button"
                      onClick={() => setQuery(item)}
                      className="text-sm text-ink transition-colors hover:text-gold-deep">
                      
                            {item}
                          </button>
                        </li>
                  )}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-4 flex items-center gap-2 text-ink-muted">
                      <SparklesIcon className="h-3.5 w-3.5" /> Popular right now
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((item) =>
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="border border-ink/15 px-3 py-1.5 text-xs text-ink transition-colors hover:border-gold hover:text-gold-deep">
                    
                          {item}
                        </button>
                  )}
                    </div>
                  </div>
                </div> :

            <div className="mt-6">
                  <p className="eyebrow mb-4 text-ink-muted">
                    {results.length} {results.length === 1 ? 'match' : 'matches'}
                  </p>
                  {results.length === 0 ?
              <p className="py-10 text-center text-sm text-ink-muted">
                      Nothing found. Try “polki”, “solitaire”, “coin” or “mangalsutra”.
                    </p> :

              <ul className="divide-y divide-ink/10">
                      {results.map((product) =>
                <li key={product.id}>
                          <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 py-3 transition-colors hover:bg-beige/70">
                    
                            <img
                      src={product.images[0]}
                      alt=""
                      className="h-16 w-16 shrink-0 object-cover"
                      loading="lazy" />
                    
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-serif text-base text-ink">{product.name}</p>
                              <p className="text-xs text-ink-muted">
                                {product.metalLabel} · {product.weight.toFixed(2)} g
                              </p>
                            </div>
                            <span className="whitespace-nowrap text-sm text-gold-deep">
                              {formatINR(priceBreakup(product).total)}
                            </span>
                          </Link>
                        </li>
                )}
                    </ul>
              }
                </div>
            }
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}