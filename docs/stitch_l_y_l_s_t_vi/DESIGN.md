# Design System Document: The Celestial Manuscript

## 1. Overview & Creative North Star
This design system is built to transform the traditional practice of Vietnamese horoscope (Tử Vi) into a high-end digital artifact. Moving away from the cluttered, "templated" look of legacy astrology sites, we adopt a **Creative North Star: The Celestial Manuscript.**

The experience should feel like a contemporary interpretation of an ancient lacquer box—layered, deep, and meticulously crafted. We reject the rigid, boxy grid in favor of **Intentional Asymmetry**. By using overlapping elements, dramatic typographic scales, and generous white space, we create a sense of rhythmic movement that mirrors the flow of destiny. This is not just a tool; it is a spiritual journey presented with editorial precision.

---

## 2. Colors: Tonal Depth & Soul
Our palette is rooted in the "Five Elements," refined for a premium digital canvas. 

- **Primary & Golden Accents:** The core identity uses `primary_container` (#FFD700) and `surface_tint` (#E9C400) to represent the "Imperial Gold" of traditional Vietnamese courts. These should be used sparingly for high-impact CTAs and spiritual focal points.
- **The Secondary Soul:** `secondary` (#FFB4A8) and `secondary_container` (#920703) provide the deep, oxblood red accents traditional to celebratory and spiritual contexts.
- **The Infinite Background:** We use a deep charcoal `surface` (#131313) to create a void where golden elements can truly shine.

### The "No-Line" Rule
To maintain a sophisticated editorial feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined through:
1. **Background Shifts:** Placing a `surface_container_low` section against the main `surface`.
2. **Subtle Tonal Transitions:** Using the `surface_container` hierarchy to differentiate content areas.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. A `surface_container_lowest` card should sit on a `surface_container_low` background to create a soft, natural lift. This "nesting" replaces the need for dividers and creates a sense of organized complexity.

### The "Glass & Gradient" Rule
To add a "mystical" dimension, use **Glassmorphism** for floating elements (e.g., birth chart modals). Combine `surface_container_highest` at 70% opacity with a `backdrop-blur` of 20px. 
*   **Signature Textures:** Apply a subtle linear gradient from `primary` (#FFF6DF) to `primary_container` (#FFD700) on primary buttons to give them a metallic, gold-leafed soul.

---

## 3. Typography: The Editorial Voice
We contrast the timeless authority of **Noto Serif** with the technical clarity of **Manrope**.

- **The Display Scale:** Use `display-lg` for soul-searching headlines. Tighten the letter-spacing (-2%) to make the serif feel more like a high-fashion masthead.
- **The Narrative Body:** Use `body-lg` (Manrope) for readings. Manrope’s geometric nature balances the ornate serif, ensuring that even complex horoscopes remain highly readable.
- **Hierarchical Contrast:** Use `label-sm` in all caps with a 1.5px letter-spacing for "Overlines" (e.g., CATEGORY TAGS) to create a sense of professional curation.

---

## 4. Elevation & Depth
We eschew traditional shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking. Place a `surface_container_high` element on a `surface_container_low` section. The change in luminance provides all the "lift" required.
- **Ambient Shadows:** If a floating effect is necessary (e.g., a dropdown), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0,0,0,0.4)`. The shadow color must never be pure black; it should be a tinted version of `on_surface`.
- **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline_variant` (#4D4732) at **20% opacity**. This creates a "phantom" edge that defines space without cluttering the visual field.

---

## 5. Components

### Input Fields: The Ritual of Entry
Since birth data is the "key" to the system, inputs must feel intentional.
- **Style:** Underline-only inputs using `outline` (#999077). On focus, the line transitions to `primary_container` (#FFD700) with a subtle glow.
- **Helper Text:** Use `label-md` in `on_surface_variant` to guide the user with a gentle, non-intrusive voice.

### Buttons: The Golden Touch
- **Primary:** `primary_container` background with `on_primary_container` text. Use `rounded-sm` (0.125rem) to maintain a sharp, architectural look.
- **Secondary:** Transparent background with a `ghost border` and `on_surface` text.

### Cards & Lists: Editorial Grouping
- **Rules:** Forbid all divider lines.
- **Spacing:** Separate list items using the `spacing-4` (1.4rem) scale.
- **Backgrounds:** Use `surface_container_lowest` for card backgrounds to make them feel "inset" into the page, like a recessed panel.

### Specialized Component: The "Star Map" (Data Visualization)
For birth charts, use `tertiary_container` (#FFCFC2) for active planetary points. Connect them with "Ghost Borders" to create a constellation effect that feels both scientific and spiritual.

---

## 6. Do’s and Don’ts

### Do:
- **Use Asymmetry:** Place a large `display-md` headline on the left and a small `body-md` paragraph on the right with a 2-column offset.
- **Embrace the Void:** Use the `spacing-20` scale to let the "Celestial Manuscript" breathe. 
- **Incorporate Motifs:** Use traditional Vietnamese lotus or cloud patterns as **SVG masks** or low-opacity background watermarks (`opacity: 0.05`) rather than literal icons.

### Don't:
- **No Hard Dividers:** Never use a solid 1px line to separate content. Let the spacing scale and background colors do the work.
- **No Standard "Blue" Links:** All interactive elements must stay within the gold/red/charcoal spectrum to preserve the mystical atmosphere.
- **No Heavy Shadows:** Avoid the "Material 1.0" look. Keep elevations flat or subtly layered.

---

## 7. Spacing & Rhythm
This system relies on a mathematical rhythm to feel "Trustworthy." 
- Use **Spacing-3 (1rem)** for internal component padding.
- Use **Spacing-8 (2.75rem)** for section gaps.
- Use **Spacing-16 (5.5rem)** for major page transitions. 

Consistency in these values ensures that despite the asymmetrical layouts, the user feels a sense of underlying order—much like the stars themselves.