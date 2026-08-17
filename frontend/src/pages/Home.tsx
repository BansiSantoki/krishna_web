import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { RateStrip } from '../components/home/RateStrip';
import { CategoryShowcase } from '../components/home/CategoryShowcase';
import { BridalEditorial } from '../components/home/BridalEditorial';
import { Testimonials } from '../components/home/Testimonials';
import { JournalPreview } from '../components/home/JournalPreview';
import { StoreStrip } from '../components/home/StoreStrip';
import { ProductRail } from '../components/product/ProductRail';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { byTag, products } from '../data/products';
import { IMAGES } from '../data/categories';

const instagramTiles = [
IMAGES.catBridal,
IMAGES.prodBangles,
IMAGES.editorialBridal,
IMAGES.catDiamond,
IMAGES.prodEarrings,
IMAGES.craftsmanship];


export function Home() {
  const featured = byTag('featured', 8);
  const newArrivals = byTag('new', 8);
  const bestSellers = byTag('bestseller', 8);
  const trending = byTag('trending', 8);

  return (
    <>
      <Hero />
      <RateStrip />

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Featured collection"
          title="The pieces we are proudest of"
          description="Chosen by the workshop rather than the algorithm — the sets where the hand work is most visible."
          action={
          <Link
            to="/shop?tag=featured"
            className="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold-deep">
            
              Shop featured
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          } />
        
        <div className="mt-12">
          <ProductRail products={featured} />
        </div>
      </section>

      <CategoryShowcase />
      <BridalEditorial />

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Just arrived" title="New this fortnight" />
        <div className="mt-12">
          <ProductRail products={newArrivals.length > 0 ? newArrivals : products.slice(0, 8)} />
        </div>
      </section>

      <section className="bg-royal py-20 text-white lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Best sellers"
            title="What Jaipur keeps coming back for"
            tone="light"
            description="Ranked by twelve-month repeat purchase, not by margin." />
          
          <div className="mt-12">
            <ProductRail products={bestSellers} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Trending now" title="Moving fastest this week" />
        <div className="mt-12">
          <ProductRail products={trending} />
        </div>
      </section>

      <Testimonials />
      <JournalPreview />

      <section className="border-t border-ink/10 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="@krishnajewels" title="From the atelier floor" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {instagramTiles.map((tile, index) =>
            <Reveal key={tile + index} delay={index * 0.05}>
                <a href="#" aria-label="View post on Instagram" className="group block aspect-square overflow-hidden bg-beige">
                  <img
                  src={tile}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <StoreStrip />
    </>);

}