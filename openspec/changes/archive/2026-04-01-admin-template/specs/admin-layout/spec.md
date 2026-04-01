## ADDED Requirements

### Requirement: Admin Layout Shell
The system SHALL provide a responsive admin layout shell with sidebar navigation and top header.

#### Scenario: Sidebar navigation displays correctly
- **WHEN** page loads with AdminLayout
- **THEN** sidebar shows logo and navigation items: Dashboard, Articles, Config, Users, Settings

#### Scenario: Navigation active state
- **WHEN** user navigates to a specific admin page
- **THEN** the corresponding nav item shows active state (blue highlight, left border indicator)

#### Scenario: Top header with search
- **WHEN** AdminLayout renders
- **THEN** top header displays search input, notification icon with badge, user avatar with name and role

#### Scenario: Responsive sidebar on mobile
- **WHEN** viewport width < 768px
- **THEN** sidebar collapses to hamburger menu; clicking hamburger toggles sidebar visibility

#### Scenario: Admin theme separation via data-theme
- **WHEN** AdminLayout renders with data-theme="admin" attribute
- **THEN** it uses CSS custom properties from [data-theme="admin"] selector (#1E3A8A primary) WITHOUT affecting main site's :root theme (gold/yellow)

### Requirement: Theme System
The system SHALL provide CSS-based theme switching using data-theme attribute.

#### Scenario: Main site theme (default)
- **WHEN** page renders without data-theme attribute
- **THEN** uses CSS custom properties from :root (dark #131013 surface, gold #ffd700 primary)

#### Scenario: Admin theme
- **WHEN** page has data-theme="admin" attribute
- **THEN** uses CSS custom properties from [data-theme="admin"] selector (light #F8FAFC surface, blue #1E3A8A primary)

### Requirement: Sidebar Navigation Links
The system SHALL provide functional navigation links in the sidebar.

#### Scenario: Dashboard link
- **WHEN** user clicks "Dashboard" in sidebar
- **THEN** navigates to /admin route

#### Scenario: Articles link
- **WHEN** user clicks "Articles" in sidebar
- **THEN** navigates to /admin/manager route

#### Scenario: Config link
- **WHEN** user clicks "Config" in sidebar
- **THEN** navigates to /admin/config route

#### Scenario: Settings link
- **WHEN** user clicks "Settings" in sidebar
- **THEN** navigates to /admin/settings route (or appropriate destination)