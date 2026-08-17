import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MinusIcon, PlusIcon, ShieldCheckIcon, ShoppingBagIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { productById } from '../../data/products';
import { formatINR, priceBreakup } from '../../utils/pricing';
import { ButtonLink } from '../ui/Button';

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQuantity, removeFromCart, cartSubtotal, cartGstIncluded } = useStore();

  return (
    <AnimatePresence>
      {cartOpen &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[75] bg-ink/50"
        onClick={() => setCartOpen(false)}>
        
          <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="ml-auto flex h-full w-full max-w-md flex-col bg-white"
          aria-label="Shopping bag">
          
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-serif text-xl text-ink">Your Bag</h2>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close bag" className="p-1 text-ink">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ?
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBagIcon className="h-10 w-10 text-gold-deep" />
                <p className="font-serif text-xl text-ink">Your bag is empty</p>
                <p className="text-sm text-ink-muted">
                  Start with the bridal edit, or a 10g coin — both arrive insured and certified.
                </p>
                <ButtonLink to="/shop" variant="gold" onClick={() => setCartOpen(false)}>
                  Browse the collection
                </ButtonLink>
              </div> :

          <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  {cart.map((line) => {
                const product = productById(line.productId);
                if (!product) return null;
                const breakup = priceBreakup(product);
                return (
                  <li key={line.productId} className="flex gap-4 py-5">
                        <Link to={`/product/${product.slug}`} onClick={() => setCartOpen(false)}>
                          <img src={product.images[0]} alt="" className="h-24 w-20 object-cover" loading="lazy" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <Link
                        to={`/product/${product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="font-serif text-base leading-snug text-ink hover:text-gold-deep">
                        
                            {product.name}
                          </Link>
                          <p className="mt-1 text-xs text-ink-muted">
                            {product.weight.toFixed(3)} g · {product.purity}
                          </p>
                          <p className="mt-1 text-xs text-ink-muted">
                            Making {formatINR(breakup.making)} · GST {formatINR(breakup.gst)}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-ink/15">
                              <button
                            type="button"
                            onClick={() => setQuantity(line.productId, line.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="px-2 py-1.5 text-ink hover:text-gold-deep">
                            
                                <MinusIcon className="h-3 w-3" />
                              </button>
                              <span className="min-w-8 text-center text-sm">{line.quantity}</span>
                              <button
                            type="button"
                            onClick={() => setQuantity(line.productId, line.quantity + 1)}
                            aria-label="Increase quantity"
                            className="px-2 py-1.5 text-ink hover:text-gold-deep">
                            
                                <PlusIcon className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-serif text-lg text-ink">
                              {formatINR(breakup.total * line.quantity)}
                            </span>
                          </div>
                        </div>
                        <button
                      type="button"
                      onClick={() => removeFromCart(line.productId)}
                      aria-label={`Remove ${product.name}`}
                      className="self-start p-1 text-ink-muted hover:text-ink">
                      
                          <Trash2Icon className="h-4 w-4" />
                        </button>
                      </li>);

              })}
                </ul>

                <div className="border-t border-ink/10 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-muted">Subtotal (incl. {formatINR(cartGstIncluded)} GST)</span>
                    <span className="font-serif text-2xl text-ink">{formatINR(cartSubtotal)}</span>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-xs text-ink-muted">
                    <ShieldCheckIcon className="h-4 w-4 text-gold-deep" /> Insured shipping and 15-day returns included
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <ButtonLink to="/cart" variant="outline" onClick={() => setCartOpen(false)}>
                      View bag
                    </ButtonLink>
                    <ButtonLink to="/checkout" variant="gold" onClick={() => setCartOpen(false)}>
                      Checkout
                    </ButtonLink>
                  </div>
                </div>
              </>
          }
          </motion.aside>
        </motion.div>
      }
    </AnimatePresence>);

}