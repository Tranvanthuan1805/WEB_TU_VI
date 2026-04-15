## ADDED Requirements

### Requirement: Admin can configure Google AdSense
The system SHALL allow administrators to configure Google AdSense settings through the /admin/config page, including enabling/disabling the ads and entering the Publisher ID.

#### Scenario: Load existing config
- **WHEN** admin navigates to /admin/config
- **THEN** the form displays current AdSense config (Enabled, PublisherId) if configured

#### Scenario: Save new config
- **WHEN** admin enters PublisherId and clicks "Lưu"
- **AND** confirms the dialog
- **THEN** the config is saved to config.json under GoogleAdSense section
- **AND** success toast is displayed

#### Scenario: Reset config to default
- **WHEN** admin clicks "Reset" and confirms
- **THEN** the form resets to default values from appsettings.json
- **AND** info toast is displayed instructing to F5

#### Scenario: PublisherId validation
- **WHEN** admin enters invalid PublisherId format
- **THEN** validation message shows "Publisher ID phải có dạng ca-pub-XXXXXXXXXXXXXXX"

### Requirement: AdSense script renders when enabled
The system SHALL render the AdSense script in the page head when Enabled is true and PublisherId is configured.

#### Scenario: Auto Ads script rendered
- **WHEN** GoogleAdSense.Enabled = true AND GoogleAdSense.PublisherId is set
- **THEN** the AdSense Auto Ads script is included in the page <head>
- **AND** the script uses the configured PublisherId

#### Scenario: No script when disabled
- **WHEN** GoogleAdSense.Enabled = false OR PublisherId is empty
- **THEN** no AdSense script is rendered

#### Scenario: AdSense loads on every page using MainLayout
- **WHEN** user visits any public page
- **THEN** AdSense script is loaded (if enabled)
- **AND** Auto Ads will place ads automatically based on page content