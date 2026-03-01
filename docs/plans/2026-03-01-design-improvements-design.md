# Design Improvements: "Influence — Bold Color Edition"

**Date:** 2026-03-01
**Status:** Approved
**Approach:** Layer-by-Layer (Foundation → Components → Sections → Interactions → Differentiation)

## Context

Influence is a reputation management & strategy consultancy for European C-level leaders. The founder has credentials from Vlerick (Brand Management) and INSEAD (Blue Ocean Strategy). The company has 4 service lines: Labs (flagship, growth focus), Circle, Studio, Academy.

The current site is technically solid (Next.js 16, Tailwind 4, Motion, next-intl) but visually generic — 95% navy + white, hidden accent colors, predictable SaaS-template layout.

## Design Direction

**Aesthetic:** Refined Luxury with Bold Color — intellectual authority meets creative confidence.
**Core principle:** Color is a main character, not a supporting actor. The 4 service colors (especially Labs teal) dominate the visual experience.
**Typography:** Vastago Grotesk + Libre Caslon Display (serif) for quotes and accent text.

## Color Philosophy

- **Labs #0FA3B1 (cyan/teal)** — dominant on homepage, flagship color
- **Circle #D7263D (red)** — energetic, urgent
- **Studio #A855F7 (purple)** — creative, premium
- **Academy #E8A317 (gold)** — knowledge, ambition

Colors appear at 15-40% opacity in gradient glows, not hidden at 3%. Service colors are front and center in cards, stats, buttons, and backgrounds.

---

## Layer 1: Foundation

### 1.1 Serif Font
- Font: Libre Caslon Display (Google Font) via `next/font/google`
- CSS variable: `--font-serif`
- Usage: testimonial quotes, hero accent words

### 1.2 Noise/Grain Texture
- CSS noise via tiny base64-encoded PNG
- Applied as `::after` on navy sections
- Opacity 3-5%, `mix-blend-mode: overlay`, `pointer-events: none`

### 1.3 Global Gradient Atmosphere
- Navy sections: radial gradient glows at 15-25% opacity
- Homepage: Labs-teal glow dominant (bottom-right), Studio-purple subtle (top-left)
- Gradient flows between sections as you scroll

### 1.4 Selection & Focus Styling
- `::selection { background: rgba(15,163,177,0.3); color: white }` (Labs teal)
- Focus rings: accent-colored (teal)
- `html { scroll-behavior: smooth }`

### 1.5 Scrollbar Refinement
- Width: 6px
- Thumb: subtle gradient with teal hint
- Hover: slightly lighter

### 1.6 New Animation Variants
Expand `animations.ts`:
- `slideInLeft` / `slideInRight` — horizontal slides
- `scaleRotate` — scale + subtle rotation
- `blurIn` — blur(8px)→blur(0) + opacity
- Varied durations: 0.4s, 0.6s, 0.8s, 1.0s

### 1.7 Section Dividers
- New `SectionDivider.tsx` utility component
- CSS `clip-path` angled divider or gradient-line with accent color

---

## Layer 2: Components

### 2.1 Button.tsx
- **Primary**: `bg-labs` (teal) default on homepage, white text. Hover: `brightness(1.1) + scale(1.03) + box-shadow glow`
- **Secondary**: transparent bg, `border-2 border-labs`, teal text. Hover: `bg-labs/10`
- **Ghost**: animated underline via `scaleX(0→1)` pseudo-element
- **Active**: `scale(0.97)` for tactile feel
- **accentColor prop** drives the full color experience

### 2.2 Card.tsx
- **Dark variant** (navy sections): `bg-navy-light/80 backdrop-blur-xl border border-white/10`
- **Accent glow**: `box-shadow: 0 0 60px ${accentColor}20`
- **Accent gradient bar**: 2px gradient top border (accent → accent/40)
- **Hover**: glow → `${accentColor}35`, lift `-translate-y-2`, accent overlay intensifies
- **Light variant** (white sections): `bg-white shadow-xl` + 4px accent left-border

### 2.3 SectionHeading.tsx
- **Eyebrow**: full-strength accent color + decorative line left (24px, 2px, accent-colored `before:` pseudo)
- **Heading**: optional `gradient` prop → `bg-clip-text` gradient from white to accent/70
- **Description**: font-weight 300 for contrast

### 2.4 AnimatedCounter.tsx
- **Colored numbers**: each stat gets `accentColor` prop
- **Ring chart**: SVG circle behind number, `stroke-dasharray` animated 0 → percentage
- **Ring color**: accent color of the corresponding service

