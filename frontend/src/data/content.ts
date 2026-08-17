import { IMAGES } from './categories';
import type { Review } from '../types';

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  align: 'left' | 'center';
  ctaLabel: string;
  ctaTo: string;
}

export const heroSlides: HeroSlide[] = [
{
  id: 'bridal',
  eyebrow: 'The Bridal Edit · 2026',
  title: 'Timeless Luxury Crafted Forever',
  subtitle:
  'Ceremonial polki, kundan and temple sets, hand-finished over eleven weeks in our Jaipur atelier.',
  image: IMAGES.heroBridal,
  align: 'left',
  ctaLabel: 'Explore Bridal',
  ctaTo: '/bridal'
},
{
  id: 'diamond',
  eyebrow: 'Certified Solitaires',
  title: 'Light, Held Precisely',
  subtitle: 'IGI and GIA certified stones set in 18K gold and 950 platinum, with lifetime buyback.',
  image: IMAGES.heroDiamond,
  align: 'center',
  ctaLabel: 'Shop Diamonds',
  ctaTo: '/category/diamond'
},
{
  id: 'gold',
  eyebrow: 'Festival Offer · Making charges from 3%',
  title: 'Gold That Comes Home',
  subtitle: '916 hallmarked gold with a fully transparent price breakup on every single piece.',
  image: IMAGES.heroGold,
  align: 'left',
  ctaLabel: 'Shop Gold',
  ctaTo: '/category/gold'
}];


export interface Testimonial {
  id: string;
  name: string;
  city: string;
  occasion: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
{
  id: 't1',
  name: 'Ananya & Rohit',
  city: 'Jaipur',
  occasion: 'Wedding, Nov 2025',
  quote:
  'They sat with us for three hours, showed the exact weight and making charge for every option, and never once pushed the more expensive set. The haram arrived a week early.',
  rating: 5
},
{
  id: 't2',
  name: 'Meera Iyer',
  city: 'Chennai',
  occasion: 'Temple Haram',
  quote:
  'I have bought temple jewellery for twenty years and this is the first time the repoussé work felt genuinely hand-struck rather than cast. Worth every rupee.',
  rating: 5
},
{
  id: 't3',
  name: 'Kabir Malhotra',
  city: 'Mumbai',
  occasion: 'Engagement Ring',
  quote:
  'The IGI certificate was in the box, the breakup matched the website to the rupee, and resizing was free. No theatre, just a very good ring.',
  rating: 5
},
{
  id: 't4',
  name: 'Shruti Desai',
  city: 'Pune',
  occasion: 'Reception Set',
  quote:
  'I rented the reception choker for the sangeet and bought the mangalsutra outright. Both experiences were equally careful.',
  rating: 4
}];


