# Design Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Influence website from a generic SaaS template into a bold, color-forward premium consultancy site where Labs (teal) is the flagship, color is the main character, and every section has its own visual identity.

**Architecture:** Layer-by-layer approach — Foundation (globals, fonts, animations) → Components (Button, Card, SectionHeading, AnimatedCounter) → Sections (Hero through Footer) → Interactions (cursor, transitions, navbar) → Service page differentiation. Each layer builds on the previous.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Motion 12, next-intl 4, TypeScript 5. Libre Caslon Display added as serif font via next/font/google.

---

## Task 1: Add Serif Font (Libre Caslon Display)

**Files:**
- Modify: `src/lib/fonts.ts`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Add Libre Caslon Display to fonts.ts**

Add a Google Font import alongside the existing Vastago Grotesk local font:

```typescript
import { Libre_Caslon_Display } from "next/font/google";

export const libreCaslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});
```

**Step 2: Apply font variable in locale layout**

In `src/app/[locale]/layout.tsx`, import `libreCaslon` and add its variable class to the `<html>` tag:

```tsx
import { vastagoGrotesk, libreCaslon } from "@/lib/fonts";
// ...
<html lang={locale} className={`${vastagoGrotesk.variable} ${libreCaslon.variable}`}>
```

**Step 3: Register --font-serif in globals.css @theme**

Add to the `@theme inline` block:

```css
--font-serif: "Libre Caslon Display", Georgia, "Times New Roman", serif;
```

**Step 4: Verify — run dev server**

Run: `cd influence-circle && npm run dev`
Check: Page loads, inspect element shows `--font-serif` variable available.

**Step 5: Commit**

```
feat: add Libre Caslon Display serif font
```

---

## Task 2: Foundation — globals.css Overhaul

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add selection styling**

After the `body` block:

```css
::selection {
  background: rgba(15, 163, 177, 0.3);
  color: white;
}

html {
  scroll-behavior: smooth;
}
```

**Step 2: Add noise/grain texture utility**

```css
/* Grain texture overlay for premium feel */
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
```

**Step 3: Refine scrollbar**

Replace existing scrollbar styles:

```css
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-navy-dark);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, var(--color-navy-light), rgba(15, 163, 177, 0.3));
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, rgba(15, 163, 177, 0.4), rgba(15, 163, 177, 0.5));
}
```

**Step 4: Add breathing glow keyframe**

```css
@keyframes breathingGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(15, 163, 177, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(15, 163, 177, 0.5), 0 0 80px rgba(15, 163, 177, 0.2);
  }
}

.animate-breathing-glow {
  animation: breathingGlow 3s ease-in-out infinite;
}
```

**Step 5: Add gradient text utility**

```css
.text-gradient-teal {
  background: linear-gradient(135deg, #ffffff 0%, rgba(15, 163, 177, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Step 6: Add focus-visible styling**

```css
*:focus-visible {
  outline: 2px solid rgba(15, 163, 177, 0.6);
  outline-offset: 2px;
}
```

**Step 7: Verify**

Run dev server, check: selection is teal, scrollbar is refined, smooth scrolling works, grain class ready.

**Step 8: Commit**

```
feat: foundation CSS — grain texture, selection, scrollbar, glow, gradient text
```

---

## Task 3: Foundation — Expand Animation Variants

**Files:**
- Modify: `src/lib/animations.ts`

**Step 1: Add new animation variants**

Add these after the existing variants:

```typescript
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const scaleRotate: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const slowFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};
```

**Step 2: Verify — TypeScript compiles**

Run: `cd influence-circle && npx tsc --noEmit`

**Step 3: Commit**

```
feat: add slideIn, blurIn, scaleRotate, heroStagger animation variants
```

---

## Task 4: Foundation — SectionDivider Component

**Files:**
- Create: `src/components/ui/SectionDivider.tsx`

**Step 1: Create the component**

```tsx
type Props = {
  from?: string;
  to?: string;
  accentColor?: string;
};

