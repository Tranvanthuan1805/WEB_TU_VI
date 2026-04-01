## ADDED Requirements

### Requirement: General Settings Section
The system SHALL provide form for general site configuration.

#### Scenario: Site name input
- **WHEN** Config page loads
- **THEN** shows Site Name input field with current value

#### Scenario: Primary email input
- **WHEN** Config page loads
- **THEN** shows Primary Email input field

#### Scenario: Logo upload
- **WHEN** user clicks logo upload area
- **THEN** file picker opens; selected image displays in preview area

### Requirement: Admin Profile Section
The system SHALL provide admin profile management.

#### Scenario: Avatar display
- **WHEN** Config page loads
- **THEN** shows current admin avatar with "Change Avatar" button

#### Scenario: Full name input
- **WHEN** Config page loads
- **THEN** shows Full Name input field

#### Scenario: Password change
- **WHEN** user enters new password
- **THEN** password field updates (masked input)

### Requirement: SEO Configuration Section
The system SHALL provide SEO meta settings.

#### Scenario: Meta title input
- **WHEN** Config page loads
- **THEN** shows Meta Title input with current value

#### Scenario: Keywords tags
- **WHEN** Config page loads
- **THEN** shows existing keyword tags with remove (X) buttons and "Add tag" input

#### Scenario: Meta description textarea
- **WHEN** Config page loads
- **THEN** shows Meta Description textarea with character count (e.g., "164 / 200")

### Requirement: Sticky Save Bar
The system SHALL provide persistent save controls.

#### Scenario: Save bar fixed at bottom
- **WHEN** Config page renders
- **THEN** shows "Discard Changes" and "Deploy Configurations" buttons fixed at bottom of viewport

#### Scenario: Save button enabled
- **WHEN** user makes changes to form
- **THEN** "Deploy Configurations" button becomes active/clickable