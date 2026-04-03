## Why

Four UI/UX issues need fixing in the admin and public post pages:
1. Toast and ConfirmDialog components are hidden behind editor modals (z-index conflict)
2. Update action in admin Manager lacks confirmation dialog (accidental data modification risk)
3. Pagination displays all pages regardless of count — unusable when total pages > 10
4. No way to jump to a specific page number — users must click through pages one by one

## What Changes

- Increase z-index of Toast and ConfirmDialog to `z-[9999]` (above all modals)
- Add confirmation dialog before saving edits in admin Manager (create mode skips confirmation)
- Replace full pagination with smart 3-3-3 pattern: 3 first pages + "..." + 3 middle pages (centered on current) + "..." + 3 last pages
- Add page number input with `@bind:after` for jumping to any page (clamped to 1..totalPages)

## Capabilities

### New Capabilities
- `smart-pagination`: Smart 3-3-3 pagination pattern showing max 9 page numbers with ellipsis gaps
- `page-jump-input`: Input field to jump to any page number with boundary clamping
- `edit-confirmation`: Confirmation dialog before saving edited posts in admin Manager

### Modified Capabilities
- `toast-confirm-z-index`: Increase z-index from `z-50` to `z-[9999]` for proper layering above modals

## Impact

- **Files modified**: `Toast.razor`, `ConfirmDialog.razor`, `Manager.razor`, `PostList.razor`
- **No breaking changes** — existing functionality preserved, only UI/UX improvements
- **No database changes**
- **No new dependencies**
