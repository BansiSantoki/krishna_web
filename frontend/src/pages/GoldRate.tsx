import React, { useState } from 'react';
import { toast } from 'sonner';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BellIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { GOLD_HISTORY, METAL_RATES, RATE_CARDS, RATE_UPDATED_AT } from '../data/rates';
import { formatINR } from '../utils/pricing';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import type { MetalKey } from '../types';
import { cn } from '../utils/cn';

const series = [
{ key: 'gold22' as const, label: '22K Gold' },
{ key: 'gold24' as const, label: '24K Gold' },
{ key: 'silver' as const, label: 'Silver' }];


export function GoldRate() {
  const [active, setActive] = useState<'gold22' | 'gold24' | 'silver'>('gold22');
  const [metal, setMetal] = useState<MetalKey>('gold22');
  const [grams, setGrams] = useState(10);
  const [making, setMaking] = useState(12);
  const [alertEmail, setAlertEmail] = useState('');

  const metalValue = METAL_RATES[metal] * grams;
  const makingValue = metalValue * making / 100;
  const gst = (metalValue + makingValue) * 0.03;

  return (
    <div>
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="eyebrow text-gold-light">Live rates</p>
          <h1 className="mt-4 font-serif text-4xl lg:text-5xl">Today's gold, silver and platinum rate</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70">
            Sourced from the Jaipur bullion market and applied to every price on this site. Updated {RATE_UPDATED_AT}.
          </p>

          <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {RATE_CARDS.map((card, index) =>
            <Reveal key={card.key} delay={index * 0.05} className="bg-ink p-6">
                <p className="eyebrow text-gold-light">{card.label}</p>
                <p className="mt-3 font-serif text-3xl">{formatINR(card.rate)}</p>
                <p className="mt-1 text-xs text-white/50">{card.sublabel}</p>
                <p
                className={cn(
                  'mt-3 flex items-center gap-1 text-xs',
                  card.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                )}>
                
                  {card.change >= 0 ? <TrendingUpIcon className="h-3 w-3" /> : <TrendingDownIcon className="h-3 w-3" />}
                  {Math.abs(card.change).toFixed(2)}% today
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Historical trend"
          title="Last 30 sessions"
          action={
          <div className="flex gap-2">
              {series.map((item) =>
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={cn(
                'border px-4 py-2 text-[11px] uppercase tracking-luxe transition-colors',
                active === item.key ?
                'border-gold bg-gold text-ink' :
                'border-ink/15 text-ink-muted hover:border-gold'
              )}>
              
                  {item.label}
                </button>
            )}
            </div>
          } />
        

        <div className="mt-10 h-[360px] w-full border border-ink/10 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={GOLD_HISTORY} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#EFEFEF" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B6B72' }} tickLine={false} axisLine={false} />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 11, fill: '#6B6B72' }}
                tickLine={false}
                axisLine={false}
                width={60} />
              
              <Tooltip
                formatter={(value: number) => [formatINR(value), 'Rate per gram']}
                contentStyle={{ border: '1px solid #EFEFEF', borderRadius: 0, fontSize: 12 }} />
              
              <Area type="monotone" dataKey={active} stroke="#D4AF37" strokeWidth={2} fill="url(#rateFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-beige py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal className="border border-ink/10 bg-white p-8">
            <h2 className="font-serif text-2xl text-ink">Value calculator</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Work out what a piece should cost before you walk into any store.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="metal" className="eyebrow mb-2 block text-ink-muted">
                  Metal
                </label>
                <select
                  id="metal"
                  value={metal}
                  onChange={(event) => setMetal(event.target.value as MetalKey)}
                  className="h-11 w-full border border-ink/15 px-3 text-sm outline-none focus:border-gold">
                  
                  {RATE_CARDS.map((card) =>
                  <option key={card.key} value={card.key}>
                      {card.label} — {formatINR(card.rate)}/g
                    </option>
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="grams" className="eyebrow mb-2 block text-ink-muted">
                  Weight · {grams} g
                </label>
                <input
                  id="grams"
                  type="range"
                  min={1}
                  max={150}
                  value={grams}
                  onChange={(event) => setGrams(Number(event.target.value))}
                  className="w-full accent-gold" />
                
              </div>

              <div>
                <label htmlFor="making" className="eyebrow mb-2 block text-ink-muted">
                  Making charges · {making}%
                </label>
                <input
                  id="making"
                  type="range"
                  min={0}
                  max={25}
                  value={making}
                  onChange={(event) => setMaking(Number(event.target.value))}
                  className="w-full accent-gold" />
                
              </div>
            </div>

            <dl className="mt-8 space-y-2 border-t border-ink/10 pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Metal value</dt>
                <dd className="text-ink">{formatINR(metalValue)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Making charges</dt>
                <dd className="text-ink">{formatINR(makingValue)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">GST · 3%</dt>
                <dd className="text-ink">{formatINR(gst)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-gold/40 pt-4">
                <dt className="font-serif text-xl text-ink">Estimated price</dt>
                <dd className="font-serif text-2xl text-gold-deep">{formatINR(metalValue + makingValue + gst)}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="border border-ink/10 bg-white p-8">
            <BellIcon className="h-6 w-6 text-gold-deep" />
            <h2 className="mt-4 font-serif text-2xl text-ink">Rate alerts</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              We will message you when 22K crosses the price you set — useful if you are timing a bridal purchase or a
              coin investment.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success('Alert set', { description: 'We will notify you the moment the rate moves.' });
                setAlertEmail('');
              }}>
              
              <div>
                <label htmlFor="alert-price" className="eyebrow mb-2 block text-ink-muted">
                  Notify me below
                </label>
                <input
                  id="alert-price"
                  type="number"
                  defaultValue={6700}
                  className="h-11 w-full border border-ink/15 px-3 text-sm outline-none focus:border-gold" />
                
              </div>
              <div>
                <label htmlFor="alert-email" className="eyebrow mb-2 block text-ink-muted">
                  Email or mobile
                </label>
                <input
                  id="alert-email"
                  required
                  value={alertEmail}
                  onChange={(event) => setAlertEmail(event.target.value)}
                  className="h-11 w-full border border-ink/15 px-3 text-sm outline-none focus:border-gold" />
                
              </div>
              <Button type="submit" variant="gold" className="w-full">
                Set alert
              </Button>
            </form>
            <p className="mt-6 border-t border-ink/10 pt-5 text-xs leading-relaxed text-ink-muted">
              Rates are indicative and exclude making charges and GST. The rate applied to your order is the one locked
              at the moment of payment.
            </p>
          </Reveal>
        </div>
      </section>
    </div>);

}