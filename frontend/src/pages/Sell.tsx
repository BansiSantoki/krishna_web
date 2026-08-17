import React, { useState } from 'react';
import { toast } from 'sonner';
import { BadgeCheckIcon, BanknoteIcon, CalendarIcon, FileTextIcon, ScaleIcon, UploadIcon } from 'lucide-react';
import { METAL_RATES } from '../data/rates';
import { formatINR } from '../utils/pricing';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { IMAGES } from '../data/categories';
import type { MetalKey } from '../types';
import { cn } from '../utils/cn';

const steps = [
{ icon: ScaleIcon, title: 'Get an instant estimate', detail: 'Enter metal, weight and purity for an indicative value at today\'s rate.' },
{ icon: UploadIcon, title: 'Share photos & invoice', detail: 'Upload clear images and the original bill if you still have it.' },
{ icon: CalendarIcon, title: 'Book pickup or a store visit', detail: 'Insured doorstep pickup, or walk in to any of our four stores.' },
{ icon: BadgeCheckIcon, title: 'Assay, KYC and settlement', detail: 'Karat-meter test in front of you, then payment to your account the same day.' }];


const metals: Array<{key: MetalKey;label: string;recovery: number;}> = [
{ key: 'gold22', label: '22K Gold', recovery: 0.98 },
{ key: 'gold24', label: '24K Gold', recovery: 0.99 },
{ key: 'gold18', label: '18K Gold', recovery: 0.97 },
{ key: 'silver', label: 'Silver', recovery: 0.94 },
{ key: 'platinum', label: 'Platinum', recovery: 0.95 }];


export function Sell() {
  const [metal, setMetal] = useState(metals[0]);
  const [grams, setGrams] = useState(20);
  const quote = METAL_RATES[metal.key] * grams * metal.recovery;

  return (
    <div>
      <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
        <img src={IMAGES.heroGold} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-light">Sell to Krishna Jewels</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight lg:text-6xl">
              Sell gold at the rate you can verify yourself
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/75">
              We assay in front of you on a calibrated karat meter, show the reading on screen, and settle to your bank
              account the same working day. No deductions you did not agree to.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="How it works" title="Four steps, one visit" />
        <ol className="mt-12 grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) =>
          <Reveal key={step.title} delay={index * 0.07} as="li" className="bg-white p-8">
              <step.icon className="h-6 w-6 text-gold-deep" />
              <p className="mt-5 font-serif text-xl text-ink">
                <span className="mr-2 text-gold">0{index + 1}</span>
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.detail}</p>
            </Reveal>
          )}
        </ol>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
          <Reveal className="border border-ink/10 bg-white p-8">
            <h2 className="font-serif text-2xl text-ink">Instant estimate</h2>
            <p className="mt-2 text-sm text-ink-muted">Indicative only — final value is confirmed after assay.</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {metals.map((option) =>
              <button
                key={option.key}
                type="button"
                onClick={() => setMetal(option)}
                className={cn(
                  'border px-4 py-2 text-xs transition-colors',
                  metal.key === option.key ?
                  'border-gold bg-gold text-ink' :
                  'border-ink/15 text-ink-muted hover:border-gold'
                )}>
                
                  {option.label}
                </button>
              )}
            </div>

            <label htmlFor="sell-grams" className="eyebrow mb-2 mt-6 block text-ink-muted">
              Weight · {grams} g
            </label>
            <input
              id="sell-grams"
              type="range"
              min={1}
              max={250}
              value={grams}
              onChange={(event) => setGrams(Number(event.target.value))}
              className="w-full accent-gold" />
            

            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="eyebrow text-ink-muted">Estimated settlement</p>
              <p className="mt-2 font-serif text-4xl text-gold-deep">{formatINR(quote)}</p>
              <p className="mt-2 text-xs text-ink-muted">
                Based on {formatINR(METAL_RATES[metal.key])}/g at {(metal.recovery * 100).toFixed(0)}% recovery after
                assay loss.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="border border-ink/10 bg-white p-8">
            <h2 className="font-serif text-2xl text-ink">Book a valuation</h2>
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success('Request received', {
                  description: 'A valuation specialist will call you within two hours.'
                });
              }}>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full name" required />
                <Input label="Mobile number" type="tel" required />
              </div>
              <Input label="City & pincode" required />
              <div>
                <span className="eyebrow mb-2 block text-ink-muted">I would like</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Insured doorstep pickup', 'Store visit'].map((option) =>
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 border border-ink/15 px-4 py-3 text-sm text-ink-muted">
                    
                      <input type="radio" name="mode" defaultChecked={option.includes('pickup')} className="accent-gold" />
                      {option}
                    </label>
                  )}
                </div>
              </div>
              <div className="border border-dashed border-ink/20 p-6 text-center">
                <UploadIcon className="mx-auto h-5 w-5 text-gold-deep" />
                <p className="mt-3 text-sm text-ink">Upload photos of the pieces</p>
                <p className="mt-1 text-xs text-ink-muted">JPG or PNG, up to 8 images</p>
              </div>
              <div className="border border-dashed border-ink/20 p-6 text-center">
                <FileTextIcon className="mx-auto h-5 w-5 text-gold-deep" />
                <p className="mt-3 text-sm text-ink">Upload the original invoice (optional)</p>
                <p className="mt-1 text-xs text-ink-muted">Improves your rate by up to 1.5%</p>
              </div>
              <Button type="submit" variant="gold" size="lg" className="w-full">
                Request valuation
              </Button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {[
          { icon: BadgeCheckIcon, title: 'KYC in ten minutes', detail: 'PAN and Aadhaar, verified at the counter. Required by law above ₹2 lakh.' },
          { icon: BanknoteIcon, title: 'Same-day settlement', detail: 'NEFT or IMPS to your account, or a demand draft if you prefer.' },
          { icon: ScaleIcon, title: 'Open assay', detail: 'Karat meter reading shown on screen, with the printout attached to your receipt.' }].
          map((item, index) =>
          <Reveal key={item.title} delay={index * 0.07} className="border border-ink/10 p-6">
              <item.icon className="h-6 w-6 text-gold-deep" />
              <p className="mt-4 font-serif text-xl text-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
            </Reveal>
          )}
        </div>
      </section>
    </div>);

}

function Input({ label, ...rest }: {label: string;} & React.InputHTMLAttributes<HTMLInputElement>) {
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