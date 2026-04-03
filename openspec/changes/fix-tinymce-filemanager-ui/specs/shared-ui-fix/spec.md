## ADDED Requirements

### Requirement: Toast and ConfirmDialog inside admin theme container
The Toast and ConfirmDialog components SHALL be rendered inside the `<div data-theme="admin">` container in AdminLayout.razor. This ensures they inherit all CSS custom properties (--primary, --surface, --on-surface, etc.) defined by the admin theme. The components SHALL be placed after the main content area but before the blazor-error-ui div.

#### Scenario: Toast displays with admin theme colors
- **WHEN** ToastService.ShowSuccess("Test") is called from an admin page
- **THEN** the toast displays with admin theme colors (blue primary, proper surface colors)

#### Scenario: ConfirmDialog displays with admin theme colors
- **WHEN** ConfirmDialogService.ShowAsync is called from an admin page
- **THEN** the dialog displays with admin theme colors and proper styling

#### Scenario: Toast auto-dismiss works
- **WHEN** a toast is displayed
- **THEN** it automatically dismisss after 3 seconds

#### Scenario: ConfirmDialog returns correct result
- **WHEN** user clicks the confirm button on ConfirmDialog
- **THEN** ShowAsync returns true; when user clicks cancel or overlay, it returns false