export function SectionDivider({
  from = "var(--color-navy)",
  to = "var(--color-off-white)",
  accentColor,
}: Props) {
  return (
    <div className="relative h-24 -mt-1 -mb-1" style={{ background: from }}>
      <div
        className="absolute inset-0"
        style={{
          background: to,
          clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      {accentColor && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-32 h-1 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />
      )}
    </div>
  );
}
```

**Step 2: Verify — TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```
feat: add SectionDivider component with clip-path and accent line
```

---

## Task 5: Component — Button.tsx Redesign

**Files:**
- Modify: `src/components/ui/Button.tsx`

**Step 1: Rewrite Button.tsx**

Replace the entire component with an upgraded version:

- Primary variant: teal background (`bg-labs` equivalent via accentColor or default #0FA3B1), white text
- Hover: `scale(1.03)` + box-shadow glow in accent color
- Active: `scale(0.97)` for tactile feedback
- Secondary: transparent bg, accent-colored border + text, hover fills bg at 10%
- Ghost: animated underline via `after:` pseudo-element with scaleX transition
- Add `transition-all duration-200` with transform and box-shadow
- Default accentColor to `#0FA3B1` (Labs teal)

Key style changes:
```typescript
const variantStyles = {
  primary: "rounded-full px-8 py-3 text-white",
  secondary: "rounded-full px-8 py-3 border-2",
  ghost: "relative text-white hover:text-white/80 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
};
```

Primary and secondary get inline styles via accentColor for background/border colors. Add hover scale via group/hover or inline transition style. Add `active:scale-[0.97]` class.

**Step 2: Verify — all pages render**

Run dev server, check homepage buttons are teal, hover shows glow + scale.

**Step 3: Commit**

```
feat: redesign Button with teal default, glow hover, tactile active state
```

---

## Task 6: Component — Card.tsx Redesign

**Files:**
- Modify: `src/components/ui/Card.tsx`

**Step 1: Add `variant` prop: "dark" | "light"**

- `dark` (for navy sections): `bg-[#0a2540]/80 backdrop-blur-xl border border-white/10`
- `light` (for white sections): `bg-white shadow-xl` + 4px left accent border
- Keep `hover` prop behavior, upgrade hover to: `-translate-y-2`, glow box-shadow
- Accent gradient bar: 2px gradient top (or left for light variant)
- Accent glow on hover via inline `boxShadow` with accentColor

The component should accept: `children, accentColor, className, hover, variant`

Default variant = "light" for backward compatibility.

**Step 2: Verify — PillarGrid and DeliverablesGrid still render**

Check both light and dark contexts.

**Step 3: Commit**

```
feat: redesign Card with dark/light variants, glow hover, gradient accent
```

---

## Task 7: Component — SectionHeading.tsx Polish

**Files:**
- Modify: `src/components/ui/SectionHeading.tsx`

**Step 1: Add decorative line to eyebrow**

Add a `before:` pseudo-element on the eyebrow `<p>` tag:
- When not centered: `before:content-[''] before:inline-block before:w-6 before:h-0.5 before:mr-3 before:align-middle` with background-color from accentColor
- Keep centered without the line (it would look odd centered with a left-line)

**Step 2: Add gradient prop to heading**

New prop: `gradient?: boolean`
When true and `light` is true: apply `text-gradient-teal` class (or inline gradient style using accentColor).

**Step 3: Description weight**

Change description to `font-light` (weight 300) for contrast with bold heading.

**Step 4: Verify — all sections with SectionHeading render correctly**

**Step 5: Commit**

```
feat: polish SectionHeading with eyebrow accent line, gradient text, lighter description
```

---

## Task 8: Component — AnimatedCounter.tsx Enhancement

**Files:**
- Modify: `src/components/ui/AnimatedCounter.tsx`

**Step 1: Add accentColor prop**

Change the number color from fixed white to `accentColor`:

```tsx
type Props = {
  target: number;
  suffix?: string;
  duration?: number;
  accentColor?: string;
};
```

Apply color via inline `style={{ color: accentColor || '#ffffff' }}`.

**Step 2: Add SVG ring chart behind number**

Add an SVG circle that animates `stroke-dashoffset` from full circumference to a target percentage. The ring sits behind the number, centered. Use the same IntersectionObserver to trigger the ring animation in sync with the counter.

```tsx
// SVG ring: radius 40, circumference ~251
<svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="none" stroke={accentColor} strokeWidth="2"
    opacity="0.15" />
  <circle cx="50" cy="50" r="40" fill="none" stroke={accentColor} strokeWidth="2"
    strokeDasharray="251" strokeDashoffset={dashOffset}
    strokeLinecap="round" transform="rotate(-90 50 50)"
    style={{ transition: `stroke-dashoffset ${duration}ms ease-out` }} />
</svg>
```

The wrapper div needs `relative` positioning, and the number gets `relative z-10`.

**Step 3: Verify — StatsBar renders with colored numbers and rings**

**Step 4: Commit**

```
feat: enhance AnimatedCounter with colored numbers and SVG ring chart
```

---

## Task 9: Section — HeroSection.tsx Full Redesign

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

**Step 1: Restructure layout to centered**

Remove the 2-column grid. Make text centered with the SVG visual as full-screen background behind the text.

**Step 2: Add gradient background glows**

Two positioned div overlays:
- Bottom-right: `radial-gradient(ellipse at 70% 70%, rgba(15,163,177,0.3) 0%, transparent 60%)` — Labs teal, 600px spread
- Top-left: `radial-gradient(ellipse at 20% 20%, rgba(168,85,247,0.08) 0%, transparent 50%)` — Studio purple, subtle

**Step 3: Upgrade SVG visual**

Replace the simple circles with a more complex expanding wave/network pattern:
- Concentric circles with varying stroke widths and opacities
- Small dots/nodes at cardinal points on each ring
- Thin connecting lines between nodes
- All in Labs teal at varying opacities (5%-25%)
- Apply `hero-ripple` animation to the entire group

**Step 4: Add magnetic parallax**

Add `onMouseMove` handler on the section that calculates mouse offset from center and applies a subtle `transform: translate(Xpx, Ypx)` to the SVG container (range: -15px to +15px). Use `useRef` for the SVG container and `requestAnimationFrame` for smooth updates.

**Step 5: Upgrade typography**

- H1: `text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em]`
- Apply `text-gradient-teal` class to H1
- Subtitle: `text-lg md:text-xl text-white/70 max-w-2xl mx-auto`
- Eyebrow: `text-labs` (full teal color, not white/70)

**Step 6: Choreographed entrance**

Replace `staggerContainer` with `heroStagger` variant. Give each element custom transition delays:
- Eyebrow: default (0ms offset)
- H1: uses `blurIn` variant
- Subtitle: uses `fadeUp` with 0.4s delay
- Buttons: uses `scaleIn` with 0.6s delay
- Background glows: `slowFadeIn` animating independently

**Step 7: CTA buttons**

Primary button with `accentColor="#0FA3B1"`, secondary with teal border.

**Step 8: Add grain overlay**

Add `grain` class and `relative` to the section.

**Step 9: Verify — hero renders centered, glows visible, parallax works on mouse move**

**Step 10: Commit**

```
feat: redesign HeroSection — centered layout, teal glows, parallax, gradient text
```

---

## Task 10: Section — ClientLogoBar.tsx Polish

**Files:**
- Modify: `src/components/sections/ClientLogoBar.tsx`

**Step 1: Add gradient fade edges**

Wrap the overflow container in a div with:
```css
mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
```

**Step 2: Increase logo visibility**

Change logo text opacity from `text-white/20` to `text-white/40`. Add `hover:text-white/70 transition-opacity` to each logo.

**Step 3: Pause on hover**

Add `hover:[animation-play-state:paused]` to the `.animate-marquee` container, or use a state-based approach with `onMouseEnter`/`onMouseLeave`.

**Step 4: Add teal accent**

Add a subtle `border-b-2 border-labs/20` to the section for visual anchoring.

**Step 5: Verify — marquee fades at edges, pauses on hover**

**Step 6: Commit**

```
feat: polish ClientLogoBar with fade edges, hover pause, teal accent
```

---

## Task 11: Section — PainPointSection.tsx Upgrade

**Files:**
- Modify: `src/components/sections/PainPointSection.tsx`

**Step 1: Replace fadeUp with slideInLeft**

Import `slideInLeft` and use it instead of `fadeUp` for cards.

**Step 2: Add teal accent to cards**

Change card styling from plain white boxes to:
```
bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border-l-4 border-labs
```
Add a subtle glow: `shadow-[inset_0_0_30px_rgba(15,163,177,0.03)]`

**Step 3: Solution text highlight**

The solution `<p>` at the bottom should have a `text-labs` color or wrap the key phrase in a `<span className="text-labs font-bold">`.

**Step 4: Verify**

**Step 5: Commit**

```
feat: upgrade PainPointSection with slide animations, teal accents
```

---

## Task 12: Section — StatsBar.tsx with Colored Numbers

**Files:**
- Modify: `src/components/sections/StatsBar.tsx`

**Step 1: Assign accent colors per stat**

Define the 4 service colors:
```typescript
const statColors = ["#0FA3B1", "#D7263D", "#A855F7", "#E8A317"];
```

**Step 2: Pass accentColor to AnimatedCounter**

```tsx
<AnimatedCounter target={stat.value} suffix={stat.suffix} accentColor={statColors[i]} />
```

**Step 3: Add background color spots**

Add 4 absolutely-positioned radial gradient divs behind the stats, each in their service color at 8-12% opacity, positioned roughly behind each stat column.

**Step 4: Add grain class**

Add `grain relative` to the section.

**Step 5: Verify — 4 stats each in a different color with ring charts**

**Step 6: Commit**

```
feat: colorful StatsBar with per-service colors and ring charts
```

---

## Task 13: Section — PillarGrid.tsx Bento Redesign

**Files:**
- Modify: `src/components/sections/PillarGrid.tsx`

**Step 1: Change to dark background**

Section: `bg-navy section-padding` (instead of `bg-off-white`).
SectionHeading: `light={true}` (instead of false).

**Step 2: Bento grid layout**

```tsx
className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12"
```

Labs card (index 0): `md:col-span-2 md:row-span-2`
Other cards: standard 1x1.

**Step 3: Dark glassmorphism cards**

Replace `<Card>` with custom card styling per pillar:

```tsx
<div
  className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-2 h-full group"
  style={{
    backgroundColor: `${pillar.color}08`,
    borderColor: `${pillar.color}20`,
    boxShadow: `0 0 60px ${pillar.color}15`,
  }}
>
  {/* Accent gradient overlay in corner */}
  <div
    className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
    style={{ background: `radial-gradient(circle, ${pillar.color}, transparent)` }}
  />
  {/* Content */}
  ...
</div>
```

**Step 4: Labs featured card gets abstract SVG background**

For index 0 (Labs), add an SVG with grid-dot pattern or data-flow lines in teal at 8% opacity, positioned absolutely.

**Step 5: Update text colors for dark bg**

Titles: `text-white` (not `text-navy`). Descriptions: `text-white/60`. Link text: accent color at full strength.

**Step 6: Verify — bento grid, Labs card is large, dark glassmorphism, colored glows**

**Step 7: Commit**

```
feat: redesign PillarGrid as dark bento grid with glassmorphism cards
```

---

## Task 14: Section — MirrorExposureSection.tsx Upgrade

**Files:**
- Modify: `src/components/sections/MirrorExposureSection.tsx`

**Step 1: Add red background glow**

Add a positioned div behind content:
```tsx
<div
  className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
  style={{
    background: "radial-gradient(circle, rgba(215,38,61,0.15) 0%, transparent 60%)",
  }}
/>
```

**Step 2: Upgrade concentric circles SVG**

Change strokes to gradient-like effect using decreasing opacity:
- Outermost ring: `opacity: 0.08`
- Innermost ring: `opacity: 0.5`
- Add `strokeWidth` variation (thinner outer, thicker inner)

**Step 3: Connect step badges with curved SVG path**

On the concentric circles SVG, draw thin curved lines connecting the step number badges (instead of straight cardinal positions). Use SVG `<path>` with arc commands.

**Step 4: Add grain overlay**

Add `grain relative` to the section.

**Step 5: Verify**

**Step 6: Commit**

```
feat: upgrade MirrorExposureSection with red glow and improved circle visuals
```

---

## Task 15: Section — TestimonialSection.tsx Redesign

**Files:**
- Modify: `src/components/sections/TestimonialSection.tsx`

**Step 1: Replace decorative quote mark with accent bar**

Remove the `<span>&ldquo;</span>` element. Add a 4px left border on the blockquote in Labs teal.

Change layout from centered to left-aligned quote:
```tsx
<blockquote className="border-l-4 border-labs pl-8">
```

**Step 2: Apply serif font to quote**

```tsx
<p className="text-2xl md:text-3xl font-serif text-navy italic leading-relaxed">
```

**Step 3: Add subtle background radial glow**

On the section, add a positioned div:
```tsx
<div
  className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
  style={{ background: "radial-gradient(circle, rgba(15,163,177,0.06) 0%, transparent 60%)" }}
/>
```

**Step 4: Verify — serif font renders, accent bar visible, glow subtle**

**Step 5: Commit**

```
feat: redesign TestimonialSection with serif font, accent bar, radial glow
```

---

## Task 16: Section — CTABanner.tsx Upgrade

**Files:**
- Modify: `src/components/sections/CTABanner.tsx`

**Step 1: Gradient background**

Replace flat `bg-navy` with:
```tsx
className="relative section-padding overflow-hidden"
style={{
  background: "linear-gradient(135deg, #02182B 0%, #0a2540 50%, #02182B 100%)",
}}
```

**Step 2: Bold teal glow center**

Add a centered radial gradient overlay:
```tsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: "radial-gradient(ellipse at 50% 50%, rgba(15,163,177,0.25) 0%, transparent 60%)",
  }}
/>
```

**Step 3: Large CTA button with breathing glow**

Button: `className="text-lg"` + `accentColor="#0FA3B1"`
Wrap button in a div with `animate-breathing-glow` class and `rounded-full inline-block`.

**Step 4: Upgrade decorative SVG**

Increase opacity from 0.08 to 0.15-0.20. Make circles larger and add teal stroke color.

**Step 5: Add grain**

Add `grain` class to section.

**Step 6: Verify**

**Step 7: Commit**

```
feat: upgrade CTABanner with gradient bg, teal glow, breathing button
```

---

## Task 17: Section — Footer.tsx Upgrade

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Add multi-color accent stripe**

Before the main footer content, add:
```tsx
<div className="h-[3px]" style={{
  background: "linear-gradient(90deg, #0FA3B1, #D7263D, #A855F7, #E8A317)",
}} />
```

**Step 2: Color service links**

Each service link gets its color:
```tsx
const serviceLinks = [
  { key: "labs", href: "/labs", color: "#0FA3B1" },
  { key: "circle", href: "/circle", color: "#D7263D" },
  { key: "studio", href: "/studio", color: "#A855F7" },
  { key: "academy", href: "/academy", color: "#E8A317" },
];
```

Apply `style={{ color: service.color }}` with hover brightening.

**Step 3: Subtle background glow**

Add a positioned radial gradient in the footer background:
```tsx
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
  style={{ background: "radial-gradient(ellipse, rgba(15,163,177,0.06) 0%, transparent 60%)" }} />
```

**Step 4: Verify**

**Step 5: Commit**

```
feat: upgrade Footer with color stripe, colored service links, subtle glow
```

---

## Task 18: Interaction — CustomCursor Component

**Files:**
- Create: `src/components/ui/CustomCursor.tsx`
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Create CustomCursor.tsx**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    function onMouseMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseOver(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      setIsHovering(!!isInteractive);
    }

    function animate() {
      // Lerp toward target
      position.current.x += (target.current.x - position.current.x) * 0.15;
      position.current.y += (target.current.y - position.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference transition-[width,height] duration-200"
      style={{
        width: isHovering ? 40 : 8,
        height: isHovering ? 40 : 8,
        marginLeft: isHovering ? -20 : -4,
        marginTop: isHovering ? -20 : -4,
        borderRadius: "50%",
        backgroundColor: "#0FA3B1",
        opacity: 0.8,
      }}
    />
  );
}
```

**Step 2: Add to locale layout**

Import and place `<CustomCursor />` inside the body, before or after main content.

**Step 3: Hide default cursor**

In globals.css:
```css
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}
```

**Step 4: Verify — teal dot follows mouse, grows on links/buttons, hidden on touch**

**Step 5: Commit**

```
feat: add CustomCursor with lerp smoothing, hover scaling, touch detection
```

---

## Task 19: Interaction — Page Transitions

**Files:**
- Create: `src/components/layout/PageTransition.tsx`
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Create PageTransition.tsx**

```tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Step 2: Wrap main content in layout**

