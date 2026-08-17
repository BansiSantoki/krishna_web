import type { Category } from '../types';

export const IMAGES = {
  heroBridal: "/b55b6ed3-949d-48aa-9ddb-c0c174e5ca5b.jpg",
  heroDiamond: "/790e4a71-25bb-46f2-8779-3a29cc90b13b.jpg",
  heroGold: "/88f2111d-8812-4c9c-80d5-bc8721229d1c.jpg",
  catGold: "/05faec0e-2d4b-417f-b1ae-f8ed41a6e86f.jpg",
  catDiamond: "/8b3d24b4-ecba-4858-85c3-78161ae83cc5.jpg",
  catSilver: "/54bfc279-36ec-4b29-9555-0302da4388de.jpg",
  catBridal: "/31a6b4ca-5a63-4e5b-b49d-58ad9b171a30.jpg",
  catMens: "/da2d66a2-bfd0-4445-ae65-0c22420f9749.jpg",
  catTemple: "/73457f1a-a4fe-426d-b79e-bcc0d7ee1cc6.jpg",
  catPlatinum: "/b99c5be5-0791-4882-9965-c59ba299fa6a.jpg",
  catKids: "/138b16fd-8309-4cb7-8908-904bbc17c4f4.jpg",
  catFashion: "/afc921cf-9e30-4051-b57b-809e2ded1a68.jpg",
  prodRing: "/34ca7ba0-bef3-40c7-87cb-cc51e5d59e4b.jpg",
  prodNecklace: "/9743393b-97cd-4c0e-a175-ab49a454c22c.jpg",
  prodEarrings: "/a7e70f6e-9fe6-4a78-b7c2-cf3cb6ef136e.jpg",
  prodBangles: "/bc68c660-e661-4cfa-a784-099a27452fb6.jpg",
  prodChain: "/3f3d680f-067c-4dba-b176-d5c401f9f5a4.jpg",
  prodMangalsutra: "/2b9c21a6-3b61-4eb1-860a-88297a53312d.jpg",
  editorialBridal: "/8c0ea2a8-23ad-4a83-92a2-5324ddd87dd5.jpg",
  craftsmanship: "/c2649a54-41a3-417b-a025-33f12467eaeb.jpg"
} as const;

