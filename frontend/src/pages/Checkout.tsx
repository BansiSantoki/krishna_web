import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, CreditCardIcon, LockIcon, SmartphoneIcon, WalletIcon } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { productById } from '../data/products';
import { formatINR, priceBreakup } from '../utils/pricing';
import { Button, ButtonLink } from '../components/ui/Button';
import { cn } from '../utils/cn';

const steps = ['Details', 'Delivery', 'Payment'] as const;

const slots = ['Tomorrow, 10 AM – 1 PM', 'Tomorrow, 4 PM – 8 PM', 'Saturday, 10 AM – 1 PM', 'Pick up in store'];

const paymentMethods = [
{ id: 'upi', label: 'UPI · GPay, PhonePe, Paytm', icon: SmartphoneIcon, note: 'Instant, no charges' },
{ id: 'card', label: 'Credit or debit card', icon: CreditCardIcon, note: 'Visa, Mastercard, RuPay, Amex' },
{ id: 'emi', label: 'EMI · 3 to 24 months', icon: WalletIcon, note: 'No cost EMI on select cards' },
{ id: 'netbanking', label: 'Net banking', icon: LockIcon, note: '58 banks supported' },
{ id: 'cod', label: 'Cash on delivery', icon: WalletIcon, note: 'Available up to ₹50,000' }];


