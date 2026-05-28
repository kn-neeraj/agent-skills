# Slide Themes

3 design themes with complete typography scales and color systems.

---

## Theme 1: Modern

**Philosophy:** Clean, minimal, lots of breathing room. Sans-serif throughout. Inspired by tech companies and startup decks.

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

### Typography
```css
--font-heading: 'Inter', -apple-system, sans-serif
--font-body: 'Inter', -apple-system, sans-serif

/* Scale */
--text-xs: 14px
--text-sm: 16px
--text-base: 20px
--text-lg: 24px
--text-xl: 32px
--text-2xl: 48px
--text-3xl: 64px
```

### Layout
- 16:9 aspect ratio
- 80px padding on all sides
- 32px gap between elements
- Flexbox for alignment
- Max 2 columns per slide

**Best for:** Tech products, SaaS demos, startup pitches

---

## Theme 2: Classic

**Philosophy:** Traditional, trustworthy, professional. Serif headings with sans-serif body. Inspired by consulting decks and academic presentations.

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

### Typography
```css
--font-heading: 'Merriweather', Georgia, serif
--font-body: 'Open Sans', -apple-system, sans-serif

/* Scale */
--text-xs: 14px
--text-sm: 16px
--text-base: 18px
--text-lg: 22px
--text-xl: 28px
--text-2xl: 42px
--text-3xl: 56px
```

### Layout
- 4:3 aspect ratio option
- 60px padding on all sides
- 24px gap between elements
- Grid layouts for structured content
- Numbered slides in footer

**Best for:** Business presentations, quarterly reviews, formal reports

---

## Theme 3: Bold

**Philosophy:** High contrast, large type, striking. Make a statement. Inspired by conference talks and brand launches.

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

### Typography
```css
--font-heading: 'Archivo Black', 'Impact', sans-serif
--font-body: 'Inter', -apple-system, sans-serif

/* Scale (larger than other themes) */
--text-xs: 16px
--text-sm: 18px
--text-base: 24px
--text-lg: 32px
--text-xl: 48px
--text-2xl: 72px
--text-3xl: 96px
```

### Layout
- 16:9 aspect ratio
- 100px padding on all sides
- 40px gap between elements
- Full-bleed images and backgrounds
- Hero sections with dark backgrounds

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
