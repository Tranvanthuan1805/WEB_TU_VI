```markdown
# Design System Strategy: The Precision Architect

## 1. Overview & Creative North Star
The "Precision Architect" is the creative North Star for this design system. We are moving away from the cluttered, "boxed-in" aesthetic of traditional admin dashboards to create a space that feels like a high-end architectural blueprint: expansive, intentional, and authoritative. 

Instead of overwhelming the user with a rigid grid of outlines, we utilize **Asymmetric Information Density**. This means using generous white space (the "breathing room") to frame high-density data clusters. We break the template look by overlapping "floating" utility panels over a solid structural base, creating a sense of sophisticated machinery working behind a clean, editorial facade.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
This system relies on color to define structure, not lines.

- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate the Sidebar from the Main Content, use a transition from `surface-container` (#eceef0) to `surface` (#f7f9fb). 
- **Surface Hierarchy & Nesting:** Treat the UI as layers of fine paper.
    - **Base Layer:** `surface` (#f7f9fb) for the main application background.
    - **Sectional Layer:** `surface-container-low` (#f2f4f6) for large content areas.
    - **Object Layer:** `surface-container-lowest` (#ffffff) for primary data cards and interactive elements.
- **Glass & Gradient Rule:** For floating headers or navigation rails, use a `surface_container_lowest` fill at 85% opacity with a `20px` backdrop-blur. 
- **Signature Textures:** For primary CTAs and critical data trends, use a subtle linear gradient from `primary` (#00236f) to `primary_container` (#1e3a8a). This adds a "lithographic" depth that feels premium rather than flat.

---

## 3. Typography: Editorial Authority
We use **Inter** as a tool of precision. The hierarchy is designed to feel like a financial report—clear, rhythmic, and high-contrast.

- **Display & Headlines:** Use `display-sm` (2.25rem) for main dashboard titles. Set these with a tight letter-spacing (-0.02em) to give them an "editorial" punch.
- **Data Points:** Use `title-lg` (1.375rem) for "Big Number" stats in cards. Combine these with `label-md` (0.75rem) using the `secondary` (#505f76) color for descriptions.
- **Body & Labels:** All body text must use `body-md` (#191c1e). Use `label-sm` in uppercase with 0.05em letter-spacing for table headers to distinguish them from the data they contain.

---

## 4. Elevation & Depth: Tonal Layering
Depth is achieved through "Tonal Stacking" rather than structural shadows.

- **The Layering Principle:** To "lift" a component, place a `surface-container-lowest` (#ffffff) card on a `surface-container` (#eceef0) background. The shift in hex code provides enough contrast for the eye without visual noise.
- **Ambient Shadows:** When a modal or dropdown requires a true shadow, use an extra-diffused "Atmospheric Shadow":
    - `0px 20px 40px rgba(0, 35, 111, 0.06)` (A tinted shadow using the `primary` base to feel natural).
- **The Ghost Border:** If a boundary is required for accessibility in forms, use the `outline_variant` (#c5c5d3) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Use it sparingly on the **Top Header**. It allows the background data to peek through as the user scrolls, maintaining a sense of place.

---

## 5. Components: The Primitive Set

### Cards & Data Stats
- **Rule:** Forbid divider lines. 
- **Layout:** Use `padding: 1.75rem` (Spacing 8). Separate the "Headline Stat" from the "Trend Metric" using a `1.1rem` (Spacing 5) vertical gap.
- **Background:** Use `surface-container-lowest` (#ffffff) with a `xl` (0.75rem) corner radius.

### Buttons
- **Primary:** `primary_container` (#1e3a8a) background with `on_primary` (#ffffff) text. Use `md` (0.375rem) roundedness for a professional, sharp look.
- **Secondary:** Transparent background with a `Ghost Border`.
- **States:** On hover, shift background to `primary` (#00236f). No shadows on hover; use color shifts only.

### Data Tables
- **Row Separation:** Use alternating backgrounds (`surface` and `surface-container-low`) instead of lines. 
- **Typography:** Table data must use `body-md` with `label-md` for metadata.
- **Interactions:** Hovering over a row should trigger a `surface-container-high` (#e6e8ea) highlight.

### Sidebar Navigation
- **Structure:** `surface-container` (#eceef0) background. 
- **Active State:** Use a `primary` (#00236f) vertical "pill" (width: 4px) on the leading edge of the active item. Do not use a background fill for the active state; let the typography and the pill do the work.

### Form Elements
- **Input Fields:** `surface-container-lowest` background with a subtle `outline-variant` ghost border. 
- **Focus State:** Border changes to `primary` (#00236f) at 100% opacity with a `2px` outer glow of the same color at 10% opacity.

---

## 6. Do’s and Don’ts

### Do:
- **Use Vertical Rhythm:** Use the Spacing Scale strictly. Gaps between cards should always be `1.75rem` (Spacing 8) or `2.25rem` (Spacing 10).
- **Leverage Color as Meaning:** Use `tertiary` (#4b1c00) for "Warning" states instead of a generic orange; it feels more sophisticated and intentional.
- **Align to the Type Baseline:** Ensure all data in a row aligns to the baseline, not the vertical center, for an editorial feel.

### Don’t:
- **Don’t use 100% Black:** Use `on_surface` (#191c1e) for text. Pure black is too harsh for high-end digital surfaces.
- **Don’t use Drop Shadows on Cards:** Let the background tonal shifts (Layering Principle) define the card's edge.
- **Don’t Use Boxed Icons:** Icons should be "naked"—no circular or square containers around them unless they are primary action buttons.
- **Don't use Dividers:** If you feel the need for a line, try adding `0.9rem` (Spacing 4) of white space instead.