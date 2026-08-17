import React from 'react';
import { Link } from 'react-router-dom';
import { PercentIcon, SparklesIcon, TicketIcon } from 'lucide-react';
import { products } from '../data/products';
import { ProductGrid } from '../components/product/ProductGrid';
import { Reveal, SectionHeading } from '../components/ui/Reveal';

const offers = [
{
  icon: PercentIcon,
  code: 'FESTIVE12',
  title: 'Up to 12% off making charges',
  detail: 'On selected gold and fashion pieces. Applied automatically at checkout.'
},
{
  icon: TicketIcon,
  code: 'FIRSTGOLD',
  title: '₹2,000 off your first order',
  detail: 'Valid on orders above ₹50,000 for new customers.'
},
{
  icon: SparklesIcon,
  code: 'BRIDAL26',
  title: 'Free bridal styling & fitting',
  detail: 'Complimentary with any bridal set above ₹5 lakh, including two resizings.'
}];


export function Offers() {
  const discounted = products.filter((product) => product.discountPct > 0);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-gold-deep">Current offers</p>
        <h1 className="mt-3 font-serif text-4xl text-ink lg:text-5xl">Savings you can see in the breakup</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Our discounts come off making charges, never off metal value — so the underlying gold is always priced at the
          same rate you see on the rate card.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-px bg-ink/10 md:grid-cols-3">
        {offers.map((offer, index) =>
        <Reveal key={offer.code} delay={index * 0.07} className="bg-white p-8">
            <offer.icon className="h-6 w-6 text-gold-deep" />
            <p className="mt-5 font-serif text-xl text-ink">{offer.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{offer.detail}</p>
            <p className="mt-5 inline-block border border-dashed border-gold px-3 py-1.5 text-[11px] uppercase tracking-luxe text-gold-deep">
              {offer.code}
            </p>
          </Reveal>
        )}
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="On offer now"
          title="Discounted pieces"
          action={
          <Link
            to="/shop"
            className="border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold-deep">
            
              Shop everything
            </Link>
          } />
        
        <div className="mt-12">
          <ProductGrid products={discounted} columns={4} />
        </div>
      </div>
    </div>);

}