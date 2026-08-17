import React from 'react';
import { MapPinIcon, PhoneIcon } from 'lucide-react';
import { storeLocations } from '../../data/content';
import { Reveal, SectionHeading } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';

export function StoreStrip() {
  return (
    <section className="border-t border-ink/10 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Visit us"
          title="Four stores, one workshop"
          action={<ButtonLink to="/contact" variant="outline">Book an appointment</ButtonLink>} />
        
        <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {storeLocations.map((store, index) =>
          <Reveal key={store.id} delay={index * 0.06} className="bg-white p-6">
              <p className="font-serif text-lg text-ink">{store.city}</p>
              {store.flagship && <span className="eyebrow mt-1 block text-gold-deep">Flagship</span>}
              <p className="mt-4 flex gap-2 text-sm leading-relaxed text-ink-muted">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                {store.address}
              </p>
              <a
              href={`tel:${store.phone.replace(/\s/g, '')}`}
              className="mt-3 flex items-center gap-2 text-sm text-ink transition-colors hover:text-gold-deep">
              
                <PhoneIcon className="h-4 w-4 text-gold-deep" />
                {store.phone}
              </a>
              <p className="mt-3 text-xs text-ink-muted">{store.hours}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}