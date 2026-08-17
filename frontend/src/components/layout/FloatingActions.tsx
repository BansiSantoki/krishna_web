import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpIcon, CalendarCheckIcon, MessageCircleIcon } from 'lucide-react';

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible &&
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35 }}
        className="fixed bottom-24 right-4 z-[55] flex flex-col items-end gap-3 sm:bottom-8 sm:right-6">
        
          <a
          href="https://wa.me/911414008899"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-gold shadow-luxe transition-transform hover:scale-105">
          
            <MessageCircleIcon className="h-5 w-5" />
          </a>
          <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-card transition-transform hover:scale-105">
          
            <ArrowUpIcon className="h-5 w-5" />
          </button>
          <Link
          to="/contact"
          className="flex h-12 items-center gap-2 rounded-full bg-gold px-5 text-[11px] uppercase tracking-luxe text-ink shadow-luxe transition-transform hover:scale-[1.03]">
          
            <CalendarCheckIcon className="h-4 w-4" /> Book appointment
          </Link>
        </motion.div>
      }
    </AnimatePresence>);

}