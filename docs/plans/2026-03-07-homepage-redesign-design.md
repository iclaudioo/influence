# Homepage Redesign — "The Dossier"

## Design Direction

**Concept:** De website als vertrouwelijk rapport — een intelligence briefing over reputation management.

**Visuele taal:** "Spaceship Instruction Manual" meets "Editorial Luxe"
- Monospace labels + serif headlines
- Dunne grid-lijnen als structureel element
- B&W fotografie met single-color duotone (oranje #d55d25)
- Anti-decoratie: elke pixel heeft een reden

**Anti-AI-slop principes:**
- Geen gradient meshes, orbital rings, blur glows, breathing animations
- Geen gegenereerde stockfoto's
- Geen animated stat counters of logo carousels
- Echte fotografie (investering in fotoshoot gepland)

**Tech stack:** Next.js 16, Motion (Framer Motion), GSAP, Lenis — ongewijzigd

---

## Sitearchitectuur Homepage

```
01 Header       — Classified header met genummerde navigatie
02 Hero         — "Alles begint met strategie" + blueprint schema
03 Het Model    — Zichtbaar > Herkenbaar > Vertrouwd > Onvermijdelijk
04 De Methode   — Labs > Circle > Studio > Academy (sequentieel)
05 CTA + Footer — "Klaar om te bouwen?" + minimale footer
```

---

## Sectie 1: Header — "Classified Header"

**Bovenbalk:** dunne lijn met monospace tekst
`INFLUENCE CIRCLE — REPUTATION ARCHITECTS — EST. [jaar]`
- `tracking-[0.3em]`, `text-[10px]`, `text-white/30`

**Hoofdnavigatie:**
- Logo links, kleiner dan verwacht
- Rechts genummerde items: `01 Approach` / `02 Services` / `03 Cases` / `04 Insights` / `05 Contact`
- Monospace nummering, serif labels

**Scroll-gedrag:** header krimpt, bovenbalk verdwijnt, subtiele `border-bottom: 1px solid white/5`

**Mobile:** fullscreen overlay met grote serif titels, genummerd, service-line kleur als accent

---

## Sectie 2: Hero — "The Briefing Opens"

**Layout:** split-screen — links 60% tekst, rechts 40% schema

**Links:**
- Monospace label: `001 / STRATEGIE` in Labs-oranje (#d55d25)
- Serif headline (Libre Caslon): "Elke reputatie begint met een strategie."
- Subtitle sans-serif light, white/50: "Wij bouwen het fundament. De rest volgt."
- CTA: `START DIAGNOSE ->` — verwijst naar Labs

**Rechts:**
- Architecturale blueprint van het sequentiele model: Labs > Circle > Studio > Academy
- Dunne lijnen, monospace labels, verbonden met doorlopende lijn
- Labs-node brandt oranje, rest is white/20 — activeren bij scroll

**Achtergrond:** puur #02182B navy. Geen gradients, geen mesh, geen spiraal.
Eén subtiele horizontale grid-lijn op 1/3 hoogte in white/[0.03]

**Entry-animatie:**
1. Grid-lijnen tekenen zichzelf (0.3s)
2. Tekst per regel van links (staggered, 0.15s per regel)
3. Beeld faded in (0.5s)
4. Totaal ~1.2s, alleen ease-out, geen bounce/elastic

**Verwijderd:** SpiralAnimation, BackgroundCircles, orbital rings, blur glows, centered layout, dubbele CTAs, scroll indicator

---

## Sectie 3: Het Model — "The Reputation Architecture Model"

**Eigen framework van Influence Circle:**

```
ZICHTBAAR > HERKENBAAR > VERTROUWD > ONVERMIJDELIJK
```

Elke stap is voorwaarde voor de volgende.

**Per stap een one-liner:**
- Zichtbaar: "Ze weten dat je bestaat"
- Herkenbaar: "Ze weten wie je bent"
- Vertrouwd: "Ze geloven wat je zegt"
- Onvermijdelijk: "Ze kiezen jou"

**Visueel:** vier nodes verbonden met horizontale lijn, monospace nummering (01-04)

**Scroll-interactie:** stappen activeren een voor een bij scrollen.
Elke stap gaat van white/15 naar vol wit. Verbindingslijn "tekent" zich naar de volgende.
Bij alle vier actief: "THE CIRCLE GROWS" pulst eenmalig in oranje.

**Transitie naar volgende sectie:**
"Het model vertelt je waar je naartoe moet. Onze methode brengt je er."

**Payoff-line:**
"De meeste leiders stoppen bij zichtbaarheid. Wij bouwen door tot onvermijdelijkheid."

---

## Sectie 4: De Methode — "The Blueprint Unfolds"

**Structuur:** verticale lijn aan linkerkant met vier nodes die oplichten per fase.
Elke fase is een full-viewport sectie.

### Per fase:

**Labs (01) — Strategie & Diagnose** (kleur: #d55d25)
- Rechterkolom: schematische "scan" — radar/diagnose-visualisatie met dunne lijnen
- Strategische lens: Blue Ocean Strategy, Zero Based Thinking, Playing to Win (detail op Labs-pagina)

**Circle (02) — Netwerk & Positionering** (kleur: #D7263D)
- Rechterkolom: netwerk-diagram — nodes die verbonden worden, real-time geanimeerd

**Studio (03) — Creatie & Narratief** (kleur: #A855F7)
- Rechterkolom: content-grid — thumbnails van echte output in B&W

**Academy (04) — Borging & Training** (kleur: #E8A317)
- Rechterkolom: curriculum-structuur — gestapelde blokken die opbouwen

### Elk blok bevat:
- Monospace nummer + naam in service-line kleur
- Serif headline — een krachtige zin
- 2-3 regels body tekst sans-serif light, white/50
- Tussenregel: quote of datapunt in monospace
- Scroll-activatie: node licht op, horizontale lijn tekent naar content, vorige fase dimt naar white/10

---

## Sectie 5: CTA + Footer — "The Invitation"

**CTA:**
- Maximale witruimte — navy achtergrond, niets leidt af
- Serif headline: "Klaar om te bouwen?"
- Een button: `PLAN EEN GESPREK ->` (monospace, oranje)
- Geen secondary CTA, geen telefoon, geen decoratie

**Footer:**
- Vloeit direct uit CTA, zelfde achtergrond
- Gestippelde lijn als scheiding
- Links: INFLUENCE CIRCLE / Reputation Architects / email / LinkedIn
- Rechts: genummerde navigatie herhaald
- Onderaan: copyright + Privacy / Terms

---

## Social Proof (toekomstige uitbreiding)

Wordt pas toegevoegd wanneer er klanten zijn. Drie lagen:
1. Client logo's — een rij, geen carousel
2. Resultaten — monospace cijfers, serif labels
3. Testimonials — serif italic quote, B&W portret, simpele prev/next

De sitearchitectuur houdt hier rekening mee.

---

## Typografie

- **Headlines:** Libre Caslon Display (serif, 400) — groot, strak leading
- **Body:** Vastago Grotesk (sans-serif, 300/400) — light voor body, regular voor accenten
- **Labels/Systeem:** Monospace (nog te kiezen, bijv. JetBrains Mono of IBM Plex Mono) — nummering, section labels, captions, buttons

## Kleurpalet

- **Achtergrond:** #02182B (navy), #010f1c (navy dark)
- **Tekst:** #FFFFFF (koppen), white/50 (body), white/20-30 (labels)
- **Accent:** #d55d25 (Labs oranje — primaire accent op homepage)
- **Service lines:** #D7263D (Circle), #A855F7 (Studio), #E8A317 (Academy)
- **Structuurlijnen:** white/[0.03] tot white/[0.06]

## Fotografie

- B&W met single-color duotone overlay (service-line kleur)
- Investering in professionele fotoshoot
- Geen AI-gegenereerde of stock beelden

## Animaties

- Entry: strak, ease-out, max 1.2s
- Scroll-activatie: nodes/lijnen tekenen zich, content faded in
- Geen bounce, elastic, breathing, pulse
- GSAP voor blueprint-lijn animaties
- Motion (Framer) voor fade/stagger
- Lenis voor smooth scroll