export function Checkout() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, cartGstIncluded, clearCart, user } = useStore();
  const [step, setStep] = useState(0);
  const [guest, setGuest] = useState(!user);
  const [slot, setSlot] = useState(slots[0]);
  const [method, setMethod] = useState('upi');
  const [gstInvoice, setGstInvoice] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">Nothing to check out yet</h1>
        <ButtonLink to="/shop" variant="gold">
          Browse the collection
        </ButtonLink>
      </div>);

  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    clearCart();
    navigate('/order-confirmed');
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
      <h1 className="font-serif text-4xl text-ink">Checkout</h1>

      <ol className="mt-8 flex items-center gap-4">
        {steps.map((label, index) =>
        <li key={label} className="flex items-center gap-3">
            <span
            className={cn(
              'flex h-8 w-8 items-center justify-center border text-xs',
              index <= step ? 'border-gold bg-gold text-ink' : 'border-ink/20 text-ink-muted'
            )}>
            
              {index < step ? <CheckIcon className="h-4 w-4" /> : index + 1}
            </span>
            <span className={cn('text-[11px] uppercase tracking-luxe', index <= step ? 'text-ink' : 'text-ink-muted')}>
              {label}
            </span>
            {index < steps.length - 1 && <span className="hidden h-px w-12 bg-ink/15 sm:block" />}
          </li>
        )}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="space-y-8">
          {step === 0 &&
          <section className="space-y-6">
              <div className="flex gap-3">
                <button
                type="button"
                onClick={() => setGuest(true)}
                className={cn(
                  'flex-1 border px-4 py-3 text-[11px] uppercase tracking-luxe transition-colors',
                  guest ? 'border-gold bg-gold/10 text-ink' : 'border-ink/15 text-ink-muted'
                )}>
                
                  Guest checkout
                </button>
                <button
                type="button"
                onClick={() => setGuest(false)}
                className={cn(
                  'flex-1 border px-4 py-3 text-[11px] uppercase tracking-luxe transition-colors',
                  !guest ? 'border-gold bg-gold/10 text-ink' : 'border-ink/15 text-ink-muted'
                )}>
                
                  Sign in & checkout
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" defaultValue={user?.name} required />
                <Field label="Mobile number" type="tel" defaultValue={user?.phone} required />
                <Field label="Email" type="email" defaultValue={user?.email} required className="sm:col-span-2" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Address line 1" required className="sm:col-span-2" />
                <Field label="Address line 2" className="sm:col-span-2" />
                <Field label="City" required />
                <Field label="Pincode" required />
                <Field label="State" required className="sm:col-span-2" />
              </div>

              <label className="flex items-center gap-3 text-sm text-ink-muted">
                <input
                type="checkbox"
                checked={gstInvoice}
                onChange={() => setGstInvoice(!gstInvoice)}
                className="h-4 w-4 accent-gold" />
              
                I need a GST invoice for a business purchase
              </label>
              {gstInvoice &&
            <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="GSTIN" required />
                  <Field label="Registered business name" required />
                </div>
            }
            </section>
          }

          {step === 1 &&
          <section className="space-y-6">
              <h2 className="font-serif text-2xl text-ink">Choose a delivery slot</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {slots.map((option) =>
              <button
                key={option}
                type="button"
                onClick={() => setSlot(option)}
                className={cn(
                  'border px-4 py-4 text-left text-sm transition-colors',
                  slot === option ? 'border-gold bg-gold/10 text-ink' : 'border-ink/15 text-ink-muted hover:border-gold'
                )}>
                
                    {option}
                  </button>
              )}
              </div>
              <div className="border border-ink/10 bg-beige/50 p-5 text-sm leading-relaxed text-ink-muted">
                All shipments travel fully insured and require an OTP plus photo ID at handover. Bridal orders are
                delivered personally by a store representative at no extra charge.
              </div>
              <Field label="Delivery instructions (optional)" as="textarea" />
            </section>
          }

          {step === 2 &&
          <section className="space-y-6">
              <h2 className="font-serif text-2xl text-ink">Payment method</h2>
              <ul className="space-y-3">
                {paymentMethods.map((option) =>
              <li key={option.id}>
                    <button
                  type="button"
                  onClick={() => setMethod(option.id)}
                  className={cn(
                    'flex w-full items-center gap-4 border px-4 py-4 text-left transition-colors',
                    method === option.id ? 'border-gold bg-gold/10' : 'border-ink/15 hover:border-gold'
                  )}>
                  
                      <option.icon className="h-5 w-5 text-gold-deep" />
                      <span className="flex-1">
                        <span className="block text-sm text-ink">{option.label}</span>
                        <span className="block text-xs text-ink-muted">{option.note}</span>
                      </span>
                      {method === option.id && <CheckIcon className="h-4 w-4 text-gold-deep" />}
                    </button>
                  </li>
              )}
              </ul>
              <p className="flex items-center gap-2 text-xs text-ink-muted">
                <LockIcon className="h-4 w-4 text-gold-deep" /> Payments are processed over a secured gateway. Card
                details are never stored on our servers.
              </p>
            </section>
          }

          <div className="flex items-center gap-3">
            {step > 0 &&
            <Button type="button" variant="outline" size="lg" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            }
            <Button type="submit" variant="gold" size="lg">
              {step === 2 ? `Pay ${formatINR(cartSubtotal)}` : 'Continue'}
            </Button>
          </div>
        </form>

        <aside className="h-fit border border-ink/10 bg-beige/50 p-6 lg:sticky lg:top-32">
          <h2 className="font-serif text-2xl text-ink">Order summary</h2>
          <ul className="mt-5 space-y-4 border-b border-ink/10 pb-5">
            {cart.map((line) => {
              const product = productById(line.productId);
              if (!product) return null;
              return (
                <li key={line.productId} className="flex gap-3">
                  <img src={product.images[0]} alt="" className="h-16 w-14 object-cover" loading="lazy" />
                  <div className="flex-1">
                    <p className="font-serif text-sm leading-snug text-ink">{product.name}</p>
                    <p className="text-xs text-ink-muted">Qty {line.quantity}</p>
                  </div>
                  <span className="text-sm text-ink">
                    {formatINR(priceBreakup(product).total * line.quantity)}
                  </span>
                </li>);

            })}
          </ul>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">GST included</dt>
              <dd className="text-ink">{formatINR(cartGstIncluded)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Shipping</dt>
              <dd className="text-emerald-700">Free & insured</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-gold/40 pt-4">
              <dt className="font-serif text-xl text-ink">Total</dt>
              <dd className="font-serif text-2xl text-gold-deep">{formatINR(cartSubtotal)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>);

}

function Field({
  label,
  className,
  as = 'input',
  ...rest




}: {label: string;className?: string;as?: 'input' | 'textarea';} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-');
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow mb-2 block text-ink-muted">
        {label}
      </label>
      {as === 'textarea' ?
      <textarea
        id={id}
        rows={3}
        className="w-full border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold" /> :


      <input
        id={id}
        className="h-11 w-full border border-ink/15 px-3 text-sm outline-none focus:border-gold"
        {...rest} />

      }
    </div>);

}