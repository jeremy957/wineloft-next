
import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/Container";
import { MapPin, Phone, Mail, Instagram, ChevronRight, Wine, Clock, User, Star, Navigation } from "lucide-react";

// CONFIG
const SITE = {
  name: "Wine Loft on Franklin",
  tagline: "Your neighborhood wine sanctuary.",
  description: "A cozy wine bar with small plates, thoughtful service, and a curated list of bottles and by-the-glass favorites.",
  address_line: "104 Franklin Street, Johnstown, PA 15901",
  phone: "814-535-7059",
  email: "info@franklinwineloft.com",
  instagram: "https://www.instagram.com/wineloftonfranklin/",
  facebook: "https://www.facebook.com/wineloftonfranklin",
  url: "https://www.franklinwineloft.com",
  reservation_link: "https://tables.hostmeapp.com/restaurants/38307",
  primary_cta_text: "Reserve Now",
  secondary_cta_text: "View Menus",
  events_form_action: "https://formsubmit.co/info@franklinwineloft.com",
};

const HERO = {
  image: "https://images.unsplash.com/photo-1524594227084-60e3d4a3017e?q=80&auto=format&fit=crop&w=1920&h=1280",
  alt: "Glasses of wine on a cozy wooden table with warm ambient lighting",
};

const HOURS = [
  { d: "Mon", h: "Closed" },
  { d: "Tue", h: "Closed" },
  { d: "Wed", h: "5:00 pm – 9:00 pm" },
  { d: "Thu", h: "5:00 pm – 9:00 pm" },
  { d: "Fri", h: "5:00 pm – 9:00 pm" },
  { d: "Sat", h: "5:00 pm – 9:00 pm" },
  { d: "Sun", h: "Closed" },
];

const MAILCHIMP = {
  action: "https://chimpstatic.com/mcjs-connected/js/users/43c15d4a7847ab042bb4a8e82/a2a305b8e7c804ae8c2d6ed9b.js",
  u: "43c15d4a7847ab042bb4a8e82",
  id: "a2a305b8e7c804ae8c2d6ed9b",
};

const MENUS = {
  wine_pdf_url: "#",
  food_pdf_url: "#",
  food_embed_html:
    '<embed src="https://ohbz.com/design/wine-loft-on-franklin-johnstown-pa?embed=true" style="width: 100%; aspect-ratio: 0.6140350877192983; border: none;" title="food menu" />',
  wine_embed_html:
    '<embed src="https://ohbz.com/design/wine-loft-on-franklin-johnstown-pa?embed=true" style="width: 100%; aspect-ratio: 0.6140350877192983; border: none;" title="wine menu" />',
};

const INSTAGRAM_POSTS: string[] = [
  "https://www.instagram.com/p/DNVgOgGOkKF/",
  "https://www.instagram.com/p/DNT1UhYJHzV/",
  "https://www.instagram.com/p/DNDr59-Ogom/",
  "https://www.instagram.com/p/DL77YGEJacH/",
  "https://www.instagram.com/p/DLIUWfcuZ8k/",
  "https://www.instagram.com/p/DI34EK4tVDl/",
  "https://www.instagram.com/p/DHwJURNJTu5/",
  "https://www.instagram.com/p/DG8Xn-eu9A-/",
  "https://www.instagram.com/p/DGdigygTQpG/?img_index=1",
];

function InstagramEmbedGrid({ posts }: { posts: string[] }) {
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(s);
    } else if ((window as any).instgrm?.Embeds?.process) {
      (window as any).instgrm.Embeds.process();
    }
  }, [posts]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((url, i) => (
        <div key={i} className="relative">
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gray-100" />
          <blockquote
            className="instagram-media relative rounded-xl border bg-white p-0 shadow-sm"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ width: "100%", maxWidth: "540px", margin: "0 auto" }}
          >
            <a href={url} target="_blank" rel="noreferrer" aria-label="View Instagram post" />
          </blockquote>
        </div>
      ))}
    </div>
  );
}