export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
{
  id: 'b1',
  slug: 'how-to-read-a-gold-price-breakup',
  title: 'How to Read a Gold Price Breakup Before You Buy',
  category: 'Gold Investment',
  excerpt:
  'Metal value, making charges, wastage and GST — the four numbers that decide whether you are paying a fair price.',
  image: IMAGES.heroGold,
  readTime: '6 min read',
  date: '28 July 2026',
  author: 'Rohan Krishnan',
  body: [
  'Almost every dispute about a gold purchase comes down to one thing: the buyer never saw the breakup. A fair invoice separates four numbers, and each of them behaves differently.',
  'Metal value is simply the day rate multiplied by net weight. It is the only part of the bill that moves with the market, and the only part you recover in full when you exchange or sell the piece back.',
  'Making charges pay for the craft. A machine-drawn chain might carry 8-10%, while a hand-struck temple haram can justify 16-18%. Neither is wrong — but the number should be stated as a percentage of metal value, not hidden inside a lump-sum price.',
  'Stone value is quoted separately for a reason. Diamonds and uncut polki are priced per carat against a clarity and colour grade, and unlike gold, they are not weighed as part of the metal.',
  'GST is 3% on the total of the above. If a bill shows a single figure with no breakup, ask for one before you pay. Any reputable jeweller will print it without hesitation.']

},
{
  id: 'b2',
  slug: 'caring-for-polki-and-kundan',
  title: 'Caring for Polki and Kundan After the Wedding',
  category: 'Jewelry Care',
  excerpt: 'Closed-back settings need different handling from modern prong-set stones. Here is the short version.',
  image: IMAGES.catBridal,
  readTime: '4 min read',
  date: '19 July 2026',
  author: 'Lakshmi Rao',
  body: [
  'Polki is set into a bed of pure gold foil and sealed from behind. Water that gets behind the stone cannot easily get out, and over months it dulls the foil.',
  'Never soak a polki or kundan piece. Wipe it with a dry, soft cloth after wear, and let it sit uncovered for an hour before it goes back into its box.',
  'Store each piece in its own pouch. Kundan edges are soft gold and will scratch against a diamond set left in the same tray.',
  'Bring the set in once a year. We re-seat any lifted foil and re-polish the gold at no charge for the life of the piece.']

},
{
  id: 'b3',
  slug: 'bridal-jewellery-timeline',
  title: 'A Realistic Bridal Jewellery Timeline',
  category: 'Wedding Fashion',
  excerpt: 'When to start looking, when to lock the design, and when it is genuinely too late to customise.',
  image: IMAGES.editorialBridal,
  readTime: '7 min read',
  date: '11 July 2026',
  author: 'Ananya Sethi',
  body: [
  'Six months out, start with the outfit, not the jewellery. Neckline decides necklace length, and nothing else can be finalised before that.',
  'Four months out is the right window to book a bridal appointment. Hand-set polki work takes eight to eleven weeks, plus two weeks of buffer for fitting.',
  'Ten weeks out, lock the design. After this point, changes to the base structure mean starting the piece again.',
  'Three weeks out, do the final fitting with the blouse. Choker fit is the single most common last-minute adjustment.']

},
{
  id: 'b4',
  slug: 'diamond-buying-guide-4cs',
  title: 'The 4Cs, Ranked by How Much They Actually Matter',
  category: 'Diamond Buying Guide',
  excerpt: 'Cut first, then colour. Clarity matters far less than most buyers are told.',
  image: IMAGES.catDiamond,
  readTime: '8 min read',
  date: '02 July 2026',
  author: 'Rohan Krishnan',
  body: [
  'Cut is the only C that is a human decision rather than a natural accident, and it determines almost all of the sparkle you actually see.',
  'Colour is next. In yellow gold, an H or I face up perfectly white. In platinum, aim for F to G.',
  'Clarity is where most budgets are wasted. VS2 is eye-clean at arm\'s length in almost every case, and costs meaningfully less than VVS1.',
  'Carat should be the last thing you decide, because it is the easiest number to trade against the other three.']

},
{
  id: 'b5',
  slug: 'is-gold-still-a-good-investment',
  title: 'Is Gold Still a Good Investment in 2026?',
  category: 'Gold Investment',
  excerpt: 'Coins, bars and jewellery behave very differently when you come to sell.',
  image: IMAGES.catGold,
  readTime: '5 min read',
  date: '24 June 2026',
  author: 'Rohan Krishnan',
  body: [
  'A 24K coin returns close to full metal value on exchange. Jewellery does not, because making charges are not recoverable.',
  'That does not make jewellery a bad purchase — it makes it a purchase you should not describe as an investment.',
  'If the goal is purely to hold gold, buy sealed assay-certified coins and keep the certificate with the coin.',
  'If the goal is to wear it, buy the piece you will actually reach for, and treat the metal value as a floor rather than a return.']

},
{
  id: 'b6',
  slug: 'festival-collection-notes',
  title: 'Behind the Festival Collection',
  category: 'Festival Collections',
  excerpt: 'Notes from the workshop on this year\'s meenakari palette and why we moved away from red.',
  image: IMAGES.craftsmanship,
  readTime: '5 min read',
  date: '15 June 2026',
  author: 'Lakshmi Rao',
  body: [
  'Every festival collection starts with a colour meeting that usually ends in an argument. This year the argument was about red.',
  'We moved the meenakari palette toward deep teal and ivory, which sit better against the gold and photograph far more truthfully.',
  'The forms stayed traditional. Only the enamel changed — a reminder that modernising a craft does not require abandoning its structure.']

}];


