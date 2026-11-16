const p = (id: number, w = 1200) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const IMG = {
  hero: p(31285170, 1900), pour: p(36244494), whisky: p(31162033), pink: p(30133457),
  craft: p(36244827), bw: p(18477060), banquet: p(17315481), floral: p(16985160),
  wedding: p(38658103), bar: p(17315477), champagne: p(38707096), outdoor: p(34357855), ice: p(10906019),
};

export const services = [
  { t: "Weddings", d: "Signature his-and-hers cocktails, champagne towers and a bar designed to match your florals.", img: IMG.wedding },
  { t: "Private Parties", d: "Intimate dinners and soirées at home, with a bartender who feels like an old friend.", img: IMG.pink },
  { t: "Corporate Gatherings", d: "Polished, discreet service for launches, galas and client evenings.", img: IMG.bar },
  { t: "Birthdays & Milestones", d: "Bespoke menus that tell your story — one glass at a time.", img: IMG.champagne },
];

export type Cocktail = { name: string; cat: string; spirit: string; notes: string; ing: string[]; img: string };
export const cocktails: Cocktail[] = [
  { name: "The Velvet Hour", cat: "Signature", spirit: "Bourbon", notes: "Smoked, honeyed, warm", ing: ["Bourbon", "Burnt honey", "Angostura", "Cedar smoke"], img: IMG.whisky },
  { name: "Rosé Reverie", cat: "Signature", spirit: "Gin", notes: "Floral, bright, delicate", ing: ["London dry gin", "Rose cordial", "Lemon", "Egg white"], img: IMG.pink },
  { name: "Midnight Espresso", cat: "Classics", spirit: "Vodka", notes: "Rich, silky, bittersweet", ing: ["Vodka", "Fresh espresso", "Coffee liqueur", "Vanilla"], img: IMG.craft },
  { name: "Golden Old Fashioned", cat: "Classics", spirit: "Rye", notes: "Spirit-forward, orange peel", ing: ["Rye whiskey", "Demerara", "Orange bitters", "Gold leaf"], img: IMG.ice },
  { name: "Champagne Garden", cat: "Celebration", spirit: "Champagne", notes: "Effervescent, elderflower", ing: ["Champagne", "St-Germain", "Cucumber", "Mint"], img: IMG.champagne },
  { name: "Garden Party Spritz", cat: "Zero-Proof", spirit: "Non-alcoholic", notes: "Herbal, crisp, refreshing", ing: ["Seedlip Garden", "Elderflower tonic", "Basil", "Citrus"], img: IMG.floral },
];

export const testimonials = [
  { q: "Benita turned our wedding into the evening everyone still talks about. The signature cocktails were works of art.", n: "Amara & James", e: "Wedding · 180 guests" },
  { q: "Impeccable, warm and incredibly professional. Our clients felt like VIPs from the first pour.", n: "Lauren K.", e: "Corporate Gala" },
  { q: "She designed a menu around my favorite memories. I cried a little at my own 40th — in the best way.", n: "Danielle R.", e: "40th Birthday" },
];

export const packages = [
  { n: "The Intimate", price: 650, hours: 3, guests: "Up to 30", f: ["1 bartender", "3 signature cocktails", "Custom printed menu", "Bar tools & glassware styling"] },
  { n: "The Signature", price: 1250, hours: 5, guests: "Up to 100", f: ["2 bartenders", "5 signature cocktails", "Menu consultation & tasting", "Garnish bar & premium ice", "Mobile bar setup"], hot: true },
  { n: "The Grand Affair", price: 2400, hours: 6, guests: "100+", f: ["Full bar team", "Unlimited bespoke menu", "Champagne tower", "Luxury mobile bar", "Dedicated event coordinator"] },
];

export const faqs = [
  { q: "Do you provide the alcohol?", a: "We provide a precise shopping list tailored to your menu and guest count, or can source premium spirits on your behalf for a coordination fee." },
  { q: "How far in advance should I book?", a: "Weddings are typically booked 6–12 months ahead; private events 4–8 weeks. Last-minute dates are welcome when available." },
  { q: "Are you licensed and insured?", a: "Yes — fully licensed, TIPS-certified and carrying $2M liability insurance. Certificates are provided to venues on request." },
  { q: "Can you create zero-proof menus?", a: "Absolutely. Every menu includes thoughtful non-alcoholic options crafted with the same care as our signatures." },
];
