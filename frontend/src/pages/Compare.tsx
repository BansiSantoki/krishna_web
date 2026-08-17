import React from 'react';
import { Link } from 'react-router-dom';
import { XIcon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { productById } from '../data/products';
import { formatGrams, formatINR, priceBreakup } from '../utils/pricing';
import { Button, ButtonLink } from '../components/ui/Button';
import type { Product } from '../types';

export function Compare() {
  const { compare, toggleCompare, addToCart } = useStore();
  const items = compare.map(productById).filter(Boolean) as Product[];

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
        <h1 className="font-serif text-4xl text-ink">Nothing to compare yet</h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Add up to four pieces and we will lay their weight, purity, stones, making charges and final price side by
          side.
        </p>
        <ButtonLink to="/shop" variant="gold" size="lg">
          Browse the collection
        </ButtonLink>
      </div>);

  }

  const rows: Array<{label: string;render: (product: Product) => React.ReactNode;}> = [
  { label: 'Metal', render: (product) => product.metalLabel },
  { label: 'Purity', render: (product) => product.purity },
  { label: 'Gross weight', render: (product) => formatGrams(product.weight) },
  { label: 'Metal value', render: (product) => formatINR(priceBreakup(product).metalValue) },
  {
    label: 'Stones',
    render: (product) => product.stoneDetail ?? '—'
  },
  { label: 'Stone value', render: (product) => product.stoneValue ? formatINR(product.stoneValue) : '—' },
  { label: 'Making charges', render: (product) => `${product.makingPct}% · ${formatINR(priceBreakup(product).making)}` },
  { label: 'GST (3%)', render: (product) => formatINR(priceBreakup(product).gst) },
  { label: 'Rating', render: (product) => `${product.rating.toFixed(1)} (${product.reviews})` },
  { label: 'Delivery', render: (product) => `${product.deliveryDays} days` },
  { label: 'Certificate', render: (product) => product.certificate ?? 'In-house assay' },
  {
    label: 'Total payable',
    render: (product) =>
    <span className="font-serif text-xl text-gold-deep">{formatINR(priceBreakup(product).total)}</span>

  }];


  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 pb-32 sm:px-6 lg:px-10">
      <p className="eyebrow text-gold-deep">Side by side</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Compare pieces</h1>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <caption className="sr-only">Comparison of selected jewellery pieces</caption>
          <thead>
            <tr>
              <th scope="col" className="w-40 border-b border-ink/10 p-4 text-left align-bottom">
                <span className="eyebrow text-ink-muted">Specification</span>
              </th>
              {items.map((product) =>
              <th key={product.id} scope="col" className="border-b border-ink/10 p-4 text-left align-bottom">
                  <div className="relative">
                    <button
                    type="button"
                    onClick={() => toggleCompare(product)}
                    aria-label={`Remove ${product.name}`}
                    className="absolute right-0 top-0 p-1 text-ink-muted hover:text-ink">
                    
                      <XIcon className="h-4 w-4" />
                    </button>
                    <Link to={`/product/${product.slug}`}>
                      <img src={product.images[0]} alt="" className="h-40 w-full max-w-[180px] object-cover" />
                      <p className="mt-3 font-serif text-base leading-snug text-ink hover:text-gold-deep">
                        {product.name}
                      </p>
                    </Link>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) =>
            <tr key={row.label} className="even:bg-beige/50">
                <th scope="row" className="p-4 text-left align-top text-xs uppercase tracking-luxe text-ink-muted">
                  {row.label}
                </th>
                {items.map((product) =>
              <td key={product.id} className="p-4 align-top text-ink">
                    {row.render(product)}
                  </td>
              )}
              </tr>
            )}
            <tr>
              <td />
              {items.map((product) =>
              <td key={product.id} className="p-4">
                  <Button variant="gold" size="sm" onClick={() => addToCart(product)}>
                    Add to bag
                  </Button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>);

}