export const reviews: Review[] = [
{
  id: 'r1',
  author: 'Ananya S.',
  rating: 5,
  date: '12 July 2026',
  title: 'Exactly as described, breakup matched to the rupee',
  body:
  'Wore it for the wedding and the reception. The weight is noticeable but sits well with an ear chain. Packaging and certificate were both immaculate.',
  verified: true,
  photos: [IMAGES.editorialBridal, IMAGES.catBridal],
  helpful: 46
},
{
  id: 'r2',
  author: 'Divya K.',
  rating: 5,
  date: '28 June 2026',
  title: 'The finishing is genuinely hand work',
  body:
  'You can see the tool marks on the reverse, which is exactly what you want. Cast pieces look too perfect. Delivery took eleven days as promised.',
  verified: true,
  photos: [IMAGES.prodNecklace],
  helpful: 31
},
{
  id: 'r3',
  author: 'Sneha M.',
  rating: 4,
  date: '09 June 2026',
  title: 'Beautiful, slightly heavier than I expected',
  body:
  'No complaints about quality at all. Just be aware of the gram weight before ordering — I would have gone one size lighter for a full day of ceremony.',
  verified: true,
  photos: [],
  helpful: 18
},
{
  id: 'r4',
  author: 'Priyanka R.',
  rating: 5,
  date: '22 May 2026',
  title: 'Free resizing made the difference',
  body: 'Sized it twice at the store without a single question. That service is why we came back for the bands.',
  verified: true,
  photos: [],
  helpful: 12
}];


export const faqs: Array<{q: string;a: string;}> = [
{
  q: 'Is the price breakup shown here final?',
  a: 'Yes. Metal value, stone value, making charges and 3% GST are all shown before you add to cart. The invoice you receive carries the identical breakup, priced at the gold rate locked when you place the order.'
},
{
  q: 'What does the BIS hallmark and HUID guarantee?',
  a: 'Every gold piece carries a six-digit HUID traceable on the BIS Care app, confirming the karatage independently of us. Silver is stamped 925 and platinum carries a 950 PT mark.'
},
{
  q: 'Can I exchange or sell this back later?',
  a: 'Gold pieces are exchangeable at full prevailing metal value at any Krishna Jewels store, and buyback is available at metal value less a 2% assay charge. Certified solitaires are exchangeable at 100% of invoice value against a higher-value stone.'
},
{
  q: 'How does resizing work?',
  a: 'Rings are resized free of charge within the first year, twice. Bangles and kadas can be resized once, subject to the design allowing it.'
},
{
  q: 'What if the piece does not suit me?',
  a: 'Return any unworn piece with its certificate and packaging within 15 days for a full refund, including making charges. Customised and engraved pieces are excluded.'
}];


export interface StoreLocation {
  id: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  flagship: boolean;
}

export const storeLocations: StoreLocation[] = [
{
  id: 's1',
  city: 'Jaipur — Flagship & Atelier',
  address: '14 Johari Bazaar Road, Jaipur 302003, Rajasthan',
  phone: '+91 141 400 8899',
  hours: 'Mon–Sat, 10:30 AM – 8:30 PM',
  flagship: true
},
{
  id: 's2',
  city: 'Mumbai — Bandra West',
  address: '3 Linking Road, Bandra West, Mumbai 400050',
  phone: '+91 22 4004 8899',
  hours: 'Mon–Sun, 11:00 AM – 9:00 PM',
  flagship: false
},
{
  id: 's3',
  city: 'Chennai — T. Nagar',
  address: '82 Usman Road, T. Nagar, Chennai 600017',
  phone: '+91 44 4004 8899',
  hours: 'Mon–Sun, 10:00 AM – 9:00 PM',
  flagship: false
},
{
  id: 's4',
  city: 'Delhi — South Extension',
  address: 'B-24 South Extension Part II, New Delhi 110049',
  phone: '+91 11 4004 8899',
  hours: 'Mon–Sat, 11:00 AM – 8:30 PM',
  flagship: false
}];


export const popularSearches = [
'Bridal polki set',
'Diamond mangalsutra',
'Gold coin 10g',
'Solitaire ring',
'Temple haram',
'Kids bangles'];


export const trustPoints = [
{ title: 'BIS Hallmarked', detail: 'HUID traceable on every gold piece' },
{ title: 'Certified Diamonds', detail: 'IGI & GIA reports in the box' },
{ title: 'Transparent Pricing', detail: 'Full breakup before you pay' },
{ title: 'Lifetime Exchange', detail: 'Full metal value, any store' }];