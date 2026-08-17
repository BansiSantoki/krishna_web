import React from 'react';
import { ButtonLink } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
      <p className="eyebrow text-gold-deep">404</p>
      <h1 className="font-serif text-4xl text-ink">This page has been reset</h1>
      <p className="text-sm leading-relaxed text-ink-muted">
        The link you followed no longer exists. The collection, the live rate and the bridal edit are all one click
        away.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/" variant="gold">
          Back home
        </ButtonLink>
        <ButtonLink to="/shop" variant="outline">
          Browse the collection
        </ButtonLink>
      </div>
    </div>);

}