In `src/app/[locale]/layout.tsx`:
```tsx
import { PageTransition } from "@/components/layout/PageTransition";
// ...
<main>
  <PageTransition>{children}</PageTransition>
</main>
```

**Step 3: Verify — navigate between pages, see fade/slide transition**

**Step 4: Commit**

```
feat: add page transitions with opacity and Y-axis animation
```

---

## Task 20: Interaction — Navbar Dropdown Animation

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Step 1: Import AnimatePresence and motion**

Already imported in MobileNav, but need to add to Navbar:
```tsx
import { AnimatePresence, motion } from "motion/react";
```

**Step 2: Add close delay**

Replace `onMouseLeave={() => setIsServicesOpen(false)}` with a debounced version using `setTimeout`:

```typescript
const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

function handleMouseEnter() {
  if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  setIsServicesOpen(true);
}

function handleMouseLeave() {
  closeTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
}
```

Apply to the dropdown wrapper div.

**Step 3: Animate dropdown**

Replace the conditional `{isServicesOpen && <div>...</div>}` with:

```tsx
<AnimatePresence>
  {isServicesOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
    >
      ...existing dropdown content...
    </motion.div>
  )}
</AnimatePresence>
```

**Step 4: Add color indicators**

Each service link in the dropdown gets a larger colored dot that scales on hover:
```tsx
<span className={`mt-1.5 w-2.5 h-2.5 rounded-full ${service.colorDot} flex-shrink-0 transition-transform group-hover:scale-150`} />
```

