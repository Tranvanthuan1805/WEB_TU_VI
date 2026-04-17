## Context

This change addresses 5 UI/UX issues in the Admin Dashboard:

1. **Recent Contacts** - Currently displays contacts without status indicators. The Contact model already has `ContactStatus` enum (Moi, DaDoc, DaXuLy, BoQua) but it's not being displayed.

2. **Chart Empty State** - The chart canvas renders even when no data exists, showing an empty chart rather than a user-friendly message.

3. **view-all-btn** - Has `width: 100%` forcing full width; needs proper centering with margin.

4. **Daily Usage Stats Table** - Uses raw HTML table without proper styling that matches OrderManager.razor.css patterns.

5. **Chart Initialization** - No null/empty check before Chart.js init, causing potential JavaScript errors.

**Constraints:**
- Must maintain backward compatibility
- Should follow existing CSS patterns from OrderManager.razor.css
- No database changes required (Contact model already has Status field)
- No new dependencies

## Goals / Non-Goals

**Goals:**
- Add status indication to Recent Contacts list
- Show "Không có dữ liệu" when chart has no data
- Center view-all-btn with proper margin
- Style Daily Usage Stats table consistently with other admin pages
- Prevent chart initialization errors on empty data

**Non-Goals:**
- Add new functionality or features
- Modify database schema
- Create new API endpoints
- Add authentication/authorization changes

## Decisions

| Decision | Rationale |
|----------|-----------|
| Use color-coded status dots for ContactStatus | Maintains existing activity-list pattern with `.activity-dot` classes |
| Add `.chart-empty` CSS class for empty state | Consistent with other admin page patterns |
| Inline-flex + auto width for view-all-btn | Replaces 100% width with proper centering while keeping button shape |
| Reuse OrderManager table CSS patterns | Ensures visual consistency across admin pages |
| Add chartData.Any() check before init | Simple, effective guard against empty data |

## Risks / Trade-offs

- **Risk**: Chart.js may fail silently on invalid data → **Mitigation**: Add try-catch in JS eval and C# null check
- **Risk**: CSS changes may affect other pages → **Mitigation**: Use specific class names, no global styles
- **Trade-off**: Minimal - all changes are isolated to Dashboard component

## Migration Plan

1. Deploy updated Dashboard.razor and Dashboard.razor.css
2. No database migration needed (ContactStatus field already exists)
3. Rollback: Revert to previous versions of both files

## Open Questions

None - all implementation details are straightforward UI fixes.