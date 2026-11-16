import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG, services, cocktails, testimonials, packages, faqs, type Cocktail } from "./data";

gsap.registerPlugin(ScrollTrigger);
type Theme = "espresso" | "plum";

export default function App() {
  const [theme, setTheme] = useState<Theme>("espresso");
  const root = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { yPercent: 110, opacity: 0, duration: 1.4, stagger: .12, ease: "power4.out", delay: .2 });
      gsap.from(".hero-fade", { opacity: 0, y: 30, duration: 1.2, stagger: .1, delay: .9, ease: "power3.out" });
      gsap.from(".hero-img", { scale: 1.25, duration: 2.4, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach(el =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
      gsap.utils.toArray<HTMLElement>(".parallax").forEach(el =>
        gsap.to(el, { yPercent: -15, ease: "none", scrollTrigger: { trigger: el, scrub: true } }));
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [theme]);

  const nav = ["Experiences", "Menu", "Process", "Packages", "Book"];
  const P = theme === "plum";

  return (
    <div ref={root} key={theme}>
      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[var(--dark)]/90 backdrop-blur-md py-3" : "py-6"} text-[var(--ivory)]`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#top" className="serif text-2xl tracking-wide">{P ? <i>Benita</i> : "BENITA"}<span className="text-[var(--accent)]">.</span></a>
          <nav className="hidden lg:flex gap-10 eyebrow !text-[.65rem]">
            {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-[var(--accent)] transition">{n}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            <ThemeSwitch theme={theme} setTheme={setTheme} />
            <a href="#book" className="btn btn-accent !py-3 !px-5 hidden md:inline-flex">Reserve</a>
            <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(true)} aria-label="Menu">☰</button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--dark)] text-[var(--ivory)] flex flex-col items-center justify-center gap-8">
          <button className="absolute top-6 right-6 text-3xl" onClick={() => setMenuOpen(false)}>×</button>
          {nav.map(n => <a key={n} onClick={() => setMenuOpen(false)} href={`#${n.toLowerCase()}`} className="serif text-5xl">{n}</a>)}
        </div>
      )}

      {P ? <HeroPlum /> : <HeroEspresso />}
      <Marquee />
      <Intro P={P} />
      {P ? <ServicesPlum /> : <ServicesEspresso />}
      <MenuSection P={P} />
      <Process P={P} />
      <Gallery P={P} />
      <Testimonials P={P} />
      <Packages P={P} />
      <Booking P={P} />
      <FAQ />
      <Footer P={P} />
    </div>
  );
}

function ThemeSwitch({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="flex items-center rounded-full border border-white/25 p-1 text-[.6rem] tracking-[.2em] uppercase">
      {([["espresso", "#281914", "#C7A477", "Espresso"], ["plum", "#351B32", "#D4A1AA", "Plum"]] as const).map(([k, a, b, l]) => (
        <button key={k} onClick={() => { setTheme(k); }} title={`${l} theme`}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition ${theme === k ? "bg-white/15" : "opacity-60 hover:opacity-100"}`}>
          <span className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(135deg, ${a} 50%, ${b} 50%)` }} />
          <span className="hidden sm:inline">{l}</span>
        </button>
      ))}
    </div>
  );
}

const Line = ({ children, className = "" }: { children: React.ReactNode; className?: string }) =>
  <span className="block overflow-hidden"><span className={`hero-line block ${className}`}>{children}</span></span>;

