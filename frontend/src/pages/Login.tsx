import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// provider icons intentionally omitted to avoid icon export mismatches
import { useStore } from '../contexts/StoreContext';
import { Button } from '../components/ui/Button';
import { IMAGES } from '../data/categories';
import { cn } from '../utils/cn';

type Mode = 'email' | 'otp';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useStore();
  const [mode, setMode] = useState<Mode>('otp');
  const [otpSent, setOtpSent] = useState(false);

  const complete = () => {
    signIn({ name: 'Ananya Sethi', email: 'ananya@example.in', phone: '+91 98290 44112' });
    navigate('/account');
  };

  return (
    <div className="grid min-h-[80vh] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img src={IMAGES.editorialBridal} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute bottom-0 p-12 text-white">
          <p className="eyebrow text-gold-light">Your account</p>
          <p className="mt-4 max-w-sm font-serif text-3xl leading-snug">
            Orders, certificates, rental agreements and buyback value — all in one place.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="font-serif text-4xl text-ink">Sign in</h1>
          <p className="mt-2 text-sm text-ink-muted">New here? An account is created automatically on first sign-in.</p>

          <div className="mt-8 flex gap-2">
            {(['otp', 'email'] as Mode[]).map((option) =>
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={cn(
                'flex-1 border px-4 py-3 text-[11px] uppercase tracking-luxe transition-colors',
                mode === option ? 'border-gold bg-gold/10 text-ink' : 'border-ink/15 text-ink-muted hover:border-gold'
              )}>
              
                {option === 'otp' ? 'Mobile OTP' : 'Email & password'}
              </button>
            )}
          </div>

          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (mode === 'otp' && !otpSent) {
                setOtpSent(true);
                toast.success('OTP sent', { description: 'Six-digit code sent to your mobile.' });
                return;
              }
              complete();
            }}>
            
            {mode === 'otp' ?
            <>
                <Field label="Mobile number" type="tel" required defaultValue="+91 " />
                {otpSent && <Field label="Six-digit OTP" inputMode="numeric" required />}
                <Button type="submit" variant="gold" size="lg" className="w-full">
                  {otpSent ? 'Verify & continue' : 'Send OTP'}
                </Button>
              </> :

            <>
                <Field label="Email" type="email" required />
                <Field label="Password" type="password" required />
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-ink-muted">
                    <input type="checkbox" className="h-4 w-4 accent-gold" /> Keep me signed in
                  </label>
                  <button
                  type="button"
                  onClick={() => toast.message('Reset link sent', { description: 'Check your inbox.' })}
                  className="text-gold-deep underline underline-offset-4">
                  
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Sign in
                </Button>
              </>
            }
          </form>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-ink/10" />
            <span className="eyebrow text-ink-muted">or continue with</span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['Google', 'Apple', 'Facebook'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={complete}
                className="flex h-12 items-center justify-center gap-2 border border-ink/15 text-sm text-ink transition-colors hover:border-gold">
                <span className="h-4 w-4 inline-flex items-center justify-center text-sm">{label[0]}</span>
                <span className="sr-only sm:not-sr-only">{label}</span>
              </button>
            ))}
          </div>

          <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
            <span className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep">✔️</span>
            Two-factor authentication is available in account settings and is required for orders above ₹5 lakh.
          </p>
        </div>
      </div>
    </div>);

}

function Field({ label, ...rest }: {label: string;} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `login-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`;
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