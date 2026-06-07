# PPT Styles - Locked Design Systems
**Purpose:** Define complete, locked design systems that agents can select for presentations

Each PPT Style locks in all visual decisions: colors, fonts, spacing, sizing. Once selected, the style cannot be overridden.

---

## 🎨 PPT Style 1: Modern

**Best For:** Tech products, SaaS demos, startup pitches, forward-thinking audiences

**Philosophy:** Clean, minimal, lots of breathing room. Contemporary, tech-forward aesthetic inspired by modern SaaS products.

### Locked Design System

#### Typography (Golden Ratio, Base 18px)
```
H1 (Slide Title):    47px  | font-weight: 700 | letter-spacing: -0.5px
H2 (Section Title):  29px  | font-weight: 600 | letter-spacing: -0.25px
H3 (Column Title):   18px  | font-weight: 600 | letter-spacing: 0
Body Text:           18px  | font-weight: 400 | line-height: 1.6
Description/Footer:  14px  | font-weight: 400 | color: text-light
```

**Font Families:**
- Headings: Arial, sans-serif (system font)
- Body: Helvetica, Arial, sans-serif (system fonts)

#### Color Palette (LOCKED - No Changes)
```css
--primary: #2563eb        /* Blue - headings, CTAs, emphasis */
--secondary: #64748b      /* Gray - body text, secondary headings */
--accent: #0ea5e9         /* Light blue - highlights, hover states */
--background: #ffffff     /* White - main slide background */
--surface: #f8fafc        /* Off-white - cards, sections, footer */
--text: #1e293b           /* Dark gray - primary text */
--text-light: #64748b     /* Medium gray - secondary text, descriptions */
--border: rgba(0,0,0,0.1) /* Subtle borders */
```

#### Spacing System (8px Base - LOCKED)
```
--space-1: 4px     (0.5 units)
--space-2: 8px     (1 unit)
--space-3: 16px    (2 units)
--space-4: 24px    (3 units)
--space-5: 32px    (4 units)
--space-6: 48px    (6 units)
--space-7: 64px    (8 units)
--space-8: 96px    (12 units)

Slide Padding:       80px (10 units)
Between Elements:    24px (3 units)
Column Gap:          48px (6 units)
Content Max-Width:   85%
```

#### Corner Radius (LOCKED)
```
Buttons & Cards:     6px
Inputs & Fields:     6px
Images:              6px
```

#### Shadow Hierarchy (LOCKED)
```
Subtle:   0 1px 3px rgba(0,0,0,0.1)
          └─ Light cards, subtle elevation

Medium:   0 4px 8px rgba(0,0,0,0.12)
          └─ Floating content, buttons on hover

Deep:     0 12px 24px rgba(0,0,0,0.15)
          └─ Hero sections, overlays
```

#### Text Alignment (LOCKED)
```
Default: CENTER
         └─ All headings, text, content center-aligned
            for visual consistency and balance

Override: Only on explicit request
```

---

## 🎨 PPT Style 2: Classic

**Best For:** Business presentations, quarterly reviews, formal reports, consulting decks, academic presentations

**Philosophy:** Traditional, trustworthy, professional. High-contrast serif headings with clean body text, inspired by consulting decks and business documents.

### Locked Design System

#### Typography (Golden Ratio, Base 18px)
```
H1 (Slide Title):    42px  | font-weight: 700 | letter-spacing: -0.5px
H2 (Section Title):  28px  | font-weight: 600 | letter-spacing: -0.25px
H3 (Column Title):   18px  | font-weight: 600 | letter-spacing: 0
Body Text:           18px  | font-weight: 400 | line-height: 1.7
Description/Footer:  14px  | font-weight: 400 | color: text-light
```

**Font Families:**
- Headings: Georgia, serif (system font)
- Body: Verdana, Arial, sans-serif (system fonts)