function SafeEmbed({ html, fallbackHref, label }: { html: string; fallbackHref: string; label: string }) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    const el = wrapRef.current;
    if (!el) return;
    el.innerHTML = html || "";
    const t = setTimeout(() => {
      const h = el.offsetHeight;
      if (!h || h < 120) setFailed(true);
    }, 1500);
    return () => clearTimeout(t);
  }, [html]);

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-gray-50 p-8 text-center">
        <p className="text-sm text-gray-600">This content isn’t available in preview. Open it in a new tab.</p>
        <Button asChild><a href={fallbackHref} target="_blank" rel="noreferrer">{label}</a></Button>
      </div>
    );
  }
  return <div ref={wrapRef} className="w-full" />;
}

export default function HomePage() {
  const today = useMemo(() => new Date(), []);
  const isOpenNow = useMemo(() => {
    const dayIdx = today.getDay();
    const map = { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" } as const;
    const day = (map as any)[dayIdx];
    const entry = HOURS.find((h) => h.d === day);
    return entry && entry.h !== "Closed";
  }, [today]);

  return (
    <>
      <Head>
        <title>Wine Loft on Franklin – Wine Bar & Lounge in Johnstown, PA</title>
        <meta name="description" content="Sip fine wines, craft cocktails, and enjoy live events at Wine Loft on Franklin in Johnstown, PA. Explore our curated wine list, chef-inspired menu, and private event space." />
        <link rel="canonical" href={SITE.url} />
        <meta property="og:title" content="Wine Loft on Franklin – Wine Bar & Lounge in Johnstown, PA" />
        <meta property="og:description" content="Sip fine wines, craft cocktails, and enjoy live events at Wine Loft on Franklin in Johnstown, PA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE.url} />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wine Loft on Franklin – Wine Bar & Lounge in Johnstown, PA" />
        <meta name="twitter:description" content="Sip fine wines, craft cocktails, and enjoy live events at Wine Loft on Franklin in Johnstown, PA." />
        <script id="ld-json-local" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BarOrPub",
          name: SITE.name,
          url: SITE.url,
          telephone: "+1-814-535-7059",
          address: { "@type": "PostalAddress", streetAddress: "104 Franklin Street", addressLocality: "Johnstown", addressRegion: "PA", postalCode: "15901", addressCountry: "US" },
          sameAs: [SITE.facebook, SITE.instagram]
        })}} />
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        {/* NAV */}
        <header className="sticky top-0 z-40 w-full border-b backdrop-blur bg-white/70">
          <Container className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Wine className="h-6 w-6" />
              <span className="font-semibold">{SITE.name}</span>
            </div>
            <nav className="hidden items-center gap-6 md:flex text-sm">
              <a href="#about" className="hover:opacity-80">About</a>
              <a href="#menus" className="hover:opacity-80">Menus</a>
              <a href="#events" className="hover:opacity-80">Events</a>
              <a href="#private" className="hover:opacity-80">Private Events</a>
              <a href="#club" className="hover:opacity-80">Wine Club</a>
              <a href="#visit" className="hover:opacity-80">Visit</a>
            </nav>
            <div className="flex items-center gap-2">
              <Badge className="hidden md:inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {isOpenNow ? "Open today" : "Closed today"}
              </Badge>
              <Button asChild><a href={SITE.reservation_link} target="_blank" rel="noreferrer">Reserve</a></Button>
              <Button variant="outline" asChild><a href="#menus">Menus</a></Button>
            </div>
          </Container>
        </header>

        {/* HERO */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgb(127,29,29,0.15),transparent)]" />
          <Container className="grid gap-10 py-16 md:grid-cols-2 md:py-24">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600">
                <Star className="h-3.5 w-3.5" /> Johnstown, Pennsylvania
              </div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Wine Loft on Franklin – Wine Bar & Lounge in Johnstown, PA</h1>
              <p className="mt-4 max-w-prose text-lg text-gray-600">{SITE.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild><a href={SITE.reservation_link} target="_blank" rel="noreferrer">{SITE.primary_cta_text}</a></Button>
                <Button size="lg" variant="outline" asChild><a href="#menus">{SITE.secondary_cta_text}</a></Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                <img src={HERO.image} alt={HERO.alt} className="h-full w-full object-cover" loading="eager" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent" />
              </div>
              <div className="-mt-8 ml-8 w-[75%] overflow-hidden rounded-xl border bg-white/90 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3 p-4">
                  <Wine className="h-5 w-5" />
                  <p className="text-sm"><strong>Tonight:</strong> Cozy vibes & great pours. Join us!</p>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* MENUS */}
        <section id="menus" className="bg-gray-50 py-16 md:py-20">
          <Container>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">By the glass & small plates</h2>
              <p className="mt-3 text-gray-600">A sample of what we’re pouring and serving.</p>
            </div>
            <div className="mt-8 flex flex-col gap-8">
              <SafeEmbed html={MENUS.food_embed_html} fallbackHref="https://ohbz.com/design/wine-loft-on-franklin-johnstown-pa?embed=true" label="Open Food Menu" />
              <SafeEmbed html={MENUS.wine_embed_html} fallbackHref="https://ohbz.com/design/wine-loft-on-franklin-johnstown-pa?embed=true" label="Open Wine Menu" />
            </div>
          </Container>
        </section>

        {/* EVENTS */}
        <section id="events" className="py-16 md:py-20">
          <Container>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Upcoming Events</h2>
              <p className="mt-3 text-gray-600">Pulled directly from our Facebook page — always up to date.</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-rose-100/40 via-amber-50/40 to-emerald-100/40" />
              <div className="rounded-2xl border bg-white shadow-lg p-4">
                <div id="sk-events" className="sk-fb-event" data-embed-id="201776" />
                <script
                  dangerouslySetInnerHTML={{__html: `
                    (function(){
                      var src='https://widgets.sociablekit.com/facebook-page-events/widget.js';
                      if (!document.querySelector('script[src=\"'+src+'\"]')) {
                        var s=document.createElement('script'); s.src=src; s.defer=true; document.body.appendChild(s);
                      }
                    })();
                  `}}
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-600">
                <span>Events provided by Facebook via SociableKIT.</span>
                <a className="inline-flex items-center rounded-full border px-3 py-1 hover:bg-gray-50" href="https://www.facebook.com/wineloftonfranklin/events/" target="_blank" rel="noreferrer">View on Facebook</a>
              </div>
            </div>
          </Container>
        </section>

        {/* VISIT */}
        <section id="visit" className="py-16 md:py-20">
          <Container>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Visit Us</h2>
              <p className="mt-3 text-gray-600">We’re right on Franklin — bring friends and settle in.</p>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              <Card>
                <CardHeader><CardTitle>Location & Contact</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600"><MapPin className="h-4 w-4" /> {SITE.address_line}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-600"><Phone className="h-4 w-4" /> <a className="hover:underline" href={`tel:${SITE.phone}`}>{SITE.phone}</a></div>
                  <div className="flex items-center gap-3 text-sm text-gray-600"><Mail className="h-4 w-4" /> <a className="hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
                  <div className="flex items-center gap-3 text-sm text-gray-600"><Instagram className="h-4 w-4" /> <a className="hover:underline" href={SITE.instagram} target="_blank" rel="noreferrer">@wineloftonfranklin</a></div>
                  <div className="pt-2"><Button asChild className="inline-flex items-center"><a href={SITE.reservation_link} target="_blank" rel="noreferrer"><Navigation className="mr-2 h-4 w-4" /> Reserve a Table</a></Button></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Hours</CardTitle></CardHeader>
                <CardContent>
                  <ul className="divide-y text-sm">
                    {HOURS.map((h) => (
                      <li key={h.d} className="flex items-center justify-between py-2"><span className="font-medium">{h.d}</span><span className="text-gray-600">{h.h}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* FOOTER */}
        <footer className="border-t py-10">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
              <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Accessibility</a>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
}
