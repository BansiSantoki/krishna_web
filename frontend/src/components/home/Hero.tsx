import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { heroSlides } from '../../data/content';
import { ButtonLink } from '../ui/Button';
import { cn } from '../../utils/cn';

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[index];

  return (
    <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden bg-ink" aria-label="Featured collections">
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 8, ease: 'linear' } }}
          className="absolute inset-0 h-full w-full object-cover" />
        
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className={cn('max-w-2xl', slide.align === 'center' && 'mx-auto text-center')}>
            
            <p className="eyebrow text-gold-light">{slide.eyebrow}</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] text-white sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75">{slide.subtitle}</p>
            <div
              className={cn(
                'mt-9 flex flex-wrap gap-3',
                slide.align === 'center' && 'justify-center'
              )}>
              
              <ButtonLink to="/shop" variant="gold" size="lg">
                Shop Now
              </ButtonLink>
              <ButtonLink to={slide.ctaTo} variant="light" size="lg">
                {slide.ctaLabel}
              </ButtonLink>
              <ButtonLink to="/contact" variant="light" size="lg" className="hidden sm:inline-flex">
                Book Appointment
              </ButtonLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
        {heroSlides.map((item, itemIndex) =>
        <button
          key={item.id}
          type="button"
          onClick={() => setIndex(itemIndex)}
          aria-label={`Show ${item.eyebrow}`}
          aria-current={itemIndex === index}
          className={cn(
            'h-[3px] transition-all duration-500',
            itemIndex === index ? 'w-14 bg-gold' : 'w-7 bg-white/40 hover:bg-white/70'
          )} />

        )}
      </div>
    </section>);

}