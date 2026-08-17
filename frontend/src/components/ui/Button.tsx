import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'gold' | 'ink' | 'outline' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-ink hover:bg-gold-light border border-gold',
  ink: 'bg-ink text-white hover:bg-ink-soft border border-ink',
  outline: 'border border-ink/25 text-ink hover:border-gold hover:text-gold-deep bg-transparent',
  ghost: 'border border-transparent text-ink hover:text-gold-deep',
  light: 'border border-white/50 text-white hover:bg-white hover:text-ink bg-transparent'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-11 px-6 text-[11px]',
  lg: 'h-14 px-9 text-xs'
};

const base =
'inline-flex items-center justify-center gap-2 uppercase tracking-luxe font-medium transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'ink',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>);

}

export function ButtonLink({
  variant = 'ink',
  size = 'md',
  className,
  children,
  to,
  ...rest
}: CommonProps & {to: string;} & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>);

}