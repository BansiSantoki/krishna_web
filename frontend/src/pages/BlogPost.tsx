import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../data/content';
import { Reveal } from '../components/ui/Reveal';
import { ButtonLink } from '../components/ui/Button';

export function BlogPost() {
  const { slug = '' } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
        <h1 className="font-serif text-3xl text-ink">That article has moved</h1>
        <ButtonLink to="/blog" variant="gold">
          Back to the Journal
        </ButtonLink>
      </div>);

  }

  const more = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <article className="pb-24">
      <header className="relative h-[52vh] min-h-[360px] overflow-hidden bg-ink">
        <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-3xl flex-col justify-end px-4 pb-12 sm:px-6">
          <Reveal>
            <p className="eyebrow text-gold-light">{post.category}</p>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-white lg:text-5xl">{post.title}</h1>
            <p className="mt-4 text-xs text-white/60">
              {post.author} · {post.date} · {post.readTime}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="font-serif text-xl leading-relaxed text-ink">{post.excerpt}</p>
        <div className="mt-8 space-y-6">
          {post.body.map((paragraph) =>
          <p key={paragraph.slice(0, 32)} className="text-[15px] leading-[1.85] text-ink-muted">
              {paragraph}
            </p>
          )}
        </div>

        <div className="mt-12 border-y border-ink/10 py-8 text-center">
          <p className="font-serif text-xl text-ink">Have a question about a piece?</p>
          <p className="mt-2 text-sm text-ink-muted">
            Our specialists answer on WhatsApp within the hour, seven days a week.
          </p>
          <ButtonLink to="/contact" variant="gold" className="mt-5">
            Talk to a specialist
          </ButtonLink>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 className="font-serif text-2xl text-ink">Keep reading</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {more.map((item) =>
          <Link key={item.id} to={`/blog/${item.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-beige">
                <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              
              </div>
              <p className="eyebrow mt-4 text-gold-deep">{item.category}</p>
              <h3 className="mt-2 font-serif text-lg leading-snug text-ink group-hover:text-gold-deep">
                {item.title}
              </h3>
            </Link>
          )}
        </div>
      </section>
    </article>);

}