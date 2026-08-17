import React from 'react';
import { toast } from 'sonner';
import { IMAGES } from '../data/categories';
import { byCategory, products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { Button, ButtonLink } from '../components/ui/Button';

const chapters = [
{
  title: 'The Wedding',
  copy: 'Heavy polki and kundan structures built to sit correctly for fourteen hours, with closed-back settings that survive the entire ceremony.',
  image: IMAGES.catBridal
},
{
  title: 'The Reception',
  copy: 'Lighter diamond work in 18K and platinum — pieces that read modern against a gown and still belong in the same box.',
  image: IMAGES.catDiamond
},
{
  title: 'The Ceremonies Before',
  copy: 'Mehendi, haldi and sangeet call for colour and movement. Meenakari, pearls and temple gold, chosen to photograph well in daylight.',
  image: IMAGES.editorialBridal
}];


export function Bridal() {
  const bridal = byCategory('bridal');
  const supporting = products.filter(
    (product) => product.occasion.includes('Wedding') && product.category !== 'bridal'
  );

  return (
    <div>
      <section className="relative h-[78vh] min-h-[520px] overflow-hidden bg-ink">
        <img src={IMAGES.heroBridal} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-16 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-light">The Bridal House · Est. 1974</p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.06] text-white lg:text-7xl">
              Made once. Worn always.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/75">
              Eleven weeks of hand-set work, three quality gates, and a final fitting against the blouse — because a
              bridal set that does not sit right is simply a very expensive photograph.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="gold" size="lg">
                Book a bridal appointment
              </ButtonLink>
              <ButtonLink to="/rent" variant="light" size="lg">
                Rent instead
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10">
        <div className="space-y-20">
          {chapters.map((chapter, index) =>
          <Reveal
            key={chapter.title}
            className={`grid items-center gap-10 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            
              <div className="aspect-[4/3] overflow-hidden bg-beige">
                <img
                src={chapter.image}
                alt={chapter.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1600ms] hover:scale-105" />
              
              </div>
              <div className="max-w-lg">
                <p className="eyebrow text-gold-deep">Chapter 0{index + 1}</p>
                <h2 className="mt-3 font-serif text-3xl text-ink lg:text-4xl">{chapter.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{chapter.copy}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-beige py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="The collection" title="Bridal sets & ceremonial pieces" />
          <div className="mt-12">
            <ProductGrid products={bridal} columns={3} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Complete the trousseau" title="Worn alongside the set" />
        <div className="mt-12">
          <ProductGrid products={supporting} columns={4} />
        </div>
      </section>

      <section className="bg-royal py-20 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold-light">Bridal appointment</p>
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl">Ninety minutes, one specialist, no queue</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70">
              Bring the outfit or a photograph of the neckline. We will show you the pieces that work with it, quote the
              full breakup for each, and hold your favourites for seven days at no cost.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="glass-dark p-8">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success('Appointment requested', { description: 'We will confirm your slot by phone today.' });
              }}>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <DarkField label="Name" required />
                <DarkField label="Mobile" type="tel" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <DarkField label="Wedding date" type="date" required />
                <DarkField label="Preferred store" required defaultValue="Jaipur — Flagship" />
              </div>
              <Button type="submit" variant="gold" size="lg" className="w-full">
                Request appointment
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>);

}

function DarkField({ label, ...rest }: {label: string;} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `bridal-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-white/60">
        {label}
      </label>
      <input
        id={id}
        className="h-11 w-full border border-white/25 bg-transparent px-3 text-sm text-white outline-none focus:border-gold"
        {...rest} />
      
    </div>);

}