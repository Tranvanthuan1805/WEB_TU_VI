## Context

The project has basic admin pages at `/admin`, `/admin/manager`, `/admin/config` with placeholder content. User wants to implement professional admin templates from `docs/template admin/` with full UI components while keeping the admin theme separate from the main site's gold/yellow theme.

### Current State
- **AdminLayout.razor**: Basic div wrapper, no sidebar/header
- **Dashboard.razor**: Stats tabs + simple article create form
- **Manager.razor**: Empty placeholder
- **Config.razor**: Empty placeholder

### Templates Available
- `dashboard_admin/code.html` - Dashboard with stats, chart, activity, user table
- `qu_n_l_b_i_vi_t/code.html` - Article management with table, search, pagination
- `trang_config/code.html` - Configuration form with settings, profile, SEO

### Constraints
- Admin theme must use template blue (#1E3A8A primary) - NOT override main theme
- Must use data-theme attribute for theme switching
- Must be responsive (collapsible sidebar on mobile)
- Chart.js already imported in App.razor
- TinyMCE already integrated in project

## Goals / Non-Goals

**Goals:**
- Implement responsive AdminLayout with sidebar navigation and top header
- Build Dashboard with stats cards, Chart.js chart, activity list, user table
- Build Manager with article CRUD, search/filter, pagination, TinyMCE
- Build Config with form sections and sticky save bar
- Use CSS custom properties + data-theme for admin theme without affecting main site (gold)

**Non-Goals:**
- Not implementing Users page (already exists elsewhere)
- Not adding authentication logic (admin auth already exists)
- Not changing main site theme or colors

## Decisions

### 1. Admin Theme Strategy: CSS Custom Properties + data-theme Attribute
**Decision:** Use CSS custom properties in theme.css with [data-theme="admin"] selector instead of modifying Tailwind config.

**Rationale:** 
- Keeps admin theme completely isolated from main site's Tailwind config
- No risk of accidentally overriding main theme colors
- theme.css imported in style.css, available globally
- Easy to maintain - admin colors in one place
- Works seamlessly with Blazor's scoped CSS

**Implementation:**
- Created `vite-project/src/css/theme.css` with `:root` (main site) and `[data-theme="admin"]` selectors
- AdminLayout.razor uses `data-theme="admin"` attribute
- Admin CSS files use standard CSS custom properties (e.g., `--primary`, `--surface`)

**Alternative considered:**
- Create separate `tailwind.admin.config.js` - adds complexity to build pipeline
- Use inline styles - harder to maintain, loses Tailwind benefits

### 2. Layout Approach: Server-Side Layout Component
**Decision:** Use Blazor layout component with @Body for page content.

**Rationale:**
- Native Blazor pattern, works with @page routing
- Easy to inject in all admin pages with @layout directive

### 3. Chart Implementation: Chart.js with Blazor JavaScript Interop
**Decision:** Use Chart.js via JS interop in OnAfterRender.

**Rationale:**
- Chart.js already imported in App.razor
- Works well with Blazor's lifecycle
- Template has visual chart placeholder we can implement

### 4. TinyMCE Integration: Existing Project Integration
**Decision:** Use existing TinyMCE setup already in project.

**Rationale:**
- No additional dependencies needed
- Template shows create/edit form that maps well to TinyMCE

## Risks / Trade-offs

1. **[Risk]** Admin CSS might conflict with global styles
   → **Mitigation:** Use scoped .razor.css for component-specific styles, CSS custom properties for theme

2. **[Risk]** Chart.js might not render on initial load
   → **Mitigation:** Initialize chart in OnAfterRender with proper element reference

3. **[Risk]** TinyMCE editor might have sizing issues in admin layout
   → **Mitigation:** Set explicit height in TinyMCE config for admin pages

4. **[Risk]** Responsive sidebar state management
   → **Mitigation:** Use Blazor state variable with @onclick handler for toggle

## Migration Plan

1. Create AdminLayout.razor with sidebar + header + admin CSS theme
2. Update all admin pages to use @layout AdminLayout
3. Implement Dashboard with stats + Chart.js
4. Implement Manager with table + TinyMCE
5. Implement Config with form sections
6. Test responsive behavior at all breakpoints

**Rollback:** Revert to previous basic layout files if issues arise.

## Open Questions

1. Should settings link in sidebar navigate somewhere specific or stay as placeholder?
2. Do you want real data integration or mock data for dashboard stats?
3. Should article categories be hardcoded or from database?