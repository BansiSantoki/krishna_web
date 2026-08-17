import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { GiftIcon, MinusIcon, PlusIcon, TagIcon, Trash2Icon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { productById } from '../data/products';
import { formatGrams, formatINR, priceBreakup } from '../utils/pricing';
import { Button, ButtonLink } from '../components/ui/Button';

export function Cart() {
  const { cart, setQuantity, removeFromCart, cartSubtotal, cartGstIncluded } = useStore();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState<string | null>(null);

  const discount = applied ? Math.round(cartSubtotal * 0.03) : 0;
  const total = cartSubtotal - discount;

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
        <h1 className="font-serif text-4xl text-ink">Your bag is empty</h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Nothing saved yet. Start with the bridal edit, a certified solitaire, or a sealed 10g coin.
        </p>
        <ButtonLink to="/shop" variant="gold" size="lg">
          Browse the collection
        </ButtonLink>
      </div>);

  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
      <h1 className="font-serif text-4xl text-ink">Your Bag</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Prices are locked at today's rate for 30 minutes from checkout.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {cart.map((line) => {
            const product = productById(line.productId);
            if (!product) return null;
            const breakup = priceBreakup(product);
            return (
              <li key={line.productId} className="flex flex-col gap-5 py-6 sm:flex-row">
                <Link to={`/product/${product.slug}`} className="shrink-0">
                  <img src={product.images[0]} alt="" className="h-40 w-32 object-cover" loading="lazy" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/product/${product.slug}`}
                        className="font-serif text-xl text-ink hover:text-gold-deep">
                        
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink-muted">
                        {product.id} · {product.metalLabel} · {formatGrams(product.weight)}
                        {line.size && ` · Size ${line.size}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.productId)}
                      aria-label={`Remove ${product.name}`}
                      className="p-1 text-ink-muted hover:text-ink">
                      
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </div>

                  <dl className="mt-4 grid gap-x-6 gap-y-1 text-xs text-ink-muted sm:grid-cols-2">
                    <div className="flex justify-between gap-4">
                      <dt>Metal value</dt>
                      <dd>{formatINR(breakup.metalValue)}</dd>
                    </div>
                    {breakup.stoneValue > 0 &&
                    <div className="flex justify-between gap-4">
                        <dt>Stones</dt>
                        <dd>{formatINR(breakup.stoneValue)}</dd>
                      </div>
                    }
                    <div className="flex justify-between gap-4">
                      <dt>Making · {product.makingPct}%</dt>
                      <dd>{formatINR(breakup.making)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>GST · 3%</dt>
                      <dd>{formatINR(breakup.gst)}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <div className="flex items-center border border-ink/15">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="px-3 py-2 text-ink hover:text-gold-deep">
                        
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="min-w-10 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.productId, line.quantity + 1)}
                        aria-label="Increase quantity"
                        className="px-3 py-2 text-ink hover:text-gold-deep">
                        
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-serif text-2xl text-ink">{formatINR(breakup.total * line.quantity)}</span>
                  </div>
                </div>
              </li>);

          })}
        </ul>

        <aside className="h-fit border border-ink/10 bg-beige/50 p-6 lg:sticky lg:top-32">
          <h2 className="font-serif text-2xl text-ink">Order summary</h2>

          <form
            className="mt-6 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!coupon.trim()) return;
              setApplied(coupon.trim().toUpperCase());
              toast.success('Coupon applied', { description: '3% off your order total.' });
            }}>
            
            <label htmlFor="coupon" className="sr-only">
              Coupon code
            </label>
            <input
              id="coupon"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
              placeholder="Coupon or gift card"
              className="h-11 flex-1 border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold" />
            
            <Button type="submit" variant="ink">
              Apply
            </Button>
          </form>

          <dl className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">Subtotal</dt>
              <dd className="text-ink">{formatINR(cartSubtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">GST included</dt>
              <dd className="text-ink">{formatINR(cartGstIncluded)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Insured shipping</dt>
              <dd className="text-emerald-700">Free</dd>
            </div>
            {applied &&
            <div className="flex justify-between text-gold-deep">
                <dt className="flex items-center gap-2">
                  <TagIcon className="h-4 w-4" /> {applied}
                </dt>
                <dd>− {formatINR(discount)}</dd>
              </div>
            }
            <div className="flex items-baseline justify-between border-t border-gold/40 pt-4">
              <dt className="font-serif text-xl text-ink">Total</dt>
              <dd className="font-serif text-2xl text-gold-deep">{formatINR(total)}</dd>
            </div>
          </dl>

          <ButtonLink to="/checkout" variant="gold" size="lg" className="mt-6 w-full">
            Proceed to checkout
          </ButtonLink>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
            <GiftIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
            Complimentary gift packaging and a handwritten note on request at checkout.
          </p>
        </aside>
      </div>
    </div>);

}