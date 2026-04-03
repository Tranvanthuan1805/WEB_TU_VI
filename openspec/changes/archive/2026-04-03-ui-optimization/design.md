## Context

The project is a .NET 10 Blazor Server application with admin and public post pages. Current issues:
- Toast (`z-50`) and ConfirmDialog (`z-50`) render behind the editor modal (`z-100`), making notifications invisible
- Admin Manager's Save button has no confirmation for edits — accidental clicks can overwrite data
- Pagination renders ALL page buttons — 50+ pages creates an unusable horizontal scroll
- No direct page navigation — users must click prev/next repeatedly

## Goals / Non-Goals

**Goals:**
- Toast and ConfirmDialog always visible above all overlays
- Confirmation dialog before saving edited posts (create mode skips confirmation)
- Smart 3-3-3 pagination showing max 9 page numbers with ellipsis
- Page number input for direct navigation

**Non-Goals:**
- No changes to server-side pagination logic (still in-memory Skip/Take)
- No changes to Toast/ConfirmDialog service architecture
- No changes to post data model or API

## Decisions

**1. z-index: Use `z-[9999]` arbitrary Tailwind value**
- Editor modal uses `z-100`, so `z-[9999]` guarantees Toast/ConfirmDialog on top
- Decision rationale: Simple CSS fix, no architectural change needed

**2. Edit confirmation: Inline in SavePost() method**
- Check `_isEditing` flag before save — if true, show ConfirmDialog
- Create mode bypasses confirmation (no data to lose)
- Decision rationale: Single code path, minimal code change, no new button needed

**3. Smart pagination: 3-3-3 pattern**
- Always show 3 first pages, 3 middle pages (centered on current), 3 last pages
- Use "..." ellipsis when gaps exist between groups
- If current is near start/end, middle group merges with first/last → only 3-3 shown
- Total page numbers shown: max 9 (not counting "...")
- Decision rationale: Consistent UI regardless of total pages, familiar pattern

**4. Page jump input: `@bind:after` without Go button**
- Input triggers `JumpToPage()` on blur/Enter
- Values < 1 clamp to 1, values > totalPages clamp to totalPages
- Decision rationale: Cleaner UI, fewer clicks, standard behavior

## Risks / Trade-offs

**[Risk] Page jump input accepts non-numeric input** → Mitigation: `type="number"` + C# validation in `JumpToPage()`

**[Risk] Pagination logic edge cases at boundaries** → Mitigation: Thorough verify table in spec covers current=1, current=totalPages, total≤9

**[Trade-off] 3-3-3 pattern may show fewer than 9 pages near boundaries** → Acceptable; pattern is "max 9" not "always 9"
