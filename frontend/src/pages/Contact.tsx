import React from 'react';
import { toast } from 'sonner';
import { ClockIcon, MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { faqs, storeLocations } from '../data/content';
import { Reveal, SectionHeading } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';

export function Contact() {
  return (
    <div className="pb-20">
      <section className="bg-beige py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold-deep">Contact</p>
            <h1 className="mt-3 font-serif text-4xl text-ink lg:text-5xl">We answer within the hour</h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Call, message on WhatsApp, or book an appointment and we will hold a specialist and a private room for
              you.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
            { icon: PhoneIcon, label: 'Call us', value: '+91 141 400 8899', href: 'tel:+911414008899' },
            { icon: MessageCircleIcon, label: 'WhatsApp', value: 'Chat with a specialist', href: 'https://wa.me/911414008899' },
            { icon: MailIcon, label: 'Email', value: 'care@krishnajewels.in', href: 'mailto:care@krishnajewels.in' },
            { icon: ClockIcon, label: 'Business hours', value: 'Mon–Sun, 10:30 AM – 8:30 PM' }].
            map((item, index) =>
            <Reveal key={item.label} delay={index * 0.06} className="bg-beige p-6">
                <item.icon className="h-5 w-5 text-gold-deep" />
                <p className="eyebrow mt-4 text-ink-muted">{item.label}</p>
                {item.href ?
              <a href={item.href} className="mt-2 block text-sm text-ink hover:text-gold-deep">
                    {item.value}
                  </a> :

              <p className="mt-2 text-sm text-ink">{item.value}</p>
              }
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
        <Reveal>
          <h2 className="font-serif text-3xl text-ink">Send us a message</h2>
          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              toast.success('Message sent', { description: 'A specialist will reply within the hour.' });
            }}>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required />
              <Field label="Mobile number" type="tel" required />
            </div>
            <Field label="Email" type="email" required />
            <div>
              <label htmlFor="topic" className="eyebrow mb-2 block text-ink-muted">
                What is this about?
              </label>
              <select
                id="topic"
                className="h-11 w-full border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold">
                
                <option>Bridal appointment</option>
                <option>An existing order</option>
                <option>Selling jewellery</option>
                <option>Renting jewellery</option>
                <option>Repair or resizing</option>
                <option>Something else</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="eyebrow mb-2 block text-ink-muted">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold" />
              
            </div>
            <Button type="submit" variant="gold" size="lg">
              Send message
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl text-ink">Find us</h2>
          <div
            className="mt-8 flex h-64 items-center justify-center border border-ink/10 bg-beige"
            role="img"
            aria-label="Map showing Krishna Jewels store locations across India">
            
            <div className="text-center">
              <MapPinIcon className="mx-auto h-7 w-7 text-gold-deep" />
              <p className="mt-3 font-serif text-lg text-ink">Four stores across India</p>
              <p className="mt-1 text-xs text-ink-muted">Jaipur · Mumbai · Chennai · Delhi</p>
            </div>
          </div>

          <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {storeLocations.map((store) =>
            <li key={store.id} className="py-5">
                <p className="font-serif text-lg text-ink">{store.city}</p>
                <p className="mt-2 text-sm text-ink-muted">{store.address}</p>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-muted">
                  <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="hover:text-gold-deep">
                    {store.phone}
                  </a>
                  <span>{store.hours}</span>
                </div>
              </li>
            )}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="Before you ask" title="Frequently asked" />
        <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq) =>
          <div key={faq.q} className="py-5">
              <dt className="font-serif text-lg text-ink">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{faq.a}</dd>
            </div>
          )}
        </dl>
      </section>
    </div>);

}

function Field({ label, ...rest }: {label: string;} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `contact-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        className="h-11 w-full border border-ink/15 px-3 text-sm outline-none focus:border-gold"
        {...rest} />
      
    </div>);

}