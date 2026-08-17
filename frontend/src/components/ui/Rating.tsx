import React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RatingProps {
  value?: number;
  reviews?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function Rating({ value, reviews, size = 'sm', className }: RatingProps) {
  const dimension = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) =>
        <StarIcon
          key={star}
          className={cn(dimension, star <= Math.round(value ?? 0) ? 'fill-gold text-gold' : 'text-ink/20')} />

        )}
      </div>
      <span className="text-xs text-ink-muted">
        {typeof value === 'number' ? value.toFixed(1) : '—'}
        {typeof reviews === 'number' && ` (${reviews})`}
      </span>
      <span className="sr-only">{`Rated ${value} out of 5${reviews ? ` from ${reviews} reviews` : ''}`}</span>
    </div>);

}