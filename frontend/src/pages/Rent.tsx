import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CalendarRangeIcon, ShieldIcon, SparklesIcon, TruckIcon } from 'lucide-react';
import { products } from '../data/products';
import { formatINR, priceBreakup } from '../utils/pricing';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { IMAGES } from '../data/categories';
import { cn } from '../utils/cn';

const occasions = ['Wedding', 'Party', 'Festival', 'Corporate'] as const;

const terms = [
{ icon: CalendarRangeIcon, title: 'Rental period', detail: 'Three days as standard, extendable in single days at the same rate.' },
{ icon: ShieldIcon, title: 'Security deposit', detail: '30% of the piece value, refunded in full within 48 hours of return.' },
{ icon: TruckIcon, title: 'Delivery & return', detail: 'Insured two-way courier, or collect from any store at no charge.' },
{ icon: SparklesIcon, title: 'Damage protection', detail: 'Normal wear is covered. Stone loss or structural damage is charged at repair cost.' }];


export function Rent() {
  const [occasion, setOccasion] = useState<(typeof occasions)[number]>('Wedding');
  const [days, setDays] = useState(3);
  const rentable = products.filter((product) => product.tags.includes('rentable'));

  return (
    <div>
      <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
        <img src={IMAGES.catBridal} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-light">Rent from the vault</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight lg:text-6xl">
              Wear the ceremonial set. Keep the budget for the ring.
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/75">
              Our bridal and reception pieces are available to rent for three days, insured, professionally cleaned
              between wears, and delivered the morning before your function.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Available to rent"
          title="Rental collection"
          action={
          <div className="flex flex-wrap gap-2">
              {occasions.map((item) =>
            <button
              key={item}
              type="button"
              onClick={() => setOccasion(item)}
              className={cn(
                'border px-4 py-2 text-[11px] uppercase tracking-luxe transition-colors',
                occasion === item ? 'border-gold bg-gold text-ink' : 'border-ink/15 text-ink-muted hover:border-gold'
              )}>
              
                  {item}
                </button>
            )}
            </div>
          } />
        

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rentable.map((product, index) =>
          <Reveal key={product.id} delay={index * 0.06} as="article" className="border border-ink/10">
              <Link to={`/product/${product.slug}`} className="group block aspect-[4/3] overflow-hidden bg-beige">
                <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              
              </Link>
              <div className="p-5">
                <p className="eyebrow text-gold-deep">{occasion} rental</p>
                <h3 className="mt-2 font-serif text-lg leading-snug text-ink">{product.name}</h3>
                <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
                  <div>
                    <p className="font-serif text-xl text-ink">{formatINR(product.rentPerDay ?? 0)}</p>
                    <p className="text-xs text-ink-muted">per day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ink">{formatINR(Math.round(priceBreakup(product).total * 0.3))}</p>
                    <p className="text-xs text-ink-muted">deposit</p>
                  </div>
                </div>
                <Button
                variant="ink"
                className="mt-4 w-full"
                onClick={() =>
                toast.success('Piece reserved', {
                  description: `${product.name} held for 24 hours pending your dates.`
                })
                }>
                
                  Reserve
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-10">
          <div>
            <SectionHeading eyebrow="The agreement" title="Everything stated up front" />
            <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2">
              {terms.map((term, index) =>
              <Reveal key={term.title} delay={index * 0.06} className="bg-beige p-6">
                  <term.icon className="h-5 w-5 text-gold-deep" />
                  <p className="mt-4 font-serif text-lg text-ink">{term.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{term.detail}</p>
                </Reveal>
              )}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-ink-muted">
              Late returns are charged at 1.5× the daily rate. The rental agreement is signed digitally at booking and a
              copy is emailed to you and kept in your account.
            </p>
          </div>

          <Reveal delay={0.1} className="h-fit border border-ink/10 bg-white p-8">
            <h2 className="font-serif text-2xl text-ink">Book a rental</h2>
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success('Booking request sent', { description: 'We will confirm availability within an hour.' });
              }}>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required />
                <Field label="Mobile number" type="tel" required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Function date" type="date" required />
                <div>
                  <label htmlFor="days" className="eyebrow mb-2 block text-ink-muted">
                    Rental days · {days}
                  </label>
                  <input
                    id="days"
                    type="range"
                    min={1}
                    max={10}
                    value={days}
                    onChange={(event) => setDays(Number(event.target.value))}
                    className="mt-3 w-full accent-gold" />
                  
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="eyebrow mb-2 block text-ink-muted">
                  Which pieces are you considering?
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="w-full border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold" />
                
              </div>
              <Button type="submit" variant="gold" size="lg" className="w-full">
                Request booking
              </Button>
              <p className="text-xs leading-relaxed text-ink-muted">
                KYC and the security deposit are collected at handover. Return tracking is visible in your account
                throughout the rental.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </div>);

}

function Field({ label, ...rest }: {label: string;} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-');
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        className="h-11 w-full border border-ink/15 px-3 text-sm outline-none focus:border-gold"
        {...rest} />
      
    </div>);

}