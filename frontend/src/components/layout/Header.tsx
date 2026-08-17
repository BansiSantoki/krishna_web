import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BellIcon,
  GitCompareIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon } from
'lucide-react';
import { categories, IMAGES } from '../../data/categories';
import { METAL_RATES } from '../../data/rates';
import { formatINR } from '../../utils/pricing';
import { useStore } from '../../contexts/StoreContext';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../utils/cn';

const navLinks = [
{ label: 'Shop', to: '/shop' },
{ label: 'Bridal', to: '/bridal' },
{ label: 'Gold Rate', to: '/gold-rate' },
{ label: 'Sell', to: '/sell' },
{ label: 'Rent', to: '/rent' },
{ label: 'Offers', to: '/offers' },
{ label: 'Blog', to: '/blog' },
{ label: 'About', to: '/about' },
{ label: 'Contact', to: '/contact' }];


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartCount, wishlist, compare, setCartOpen, setSearchOpen, user } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink py-2 text-center text-[11px] tracking-[0.2em] text-white/70 md:block">
        <span className="text-gold">22K Gold {formatINR(METAL_RATES.gold22)}/g</span>
        <span className="mx-3 text-white/25">|</span>
        Complimentary insured shipping across India
        <span className="mx-3 text-white/25">|</span>
        Book a bridal appointment · +91 141 400 8899
      </div>

      <div
        className={cn(
          'border-b transition-all duration-500',
          scrolled ? 'border-ink/10 bg-white/90 backdrop-blur-xl' : 'border-transparent bg-white'
        )}>
        
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="-ml-2 p-2 text-ink lg:hidden">
            
            <MenuIcon className="h-5 w-5" />
          </button>

          <Link to="/" className="group flex flex-col py-4 leading-none">
            <span
              className={cn(
                'font-serif tracking-[0.18em] text-ink transition-all duration-500',
                scrolled ? 'text-xl' : 'text-2xl'
              )}>
              
              KRISHNA
            </span>
            <span className="mt-1 text-[9px] tracking-[0.55em] text-gold-deep">JEWELS</span>
          </Link>

          <nav className="ml-8 hidden flex-1 items-center gap-6 lg:flex" aria-label="Primary">
            <button
              type="button"
              onMouseEnter={() => setMegaOpen(true)}
              onClick={() => setMegaOpen((open) => !open)}
              aria-expanded={megaOpen}
              className={cn(
                'py-6 text-[11px] uppercase tracking-luxe transition-colors',
                megaOpen ? 'text-gold-deep' : 'text-ink hover:text-gold-deep'
              )}>
              
              Categories
            </button>
            {navLinks.map((link) =>
            <NavLink
              key={link.to}
              to={link.to}
              onMouseEnter={() => setMegaOpen(false)}
              className={({ isActive }) =>
              cn(
                'py-6 text-[11px] uppercase tracking-luxe transition-colors',
                isActive ? 'text-gold-deep' : 'text-ink hover:text-gold-deep'
              )
              }>
              
                {link.label}
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon className="h-[18px] w-[18px]" />
            </IconButton>
            <IconLink label="Wishlist" to="/wishlist" count={wishlist.length}>
              <HeartIcon className="h-[18px] w-[18px]" />
            </IconLink>
            <IconLink label="Compare" to="/compare" count={compare.length} className="hidden sm:flex">
              <GitCompareIcon className="h-[18px] w-[18px]" />
            </IconLink>
            <IconLink label="Notifications" to="/account" count={2} className="hidden sm:flex">
              <BellIcon className="h-[18px] w-[18px]" />
            </IconLink>
            <IconButton label="Bag" onClick={() => setCartOpen(true)} count={cartCount}>
              <ShoppingBagIcon className="h-[18px] w-[18px]" />
            </IconButton>
            <IconLink label={user ? 'Account' : 'Sign in'} to={user ? '/account' : '/login'}>
              <UserIcon className="h-[18px] w-[18px]" />
            </IconLink>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen &&
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            onMouseLeave={() => setMegaOpen(false)}
            className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-white shadow-luxe lg:block">
            
              <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-10 py-10">
                <div className="col-span-9 grid grid-cols-4 gap-x-8 gap-y-8">
                  {categories.map((category) =>
                <div key={category.slug}>
                      <Link
                    to={`/category/${category.slug}`}
                    className="font-serif text-base text-ink transition-colors hover:text-gold-deep">
                    
                        {category.name}
                      </Link>
                      <div className="my-3 h-px w-8 bg-gold" />
                      <ul className="space-y-1.5">
                        {category.subCategories.slice(0, 6).map((sub) =>
                    <li key={sub.slug}>
                            <Link
                        to={`/shop?sub=${sub.slug}`}
                        className="text-[13px] text-ink-muted transition-colors hover:text-gold-deep">
                        
                              {sub.name}
                            </Link>
                          </li>
                    )}
                      </ul>
                    </div>
                )}
                </div>
                <Link to="/bridal" className="group relative col-span-3 overflow-hidden">
                  <img
                  src={IMAGES.editorialBridal}
                  alt="The bridal edit"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                
                  <div className="absolute inset-0 bg-ink/40" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="eyebrow text-gold-light">The Bridal Edit</p>
                    <p className="mt-2 font-serif text-2xl">Eleven weeks of hand-set work</p>
                    <span className="mt-3 inline-block border-b border-gold pb-1 text-[11px] uppercase tracking-luxe">
                      Discover
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>);

}

function IconButton({
  children,
  label,
  onClick,
  count,
  className






}: {children: React.ReactNode;label: string;onClick: () => void;count?: number;className?: string;}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn('relative flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-gold-deep', className)}>
      
      {children}
      <Count value={count} />
    </button>);

}

function IconLink({
  children,
  label,
  to,
  count,
  className






}: {children: React.ReactNode;label: string;to: string;count?: number;className?: string;}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={cn('relative flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-gold-deep', className)}>
      
      {children}
      <Count value={count} />
    </Link>);

}

function Count({ value }: {value?: number;}) {
  if (!value) return null;
  return (
    <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-ink">
      {value}
    </span>);

}