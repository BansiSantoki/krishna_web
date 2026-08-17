import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { cn } from '../../utils/cn';

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <SectionHeading
        eyebrow="Shop by category"
        title="Nine houses, one workshop"
        description="Every family is made in the same Jaipur atelier, priced from the same rate card, and hallmarked to the same standard."
        action={
        <Link
          to="/shop"
          className="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold-deep">
          
            View all jewellery
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        } />
      

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
        {categories.map((category, index) =>
        <Reveal
          key={category.slug}
          delay={Math.min(index, 5) * 0.06}
          className={cn(index === 0 && 'col-span-2 md:col-span-1 md:row-span-2')}>
          
            <Link
            to={`/category/${category.slug}`}
            className={cn(
              'group relative block h-full overflow-hidden bg-ink',
              index === 0 ? 'aspect-[4/5] md:aspect-auto md:h-full' : 'aspect-[4/5]'
            )}>
            
              <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                <h3 className="font-serif text-xl text-white lg:text-2xl">{category.name}</h3>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {category.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-luxe text-gold-light">
                  {category.subCategories.length} styles
                  <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}
      </div>
    </section>);

}