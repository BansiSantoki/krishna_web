import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../../data/categories';
import { Reveal } from '../ui/Reveal';
import { ButtonLink } from '../ui/Button';

const steps = [
{ step: '01', title: 'The consultation', detail: 'Ninety minutes with a bridal specialist, outfit and neckline in hand.' },
{ step: '02', title: 'The drawing', detail: 'A measured rendering with weight, stone count and price breakup before any gold is cut.' },
{ step: '03', title: 'Eleven weeks of work', detail: 'Hand-set polki, closed-back kundan, and three quality gates.' },
{ step: '04', title: 'The final fitting', detail: 'Adjusted against the blouse, three weeks before the ceremony.' }];


export function BridalEditorial() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[680px]">
          <motion.img
            src={IMAGES.editorialBridal}
            alt="Bridal jewellery worn with a wedding lehenga"
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover" />
          
          <div className="absolute inset-0 bg-ink/20" />
        </div>

        <div className="flex flex-col justify-center px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-gold-light">The Bridal House</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
              A set you will wear once, and keep for three generations
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70">
              Bridal work is not a bigger version of everyday jewellery. It is a different discipline — heavier
              structures, closed-back stone setting, and a fit that has to survive fourteen hours of ceremony.
            </p>
          </Reveal>

          <ol className="mt-10 space-y-6">
            {steps.map((item, index) =>
            <Reveal key={item.step} delay={index * 0.08} as="li" className="flex gap-5">
                <span className="font-serif text-xl text-gold">{item.step}</span>
                <div className="border-l border-white/15 pl-5">
                  <p className="font-serif text-lg text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/65">{item.detail}</p>
                </div>
              </Reveal>
            )}
          </ol>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to="/bridal" variant="gold" size="lg">
              Explore bridal
            </ButtonLink>
            <ButtonLink to="/contact" variant="light" size="lg">
              Book an appointment
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>);

}