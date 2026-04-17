## ADDED Requirements

### Requirement: Recent Contacts displays status indicator
The Admin Dashboard Recent Contacts section SHALL display a status indicator for each contact based on ContactStatus (Moi/DaDoc/DaXuLy/BoQua).

#### Scenario: Display status for Moi (New) contacts
- **WHEN** a contact with ContactStatus.Moi is rendered in Recent Contacts
- **THEN** the activity-dot SHALL have amber/orange color (#f59e0b)

#### Scenario: Display status for DaDoc (Read) contacts
- **WHEN** a contact with ContactStatus.DaDoc is rendered in Recent Contacts
- **THEN** the activity-dot SHALL have blue color (#3b82f6)

#### Scenario: Display status for DaXuLy (Processed) contacts
- **WHEN** a contact with ContactStatus.DaXuLy is rendered in Recent Contacts
- **THEN** the activity-dot SHALL have green color (#22c55e)

#### Scenario: Display status for BoQua (Skipped) contacts
- **WHEN** a contact with ContactStatus.BoQua is rendered in Recent Contacts
- **THEN** the activity-dot SHALL have gray color (#6b7280)

### Requirement: Chart displays empty state message when no data
The Orders & Revenue chart SHALL display "Không có dữ liệu" message when chartData is empty.

#### Scenario: Chart with empty data
- **WHEN** chartData contains no items
- **THEN** the chart container SHALL display "Không có dữ liệu" instead of rendering empty Chart.js canvas

#### Scenario: Chart with data
- **WHEN** chartData contains at least one item
- **THEN** the chart SHALL render normally with Chart.js

### Requirement: view-all-btn is centered with proper margin
The "View All Contacts" button SHALL be centered horizontally with appropriate top margin.

#### Scenario: Button styling
- **WHEN** the view-all-btn is rendered
- **THEN** it SHALL use display: inline-flex with margin: 2rem auto 0 and width: auto (not 100%)

### Requirement: Daily Usage Stats table has proper styling
The Daily Usage Stats table SHALL have styling consistent with OrderManager.razor.css patterns.

#### Scenario: Table renders with proper styles
- **WHEN** the Daily Usage Stats table is displayed
- **THEN** it SHALL include: table-container wrapper, data-table with proper borders, table-footer with pagination

#### Scenario: Pagination controls styled correctly
- **WHEN** pagination buttons are rendered
- **THEN** they SHALL match OrderManager page-btn styling (2.25rem height, rounded corners, proper hover states)

### Requirement: Chart initialization handles empty data gracefully
The chart initialization SHALL not throw errors when chartData is empty.

#### Scenario: Initialize chart with empty data
- **WHEN** InitializeChart() is called with empty chartData
- **THEN** it SHALL show empty state message, not execute Chart.js initialization

#### Scenario: Initialize chart with data
- **WHEN** InitializeChart() is called with non-empty chartData
- **THEN** it SHALL initialize Chart.js with the provided data