**Step 5: Verify — dropdown animates in/out, close has delay, dots scale on hover**

**Step 6: Commit**

```
feat: animate Navbar dropdown with close delay and scaled color indicators
```

---

## Task 21: Interaction — Scroll Atmosphere Component

**Files:**
- Create: `src/components/ui/ScrollAtmosphere.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Create ScrollAtmosphere.tsx**

A component that renders fixed-position gradient blobs that shift with scroll:

```tsx
"use client";

import { useEffect, useState } from "react";

export function ScrollAtmosphere() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Labs teal blob */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #0FA3B1, transparent 70%)",
          right: "-200px",
          top: `${-100 + scrollY * -0.05}px`,
        }}
      />
      {/* Circle red blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #D7263D, transparent 70%)",
          left: "-150px",
          top: `${400 + scrollY * -0.08}px`,
        }}
      />
      {/* Studio purple blob */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #A855F7, transparent 70%)",
          right: "-100px",
          top: `${1200 + scrollY * -0.06}px`,
        }}
      />
      {/* Academy gold blob */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #E8A317, transparent 70%)",
          left: "-100px",
          top: `${2000 + scrollY * -0.04}px`,
        }}
      />
    </div>
  );
}
```

**Step 2: Add to homepage**

In `src/app/[locale]/page.tsx`, add `<ScrollAtmosphere />` as the first child.

**Step 3: Verify — colored blobs visible in background, shift subtly on scroll**

**Step 4: Commit**

```
feat: add ScrollAtmosphere with parallax gradient blobs per service color
```

---

## Task 22: Service Page — Labs Differentiation (Flagship)

**Files:**
- Modify: `src/app/[locale]/labs/page.tsx`
- Modify: `src/components/sections/ServiceHero.tsx`

**Step 1: Enhance ServiceHero with `featured` prop**

Add a boolean `featured` prop. When true:
- Increase min-height to `min-h-[80vh]`
- Gradient overlay at 25% (up from 15%)
- Add a grid-dot SVG pattern in the background
- Add an abstract "data flow" SVG: horizontal lines with dots flowing left→right, animated with `marquee`-like CSS

```tsx
{featured && (
  <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
    {/* Grid dot pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
      <pattern id="grid-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill={accentColor} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dots)" />
    </svg>
  </div>
)}
```

**Step 2: Pass featured={true} from Labs page**

```tsx
<ServiceHero namespace="labs" accentColor={ACCENT} featured />
```

**Step 3: Add grain to ServiceHero**

Add `grain` class when featured.

**Step 4: Make eyebrow monospace on Labs**

When `featured`, apply `font-mono tracking-widest` to the eyebrow.

**Step 5: Verify — Labs hero is taller, has grid dots, data flow visual, monospace eyebrow**

**Step 6: Commit**

```
feat: differentiate Labs as flagship with grid dots, enhanced hero, monospace eyebrow
```

---

## Task 23: Service Page — Circle Differentiation

**Files:**
- Modify: `src/app/[locale]/circle/page.tsx`
- Modify: `src/components/sections/ServiceHero.tsx`

**Step 1: Add `networkNodes` prop to ServiceHero**

When true, renders an SVG with connected nodes (circles) and pulsing lines between them, in the service accent color. Positioned absolute in the hero.

The SVG: 5-6 circles at varied positions, connected by lines with `stroke-dasharray` animation creating a "traveling dot" effect.

**Step 2: Pass from Circle page**

```tsx
<ServiceHero namespace="circle" accentColor={ACCENT} networkNodes />
```

**Step 3: Verify**

**Step 4: Commit**

```
feat: differentiate Circle page with network node diagram in hero
```

---

## Task 24: Service Page — Studio Differentiation

**Files:**
- Modify: `src/app/[locale]/studio/page.tsx`
- Modify: `src/components/sections/ServiceHero.tsx`

**Step 1: Add `gradientMesh` prop to ServiceHero**

When true, renders overlapping transparent color planes:
- 3-4 large rectangles/ellipses with rounded corners, rotated at different angles
- Each in the accent color at varying opacities (5%, 10%, 15%)
- Slight CSS animation: slow rotation or drift

**Step 2: Pass from Studio page**

```tsx
<ServiceHero namespace="studio" accentColor={ACCENT} gradientMesh />
```

**Step 3: Verify**

**Step 4: Commit**

```
feat: differentiate Studio page with gradient mesh organic shapes in hero
```

---

## Task 25: Service Page — Academy Differentiation

**Files:**
- Modify: `src/app/[locale]/academy/page.tsx`
- Modify: `src/components/sections/ServiceHero.tsx`

**Step 1: Add `layeredBlocks` prop to ServiceHero**

When true, renders a stack of horizontal bars/blocks that suggest pages of a book or layers of knowledge:
- 5-6 horizontal rectangles, stacked vertically with slight horizontal offsets
- Each in the accent color at increasing opacity (bottom = lightest, top = strongest)
- Subtle animation: blocks slide in from alternating sides

**Step 2: Pass from Academy page**

```tsx
<ServiceHero namespace="academy" accentColor={ACCENT} layeredBlocks />
```

**Step 3: Verify**

**Step 4: Commit**

```
feat: differentiate Academy page with layered knowledge blocks in hero
```

---

## Task 26: Final Polish & Verify All Pages

**Files:**
- All modified files

**Step 1: Run full build**

```bash
cd influence-circle && npm run build
```

Fix any TypeScript or build errors.

**Step 2: Visual verification of all pages**

Run dev server and check:
- Homepage: hero centered with teal glow, gradient text, parallax
- Homepage: PillarGrid bento layout, dark glassmorphism, Labs large
- Homepage: StatsBar colored numbers with ring charts
- Homepage: TestimonialSection with serif font
- Homepage: CTABanner with breathing glow button
- Homepage: Footer with color stripe and colored links
- Labs page: flagship hero with grid dots, monospace eyebrow
- Circle page: network nodes visual
- Studio page: gradient mesh shapes
- Academy page: layered blocks
- Custom cursor working on desktop
- Page transitions smooth
- Navbar dropdown animated
- Scroll atmosphere visible

**Step 3: Fix any visual issues**

**Step 4: Final commit**

```
chore: final polish and build verification
```
