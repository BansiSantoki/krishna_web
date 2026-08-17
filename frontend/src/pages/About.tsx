import React from 'react';
import { AwardIcon, GemIcon, HeartHandshakeIcon, ScrollTextIcon } from 'lucide-react';
import { IMAGES } from '../data/categories';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { ButtonLink } from '../components/ui/Button';

const values = [
{ icon: ScrollTextIcon, title: 'Our mission', detail: 'To make fine jewellery legible — every rupee accounted for, on every invoice, for every customer.' },
{ icon: GemIcon, title: 'Our vision', detail: 'To remain the workshop families return to across three generations, not the one they visit once.' },
{ icon: HeartHandshakeIcon, title: 'Our promise', detail: 'Full metal value on exchange, for life, at any of our stores — no questions and no paperwork games.' }];


const awards = [
{ year: '2025', title: 'Retail Jeweller India — Bridal Jeweller of the Year (West)' },
{ year: '2023', title: 'BIS Excellence in Hallmarking Compliance' },
{ year: '2021', title: 'IGI Trusted Retail Partner' },
{ year: '2018', title: 'Rajasthan State Craft Award — Repoussé' }];


const team = [
{ name: 'Rohan Krishnan', role: 'Third-generation partner' },
{ name: 'Lakshmi Rao', role: 'Head of design' },
{ name: 'Imran Sheikh', role: 'Master goldsmith, 31 years' },
{ name: 'Ananya Sethi', role: 'Head of bridal' }];


const gallery = [IMAGES.craftsmanship, IMAGES.catGold, IMAGES.catTemple, IMAGES.prodBangles, IMAGES.catBridal, IMAGES.catDiamond];

export function About() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-ink">
        <img src={IMAGES.craftsmanship} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-14 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-light">Since 1974</p>
            <h1 className="mt-4 font-serif text-4xl text-white lg:text-6xl">
              One workshop, fifty-two years, four stores
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <p className="eyebrow text-gold-deep">Our story</p>
          <h2 className="mt-4 font-serif text-3xl text-ink lg:text-4xl">
            It started as a repair bench in Johari Bazaar
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-sm leading-relaxed text-ink-muted">
          <p>
            Krishna Jewels began in 1974 as a two-man repair bench, fixing clasps and re-seating stones for larger
            houses on Johari Bazaar Road. The workshop learned the craft from the inside out — by taking other people's
            work apart.
          </p>
          <p>
            That is still how we design. Every structure is drawn to be repairable, every stone set so it can be
            re-seated, and every piece weighed and documented so it can be exchanged decades later without argument.
          </p>
          <p>
            Fifty-two years on, we have four stores and one workshop. Everything sold here is made or finished in that
            workshop, by thirty-one craftspeople we know by name.
          </p>
        </Reveal>
      </section>

      <section className="bg-beige py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-px bg-ink/10 md:grid-cols-3">
            {values.map((value, index) =>
            <Reveal key={value.title} delay={index * 0.07} className="bg-beige p-8">
                <value.icon className="h-6 w-6 text-gold-deep" />
                <p className="mt-5 font-serif text-xl text-ink">{value.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{value.detail}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10">
        <SectionHeading eyebrow="Craftsmanship" title="Inside the atelier" />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((image, index) =>
          <Reveal key={image + index} delay={index * 0.05} className="aspect-[4/3] overflow-hidden bg-beige">
              <img
              src={image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-105" />
            
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-royal py-20 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow text-gold-light">Certificates & awards</p>
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl">Recognised where it counts</h2>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {awards.map((award) =>
              <li key={award.year} className="flex gap-6 py-4">
                  <span className="font-serif text-lg text-gold">{award.year}</span>
                  <span className="text-sm text-white/75">{award.title}</span>
                </li>
              )}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold-light">The people</p>
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl">Who you will actually meet</h2>
            <ul className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2">
              {team.map((member) =>
              <li key={member.name} className="bg-royal p-6">
                  <AwardIcon className="h-5 w-5 text-gold" />
                  <p className="mt-4 font-serif text-lg">{member.name}</p>
                  <p className="mt-1 text-xs text-white/60">{member.role}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-serif text-3xl text-ink lg:text-4xl">Come and see the workshop</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Store tours run every Saturday at the Jaipur flagship. You will see the bench, the assay setup and a piece
          part-way through its eleven weeks.
        </p>
        <ButtonLink to="/contact" variant="gold" size="lg" className="mt-8">
          Book a store tour
        </ButtonLink>
      </section>
    </div>);

}