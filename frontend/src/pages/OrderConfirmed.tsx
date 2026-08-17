import React from 'react';
import { CheckIcon, DownloadIcon, PackageIcon, TruckIcon } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';

const timeline = [
{ label: 'Order confirmed', detail: 'Payment received · today, 11:42 AM', done: true },
{ label: 'Quality check & hallmark verification', detail: 'Expected tomorrow', done: false },
{ label: 'Dispatched, fully insured', detail: 'Expected in 3 days', done: false },
{ label: 'Delivered with OTP handover', detail: 'Expected in 5 days', done: false }];


export function OrderConfirmed() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h1 className="mt-8 font-serif text-4xl text-ink">Thank you — your order is confirmed</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Order <span className="text-ink">#KJ-2026-48117</span>. A GST invoice with the full price breakup has been
          emailed to you, and a store representative will call within two hours to confirm the delivery slot.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 border border-ink/10 p-6">
        <ol className="space-y-6">
          {timeline.map((item) =>
          <li key={item.label} className="flex gap-4">
              <span
              className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
              item.done ? 'border-gold bg-gold text-ink' : 'border-ink/20 text-ink-muted'}`
              }>
              
                {item.done ? <CheckIcon className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              <div>
                <p className="font-serif text-lg text-ink">{item.label}</p>
                <p className="text-xs text-ink-muted">{item.detail}</p>
              </div>
            </li>
          )}
        </ol>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-3">
        <ButtonLink to="/account" variant="gold">
          <PackageIcon className="h-4 w-4" /> Track order
        </ButtonLink>
        <ButtonLink to="/account" variant="outline">
          <DownloadIcon className="h-4 w-4" /> GST invoice
        </ButtonLink>
        <ButtonLink to="/shop" variant="outline">
          <TruckIcon className="h-4 w-4" /> Keep shopping
        </ButtonLink>
      </Reveal>
    </div>);

}