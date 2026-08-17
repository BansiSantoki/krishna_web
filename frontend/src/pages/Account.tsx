import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BellIcon,
  CreditCardIcon,
  GiftIcon,
  HeartIcon,
  MapPinIcon,
  PackageIcon,
  SettingsIcon,
  StarIcon,
  UserIcon } from
'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { productById, products } from '../data/products';
import { formatINR, priceBreakup } from '../utils/pricing';
import { ButtonLink } from '../components/ui/Button';
import { cn } from '../utils/cn';

const sections = [
{ key: 'orders', label: 'Orders', icon: PackageIcon },
{ key: 'wishlist', label: 'Wishlist', icon: HeartIcon },
{ key: 'rentals', label: 'Rentals & sell requests', icon: GiftIcon },
{ key: 'addresses', label: 'Addresses', icon: MapPinIcon },
{ key: 'rewards', label: 'Wallet & rewards', icon: StarIcon },
{ key: 'notifications', label: 'Notifications', icon: BellIcon },
{ key: 'settings', label: 'Settings', icon: SettingsIcon }] as
const;

type SectionKey = (typeof sections)[number]['key'];

const orders = [
{ id: 'KJ-2026-48117', date: '02 Aug 2026', status: 'In transit', productIndex: 16 },
{ id: 'KJ-2026-46902', date: '19 Jul 2026', status: 'Delivered', productIndex: 8 },
{ id: 'KJ-2026-44280', date: '28 Jun 2026', status: 'Delivered', productIndex: 23 }];


export function Account() {
  const { user, wishlist, signOut } = useStore();
  const [section, setSection] = useState<SectionKey>('orders');

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-gold-deep">Your account</p>
          <h1 className="mt-3 font-serif text-4xl text-ink">
            {user ? `Namaste, ${user.name.split(' ')[0]}` : 'Namaste, guest'}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            {user ? `${user.email} · ${user.phone}` : 'Sign in to see your orders, rentals and reward points.'}
          </p>
        </div>
        {user ?
        <button
          type="button"
          onClick={signOut}
          className="text-[11px] uppercase tracking-luxe text-ink-muted underline underline-offset-4 hover:text-ink">
          
            Sign out
          </button> :

        <ButtonLink to="/login" variant="gold">
            Sign in
          </ButtonLink>
        }
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
        <nav aria-label="Account sections">
          <ul className="space-y-1 border border-ink/10">
            {sections.map((item) =>
            <li key={item.key}>
                <button
                type="button"
                onClick={() => setSection(item.key)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors',
                  section === item.key ? 'bg-beige text-ink' : 'text-ink-muted hover:bg-beige/60'
                )}>
                
                  <item.icon className="h-4 w-4 text-gold-deep" />
                  {item.label}
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div>
          {section === 'orders' &&
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {orders.map((order) => {
              const product = products[order.productIndex];
              return (
                <li key={order.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center">
                    <img src={product.images[0]} alt="" className="h-24 w-20 object-cover" loading="lazy" />
                    <div className="flex-1">
                      <p className="eyebrow text-ink-muted">{order.id}</p>
                      <Link
                      to={`/product/${product.slug}`}
                      className="mt-1 block font-serif text-lg text-ink hover:text-gold-deep">
                      
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink-muted">Placed {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg text-ink">{formatINR(priceBreakup(product).total)}</p>
                      <p
                      className={cn(
                        'mt-1 text-xs',
                        order.status === 'Delivered' ? 'text-ink-muted' : 'text-emerald-700'
                      )}>
                      
                        {order.status}
                      </p>
                    </div>
                  </li>);

            })}
            </ul>
          }

          {section === 'wishlist' &&
          <div className="grid gap-6 sm:grid-cols-2">
              {wishlist.length === 0 && <p className="text-sm text-ink-muted">Nothing saved yet.</p>}
              {wishlist.map((id) => {
              const product = productById(id);
              if (!product) return null;
              return (
                <Link key={id} to={`/product/${product.slug}`} className="flex gap-4 border border-ink/10 p-4">
                    <img src={product.images[0]} alt="" className="h-24 w-20 object-cover" loading="lazy" />
                    <div>
                      <p className="font-serif text-base text-ink">{product.name}</p>
                      <p className="mt-1 text-sm text-gold-deep">{formatINR(priceBreakup(product).total)}</p>
                    </div>
                  </Link>);

            })}
            </div>
          }

          {section === 'rentals' &&
          <div className="space-y-6">
              <Panel title="Rental orders">
                <p className="text-sm text-ink-muted">
                  Reception Diamond Choker Set · 14–17 Nov 2026 · deposit {formatINR(126000)} held · return tracking
                  opens 24 hours before the due date.
                </p>
              </Panel>
              <Panel title="Sell requests">
                <p className="text-sm text-ink-muted">
                  Request SR-2211 · 42 g of 22K · assayed at 91.4% · settlement of {formatINR(262000)} credited on 12
                  July 2026.
                </p>
              </Panel>
            </div>
          }

          {section === 'addresses' &&
          <div className="grid gap-6 sm:grid-cols-2">
              {['Home · Jaipur', 'Office · Jaipur'].map((label) =>
            <Panel key={label} title={label}>
                  <p className="text-sm text-ink-muted">
                    14 Johari Bazaar Road, Jaipur 302003, Rajasthan · +91 98290 44112
                  </p>
                </Panel>
            )}
            </div>
          }

          {section === 'rewards' &&
          <div className="grid gap-6 sm:grid-cols-3">
              <Panel title="Wallet">
                <p className="font-serif text-3xl text-ink">{formatINR(4200)}</p>
              </Panel>
              <Panel title="Reward points">
                <p className="font-serif text-3xl text-ink">8,140</p>
                <p className="mt-1 text-xs text-ink-muted">₹1 per 10 points at checkout</p>
              </Panel>
              <Panel title="Refer & earn">
                <p className="text-sm text-ink-muted">Your code</p>
                <p className="mt-1 font-serif text-2xl text-gold-deep">ANANYA400</p>
              </Panel>
            </div>
          }

          {section === 'notifications' &&
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {[
            'Your order KJ-2026-48117 has been dispatched and is insured in transit.',
            '22K gold crossed ₹6,840/g — your rate alert has triggered.'].
            map((note) =>
            <li key={note} className="flex gap-3 py-5 text-sm text-ink-muted">
                  <BellIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  {note}
                </li>
            )}
            </ul>
          }

          {section === 'settings' &&
          <div className="space-y-6">
              <Panel title="Profile">
                <p className="flex items-center gap-2 text-sm text-ink-muted">
                  <UserIcon className="h-4 w-4 text-gold-deep" /> {user?.name ?? 'Guest'} · {user?.email ?? '—'}
                </p>
              </Panel>
              <Panel title="Payment methods">
                <p className="flex items-center gap-2 text-sm text-ink-muted">
                  <CreditCardIcon className="h-4 w-4 text-gold-deep" /> HDFC •••• 4412 · UPI ananya@okhdfc
                </p>
              </Panel>
              <Panel title="Security">
                <p className="text-sm text-ink-muted">
                  Two-factor authentication is on. Required for orders above ₹5 lakh and for any bank detail change.
                </p>
              </Panel>
            </div>
          }
        </div>
      </div>
    </div>);

}

function Panel({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <section className="border border-ink/10 p-6">
      <h2 className="eyebrow mb-3 text-ink">{title}</h2>
      {children}
    </section>);

}