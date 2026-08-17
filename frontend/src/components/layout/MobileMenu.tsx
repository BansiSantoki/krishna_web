import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, PhoneIcon, XIcon } from 'lucide-react';
import { categories } from '../../data/categories';
import { cn } from '../../utils/cn';

const quickLinks = [
{ label: 'Home', to: '/' },
{ label: 'Shop All', to: '/shop' },
{ label: 'Bridal Collection', to: '/bridal' },
{ label: 'Gold Rate', to: '/gold-rate' },
{ label: 'Sell Jewellery', to: '/sell' },
{ label: 'Rent Jewellery', to: '/rent' },
{ label: 'Offers', to: '/offers' },
{ label: 'Blog', to: '/blog' },
{ label: 'About', to: '/about' },
{ label: 'Contact', to: '/contact' }];


interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-ink/50 lg:hidden"
        onClick={onClose}>
        
          <motion.nav
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="flex h-full w-[88%] max-w-sm flex-col bg-white"
          aria-label="Mobile navigation">
          
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <div>
                <p className="font-serif text-xl tracking-[0.18em] text-ink">KRISHNA</p>
                <p className="mt-1 text-[9px] tracking-[0.5em] text-gold-deep">JEWELS</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close menu" className="p-2 text-ink">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="eyebrow mb-3 text-gold-deep">Categories</p>
              <ul className="mb-6 divide-y divide-ink/10 border-y border-ink/10">
                {categories.map((category) =>
              <li key={category.slug}>
                    <button
                  type="button"
                  onClick={() => setExpanded((current) => current === category.slug ? null : category.slug)}
                  aria-expanded={expanded === category.slug}
                  className="flex w-full items-center justify-between py-3 text-left font-serif text-base text-ink">
                  
                      {category.name}
                      <ChevronDownIcon
                    className={cn(
                      'h-4 w-4 text-ink-muted transition-transform',
                      expanded === category.slug && 'rotate-180'
                    )} />
                  
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === category.slug &&
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pb-3">
                    
                          <li>
                            <Link
                        to={`/category/${category.slug}`}
                        onClick={onClose}
                        className="block py-1.5 text-sm text-gold-deep">
                        
                              View all {category.name}
                            </Link>
                          </li>
                          {category.subCategories.map((sub) =>
                    <li key={sub.slug}>
                              <Link
                        to={`/shop?sub=${sub.slug}`}
                        onClick={onClose}
                        className="block py-1.5 text-sm text-ink-muted">
                        
                                {sub.name}
                              </Link>
                            </li>
                    )}
                        </motion.ul>
                  }
                    </AnimatePresence>
                  </li>
              )}
              </ul>

              <ul className="space-y-3">
                {quickLinks.map((link) =>
              <li key={link.to}>
                    <Link
                  to={link.to}
                  onClick={onClose}
                  className="text-[11px] uppercase tracking-luxe text-ink transition-colors hover:text-gold-deep">
                  
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>

            <a
            href="tel:+911414008899"
            className="flex items-center justify-center gap-2 bg-ink py-4 text-[11px] uppercase tracking-luxe text-gold">
            
              <PhoneIcon className="h-4 w-4" /> Book an appointment
            </a>
          </motion.nav>
        </motion.div>
      }
    </AnimatePresence>);

}