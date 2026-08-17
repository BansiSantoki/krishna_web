import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AwardIcon,
  CheckIcon,
  GitCompareIcon,
  HeartIcon,
  RefreshCwIcon,
  Share2Icon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  TruckIcon } from
'lucide-react';
import { productBySlug, relatedProducts, products } from '../data/products';
import * as api from '../api';
import { faqs, reviews } from '../data/content';
import { emiPerMonth, formatGrams, formatINR, priceBreakup } from '../utils/pricing';
import { useStore } from '../contexts/StoreContext';
import { Gallery } from '../components/product/Gallery';
import { ProductGrid } from '../components/product/ProductGrid';
import { PriceBreakdown } from '../components/ui/PriceBreakdown';
import { Rating } from '../components/ui/Rating';
import { Button, ButtonLink } from '../components/ui/Button';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { cn } from '../utils/cn';

const tabs = ['Specifications', 'Certification', 'Reviews', 'FAQs', 'Returns'] as const;
type Tab = (typeof tabs)[number];

const sizes = ['12', '14', '16', '18', '20'];

export function ProductDetail() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const localProduct = productBySlug(slug);
  const [product, setProduct] = useState(localProduct);

  useEffect(() => {
    let mounted = true;
    api.fetchProductBySlug(slug).then((data: any) => {
      if (mounted && data) setProduct(data);
    }).catch(() => {
      // keep local fallback
    });
    return () => { mounted = false; };
  }, [slug]);
  const { addToCart, toggleWishlist, toggleCompare, isWishlisted, isCompared, markViewed, recentlyViewed } = useStore();
  const [tab, setTab] = useState<Tab>('Specifications');
  const [size, setSize] = useState(sizes[2]);
  const [pincode, setPincode] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (product) markViewed(product as any);
  }, [product, markViewed]);

  const related = useMemo(() => product ? relatedProducts(product, 4) : [], [product]);
  const bundle = useMemo(
    () => product ? products.filter((item) => item.id !== product.id).slice(0, 2) : [],
    [product]
  );
  const viewed = recentlyViewed.
  filter((id) => id !== product?.id).
  map((id) => products.find((item) => item.id === id)).
  filter(Boolean).
  slice(0, 4);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">This piece is no longer listed</h1>
        <ButtonLink to="/shop" variant="gold">
          Browse the collection
        </ButtonLink>
      </div>);

  }

  const breakup = priceBreakup(product);
  const bundleTotal = [product, ...bundle].reduce((sum, item) => sum + priceBreakup(item).total, 0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-luxe text-ink-muted">
          <Link to="/" className="hover:text-gold-deep">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category}`} className="capitalize hover:text-gold-deep">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Gallery product={product} />
        </div>

        <div>
          <p className="eyebrow text-gold-deep">
            {product.metalLabel} · {product.id}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-ink lg:text-4xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} reviews={product.reviews} size="md" />
            <span className="text-xs uppercase tracking-luxe text-emerald-700">
              {product.inStock ? 'In stock' : 'Made to order'}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-serif text-4xl text-ink">{formatINR(breakup.total)}</span>
            {breakup.savings > 0 &&
            <>
                <span className="text-lg text-ink-muted line-through">{formatINR(breakup.mrp)}</span>
                <span className="bg-gold px-2 py-1 text-[10px] uppercase tracking-luxe text-ink">
                  Save {formatINR(breakup.savings)}
                </span>
              </>
            }
          </div>
          <p className="mt-2 text-sm text-gold-deep">
            EMI from {formatINR(emiPerMonth(breakup.total))}/month for 12 months · no cost on select cards
          </p>

          <p className="mt-6 text-sm leading-relaxed text-ink-muted">{product.description}</p>

          <PriceBreakdown product={product} defaultOpen className="mt-6" />

          <div className="mt-8">
            <p className="eyebrow mb-3 text-ink">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((option) =>
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                className={cn(
                  'h-10 w-12 border text-sm transition-colors',
                  size === option ?
                  'border-gold bg-gold text-ink' :
                  'border-ink/15 text-ink-muted hover:border-gold hover:text-ink'
                )}>
                
                  {option}
                </button>
              )}
              <Link
                to="/contact"
                className="self-center pl-2 text-[11px] uppercase tracking-luxe text-gold-deep underline underline-offset-4">
                
                Size guide
              </Link>
            </div>
          </div>

          <div className="mt-8 border border-ink/10 p-4">
            <p className="eyebrow mb-3 text-ink">Delivery</p>
            <div className="flex gap-2">
              <label htmlFor="pincode" className="sr-only">
                Pincode
              </label>
              <input
                id="pincode"
                value={pincode}
                onChange={(event) => setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter pincode"
                inputMode="numeric"
                className="h-11 flex-1 border border-ink/15 px-3 text-sm outline-none focus:border-gold" />
              
              <Button variant="ink" onClick={() => setChecked(pincode.length === 6)} disabled={pincode.length !== 6}>
                Check
              </Button>
            </div>
            {checked &&
            <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
                <TruckIcon className="h-4 w-4" /> Insured delivery to {pincode} in {product.deliveryDays} days
              </p>
            }
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Button variant="gold" size="lg" onClick={() => addToCart(product, 1, size)}>
              <ShoppingBagIcon className="h-4 w-4" /> Add to bag
            </Button>
            <Button
              variant="ink"
              size="lg"
              onClick={() => {
                addToCart(product, 1, size);
                navigate('/checkout');
              }}>
              
              Buy now
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => toggleWishlist(product)}>
              <HeartIcon className={cn('h-3.5 w-3.5', isWishlisted(product.id) && 'fill-current')} />
              {isWishlisted(product.id) ? 'Saved' : 'Wishlist'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleCompare(product)}>
              <GitCompareIcon className="h-3.5 w-3.5" />
              {isCompared(product.id) ? 'In compare' : 'Compare'}
            </Button>
            {product.rentPerDay &&
            <ButtonLink to="/rent" variant="outline" size="sm">
                Rent from {formatINR(product.rentPerDay)}/day
              </ButtonLink>
            }
            <ButtonLink to="/sell" variant="outline" size="sm">
              Sell similar
            </ButtonLink>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success('Link copied', { description: 'Share this piece with anyone.' })}>
              
              <Share2Icon className="h-3.5 w-3.5" /> Share
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-ink/10 pt-6 text-sm text-ink-muted sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4 text-gold-deep" /> {product.hallmark}
            </li>
            <li className="flex items-center gap-2">
              <RefreshCwIcon className="h-4 w-4 text-gold-deep" /> 15-day returns, making charges included
            </li>
            <li className="flex items-center gap-2">
              <AwardIcon className="h-4 w-4 text-gold-deep" /> Lifetime exchange at full metal value
            </li>
            <li className="flex items-center gap-2">
              <TruckIcon className="h-4 w-4 text-gold-deep" /> Free insured shipping across India
            </li>
          </ul>
        </div>
      </div>

      <section className="border-t border-ink/10 bg-beige/50">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
          <div className="no-scrollbar flex gap-6 overflow-x-auto border-b border-ink/10">
            {tabs.map((item) =>
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cn(
                'relative whitespace-nowrap pb-4 text-[11px] uppercase tracking-luxe transition-colors',
                tab === item ? 'text-ink' : 'text-ink-muted hover:text-ink'
              )}>
              
                {item}
                {tab === item && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gold" />}
              </button>
            )}
          </div>

          <div className="pt-8">
            {tab === 'Specifications' &&
            <dl className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
              ['Product code', product.id],
              ['Metal', product.metalLabel],
              ['Purity', product.purity],
              ['Gross weight', formatGrams(product.weight)],
              ['Making charges', `${product.makingPct}% of metal value`],
              ['Stones', product.stoneDetail ?? 'None'],
              ['Hallmark', product.hallmark],
              ['Occasion', product.occasion.join(', ')],
              ['Worn by', product.gender]].
              map(([label, value]) =>
              <div key={label} className="border-b border-ink/10 py-3">
                    <dt className="eyebrow text-ink-muted">{label}</dt>
                    <dd className="mt-1.5 text-sm capitalize text-ink">{value}</dd>
                  </div>
              )}
              </dl>
            }

            {tab === 'Certification' &&
            <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-ink/10 bg-white p-6">
                  <AwardIcon className="h-6 w-6 text-gold-deep" />
                  <h3 className="mt-4 font-serif text-xl text-ink">BIS Hallmark & HUID</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Every gold piece carries a laser-etched six-digit HUID you can verify independently on the BIS Care
                    app before you accept delivery.
                  </p>
                </div>
                <div className="border border-ink/10 bg-white p-6">
                  <ShieldCheckIcon className="h-6 w-6 text-gold-deep" />
                  <h3 className="mt-4 font-serif text-xl text-ink">
                    {product.certificate ?? 'In-house assay certificate'}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {product.certificate ?
                  'The original grading report ships in the box, listing carat weight, colour, clarity and cut for every stone.' :
                  'Metal purity is assayed in-house and printed on the invoice alongside the full price breakup.'}
                  </p>
                </div>
              </div>
            }

            {tab === 'Reviews' &&
            <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                <div className="border border-ink/10 bg-white p-6">
                  <p className="font-serif text-5xl text-ink">{product.rating.toFixed(1)}</p>
                  <Rating value={product.rating} className="mt-3" />
                  <p className="mt-2 text-sm text-ink-muted">{product.reviews} verified reviews</p>
                  <div className="mt-5 space-y-2">
                    {[5, 4, 3, 2, 1].map((star, index) =>
                  <div key={star} className="flex items-center gap-3">
                        <span className="w-4 text-xs text-ink-muted">{star}</span>
                        <div className="h-1.5 flex-1 bg-ink/10">
                          <div
                        className="h-full bg-gold"
                        style={{ width: `${[78, 15, 4, 2, 1][index]}%` }} />
                      
                        </div>
                        <span className="w-8 text-right text-xs text-ink-muted">{[78, 15, 4, 2, 1][index]}%</span>
                      </div>
                  )}
                  </div>
                </div>
                <ul className="space-y-8">
                  {reviews.map((review) =>
                <li key={review.id} className="border-b border-ink/10 pb-8 last:border-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <Rating value={review.rating} />
                        {review.verified &&
                    <span className="flex items-center gap-1 bg-emerald-50 px-2 py-1 text-[10px] uppercase tracking-luxe text-emerald-700">
                            <CheckIcon className="h-3 w-3" /> Verified buyer
                          </span>
                    }
                        <span className="text-xs text-ink-muted">{review.date}</span>
                      </div>
                      <h4 className="mt-3 font-serif text-lg text-ink">{review.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{review.body}</p>
                      {review.photos.length > 0 &&
                  <div className="mt-4 flex gap-2">
                          {review.photos.map((photo) =>
                    <img key={photo} src={photo} alt="" className="h-20 w-20 object-cover" loading="lazy" />
                    )}
                        </div>
                  }
                      <p className="mt-4 text-xs text-ink-muted">
                        {review.author} · {review.helpful} people found this helpful
                      </p>
                    </li>
                )}
                </ul>
              </div>
            }

            {tab === 'FAQs' &&
            <dl className="max-w-3xl divide-y divide-ink/10">
                {faqs.map((faq) =>
              <div key={faq.q} className="py-5">
                    <dt className="font-serif text-lg text-ink">{faq.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{faq.a}</dd>
                  </div>
              )}
              </dl>
            }

            {tab === 'Returns' &&
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-ink-muted">
                <p>
                  Return any unworn piece within 15 days with its certificate, invoice and original packaging for a full
                  refund — making charges included. Refunds settle to the original payment method within 5 working days.
                </p>
                <p>
                  Customised, engraved and made-to-order bridal pieces are excluded from returns, but remain eligible for
                  lifetime exchange at prevailing metal value.
                </p>
                <p>
                  Pickup is free and insured. Book it from your account, or call the store you ordered from and we will
                  arrange collection the next working day.
                </p>
              </div>
            }
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Complete the set" title="Frequently bought together" />
        <div className="mt-8 flex flex-col gap-6 border border-ink/10 p-6 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-wrap items-center gap-4">
            {[product, ...bundle].map((item, index) =>
            <React.Fragment key={item.id}>
                {index > 0 && <span className="font-serif text-2xl text-gold">+</span>}
                <Link to={`/product/${item.slug}`} className="flex items-center gap-3">
                  <img src={item.images[0]} alt="" className="h-20 w-20 object-cover" loading="lazy" />
                  <div className="max-w-[160px]">
                    <p className="font-serif text-sm leading-snug text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">{formatINR(priceBreakup(item).total)}</p>
                  </div>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div className="lg:text-right">
            <p className="eyebrow text-ink-muted">Bundle total</p>
            <p className="font-serif text-2xl text-ink">{formatINR(bundleTotal)}</p>
            <Button
              variant="gold"
              className="mt-3"
              onClick={() => [product, ...bundle].forEach((item) => addToCart(item))}>
              
              Add all three
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="You may also like" title="Related pieces" />
        <div className="mt-10">
          <ProductGrid products={related} columns={4} />
        </div>
      </section>

      {viewed.length > 0 &&
      <section className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Recently viewed" title="Back where you left off" />
          </Reveal>
          <div className="mt-10">
            <ProductGrid products={viewed as typeof related} columns={4} />
          </div>
        </section>
      }
    </div>);

}