function HeroEspresso() {
  return (
    <section id="top" className="relative grain min-h-screen bg-[var(--dark)] text-[var(--ivory)] overflow-hidden">
      <div className="grid lg:grid-cols-12 min-h-screen">
        <div className="lg:col-span-7 flex flex-col justify-end px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-16 pt-36 relative z-10">
          <p className="eyebrow text-[var(--accent)] hero-fade mb-8">Private Bartending · Est. 2016</p>
          <h1 className="serif font-light leading-[.9] text-[clamp(3.5rem,9vw,9rem)]">
            <Line>The art of</Line><Line className="italic text-[var(--accent)] pl-[8vw]">the pour,</Line><Line>brought home.</Line>
          </h1>
          <div className="mt-12 flex flex-col sm:flex-row gap-8 sm:items-end justify-between max-w-2xl">
            <p className="hero-fade text-[var(--soft)] max-w-sm leading-relaxed">Handcrafted cocktails, bespoke menus and a luxury mobile bar for weddings, celebrations and evenings worth remembering.</p>
            <div className="hero-fade flex gap-3"><a href="#book" className="btn btn-accent">Book Benita</a><a href="#menu" className="btn btn-ghost">Menu</a></div>
          </div>
        </div>
        <div className="lg:col-span-5 relative min-h-[50vh]">
          <img src={IMG.hero} alt="Bartender pouring a cocktail" className="hero-img absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark)] via-transparent to-transparent" />
          <div className="hero-fade absolute bottom-10 left-8 lg:-left-16 bg-[var(--bg)] text-[var(--ink)] p-6 w-56">
            <p className="serif text-5xl">500+</p><p className="eyebrow !text-[.6rem] mt-2 text-[var(--accent2)]">Evenings poured</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPlum() {
  return (
    <section id="top" className="relative grain min-h-screen bg-[var(--dark)] text-[var(--ivory)] overflow-hidden flex items-center justify-center">
      <img src={IMG.pink} alt="Pink cocktail being prepared" className="hero-img absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark)]/70 via-[var(--dark2)]/40 to-[var(--dark)]" />
      <div className="plum-blob absolute -top-20 -left-20 w-[40rem] h-[40rem]" />
      <div className="plum-blob absolute bottom-0 right-0 w-[30rem] h-[30rem]" />
      <div className="relative z-10 text-center px-6 pt-24">
        <p className="eyebrow text-[var(--accent)] hero-fade mb-10">— Benita · Cocktails & Celebration —</p>
        <h1 className="serif font-light leading-[.88] text-[clamp(3.5rem,10vw,10rem)]">
          <Line>Raise a glass</Line><Line className="italic text-[var(--accent)]">to romance.</Line>
        </h1>
        <p className="hero-fade mx-auto mt-10 max-w-lg text-[var(--bg)]/80 leading-relaxed">Glamorous private bartending for weddings, soirées and unforgettable nights — every cocktail composed like a love letter.</p>
        <div className="hero-fade mt-10 flex gap-4 justify-center flex-wrap"><a href="#book" className="btn btn-accent rounded-full">Reserve your date</a><a href="#experiences" className="btn btn-ghost rounded-full">Explore</a></div>
        <div className="hero-fade mt-20 flex justify-center gap-6">
          {[IMG.champagne, IMG.floral, IMG.wedding].map((s, i) => <img key={i} src={s} alt="" className={`w-24 h-32 md:w-32 md:h-44 object-cover rounded-t-full border border-[var(--accent)]/40 ${i === 1 ? "-translate-y-6" : ""}`} />)}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Weddings", "Signature Cocktails", "Private Soirées", "Corporate Galas", "Champagne Towers", "Zero-Proof Elixirs", "Birthdays"];
  return (
    <div className="bg-[var(--accent)] text-[var(--dark)] py-5 overflow-hidden">
      <div className="marquee flex w-max gap-12 serif italic text-2xl">
        {[...words, ...words, ...words, ...words].map((w, i) => <span key={i} className="flex items-center gap-12">{w}<span className="text-sm">✦</span></span>)}
      </div>
    </div>
  );
}

function Intro({ P }: { P: boolean }) {
  return (
    <section className="py-32 px-6 bg-[var(--bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className={`lg:col-span-5 relative reveal ${P ? "lg:order-2" : ""}`}>
          <div className={`overflow-hidden ${P ? "rounded-t-full" : ""} aspect-[4/5]`}><img src={IMG.craft} alt="Benita crafting a cocktail" className="parallax w-full h-[120%] object-cover" /></div>
          <div className={`absolute -bottom-8 ${P ? "-left-8" : "-right-8"} w-40 h-40 border border-[var(--accent2)] ${P ? "rounded-full" : ""} hidden md:flex items-center justify-center serif italic text-xl text-center p-4`}>Meet<br />Benita</div>
        </div>
        <div className="lg:col-span-7 reveal">
          <p className="eyebrow text-[var(--accent2)] mb-6">{P ? "♡ The hostess" : "01 — The Story"}</p>
          <h2 className="serif text-5xl md:text-7xl font-light leading-[1]">Hospitality is a feeling. <i className="text-[var(--accent2)]">Cocktails</i> are how I share it.</h2>
          <p className="mt-8 text-lg leading-relaxed opacity-75 max-w-xl">For nearly a decade I've designed bars for intimate dinners and grand ballrooms alike. Every menu begins with a conversation — your favorite flavors, your story, the mood you want your guests to remember.</p>
          <div className="grid grid-cols-3 gap-8 mt-14 max-w-lg border-t border-[var(--ink)]/15 pt-8">
            {[["9", "Years behind the bar"], ["120+", "Original recipes"], ["5.0", "Average rating"]].map(([a, b]) =>
              <div key={b}><p className="serif text-4xl text-[var(--accent2)]">{a}</p><p className="text-xs mt-1 opacity-60">{b}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesEspresso() {
  const [a, setA] = useState(0);
  return (
    <section id="experiences" className="py-32 px-6 bg-[var(--dark)] text-[var(--ivory)] grain relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <p className="eyebrow text-[var(--accent)] mb-6 reveal">02 — Experiences</p>
          <h2 className="serif text-5xl md:text-6xl font-light mb-14 reveal">Every occasion,<br /><i className="text-[var(--accent)]">poured perfectly.</i></h2>
          {services.map((s, i) => (
            <button key={s.t} onMouseEnter={() => setA(i)} onClick={() => setA(i)} className="reveal group w-full text-left border-t border-white/15 py-7 flex gap-6 items-baseline">
              <span className="text-xs text-[var(--accent)]">0{i + 1}</span>
              <div className="flex-1">
                <h3 className={`serif text-3xl md:text-4xl transition ${a === i ? "text-[var(--accent)] translate-x-3" : ""}`}>{s.t}</h3>
                <p className={`text-sm text-[var(--soft)] overflow-hidden transition-all duration-500 ${a === i ? "max-h-20 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>{s.d}</p>
              </div>
              <span className={`transition ${a === i ? "rotate-45 text-[var(--accent)]" : ""}`}>+</span>
            </button>
          ))}
        </div>
        <div className="relative h-[70vh] sticky top-24 hidden lg:block overflow-hidden">
          {services.map((s, i) => <img key={s.t} src={s.img} alt={s.t} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${a === i ? "opacity-100 scale-100" : "opacity-0 scale-110"}`} />)}
        </div>
      </div>
    </section>
  );
}

function ServicesPlum() {
  return (
    <section id="experiences" className="py-32 px-6 bg-[var(--ivory)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="eyebrow text-[var(--accent2)] mb-5">✿ Experiences ✿</p>
          <h2 className="serif text-5xl md:text-7xl font-light">Celebrations, <i className="text-[var(--dark2)]">beautifully</i> served.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={s.t} className={`reveal group ${i % 2 ? "lg:mt-16" : ""}`}>
              <div className="relative overflow-hidden rounded-t-full aspect-[3/4.5]">
                <img src={s.img} alt={s.t} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)] via-[var(--dark)]/10 to-transparent opacity-80 group-hover:opacity-95 transition" />
                <div className="absolute bottom-0 p-6 text-[var(--ivory)]">
                  <h3 className="serif text-3xl italic">{s.t}</h3>
                  <p className="text-sm mt-2 max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-700 opacity-80">{s.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection({ P }: { P: boolean }) {
  const cats = ["All", "Signature", "Classics", "Celebration", "Zero-Proof"];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<Cocktail | null>(null);
  const [fav, setFav] = useState<string[]>([]);
  const list = useMemo(() => cat === "All" ? cocktails : cocktails.filter(c => c.cat === cat), [cat]);
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => { grid.current && gsap.fromTo(grid.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: .07, duration: .6 }); }, [cat]);

  return (
    <section id="menu" className={`py-32 px-6 ${P ? "bg-[var(--bg)]" : "bg-[var(--bg)]"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 reveal">
          <div><p className="eyebrow text-[var(--accent2)] mb-5">{P ? "♡ The Menu" : "03 — The Menu"}</p>
            <h2 className="serif text-5xl md:text-7xl font-light">A taste of <i className="text-[var(--accent2)]">the bar.</i></h2></div>
          <div className="flex flex-wrap gap-2">
            {cats.map(c => <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 text-xs tracking-widest uppercase border transition ${P ? "rounded-full" : ""} ${cat === c ? "bg-[var(--dark)] text-[var(--ivory)] border-[var(--dark)]" : "border-[var(--ink)]/20 hover:border-[var(--ink)]"}`}>{c}</button>)}
          </div>
        </div>
        {fav.length > 0 && <p className="mb-6 text-sm"><span className="text-[var(--accent2)]">♥ Your shortlist:</span> {fav.join(", ")} <a href="#book" className="underline ml-2">Add to inquiry →</a></p>}
        <div ref={grid} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {list.map(c => (
            <article key={c.name} className="group cursor-pointer" onClick={() => setOpen(c)}>
              <div className={`relative overflow-hidden aspect-[4/5] ${P ? "rounded-[2rem]" : ""}`}>
                <img src={c.img} alt={c.name} className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" />
                <button onClick={e => { e.stopPropagation(); setFav(f => f.includes(c.name) ? f.filter(x => x !== c.name) : [...f, c.name]); }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--ivory)]/90 text-[var(--dark2)] text-lg" aria-label="Favorite">{fav.includes(c.name) ? "♥" : "♡"}</button>
                <span className="absolute bottom-4 left-4 bg-[var(--dark)]/80 text-[var(--ivory)] text-[.6rem] tracking-[.25em] uppercase px-3 py-1.5">{c.cat}</span>
              </div>
              <div className="flex justify-between items-baseline mt-5"><h3 className="serif text-3xl">{c.name}</h3><span className="text-xs opacity-60">{c.spirit}</span></div>
              <p className="italic text-sm opacity-70 mt-1">{c.notes}</p>
            </article>
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className={`bg-[var(--ivory)] max-w-3xl w-full grid md:grid-cols-2 overflow-hidden ${P ? "rounded-[2rem]" : ""}`} onClick={e => e.stopPropagation()}>
            <img src={open.img} alt={open.name} className="w-full h-64 md:h-full object-cover" />
            <div className="p-10 relative">
              <button onClick={() => setOpen(null)} className="absolute top-4 right-5 text-2xl">×</button>
              <p className="eyebrow text-[var(--accent2)]">{open.cat}</p>
              <h3 className="serif text-4xl mt-3">{open.name}</h3>
              <p className="italic opacity-70 mt-2">{open.notes}</p>
              <ul className="mt-8 space-y-3">{open.ing.map(i => <li key={i} className="flex justify-between border-b border-[var(--ink)]/10 pb-2 text-sm"><span>{i}</span><span className="text-[var(--accent2)]">✦</span></li>)}</ul>
              <a href="#book" onClick={() => setOpen(null)} className="btn btn-accent mt-8 w-full justify-center">Feature at my event</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Process({ P }: { P: boolean }) {
  const steps = [["Consult", "A relaxed call to learn your vision, guests and favorite flavors."], ["Design", "A bespoke cocktail menu, tasting session and bar styling plan."], ["Prepare", "Shopping list, fresh garnishes, syrups and ice — all handled."], ["Pour", "We arrive early, set the bar beautifully and host the night."]];
  return (
    <section id="process" className={`py-32 px-6 relative grain text-[var(--ivory)] ${P ? "bg-gradient-to-br from-[var(--dark)] to-[var(--dark2)]" : "bg-[var(--dark2)]"}`}>
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow text-[var(--accent)] mb-5 reveal">{P ? "✿ How it unfolds" : "04 — The Process"}</p>
        <h2 className="serif text-5xl md:text-7xl font-light mb-20 reveal">From first sip <i className="text-[var(--accent)]">to last call.</i></h2>
        <div className="grid md:grid-cols-4 gap-10">
          {steps.map(([t, d], i) => (
            <div key={t} className="reveal relative">
              <div className={`w-16 h-16 flex items-center justify-center border border-[var(--accent)] serif text-2xl text-[var(--accent)] mb-8 ${P ? "rounded-full" : ""}`}>{i + 1}</div>
              <h3 className="serif text-3xl mb-3">{t}</h3><p className="text-sm text-[var(--soft)] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ P }: { P: boolean }) {
  const imgs = [IMG.banquet, IMG.pour, IMG.outdoor, IMG.champagne, IMG.bw, IMG.floral];
  const [lb, setLb] = useState<number | null>(null);
  return (
    <section className="py-32 px-6 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="serif text-5xl md:text-7xl font-light mb-16 text-center reveal">Evenings <i className="text-[var(--accent2)]">remembered.</i></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {imgs.map((s, i) => (
            <button key={i} onClick={() => setLb(i)} className={`reveal overflow-hidden group ${P ? "rounded-3xl" : ""} ${i === 0 ? "md:col-span-2 md:row-span-2" : ""} ${i === 3 ? "md:row-span-2" : ""}`}>
              <img src={s} alt="Event gallery" className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
            </button>
          ))}
        </div>
      </div>
      {lb !== null && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center" onClick={() => setLb(null)}>
          <button className="absolute left-4 text-white text-4xl p-4" onClick={e => { e.stopPropagation(); setLb((lb + imgs.length - 1) % imgs.length); }}>‹</button>
          <img src={imgs[lb]} alt="" className="max-h-[85vh] max-w-[85vw] object-contain" />
          <button className="absolute right-4 text-white text-4xl p-4" onClick={e => { e.stopPropagation(); setLb((lb + 1) % imgs.length); }}>›</button>
        </div>
      )}
    </section>
  );
}

function Testimonials({ P }: { P: boolean }) {
  const [i, setI] = useState(0);
  const q = useRef<HTMLDivElement>(null);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % testimonials.length), 6500); return () => clearInterval(t); }, []);
  useEffect(() => { q.current && gsap.fromTo(q.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .9 }); }, [i]);
  const t = testimonials[i];
  return (
    <section className={`py-32 px-6 relative overflow-hidden ${P ? "bg-[var(--ivory)]" : "bg-[var(--soft)]/40"}`}>
      {P && <div className="plum-blob absolute -right-40 top-0 w-[40rem] h-[40rem]" />}
      <div className="max-w-4xl mx-auto text-center relative">
        <p className="serif text-[10rem] leading-none text-[var(--accent2)] h-20">“</p>
        <div ref={q}>
          <blockquote className="serif text-3xl md:text-5xl font-light leading-tight italic">{t.q}</blockquote>
          <p className="mt-10 eyebrow">{t.n}</p><p className="text-sm opacity-60 mt-1">{t.e}</p>
        </div>
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className={`h-[2px] transition-all ${k === i ? "w-12 bg-[var(--dark)]" : "w-6 bg-[var(--ink)]/25"}`} />)}
        </div>
      </div>
    </section>
  );
}

function Packages({ P }: { P: boolean }) {
  const [guests, setGuests] = useState(75);
  const [hours, setHours] = useState(4);
  const [extras, setExtras] = useState<string[]>([]);
  const ex = [["Champagne tower", 350], ["Tasting session", 150], ["Custom ice program", 200], ["Luxury mobile bar", 400]] as const;
  const est = Math.round(300 + guests * 6 + hours * 120 + ex.filter(e => extras.includes(e[0])).reduce((a, e) => a + e[1], 0));
  return (
    <section id="packages" className="py-32 px-6 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal"><p className="eyebrow text-[var(--accent2)] mb-5">{P ? "♡ Collections" : "05 — Packages"}</p>
          <h2 className="serif text-5xl md:text-7xl font-light">Curated <i className="text-[var(--accent2)]">collections.</i></h2></div>
        <div className="grid lg:grid-cols-3 gap-6">
          {packages.map(p => (
            <div key={p.n} className={`reveal p-10 flex flex-col relative ${P ? "rounded-[2rem]" : ""} ${p.hot ? "bg-[var(--dark)] text-[var(--ivory)] lg:-translate-y-6 shadow-2xl" : "bg-[var(--ivory)] border border-[var(--ink)]/10"}`}>
              {p.hot && <span className="absolute -top-3 left-10 bg-[var(--accent)] text-[var(--dark)] text-[.6rem] tracking-[.25em] uppercase px-3 py-1">Most loved</span>}
              <h3 className="serif text-3xl italic">{p.n}</h3>
              <p className="text-xs opacity-60 mt-2">{p.guests} guests · {p.hours} hours</p>
              <p className="serif text-6xl mt-8">${p.price.toLocaleString()}<span className="text-base opacity-60"> from</span></p>
              <ul className="mt-8 space-y-3 flex-1">{p.f.map(f => <li key={f} className="text-sm flex gap-3"><span className="text-[var(--accent2)]">✦</span>{f}</li>)}</ul>
              <a href="#book" className={`btn mt-10 justify-center ${p.hot ? "btn-accent" : "btn-ghost"} ${P ? "rounded-full" : ""}`}>Choose {p.n.replace("The ", "")}</a>
            </div>
          ))}
        </div>
        {/* Estimator */}
        <div className={`reveal mt-20 grid lg:grid-cols-2 gap-12 p-10 md:p-14 bg-[var(--ivory)] border border-[var(--ink)]/10 ${P ? "rounded-[2rem]" : ""}`}>
          <div>
            <h3 className="serif text-4xl">Estimate your evening</h3>
            <label className="block mt-8 text-sm">Guests: <b>{guests}</b><input type="range" min={10} max={300} value={guests} onChange={e => setGuests(+e.target.value)} className="w-full mt-3 accent-[var(--accent2)]" /></label>
            <label className="block mt-6 text-sm">Hours: <b>{hours}</b><input type="range" min={2} max={8} value={hours} onChange={e => setHours(+e.target.value)} className="w-full mt-3 accent-[var(--accent2)]" /></label>
            <div className="flex flex-wrap gap-2 mt-6">
              {ex.map(([n, pr]) => <button key={n} onClick={() => setExtras(x => x.includes(n) ? x.filter(y => y !== n) : [...x, n])} className={`text-xs px-4 py-2 border transition ${P ? "rounded-full" : ""} ${extras.includes(n) ? "bg-[var(--dark)] text-[var(--ivory)] border-[var(--dark)]" : "border-[var(--ink)]/20"}`}>{n} +${pr}</button>)}
            </div>
          </div>
          <div className={`bg-[var(--dark)] text-[var(--ivory)] p-10 flex flex-col justify-center ${P ? "rounded-[1.5rem]" : ""}`}>
            <p className="eyebrow text-[var(--accent)]">Estimated investment</p>
            <p className="serif text-7xl mt-4">${est.toLocaleString()}</p>
            <p className="text-sm text-[var(--soft)] mt-3">Service only · alcohol list provided · final quote after consultation</p>
            <a href="#book" className="btn btn-accent mt-8 self-start">Request exact quote</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking({ P }: { P: boolean }) {
  const [f, setF] = useState({ name: "", email: "", date: "", type: "Wedding", guests: "", msg: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please share your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "A valid email, please";
    if (!f.date) er.date = "Choose a date";
    setErr(er);
    if (Object.keys(er).length) return;
    setLoading(true); setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };
  return (
    <section id="book" className="relative grain bg-[var(--dark)] text-[var(--ivory)] overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[50vh]">
          <img src={P ? IMG.floral : IMG.whisky} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)] to-transparent" />
          <div className="absolute bottom-12 left-6 md:left-12 right-6">
            <p className="eyebrow text-[var(--accent)] mb-4">Now booking 2026</p>
            <h2 className="serif text-5xl md:text-7xl font-light leading-none">Let's create<br /><i className="text-[var(--accent)]">something rare.</i></h2>
            <p className="mt-6 text-sm text-[var(--soft)]">hello@benitabartending.com · (555) 214-8890</p>
          </div>
        </div>
        <div className="p-6 md:p-16 lg:p-20 [--ink:var(--ivory)]">
          {sent ? (
            <div className="h-full flex flex-col justify-center text-center">
              <p className="serif text-7xl text-[var(--accent)]">✦</p>
              <h3 className="serif text-5xl mt-4">Thank you, {f.name.split(" ")[0]}.</h3>
              <p className="mt-4 text-[var(--soft)]">Your inquiry for a {f.type.toLowerCase()} on {new Date(f.date + "T00:00").toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })} has been received. Benita will reply within 24 hours.</p>
              <button onClick={() => { setSent(false); setF({ name: "", email: "", date: "", type: "Wedding", guests: "", msg: "" }); }} className="btn btn-ghost mt-8 self-center">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-8">
              <h3 className="serif text-4xl">Event inquiry</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div><input className="field" placeholder="Full name *" value={f.name} onChange={set("name")} />{err.name && <p className="text-xs text-[var(--accent)] mt-1">{err.name}</p>}</div>
                <div><input className="field" placeholder="Email *" value={f.email} onChange={set("email")} />{err.email && <p className="text-xs text-[var(--accent)] mt-1">{err.email}</p>}</div>
                <div><input type="date" className="field [color-scheme:dark]" value={f.date} min={new Date().toISOString().slice(0, 10)} onChange={set("date")} />{err.date && <p className="text-xs text-[var(--accent)] mt-1">{err.date}</p>}</div>
                <select className="field [&>option]:text-black" value={f.type} onChange={set("type")}>{["Wedding", "Private Party", "Corporate", "Birthday", "Other"].map(o => <option key={o}>{o}</option>)}</select>
                <input className="field md:col-span-2" placeholder="Estimated guests" type="number" value={f.guests} onChange={set("guests")} />
              </div>
              <textarea className="field resize-none" rows={3} placeholder="Tell me about your vision, favorite flavors…" value={f.msg} onChange={set("msg")} />
              <button disabled={loading} className={`btn btn-accent w-full justify-center ${P ? "rounded-full" : ""}`}>{loading ? "Sending…" : "Send inquiry →"}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="py-32 px-6 bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto">
        <h2 className="serif text-5xl md:text-6xl font-light mb-14 text-center reveal">Questions, <i className="text-[var(--accent2)]">answered.</i></h2>
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-[var(--ink)]/15">
            <button onClick={() => setO(o === i ? null : i)} className="w-full flex justify-between py-6 text-left serif text-2xl">{f.q}<span className={`transition ${o === i ? "rotate-45" : ""}`}>+</span></button>
            <div className={`overflow-hidden transition-all duration-500 ${o === i ? "max-h-40 pb-6" : "max-h-0"}`}><p className="opacity-70 leading-relaxed">{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer({ P }: { P: boolean }) {
  const [email, setEmail] = useState(""); const [ok, setOk] = useState(false);
  return (
    <footer className="bg-[var(--dark)] text-[var(--ivory)] pt-24 pb-10 px-6 relative grain">
      <div className="max-w-7xl mx-auto">
        <p className="serif text-[clamp(4rem,14vw,13rem)] leading-none font-light text-center">{P ? <i>Benita</i> : "BENITA"}<span className="text-[var(--accent)]">.</span></p>
        <div className="grid md:grid-cols-3 gap-10 mt-16 border-t border-white/10 pt-12 text-sm">
          <div><p className="eyebrow text-[var(--accent)] mb-4">Visit</p><p className="text-[var(--soft)]">Serving Atlanta & the Southeast<br />Travel available worldwide</p></div>
          <div><p className="eyebrow text-[var(--accent)] mb-4">Follow</p><div className="flex gap-6 text-[var(--soft)]"><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">TikTok</a></div></div>
          <form onSubmit={e => { e.preventDefault(); if (/\S+@\S+/.test(email)) setOk(true); }}>
            <p className="eyebrow text-[var(--accent)] mb-4">Seasonal recipes</p>
            {ok ? <p className="text-[var(--soft)]">Cheers — you're on the list ✦</p> :
              <div className="flex border-b border-white/30"><input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="bg-transparent flex-1 py-2 outline-none" /><button className="text-[var(--accent)]">→</button></div>}
          </form>
        </div>
        <p className="text-xs text-white/40 mt-16 text-center">© 2026 Benita Private Bartending · Please enjoy responsibly</p>
      </div>
    </footer>
  );
}
