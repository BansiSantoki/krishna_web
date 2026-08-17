import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { blogPosts } from '../../data/content';
import { Reveal, SectionHeading } from '../ui/Reveal';

export function JournalPreview() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <SectionHeading
        eyebrow="The Journal"
        title="Buy better, not just more"
        description="Plain-language guides to price breakups, certification and bridal timelines — written by the people who make the jewellery."
        action={
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 border-b border-gold pb-1 text-[11px] uppercase tracking-luxe text-gold-deep">
          
            All articles
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        } />
      

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {blogPosts.slice(0, 3).map((post, index) =>
        <Reveal key={post.id} delay={index * 0.08} as="article">
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
    </section>);

}