#### Color Palette (LOCKED - No Changes)
```css
--primary: #1e40af        /* Navy - headings, emphasis */
--secondary: #475569      /* Gray - body text, secondary headings */
--accent: #d97706         /* Orange - highlights, accents, CTAs */
--background: #ffffff     /* White - main slide background */
--surface: #f1f5f9        /* Light gray - cards, sections */
--text: #0f172a           /* Near black - primary text */
--text-light: #64748b     /* Medium gray - secondary text */
--border: rgba(0,0,0,0.08)/* Subtle borders */
```

#### Spacing System (8px Base - LOCKED)
```
--space-1: 4px     (0.5 units)
--space-2: 8px     (1 unit)
--space-3: 16px    (2 units)
--space-4: 24px    (3 units)
--space-5: 32px    (4 units)
--space-6: 48px    (6 units)
--space-7: 64px    (8 units)
--space-8: 96px    (12 units)

Slide Padding:       60px (7.5 units)
Between Elements:    20px (2.5 units)
Column Gap:          40px (5 units)
Content Max-Width:   90%
```

#### Corner Radius (LOCKED)
```
Buttons & Cards:     4px
Inputs & Fields:     4px
Images:              4px
```

#### Shadow Hierarchy (LOCKED)
```
Subtle:   0 1px 2px rgba(0,0,0,0.08)
          └─ Light cards, subtle elevation

Medium:   0 2px 4px rgba(0,0,0,0.1)
          └─ Floating content, buttons on hover

Deep:     0 8px 16px rgba(0,0,0,0.12)
          └─ Hero sections, overlays
```

#### Text Alignment (LOCKED)
```
Default: CENTER
         └─ All headings, text, content center-aligned

Override: Only on explicit request
```

---

## 🎨 PPT Style 3: Bold

**Best For:** Vision pitches, product launches, conference talks, attention-grabbing presentations, announcements

**Philosophy:** High contrast, large type, striking. Make a visual statement. Inspired by conference talks and product launch presentations with bold, modern aesthetics.

### Locked Design System

#### Typography (Golden Ratio, Base 20px)
```
H1 (Slide Title):    53px  | font-weight: 700 | letter-spacing: -1px
H2 (Section Title):  32px  | font-weight: 700 | letter-spacing: -0.5px
H3 (Column Title):   20px  | font-weight: 600 | letter-spacing: 0
Body Text:           20px  | font-weight: 500 | line-height: 1.6
Description/Footer:  16px  | font-weight: 400 | color: text-light
```

**Font Families:**
- Headings: Arial, Impact, sans-serif (system fonts)
- Body: Helvetica, Arial, sans-serif (system fonts)

#### Color Palette (LOCKED - No Changes)
```css
--primary: #dc2626        /* Red - headings, accents, emphasis */
--secondary: #171717      /* Near black - body text */
--accent: #f59e0b         /* Amber - highlights, CTAs */
--background: #fafafa     /* Off-white - main slide background */
--surface: #262626        /* Dark - hero sections, dark panels */
--text: #171717           /* Near black - primary text */
--text-light: #737373     /* Medium gray - secondary text */
--text-inverse: #fafafa   /* White - text on dark backgrounds */
--border: rgba(0,0,0,0.2) /* More visible borders */
```

#### Spacing System (8px Base - LOCKED)
```
--space-1: 4px     (0.5 units)
--space-2: 8px     (1 unit)
--space-3: 16px    (2 units)
--space-4: 24px    (3 units)
--space-5: 32px    (4 units)
--space-6: 48px    (6 units)
--space-7: 64px    (8 units)
--space-8: 96px    (12 units)

Slide Padding:       100px (12.5 units)
Between Elements:    32px (4 units)
Column Gap:          56px (7 units)
Content Max-Width:   80%
```

#### Corner Radius (LOCKED)
```
Buttons & Cards:     8px
Inputs & Fields:     8px
Images:              8px
```

