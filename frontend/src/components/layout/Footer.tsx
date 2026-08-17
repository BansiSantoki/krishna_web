import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
// social icons: using simple text/initials to avoid mismatched lucide-react exports
import { Button } from '../ui/Button';

const columns = [
{
  title: 'Shop',
  links: [
  { label: 'All Jewellery', to: '/shop' },
  { label: 'Bridal Collection', to: '/bridal' },
  { label: 'Gold', to: '/category/gold' },
  { label: 'Diamond', to: '/category/diamond' },
  { label: 'Platinum', to: '/category/platinum' },
  { label: 'Offers', to: '/offers' }]

},
{
  title: 'Services',
  links: [
  { label: 'Live Gold Rate', to: '/gold-rate' },
  { label: 'Sell Jewellery', to: '/sell' },
  { label: 'Rent Jewellery', to: '/rent' },
  { label: 'Book Appointment', to: '/contact' },
  { label: 'Compare Pieces', to: '/compare' },
  { label: 'Your Wishlist', to: '/wishlist' }]

},
{
  title: 'Support',
  links: [
  { label: 'Contact Us', to: '/contact' },
  { label: 'Track Order', to: '/account' },
  { label: 'FAQ', to: '/contact' },
  { label: 'Store Locations', to: '/contact' },
  { label: 'Careers', to: '/about' },
  { label: 'About Us', to: '/about' }]

},
{
  title: 'Policies',
  links: [
  { label: 'Terms & Conditions', to: '/about' },
  { label: 'Privacy Policy', to: '/about' },
  { label: 'Refund Policy', to: '/about' },
  { label: 'Shipping Policy', to: '/about' },
  { label: 'Return Policy', to: '/about' },
  { label: 'Buyback Policy', to: '/sell' }]

}];


const socials = [
  { label: 'Instagram' },
  { label: 'Facebook' },
  { label: 'YouTube' },
  { label: 'LinkedIn' }];


export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-serif text-2xl tracking-[0.18em] text-white">KRISHNA</p>
            <p className="mt-1 text-[9px] tracking-[0.55em] text-gold">JEWELS</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">
              Hallmarked gold, certified diamonds and hand-set bridal jewellery since 1974. Four stores, one workshop,
              and a price breakup on every invoice.
            </p>
            <form
              className="mt-8 flex max-w-sm gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success('Subscribed', { description: 'Collection previews and rate alerts, twice a month.' });
                setEmail('');
              }}>
              
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="h-11 flex-1 border border-white/20 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-gold" />
              
              <Button type="submit" variant="gold">
                Join
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) =>
            <div key={column.title}>
                <p className="eyebrow mb-4 text-gold">{column.title}</p>
                <ul className="space-y-2.5">
                  {column.links.map((link) =>
                <li key={link.label}>
                      <Link to={link.to} className="text-sm transition-colors hover:text-gold">
                        {link.label}
                      </Link>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs">© {new Date().getFullYear()} Krishna Jewels. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center border border-white/15 transition-colors hover:border-gold hover:text-gold">
                <span className="text-sm font-semibold">{social.label[0]}</span>
              </a>
            ))}
          </div>
          <p className="text-xs">GST 08AABCK1234K1ZQ · BIS Licence CM/L-9912004</p>
        </div>
      </div>
    </footer>);

}