---

## Layer 3: Sections

### 3.1 HeroSection.tsx — Full Redesign
- **Layout**: centered text, visual as full-screen background (not 2-column)
- **Background**: navy + radial-gradient Labs-teal glow (30-40% opacity, 600px radius) bottom-right + subtle Studio-purple glow top-left (10%)
- **Expanding wave visual**: SVG network pattern of lines/nodes radiating outward, in Labs-teal
- **Magnetic parallax**: `onMouseMove` shifts wave visual subtly (10-20px range)
- **H1**: `text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em]`, gradient text (white → teal-white)
- **Choreographed entrance**: eyebrow (0ms) → H1 blurIn (200ms) → subtitle slideUp (400ms) → buttons scaleIn (600ms) → background glow fadeIn (0-1000ms)
- **CTA buttons**: primary teal, secondary outline teal

### 3.2 ClientLogoBar.tsx
- Gradient fade-edges via `mask-image`
- Hover pauses marquee
- Logos at 40% opacity, hover → 80%
- Subtle teal underline accent

### 3.3 PainPointSection.tsx
- Cards: 4px teal left-border + subtle teal glow
- Animation: `slideInLeft` with stagger
- "Solution" text: teal highlight on key word

### 3.4 StatsBar.tsx
- 4 stats, each in a different service color (Labs, Circle, Studio, Academy)
- SVG ring chart behind each number
- Background: navy with 4 subtle color spots

### 3.5 PillarGrid.tsx — Bento Redesign
- **Grid**: `grid-cols-1 md:grid-cols-3` — Labs card `md:col-span-2 md:row-span-2` (large), other 3 standard
- **Card style**: dark glassmorphism (`bg-navy-light/60 backdrop-blur-xl border-accent/15`)
- **Accent gradient overlay**: radial-gradient of accent-color at 8-15% in corner
- **Hover**: accent fill → 20-25%, glow expands, text brightens
- **Labs featured card**: extra large, abstract SVG pattern background

### 3.6 MirrorExposureSection.tsx
- Circle red (#D7263D) dominates: red glow on background
- Steps connected by curved SVG path
- Concentric circles: gradient stroke (red → red/30)

### 3.7 TestimonialSection.tsx
- Serif font (Libre Caslon Display) for quote
- Accent bar left (4px, teal) instead of decorative quote mark
- Background: off-white with subtle radial glow
- If multiple testimonials: horizontal carousel with slide animation

### 3.8 CTABanner.tsx
- Gradient background: `from-navy via-navy-light to-navy` + Labs-teal glow center (25%)
- CTA button: large (py-4 px-12 text-lg), teal bg, breathing box-shadow pulse
- Decorative wave lines at 15-20% opacity, teal

### 3.9 Footer.tsx
- Accent stripe top: 3px gradient through all 4 service colors
- Service links: each in their own color
- Subtle background gradient glow

---

## Layer 4: Interactions

### 4.1 CustomCursor.tsx (new)
- Small teal dot (8px) following mouse with `lerp` smoothing
- Grows to 40px on hoverable elements
- Hidden on touch devices
- `mix-blend-mode: difference`

### 4.2 PageTransition.tsx (new)
- Wraps `[locale]/layout.tsx` children
- `AnimatePresence` + `motion.div` with `opacity + y` transition
- Subtle accent color flash overlay (5%) that fades quickly

### 4.3 Navbar Dropdown Animation
- `AnimatePresence` wrapper
- Entrance: `opacity 0→1, y -8→0, scale 0.95→1` over 200ms
- Exit: reverse 150ms
- Close delay: 150ms debounce on `onMouseLeave`

### 4.4 Scroll-Triggered Background Glows
- Decorative gradient blobs on background shifting with scroll
- CSS `transform: translateY(calc(var(--scroll) * -0.1))`
- Lightweight scroll listener

---

## Layer 5: Service Page Differentiation

### 5.1 Labs (flagship)
- Hero: massive teal gradient mesh (40% of screen), grid-dot pattern background
- Monospace eyebrow font accent
- Unique visual: abstract "data flow" SVG — lines flowing left to right
- Extra: credentials bar (Vlerick, INSEAD badges)

### 5.2 Circle
- Hero: red radial glow + network node diagram visual
- Pulsing connection lines between nodes

### 5.3 Studio
- Hero: purple gradient mesh with organic shapes
- Overlapping transparent color planes

### 5.4 Academy
- Hero: golden warmth, layered blocks "stacking knowledge"
- Horizontal lines suggesting book pages
