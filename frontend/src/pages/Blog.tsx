import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/content';
import { Reveal } from '../components/ui/Reveal';
import { cn } from '../utils/cn';

export function Blog() {
  const categories = ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))];
  const [filter, setFilter] = useState('All');
  const posts = filter === 'All' ? blogPosts : blogPosts.filter((post) => post.category === filter);
  const [lead, ...rest] = posts;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-gold-deep">The Journal</p>
        <h1 className="mt-3 font-serif text-4xl text-ink lg:text-5xl">Notes from the workshop</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Care, certification, investment and bridal planning — written by the people who make and value the jewellery,
          not by a marketing team.
        </p>
      </Reveal>

      <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto">
        {categories.map((category) =>
        <button
          key={category}
          type="button"
          onClick={() => setFilter(category)}
          className={cn(
            'whitespace-nowrap border px-4 py-2 text-xs transition-colors',
            filter === category ?
            'border-gold bg-gold text-ink' :
            'border-ink/15 text-ink-muted hover:border-gold hover:text-ink'
          )}>
          
            {category}
          </button>
        )}
      </div>

      {lead &&
      <Reveal className="mt-12">
          <Link to={`/blog/${lead.slug}`} className="group grid gap-8 lg:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden bg-beige">
              <img
              src={lead.image}
              alt={lead.title}
              className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow text-gold-deep">{lead.category}</p>
              <h2 className="mt-4 font-serif text-3xl leading-snug text-ink transition-colors group-hover:text-gold-deep lg:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{lead.excerpt}</p>
              <p className="mt-5 text-xs text-ink-muted">
                {lead.author} · {lead.date} · {lead.readTime}
              </p>
            </div>
          </Link>
        </Reveal>
      }

      <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, index) =>
        <Reveal key={post.id} delay={index * 0.06} as="article">
            <Link to={`/blog/${post.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-beige">
                <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              
              </div>
              <p className="eyebrow mt-5 text-gold-deep">{post.category}</p>
              <h3 className="mt-3 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-gold-deep">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
              <p className="mt-4 text-xs text-ink-muted">
                {post.date} · {post.readTime}
              </p>
            </Link>
          </Reveal>
        )}
      </div>
    </div>);

}