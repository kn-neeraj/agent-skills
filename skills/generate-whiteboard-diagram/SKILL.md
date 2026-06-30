---
name: generate-whiteboard-diagram
description: Generates clean, monochrome "whiteboard" diagrams — black ink on a white background, made only of boxes, shapes, arrows, and text, with no color. Use this whenever the user wants to visually explain or understand a concept and asks for a "whiteboard diagram," "simple diagram," "no-color diagram," "black and white diagram," "draw this out," "sketch this for me," or similar. Also use it proactively whenever a technical, product, or business concept would benefit from a clean, no-frills visual explainer (e.g. "explain how X works," "what's the bottleneck in Y," "break down the architecture of Z," comparing two options, explaining a tradeoff or a process). This works for any concept, not a fixed template — pick whatever shapes and layout best explain the specific thing being asked about.
---

# Whiteboard diagram

The test for whether this worked: could someone redraw it on an actual whiteboard with one marker? No color to lean on means the structure, the arrows, and the words have to do all the work on their own.

This produces a single SVG, inline in chat via the Visualizer: a white paper background, black ink shapes and text, nothing else. The diagram itself should fit whatever the concept actually is — there's no fixed template. A process gets a flowchart. A system gets boxes-in-boxes. A pure mental model might just be two labeled shapes and an arrow. Read the concept first, then decide what to draw.

## Before you draw

Call `visualize:read_me` with `modules: ["diagram"]` if you haven't loaded it this conversation. It has the load-bearing mechanics this skill builds on — the 680px viewBox, box-overlap and arrow-intersection checks, text-width math, and the flowchart/structural/illustrative patterns. Everything below is a monochrome, hardcoded-color version of those same patterns. Keep using those positioning and sizing rules; only the coloring changes.

## The one rule that matters most: hardcode the colors

This is the part that's easy to get wrong. The Visualizer's default text/box classes (`t`, `th`, `ts`, `box`, `c-*`) use CSS variables like `var(--text-primary)` that flip between black and white depending on whether the person is in light or dark mode. That's correct for normal product-style diagrams, which should blend into the host UI. A whiteboard should do the opposite — it's a physical white surface, and it should look like one regardless of the chat's theme, the same way a photo of an actual whiteboard doesn't invert at night.

So for this skill specifically:

- **Paint an explicit white background.** First element after `<defs>`, before anything else: `<rect x="0" y="0" width="680" height="{H}" fill="#FFFFFF"/>` sized to the full viewBox. This is the one case where painting your own background is correct — without it, dark mode shows the host's dark card straight through, which is the bug you just saw.
- **Use hardcoded hex, never CSS variables, for every stroke and every letter.** Ink: `#1A1A1A` for primary lines, titles, and key text. Muted ink: `#6B6B6B` for secondary text, captions, and annotations — still dark enough to read clearly, just visually quieter. Don't write `var(--text-primary)`, `var(--text-secondary)`, or any `c-{ramp}` class anywhere in this diagram.
- You can still use the `t` / `th` / `ts` classes for font sizing if you want, but override the color on every one with inline `style="fill:#1A1A1A"` (or the muted value) since inline style beats the class's own CSS. Simpler: just skip the classes and set `font-size` and `fill` directly — either works, the inline-style override is the only thing that's load-bearing.
- Box fills stay white too — set `fill="#FFFFFF"` explicitly on every box so it never goes transparent and lets the white backdrop show inconsistently.

This mirrors the Visualizer's own "physical-color scene" exception (sky, water, skin, materials: hardcode hex, never mix with theme classes, don't invert in dark mode) — a whiteboard is exactly that kind of scene.

## Visual language

