import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Browser } from '../components/product/Browser';
import { Reveal } from '../components/ui/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { categoryBySlug } from '../data/categories';
import { byCategory } from '../data/products';

export function Category() {
  const { slug = '' } = useParams();
  const category = categoryBySlug(slug);

  if (!category) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">That category has moved</h1>
        <p className="text-sm text-ink-muted">Browse the full collection instead — everything is one page away.</p>
        <ButtonLink to="/shop" variant="gold">
          Shop all jewellery
        </ButtonLink>
      </div>);

  }

  const pool = byCategory(category.slug);

  return (
    <div>
      <section className="relative h-[46vh] min-h-[340px] overflow-hidden bg-ink">
        <img src={category.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-10 sm:px-6 lg:px-10">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-4 text-[11px] uppercase tracking-luxe text-white/60">
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-gold">
                Shop
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold">{category.name}</span>
            </nav>
            <h1 className="font-serif text-4xl text-white lg:text-6xl">{category.name}</h1>
            <p className="mt-4 max-w-xl text-sm text-white/70">{category.blurb}</p>
          </Reveal>
        </div>
      </section>

      <div className="border-b border-ink/10 bg-beige">
        <div className="no-scrollbar mx-auto flex max-w-[1400px] gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-10">
          {category.subCategories.map((sub) =>
          <Link
            key={sub.slug}
            to={`/shop?sub=${sub.slug}`}
            className="whitespace-nowrap border border-ink/15 bg-white px-4 py-2 text-xs text-ink transition-colors hover:border-gold hover:text-gold-deep">
            
              {sub.name}
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
        <Browser pool={pool} />
      </div>
    </div>);

}