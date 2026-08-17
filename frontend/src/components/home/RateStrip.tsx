import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { RATE_CARDS, RATE_UPDATED_AT } from '../../data/rates';
import { trustPoints } from '../../data/content';
import { formatINR } from '../../utils/pricing';
import { Reveal } from '../ui/Reveal';

export function RateStrip() {
  return (
    <section className="border-b border-ink/10 bg-beige" aria-label="Live metal rates and assurances">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-4">
            {RATE_CARDS.slice(0, 4).map((card) =>
            <div key={card.key} className="flex items-baseline gap-2">
                <span className="eyebrow text-ink-muted">{card.label}</span>
                <span className="font-serif text-xl text-ink">{formatINR(card.rate)}</span>
                <span className="text-[11px] text-ink-muted">/g</span>
                <span
                className={`flex items-center gap-0.5 text-[11px] ${
                card.change >= 0 ? 'text-emerald-700' : 'text-red-700'}`
                }>
                
                  {card.change >= 0 ?
                <TrendingUpIcon className="h-3 w-3" /> :

                <TrendingDownIcon className="h-3 w-3" />
                }
                  {Math.abs(card.change).toFixed(2)}%
                </span>
              </div>
            )}
            <Link
              to="/gold-rate"
              className="flex items-center gap-1 text-[11px] uppercase tracking-luxe text-gold-deep hover:underline">
              
              Charts & calculator <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="text-[11px] text-ink-muted">Updated {RATE_UPDATED_AT}</p>
        </Reveal>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-ink/10 px-0 lg:grid-cols-4">
          {trustPoints.map((point, index) =>
          <Reveal
            key={point.title}
            delay={index * 0.06}
            className="bg-beige px-5 py-6 text-center sm:px-8">
            
              <p className="font-serif text-base text-ink">{point.title}</p>
              <p className="mt-1 text-xs text-ink-muted">{point.detail}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}