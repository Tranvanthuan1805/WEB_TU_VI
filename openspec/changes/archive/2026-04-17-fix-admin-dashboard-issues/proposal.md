## Why

The Admin Dashboard has several UI/UX issues that need addressing:
1. Recent Contacts section displays contacts but lacks status indication
2. Chart container shows empty canvas when no data exists
3. view-all-btn needs proper centering and margin
4. Daily Usage Stats table lacks proper styling matching other admin pages
5. Chart initialization can fail when chartData is empty

These issues affect the dashboard's usability and visual consistency with other admin pages.

## What Changes

1. **Recent Contacts Status**: Add status badge/dot to show ContactStatus (Moi/DaDoc/DaXuLy/BoQua) in the activity list
2. **Chart Empty State**: Display "Không có dữ liệu" message when chartData is empty instead of empty canvas
3. **view-all-btn Styling**: Change from `width: 100%` to `display: inline-flex; margin: 2rem auto 0;` for proper centering
4. **Daily Usage Stats Table CSS**: Add comprehensive table styling following OrderManager.razor.css patterns
5. **Chart Initialization Fix**: Add null/empty check before Chart.js initialization to prevent errors

## Capabilities

### New Capabilities
- None - these are bug fixes and UI improvements

### Modified Capabilities
- None - no existing spec behavior changes

## Impact

**Affected Files:**
- `Web/Web/Components/Pages/Admin/Dashboard.razor` - Add status display, empty state, update chart init logic
- `Web/Web/Components/Pages/Admin/Dashboard.razor.css` - Fix view-all-btn styling, add table styles

**Dependencies:**
- Chart.js (via existing CDN)
- Contact model (existing, no changes needed)
- Tailwind CSS (existing, no changes needed)

**No breaking changes** - all modifications are backward compatible