#### Shadow Hierarchy (LOCKED)
```
Subtle:   0 2px 4px rgba(0,0,0,0.1)
          └─ Light cards, subtle elevation

Medium:   0 8px 16px rgba(0,0,0,0.15)
          └─ Floating content, buttons on hover

Deep:     0 16px 32px rgba(0,0,0,0.2)
          └─ Hero sections, overlays, high impact
```

#### Text Alignment (LOCKED)
```
Default: CENTER
         └─ All headings, text, content center-aligned

Override: Only on explicit request
```

---

## 🔒 What's Locked in Each Style

### Modern Style Locks
- ✅ Blue primary color (#2563eb) - CANNOT CHANGE
- ✅ 8px spacing scale - CANNOT CHANGE
- ✅ 6px corner radius - CANNOT CHANGE
- ✅ Golden ratio typography (18px base) - CANNOT CHANGE
- ✅ Center text alignment - CANNOT CHANGE
- ✅ System fonts only - CANNOT CHANGE
- ✅ Color palette (7 colors) - CANNOT CHANGE
- ✅ Shadow hierarchy (3 levels) - CANNOT CHANGE

### Classic Style Locks
- ✅ Navy primary color (#1e40af) - CANNOT CHANGE
- ✅ 8px spacing scale - CANNOT CHANGE
- ✅ 4px corner radius - CANNOT CHANGE
- ✅ Golden ratio typography (18px base) - CANNOT CHANGE
- ✅ Center text alignment - CANNOT CHANGE
- ✅ System fonts only - CANNOT CHANGE
- ✅ Color palette (7 colors) - CANNOT CHANGE
- ✅ Shadow hierarchy (3 levels) - CANNOT CHANGE

### Bold Style Locks
- ✅ Red primary color (#dc2626) - CANNOT CHANGE
- ✅ 8px spacing scale - CANNOT CHANGE
- ✅ 8px corner radius - CANNOT CHANGE
- ✅ Golden ratio typography (20px base) - CANNOT CHANGE
- ✅ Center text alignment - CANNOT CHANGE
- ✅ System fonts only - CANNOT CHANGE
- ✅ Color palette (8 colors) - CANNOT CHANGE
- ✅ Shadow hierarchy (3 levels) - CANNOT CHANGE

---

## 🎯 How Agents Use This Document

**When creating slides:**

1. **Read this document** → Select one style (Modern, Classic, or Bold)
2. **Lock in all design decisions** → All colors, fonts, spacing are now fixed
3. **Generate HTML** → Use the locked values from selected style
4. **Never override** → No custom colors, fonts, or spacing allowed

**Example:**

```
Agent: "I'm creating slides about product launch"
Agent: "This needs impact, so I'll use PPT Style 3: Bold"
Agent: "Now all colors, fonts, and spacing are locked from Bold style"
Agent: "I'll generate HTML using #dc2626 red, 53px titles, 100px padding"
Agent: "The design is now guaranteed consistent and striking"
```

---

## 📋 Comparison Table

| Aspect | Modern | Classic | Bold |
|--------|--------|---------|------|
| **Use Case** | Tech, SaaS, startup | Business, formal | Vision, launch, impact |
| **Primary Color** | Blue (#2563eb) | Navy (#1e40af) | Red (#dc2626) |
| **H1 Size** | 47px | 42px | 53px |
| **Base Font Size** | 18px | 18px | 20px |
| **Corner Radius** | 6px | 4px | 8px |
| **Slide Padding** | 80px | 60px | 100px |
| **Vibe** | Clean, minimal | Professional, trustworthy | Bold, striking |

---

## 🚀 Key Principle

**Once a style is selected, all design decisions are LOCKED.**

Agents cannot:
- Change colors
- Change fonts
- Change spacing
- Change typography sizes
- Change corner radius
- Change text alignment
- Add custom styles

This ensures presentations are:
- ✅ Visually consistent
- ✅ Professional
- ✅ Predictable
- ✅ High quality