- **Boxes**: white-filled rounded rects, ink stroke, `rx="4"` to `"8"`. Stroke width `1.5` for primary boxes — bolder than the Visualizer's normal 0.5px default, because thin hairlines don't read as marker ink. `1` for secondary/contained boxes.
- **Arrows**: same ink color, `1.5` stroke width, the standard arrow marker from the diagram module (`marker-end="url(#arrow)"`, with `stroke="context-stroke"` in the marker path so it always matches whatever line it's on — works fine with hardcoded hex too).
- **Containers**: a larger box holding smaller boxes, same as the structural diagram pattern, just monochrome.
- **Dashed lines**: `stroke-dasharray="6 5"` for soft section breaks or to indicate something conceptual/implied rather than a hard boundary (e.g. a process boundary, an inferred relationship).
- **Fonts**: default sans for body. Serif (`style="font-family:var(--font-voice)"`) is a nice option for a major title or label if you want that textbook feel — optional, not required. Two sizes only: 14px for titles/key terms, 12px for body and annotations. Sentence case throughout.
- **No icons, gradients, shadows, or any second color.** If a concept needs a visual metaphor (a funnel, a pipe, a curve), draw it as a simple outlined shape in the same ink color — distinguish parts with labels and position, never with a second hue.

## Choosing what to draw

Don't default to any single layout — match the diagram to the concept:

- **Process / sequence** ("walk me through what happens," "what are the steps") → boxes left-to-right or top-to-bottom, arrows between them, one direction of flow.
- **Containment / architecture** ("what's inside X," "how is this organized") → outer box holding labeled inner boxes, arrows for the interesting relationships between them.
- **Comparison / tradeoff** (two approaches, two systems) → side-by-side boxes, with the deciding factor written between or below them rather than implied.
- **Mechanism / intuition** ("how does X actually work," "give me a feel for X") → a small number of shapes that *show* the mechanism rather than just label it — simplified, not a literal illustration. Keep it to what a quick marker sketch could plausibly capture.
- **Annotated explainer** (a concept with a few distinct "things to know") → one small diagram up top, then short labeled blocks of explanation below it, separated by dashed rules, each with its single most important fact called out (e.g. `&#8592; the bottleneck`) in the margin. This is one option among several, not the default — use it when the concept genuinely breaks into a few separate "here's what's going on" points, not for everything.

Keep the whole thing tight — 3 to 6 shapes is usually enough. If a concept needs more, it's a sign to split into two diagrams (with a sentence of prose between them) rather than cramming one dense whiteboard.

## Worked example

GPU prefill vs. decode — a small containment diagram (cores and VRAM inside a GPU, linked by a bandwidth arrow) plus two annotated sections, all on an explicit white background with hardcoded ink:

```svg
<svg width="100%" viewBox="0 0 680 480" role="img">
<title>How a GPU splits work between cores and VRAM during prefill and decode</title>
<desc>A GPU contains cores (FLOPS) connected to VRAM (weights and KV cache) by a bandwidth link. Prefill reads the whole prompt and is compute-bound. Decode generates one token at a time, repeatedly reading all weights from VRAM, and is bandwidth-bound.</desc>
<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>

<rect x="0" y="0" width="680" height="480" fill="#FFFFFF"/>

<rect x="40" y="40" width="600" height="200" rx="6" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.5"/>
<text x="56" y="30" style="font-size:14px; fill:#1A1A1A; font-family:var(--font-voice); font-style:italic">GPU</text>

<rect x="80" y="80" width="180" height="120" rx="4" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.5"/>
<text x="170" y="135" text-anchor="middle" style="font-size:14px; fill:#1A1A1A">Cores</text>
<text x="170" y="155" text-anchor="middle" style="font-size:12px; fill:#6B6B6B">FLOPS</text>

<rect x="440" y="80" width="160" height="120" rx="4" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="1.5"/>
<text x="520" y="135" text-anchor="middle" style="font-size:14px; fill:#1A1A1A">VRAM</text>
<text x="520" y="155" text-anchor="middle" style="font-size:12px; fill:#6B6B6B">weights + KV cache</text>

<line x1="262" y1="140" x2="438" y2="140" stroke="#1A1A1A" stroke-width="1.5" marker-end="url(#arrow)"/>
<text x="350" y="125" text-anchor="middle" style="font-size:12px; fill:#6B6B6B">bandwidth (GB/s)</text>

<line x1="40" y1="270" x2="640" y2="270" stroke="#1A1A1A" stroke-width="1" stroke-dasharray="6 5"/>
<text x="40" y="304" style="font-size:14px; fill:#1A1A1A; font-weight:500">Prefill</text>
<text x="40" y="328" style="font-size:12px; fill:#1A1A1A">read entire prompt &#8594; run attention &#8594; build KV cache</text>
<text x="600" y="304" text-anchor="end" style="font-size:12px; fill:#6B6B6B; font-style:italic">&#8592; compute-bound</text>

<line x1="40" y1="360" x2="640" y2="360" stroke="#1A1A1A" stroke-width="1" stroke-dasharray="6 5"/>
<text x="40" y="394" style="font-size:14px; fill:#1A1A1A; font-weight:500">Decode</text>
<text x="40" y="418" style="font-size:12px; fill:#1A1A1A">one token at a time &#8594; load ALL weights from VRAM &#8594; repeat</text>
<text x="600" y="394" text-anchor="end" style="font-size:12px; fill:#6B6B6B; font-style:italic">&#8592; bandwidth-bound</text>

<line x1="40" y1="440" x2="640" y2="440" stroke="#1A1A1A" stroke-width="1"/>
<text x="340" y="464" text-anchor="middle" style="font-size:12px; fill:#6B6B6B">VRAM = what fits | GB/s = how fast it runs</text>
</svg>
```

Note everything in that example traces back to hardcoded hex — no `var(--...)`, no class-based color. That's the whole fix.

## Sizing

Same as the diagram module: estimate `H`, lay out your shapes, then find the true bottom-most element (last text baseline + ~20px) and set the viewBox height to match exactly — don't leave dead white space at the bottom, and don't let anything clip. Box widths still need to fit their longest label (`chars × 8 + 24px` minimum). Run the same arrow-intersection and box-overlap checks from the diagram module before finalizing.
