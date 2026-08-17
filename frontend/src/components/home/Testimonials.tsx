import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';
import { testimonials } from '../../data/content';
import { Rating } from '../ui/Rating';
import { SectionHeading } from '../ui/Reveal';
import { cn } from '../../utils/cn';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  return (
    <section className="bg-beige py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="In their words" title="Fifty-two years of first impressions" align="center" />

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <QuoteIcon className="mx-auto h-8 w-8 text-gold" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}>
              
              <p className="mt-6 font-serif text-xl leading-relaxed text-ink sm:text-2xl">“{active.quote}”</p>
              <footer className="mt-6">
                <Rating value={active.rating} className="justify-center" />
                <p className="mt-3 text-sm font-medium text-ink">{active.name}</p>
                <p className="text-xs text-ink-muted">
                  {active.city} · {active.occasion}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-2">
            {testimonials.map((item, itemIndex) =>
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-label={`Read the review from ${item.name}`}
              aria-current={itemIndex === index}
              className={cn(
                'h-[3px] transition-all duration-500',
                itemIndex === index ? 'w-12 bg-gold' : 'w-6 bg-ink/20 hover:bg-ink/40'
              )} />

            )}
          </div>
        </div>
      </div>
    </section>);

}