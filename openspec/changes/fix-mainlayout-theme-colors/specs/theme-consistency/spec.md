## ADDED Requirements

### Requirement: CamQR layout uses theme colors
CamQR/Layout/MainLayout.razor.css SHALL use CSS custom properties from theme.css instead of hardcoded colors.

#### Scenario: Layout background matches theme
- **WHEN** MainLayout.razor.css is loaded
- **THEN** the page uses `--background` CSS custom property for the main container

#### Scenario: No hardcoded colors in CSS
- **WHEN** MainLayout.razor.css is inspected
- **THEN** no hardcoded hex colors (like #f7f7f7, #3a0647, rgb(5,39,103)) are present

### Requirement: Unused CSS rules removed
MainLayout.razor.css SHALL NOT contain unused CSS rules that cause confusion.

#### Scenario: Sidebar styles removed
- **WHEN** MainLayout.razor.css is inspected
- **THEN** `.sidebar` selector with hardcoded gradient is not present

#### Scenario: Top-row styles removed
- **WHEN** MainLayout.razor.css is inspected
- **THEN** `.top-row` selector with hardcoded light colors is not present
