const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Rate = require('./models/Rate');

dotenv.config();

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

async function seed() {
  await connectDB();
  await Product.deleteMany();
  await Category.deleteMany();
  await Rate.deleteMany();

  // Create categories
  const categories = await Category.create([
    { name: 'Bridal', slug: 'bridal' },
    { name: 'Diamond', slug: 'diamond' },
    { name: 'Gold', slug: 'gold' },
    { name: 'Silver', slug: 'silver' },
    { name: 'Platinum', slug: 'platinum' },
    { name: 'Mens', slug: 'mens' },
    { name: 'Kids', slug: 'kids' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Temple', slug: 'temple' }
  ]);

  const categoryMap = {
    bridal: categories[0]._id,
    diamond: categories[1]._id,
    gold: categories[2]._id,
    silver: categories[3]._id,
    platinum: categories[4]._id,
    mens: categories[5]._id,
    kids: categories[6]._id,
    fashion: categories[7]._id,
    temple: categories[8]._id
  };

  // Comprehensive product list matching frontend data
  const productSeeds = [
    { name: 'Rajwadi Bridal Polki Necklace Set', category: 'bridal', price: 45000, weight: 62.4, description: 'A ceremonial choker and long haram pairing, hand-set with uncut polki and closed-back kundan.' },
    { name: 'Meenakari Bridal Choker & Jhumka Set', category: 'bridal', price: 38000, weight: 48.9, description: 'Jaipur meenakari on the reverse, kundan on the face — a choker that reads differently from every angle.' },
    { name: 'Anantha Bridal Temple Haram', category: 'temple', price: 42000, weight: 71.2, description: 'A long temple haram with repoussé Lakshmi medallions, struck by hand in the Nagercoil tradition.' },
    { name: 'Solitaire Halo Engagement Ring', category: 'diamond', price: 85000, weight: 4.12, description: 'A brilliant-cut solitaire lifted on a four-prong crown, ringed by a micro-pavé halo.' },
    { name: 'Aurelia Diamond Riviera Necklace', category: 'diamond', price: 125000, weight: 18.6, description: 'A graduated line of collet-set brilliants that sits flat on the collarbone.' },
    { name: 'Solene Diamond Drop Earrings', category: 'diamond', price: 45000, weight: 6.84, description: 'A pear drop suspended from a brilliant stud, articulated so it moves with the light.' },
    { name: 'Lumiere Diamond Tennis Bracelet', category: 'diamond', price: 68000, weight: 11.3, description: 'Fifty-two brilliants in a flexible line setting with a concealed box clasp.' },
    { name: 'Ecliptic Diamond Pendant', category: 'diamond', price: 22000, weight: 3.42, description: 'An open circle of pavé diamonds on a fine cable chain — the everyday diamond.' },
    { name: 'Kalash Antique Gold Bangles (Set of 4)', category: 'gold', price: 28000, weight: 42.6, description: 'Four broad bangles carved with a running floral vine, given an antique matte finish.' },
    { name: 'Padma Gold Temple Necklace', category: 'gold', price: 15000, weight: 34.8, description: 'Lotus medallions strung on a handmade gold rope, closed with a screw clasp.' },
    { name: 'Vrinda Gold Filigree Necklace', category: 'gold', price: 12000, weight: 26.4, description: 'Cuttack-style filigree drawn into fine gold wire and woven into a collar.' },
    { name: 'Classic Rope Gold Chain 20"', category: 'gold', price: 8500, weight: 14.2, description: 'A tightly wound rope chain with a lobster clasp — the everyday gold chain.' },
    { name: 'Dhruv Gold Kada', category: 'mens', price: 18000, weight: 32.8, description: 'A solid hinged kada with a brushed centre band and polished edges.' },
    { name: 'Vajra Gold Curb Chain', category: 'mens', price: 16000, weight: 28.4, description: 'Heavy flat-link curb chain, diamond-cut on the faces so it catches light.' },
    { name: 'Rudra Gold Signet Ring', category: 'mens', price: 5500, weight: 9.8, description: 'A broad-faced signet with a bevelled shoulder, ready to be engraved.' },
    { name: 'Arjun Gold Bracelet', category: 'mens', price: 10500, weight: 18.6, description: 'Interlocking oval links with a fold-over clasp, finished with a high polish.' },
    { name: 'Nakshatra Diamond Mangalsutra', category: 'gold', price: 32000, weight: 12.4, description: 'Black beads strung double, holding a pavé pendant that sits flat against the skin.' },
    { name: 'Sindoor Traditional Mangalsutra', category: 'gold', price: 9500, weight: 16.8, description: 'The classical vati pendant on a double line of black beads, in 916 hallmarked gold.' },
    { name: 'Jhumki Pearl Drop Earrings', category: 'gold', price: 8000, weight: 11.6, description: 'A domed jhumki with granulated beading and a full pearl fringe.' },
    { name: 'Anaya Gold Stud Earrings', category: 'gold', price: 2500, weight: 3.2, description: 'Faceted domes on screw-backs — the stud you can sleep in and still wear to work.' },
    { name: 'Ira Gold Ring with Ruby', category: 'gold', price: 15000, weight: 5.6, description: 'An oval ruby held in a scalloped bezel with granulated shoulders.' },
    { name: 'Mira Everyday Gold Band', category: 'gold', price: 3500, weight: 2.9, description: 'A slim comfort-fit band with a soft satin finish, stackable with anything.' },
    { name: 'Payal Gold Anklets (Pair)', category: 'gold', price: 11000, weight: 19.4, description: 'Fine link anklets with tiny ghungroo bells and an adjustable extender chain.' },
    { name: 'Gold Coin 10g · 999 Fine', category: 'gold', price: 35000, weight: 10, description: 'Tamper-proof sealed 24K coin with an assay certificate.' },
    { name: 'Lakshmi Gold Pendant', category: 'gold', price: 4200, weight: 6.4, description: 'A repoussé Lakshmi medallion with a beaded rim, sized to sit on a short chain.' },
    { name: 'Meera Gold Bracelet', category: 'gold', price: 7500, weight: 12.8, description: 'A flexible mesh bracelet with a hidden clasp — flat enough to wear under a sleeve.' },
    { name: 'Bindu Gold Nose Pin', category: 'gold', price: 3200, weight: 0.62, description: 'A single diamond on a press-fit screw post, polished on all faces for comfort.' },
    { name: 'Kanaka Gold Kada for Women', category: 'gold', price: 13500, weight: 24.6, description: 'A wide hinged kada with a chased paisley band and a push-button clasp.' },
    { name: 'Aabha Silver Anklets', category: 'silver', price: 4200, weight: 46, description: 'Oxidised sterling anklets with a fine ghungroo edge and adjustable fit.' },
    { name: 'Rhea Silver Chain', category: 'silver', price: 1500, weight: 18, description: 'A rhodium-finished sterling rolo chain that resists tarnish through daily wear.' },
    { name: 'Silver Puja Coin 20g', category: 'silver', price: 2200, weight: 20, description: 'A sealed 999 silver coin with a Lakshmi-Ganesh face, a standard Diwali gifting piece.' },
    { name: 'Silver Ganesha Idol 120g', category: 'silver', price: 8500, weight: 120, description: 'A hollow-cast sterling Ganesha on a lotus base, hand-finished and mirror polished.' },
    { name: 'Platinum Eternity Band', category: 'platinum', price: 48000, weight: 6.8, description: 'A channel of brilliants running the full circumference of a 950 platinum band.' },
    { name: 'Platinum Couple Bands (Pair)', category: 'platinum', price: 72000, weight: 11.4, description: 'Matched bands with a brushed centre groove, engraved free with names or a date.' },
    { name: 'Platinum Link Bracelet', category: 'platinum', price: 65000, weight: 22.4, description: 'Rectangular platinum links with alternating matte and polished faces.' },
    { name: 'Kids Gold Bangles (Pair)', category: 'kids', price: 3500, weight: 6.2, description: 'Smooth-edged infant bangles with a screw opening and no protruding clasp.' },
    { name: 'Kids Heart Pendant Chain', category: 'kids', price: 2800, weight: 2.4, description: 'A tiny heart on a 14-inch chain with a breakaway safety clasp.' },
    { name: 'Kids Teddy Stud Earrings', category: 'kids', price: 1800, weight: 1.1, description: 'Nickel-free 18K studs with rounded backs, safe for newly pierced ears.' },
    { name: 'Nyra Layered Fashion Chain', category: 'fashion', price: 2800, weight: 4.8, description: 'Two chains on one clasp so the layering never tangles.' },
    { name: 'Orbit Geometric Hoops', category: 'fashion', price: 4200, weight: 5.4, description: 'Faceted open hoops that read graphic from the front and disappear in profile.' },
    { name: 'Studio Office Cuff', category: 'fashion', price: 5800, weight: 8.2, description: 'A flat open cuff with a satin finish, sized to slip under a shirt cuff.' },
    { name: 'Heritage Antique Choker', category: 'temple', price: 22000, weight: 38.6, description: 'An antique-finish choker with granulated borders and a woven silk tie-back.' },
    { name: 'Bridal Gold Bangle Stack (Set of 6)', category: 'bridal', price: 32000, weight: 56.2, description: 'Six graduated bangles finished in alternating high polish and antique matte.' },
    { name: 'Reception Diamond Choker Set', category: 'bridal', price: 140000, weight: 32.4, description: 'A modern reception set — a pavé choker with detachable drops that convert into studs.' },
    { name: 'Bridal Jadau Earrings', category: 'bridal', price: 18000, weight: 18.2, description: 'Chandbali jadau earrings with an ear-chain support to carry the weight comfortably.' }
  ];

  const products = productSeeds.map(seed => ({
    title: seed.name,
    slug: slugify(seed.name),
    price: seed.price,
    weight: seed.weight,
    description: seed.description,
    images: [],
    tags: ['featured'],
    category: categoryMap[seed.category],
    inStock: true
  }));

  await Product.create(products);
  await Rate.create([
    { gold: 57500 },
    { gold: 57000 }
  ]);

  console.log(`Seed completed: ${products.length} products created`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
