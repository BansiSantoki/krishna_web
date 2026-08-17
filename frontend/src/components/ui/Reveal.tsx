import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

export function Reveal({ children, delay = 0, y = 26, className, as = 'div' }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(className)}>
      
      {children}
    </Component>);

}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  action
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center text-center'
      )}>
      
      <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow &&
        <p className={cn('eyebrow mb-3', tone === 'light' ? 'text-gold-light' : 'text-gold-deep')}>{eyebrow}</p>
        }
        <h2
          className={cn(
            'font-serif text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]',
            tone === 'light' ? 'text-white' : 'text-ink'
          )}>
          
          {title}
        </h2>
        {description &&
        <p className={cn('mt-4 text-sm leading-relaxed', tone === 'light' ? 'text-white/70' : 'text-ink-muted')}>
            {description}
          </p>
        }
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>);

}