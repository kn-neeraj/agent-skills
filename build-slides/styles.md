# Slide Themes & Quality Systems

3 design themes with golden ratio typography, visual consistency systems, and interactive features.

## Quality Systems Foundation

### Typography Formula: Golden Ratio (1.618)

All font sizes derive from golden ratio (1.618) applied to a base size. This creates mathematically harmonious hierarchy.

**Formula:** Each step multiplies by 1.618 (φ)

**Modern Theme Base:** 18px
- H1: 18 × 1.618² = 47px
- H2: 18 × 1.618¹ = 29px
- H3: 18 × (1.618 / 1.618) = 18px
- Body: 18px (base)
- Caption: 18 / 1.618 = 11px

**Classic Theme Base:** 18px (same formula, different fonts)

**Bold Theme Base:** 20px (scaled for impact)
- H1: 20 × 1.618² = 53px
- H2: 20 × 1.618¹ = 32px
- Body: 20px

### Spacing Scale System

**Base Unit:** 8px

**Scale:** 4, 8, 16, 24, 32, 48, 64, 96px (each is base × multiplier)

All padding, margin, gap values use this scale. No arbitrary pixel values.

**CSS Variables:**
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 96px;
```

### Shadow Hierarchy

**Subtle:** `0 1px 3px rgba(0,0,0,0.1)` — Light cards, subtle elevation
**Medium:** `0 4px 8px rgba(0,0,0,0.12)` — Floating content, buttons on hover
**Deep:** `0 12px 24px rgba(0,0,0,0.15)` — Hero sections, overlays

### Corner Radius

**Modern:** 6px
**Classic:** 4px
**Bold:** 8px

Apply uniformly across buttons, cards, images, and rounded elements.

### Google Fonts Loading

Each theme loads via CDN with fallback stacks:

**Modern:** Bricolage Grotesque (heading) + Inter (body)
**Classic:** Playfair Display (heading) + Montserrat (body)
**Bold:** Space Grotesk (heading) + Inter (body)

---

## Theme 1: Modern

**Philosophy:** Clean, minimal, lots of breathing room. Contemporary, tech-forward. Inspired by modern SaaS products.

**Fonts:** Bricolage Grotesque (heading) + Inter (body)

### Colors
```css
--primary: #2563eb      /* Blue - headings, accents */
--secondary: #64748b    /* Gray - body text */
--accent: #0ea5e9       /* Light blue - highlights */
--background: #ffffff   /* White */
--surface: #f8fafc      /* Off-white - cards, sections */
--text: #1e293b         /* Dark gray - primary text */
--text-light: #64748b   /* Medium gray - secondary text */
```

### Typography (Golden Ratio 1.618, base 18px)
```css
--font-heading: 'Bricolage Grotesque', -apple-system, sans-serif
--font-body: 'Inter', -apple-system, sans-serif

/* Scale derived from golden ratio */
--text-xs: 11px
--text-sm: 16px
--text-base: 18px
--text-lg: 29px
--text-xl: 32px
--text-2xl: 47px
--text-3xl: 76px
```

### Layout (Spacing Scale)
- 16:9 aspect ratio
- 80px padding (10 units of 8px)
- 16px gap between elements (2 units)
- Corner radius: 6px
- Flexbox for alignment
- Shadow system: subtle on cards, medium on hover

**Best for:** Tech products, SaaS demos, startup pitches

---

## Theme 2: Classic

**Philosophy:** Traditional, trustworthy, professional. High-contrast serif headings with clean body text. Inspired by consulting decks.

**Fonts:** Playfair Display (heading) + Montserrat (body)

### Colors
```css
--primary: #1e40af      /* Navy - headings */
--secondary: #475569    /* Gray - body text */
--accent: #d97706       /* Orange - highlights */
--background: #ffffff   /* White */
--surface: #f1f5f9      /* Light gray - cards */
--text: #0f172a         /* Near black - primary text */
--text-light: #64748b   /* Medium gray - secondary text */
```

### Typography (Golden Ratio 1.618, base 18px)
```css
--font-heading: 'Playfair Display', Georgia, serif
--font-body: 'Montserrat', -apple-system, sans-serif

/* Scale derived from golden ratio */
--text-xs: 11px
--text-sm: 16px
--text-base: 18px
--text-lg: 29px
--text-xl: 28px
--text-2xl: 42px
--text-3xl: 68px
```

### Layout (Spacing Scale)
- 4:3 aspect ratio option
- 60px padding (7.5 units of 8px)
- 16px gap between elements (2 units)
- Corner radius: 4px
- Grid layouts for structured content
- Shadow system: subtle on cards, medium on hover

**Best for:** Business presentations, quarterly reviews, formal reports

---

## Theme 3: Bold

**Philosophy:** High contrast, large type, striking. Make a visual statement. Inspired by conference talks and product launches.

**Fonts:** Space Grotesk (heading) + Inter (body)

### Colors
```css
--primary: #dc2626      /* Red - headings, accents */
--secondary: #171717    /* Near black - body text */
--accent: #f59e0b       /* Amber - highlights */
--background: #fafafa   /* Off-white */
--surface: #262626      /* Dark - hero sections */
--text: #171717         /* Near black */
--text-light: #737373   /* Medium gray */
--text-inverse: #fafafa /* White on dark */
```

### Typography (Golden Ratio 1.618, base 20px)
```css
--font-heading: 'Space Grotesk', 'Impact', sans-serif
--font-body: 'Inter', -apple-system, sans-serif

/* Scale derived from golden ratio */
--text-xs: 12px
--text-sm: 20px
--text-base: 20px
--text-lg: 32px
--text-xl: 48px
--text-2xl: 53px
--text-3xl: 86px
```

### Layout (Spacing Scale)
- 16:9 aspect ratio
- 100px padding (12.5 units of 8px)
- 24px gap between elements (3 units)
- Corner radius: 8px
- Full-bleed images and backgrounds
- Shadow system: medium on cards, deep on hero sections

**Best for:** Vision pitches, product launches, conference talks

---

## Typography Scale Usage

| Element | Modern | Classic | Bold |
|---------|--------|---------|------|
| Slide title | 2xl | 2xl | 2xl or 3xl |
| Section heading | xl | xl | xl |
| Subheading | lg | lg | lg |
| Body text | base | base | base or lg |
| Caption | sm | sm | sm |
| Fine print | xs | xs | xs |

---

## Applying Themes

### CSS Structure

Each theme should be applied via CSS custom properties:

```css
:root {
  /* Colors */
  --primary: ...;
  --secondary: ...;

  /* Typography */
  --font-heading: ...;
  --font-body: ...;

  /* Scale */
  --text-base: ...;
  --text-xl: ...;
}

.slide {
  background: var(--background);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--text-base);
}

h1 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  color: var(--primary);
}
```

### Responsive Behavior

All themes should scale down on smaller screens:

```css
@media (max-width: 768px) {
  :root {
    --text-base: 16px;
    --text-xl: 24px;
    --text-2xl: 36px;
  }

  .slide {
    padding: 40px;
  }
}
```

---

## Theme Selection Guide

| Presentation type | Recommended theme |
|------------------|------------------|
| Tech product demo | Modern |
| Startup pitch | Modern or Bold |
| Sales deck | Modern |
| Tutorial/workshop | Modern or Classic |
| Business report | Classic |
| Academic presentation | Classic |
| Vision/mission pitch | Bold |
| Product launch | Bold |
| Conference talk | Bold |
| Team retro | Modern |
| Research findings | Classic |
