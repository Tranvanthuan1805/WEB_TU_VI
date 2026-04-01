## Why

The current admin pages (Dashboard, Manager, Config) are basic placeholders without proper UI. User wants to implement professional admin templates from `docs/template admin/` with full sidebar navigation, stats cards, charts, data tables, and forms - using a separate blue theme that doesn't override the existing gold/yellow main theme.

## What Changes

- **AdminLayout.razor**: Full admin shell with sidebar navigation (Dashboard, Articles, Config, Settings), top header with search, notifications, user avatar. Responsive: collapsible sidebar on mobile. Uses `data-theme="admin"` for theme switching.
- **Dashboard.razor**: 4 stats cards, Chart.js line/bar chart for traffic, activity list, user table. Uses AdminLayout + admin theme via CSS variables.
- **Manager.razor**: Search bar, category filter, article data table with pagination, create/edit article with TinyMCE integration. Uses AdminLayout + admin theme via CSS variables.
- **Config.razor**: Form sections for General Settings (Site Name, Email, Logo), Admin Profile (Avatar, Name, Password), SEO (Meta Title, Keywords, Description). Sticky save bar. Uses AdminLayout + admin theme via CSS variables.
- **theme.css**: New CSS file with dual theme support using CSS custom properties - `:root` for main site (dark + gold), `[data-theme="admin"]` for admin pages (light blue #1E3A8A).

## Capabilities

### New Capabilities
- `admin-layout`: Responsive admin layout with sidebar navigation and top header, using data-theme attribute
- `admin-dashboard`: Dashboard with stats, charts, activity feed, and user table
- `admin-article-manager`: Article CRUD with search, filter, table, pagination, TinyMCE editor
- `admin-config`: Configuration form with settings, profile, and SEO sections
- `theme-system`: CSS-based theme switching using data-theme attribute and CSS custom properties

### Modified Capabilities
- (none - this is new admin feature)

## Impact

- New files: `AdminLayout.razor`, `AdminLayout.razor.css`, `theme.css`
- Modified files: `Dashboard.razor`, `Dashboard.razor.css`, `Manager.razor`, `Manager.razor.css`, `Config.razor`, `Config.razor.css`, `MainLayout.razor.css`, `style.css`
- CSS: Two themes using CSS custom properties - main site (dark + gold) and admin (light blue)
- Dependencies: Chart.js (already imported), TinyMCE (already integrated)