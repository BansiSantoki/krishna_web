import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Browser } from '../components/product/Browser';
import { Reveal } from '../components/ui/Reveal';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { useEffect, useState } from 'react';
import * as api from '../api';
import type { Product } from '../types';

export function Shop() {
  const [params] = useSearchParams();
  const sub = params.get('sub') ?? undefined;
  const tag = params.get('tag') as Product['tags'][number] | null;

  const subLabel = categories.
  flatMap((category) => category.subCategories).
  find((item) => item.slug === sub)?.name;

  const [pool, setPool] = useState<typeof products>(products);

  useEffect(() => {
    let mounted = true;
    api.fetchProducts().then((data: any) => {
      if (mounted && Array.isArray(data)) setPool(data);
    }).catch(() => {
      // keep local fallback
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <Reveal className="mb-12 max-w-2xl">
        <p className="eyebrow text-gold-deep">{subLabel ? 'Collection' : 'All jewellery'}</p>
        <h1 className="mt-3 font-serif text-4xl text-ink lg:text-5xl">
          {subLabel ?? (tag ? `${tag[0].toUpperCase()}${tag.slice(1)} pieces` : 'The full collection')}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Every piece is hallmarked, priced from today's rate card, and shown with a full breakup of metal, stones,
          making charges and GST before you add it to your bag.
        </p>
      </Reveal>

      <Browser pool={pool} subCategory={sub} />
    </div>);

}