# Project Card Icon Style

Spec for the placeholder SVGs used in `images/projects/`. New projects should follow this style so the grid stays visually unified.

## Canvas
- `viewBox="0 0 600 400"` (16:10 to match `.project-card__media` aspect ratio)
- Background fill: `#0a0a0a` (near-black, slightly off pure to avoid clipping with the page background)

## Palette
- **Primary** — amber `#ffb84d` for all schematic line art, labels, corner brackets, and small marker dots.
- **Accent stars** — white `#ffffff` at `opacity="0.5"–"0.6"`, used as 1–1.5px circles scattered in the negative space (3–6 stars per image).
- No other colors. No gradients. No drop shadows or filters.

## Line work
- Stroke widths between `0.5` and `1.5`. Use `0.5–0.7` for grid/auxiliary lines, `1` for main schematic, `1.2–1.5` for emphasized elements.
- Opacity layering — main forms `0.7–0.85`, secondary detail `0.3–0.55`. Never solid; everything reads as a "drawn on phosphor" overlay.
- `fill="none"` for strokes; small filled dots/markers use `fill="#ffb84d"`.

## Composition
Each image is a **schematic / blueprint** of one concept rendered as line art. Pick *one* metaphor per project; do not mix. Existing examples:

| File | Metaphor |
| --- | --- |
| `project-01.svg` | Orbital rings around a planet |
| `project-02.svg` | Constellation — connected node graph |
| `project-03.svg` | Radar sweep with crosshairs |
| `project-04.svg` | Wireframe terrain / contour lines |
| `project-05.svg` | Circuit board — boxes connected by traces |
| `project-06.svg` | Signal waveform over a measurement grid |

Future ideas: trajectory arc, satellite/antenna, gauge dial, star map, schematic pipeline, oscilloscope readout.

The subject occupies the central ~70% of the canvas; the outer ~15% is reserved for negative space, stars, and metadata text.

## Required overlay elements (every image)

1. **Top-left label** — `// PROJECT 0X` in `font-family="monospace" font-size="11" fill="#ffb84d" opacity="0.8"`, anchored at `(20, 30)`.
2. **Bottom-left tag** — `[METAPHOR-NAME]` (uppercase, brackets) in the same font, anchored at `(20, 380)`.
3. **Corner brackets** — small L-shaped marks in each of the four corners, drawn as 20px paths at `stroke="#ffb84d" stroke-width="1" opacity="0.5"`, e.g.:

   ```svg
   <g stroke="#ffb84d" stroke-width="1" opacity="0.5">
     <path d="M10 10 L30 10 M10 10 L10 30"/>
     <path d="M590 10 L570 10 M590 10 L590 30"/>
     <path d="M10 390 L30 390 M10 390 L10 370"/>
     <path d="M590 390 L570 390 M590 390 L590 370"/>
   </g>
   ```

## Skeleton

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#0a0a0a"/>

  <!-- 1. Schematic: line art of the chosen metaphor, amber, opacity-layered -->
  <g stroke="#ffb84d" stroke-width="1" fill="none" opacity="0.7">
    <!-- ... -->
  </g>

  <!-- 2. Optional small filled markers / nodes -->
  <g fill="#ffb84d">
    <!-- ... -->
  </g>

  <!-- 3. Accent stars -->
  <g fill="#ffffff" opacity="0.55">
    <circle cx="80" cy="60" r="1.5"/>
    <circle cx="520" cy="90" r="1"/>
    <!-- 3-6 total -->
  </g>

  <!-- 4. Labels -->
  <g font-family="monospace" font-size="11" fill="#ffb84d" opacity="0.8">
    <text x="20" y="30">// PROJECT 0X</text>
    <text x="20" y="380">[METAPHOR-NAME]</text>
  </g>

  <!-- 5. Corner brackets -->
  <g stroke="#ffb84d" stroke-width="1" opacity="0.5">
    <path d="M10 10 L30 10 M10 10 L10 30"/>
    <path d="M590 10 L570 10 M590 10 L590 30"/>
    <path d="M10 390 L30 390 M10 390 L10 370"/>
    <path d="M590 390 L570 390 M590 390 L590 370"/>
  </g>
</svg>
```

## Don'ts
- No raster images, no full-color illustrations.
- No second hue (no greens/blues/reds). Status LEDs and active highlights live in the UI layer, not the artwork.
- No solid fills covering large areas. Keep the canvas reading as black with line art on top.
- No text larger than `font-size="11"`. The card title sits below the image — the SVG is not the place for the project name.