export const categories: Category[] = [
{
  name: 'Gold Jewellery',
  slug: 'gold',
  image: IMAGES.catGold,
  blurb: '916 hallmarked gold, hand-finished in our Jaipur atelier.',
  subCategories: [
  { name: 'Gold Rings', slug: 'gold-rings' },
  { name: 'Gold Chains', slug: 'gold-chains' },
  { name: 'Gold Bracelets', slug: 'gold-bracelets' },
  { name: 'Gold Bangles', slug: 'gold-bangles' },
  { name: 'Gold Pendants', slug: 'gold-pendants' },
  { name: 'Gold Necklaces', slug: 'gold-necklaces' },
  { name: 'Gold Mangalsutra', slug: 'gold-mangalsutra' },
  { name: 'Gold Earrings', slug: 'gold-earrings' },
  { name: 'Gold Nose Pins', slug: 'gold-nose-pins' },
  { name: 'Gold Kada', slug: 'gold-kada' },
  { name: 'Gold Anklets', slug: 'gold-anklets' },
  { name: 'Gold Coins', slug: 'gold-coins' }]

},
{
  name: 'Diamond Jewellery',
  slug: 'diamond',
  image: IMAGES.catDiamond,
  blurb: 'IGI and GIA certified stones, set in 18K gold and platinum.',
  subCategories: [
  { name: 'Diamond Rings', slug: 'diamond-rings' },
  { name: 'Diamond Necklaces', slug: 'diamond-necklaces' },
  { name: 'Diamond Earrings', slug: 'diamond-earrings' },
  { name: 'Diamond Bracelets', slug: 'diamond-bracelets' },
  { name: 'Diamond Pendants', slug: 'diamond-pendants' },
  { name: 'Solitaire Rings', slug: 'solitaire-rings' }]

},
{
  name: 'Silver Jewellery',
  slug: 'silver',
  image: IMAGES.catSilver,
  blurb: '925 sterling silver, everyday pieces and gifting classics.',
  subCategories: [
  { name: 'Silver Chains', slug: 'silver-chains' },
  { name: 'Silver Rings', slug: 'silver-rings' },
  { name: 'Silver Bracelets', slug: 'silver-bracelets' },
  { name: 'Silver Anklets', slug: 'silver-anklets' },
  { name: 'Silver Utensils', slug: 'silver-utensils' },
  { name: 'Silver Coins', slug: 'silver-coins' },
  { name: 'Silver Idols', slug: 'silver-idols' }]

},
{
  name: 'Bridal Collection',
  slug: 'bridal',
  image: IMAGES.catBridal,
  blurb: 'Heirloom bridal sets built for the ceremony and the years after.',
  subCategories: [
  { name: 'Wedding Sets', slug: 'wedding-sets' },
  { name: 'Reception Sets', slug: 'reception-sets' },
  { name: 'Bridal Necklaces', slug: 'bridal-necklaces' },
  { name: 'Bridal Bangles', slug: 'bridal-bangles' },
  { name: 'Bridal Earrings', slug: 'bridal-earrings' },
  { name: 'Bridal Combo Sets', slug: 'bridal-combo-sets' }]

},
{
  name: "Kids Jewellery",
  slug: 'kids',
  image: IMAGES.catKids,
  blurb: 'Featherlight, skin-safe gold for the smallest hands.',
  subCategories: [
  { name: 'Kids Rings', slug: 'kids-rings' },
  { name: 'Kids Bracelets', slug: 'kids-bracelets' },
  { name: 'Kids Earrings', slug: 'kids-earrings' },
  { name: 'Kids Chains', slug: 'kids-chains' }]

},
{
  name: "Men's Jewellery",
  slug: 'mens',
  image: IMAGES.catMens,
  blurb: 'Substantial, understated pieces with a confident weight.',
  subCategories: [
  { name: 'Chains', slug: 'mens-chains' },
  { name: 'Bracelets', slug: 'mens-bracelets' },
  { name: 'Rings', slug: 'mens-rings' },
  { name: 'Kada', slug: 'mens-kada' },
  { name: 'Pendants', slug: 'mens-pendants' }]

},
{
  name: 'Temple Jewellery',
  slug: 'temple',
  image: IMAGES.catTemple,
  blurb: 'South Indian antique craft, deity motifs and uncut stones.',
  subCategories: [
  { name: 'Antique Collection', slug: 'antique-collection' },
  { name: 'South Indian Collection', slug: 'south-indian-collection' },
  { name: 'Heritage Jewellery', slug: 'heritage-jewellery' }]

},
{
  name: 'Platinum Collection',
  slug: 'platinum',
  image: IMAGES.catPlatinum,
  blurb: '950 platinum — rarer than gold, and quietly permanent.',
  subCategories: [
  { name: 'Rings', slug: 'platinum-rings' },
  { name: 'Bands', slug: 'platinum-bands' },
  { name: 'Necklaces', slug: 'platinum-necklaces' },
  { name: 'Bracelets', slug: 'platinum-bracelets' }]

},
{
  name: 'Fashion Jewellery',
  slug: 'fashion',
  image: IMAGES.catFashion,
  blurb: 'Modern, light-weight designs for work, evenings and travel.',
  subCategories: [
  { name: 'Daily Wear', slug: 'daily-wear' },
  { name: 'Office Wear', slug: 'office-wear' },
  { name: 'Party Wear', slug: 'party-wear' },
  { name: 'Designer Collection', slug: 'designer-collection' }]

}];


export const categoryBySlug = (slug: string): Category | undefined =>
categories.find((category) => category.slug === slug);