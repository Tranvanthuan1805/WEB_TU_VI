## ADDED Requirements

### Requirement: Dashboard Stats Cards
The system SHALL display 4 statistics cards showing key metrics.

#### Scenario: Stats cards render with data
- **WHEN** Dashboard page loads
- **THEN** shows 4 cards: Total Users, Total Articles, Monthly Views, Active Sessions with numbers and trend indicators (+/- percentage)

#### Scenario: Stats cards have hover effect
- **WHEN** user hovers over a stats card
- **THEN** card scales slightly (transform: scale(1.01)) with transition

### Requirement: Traffic Chart
The system SHALL display a line/bar chart showing traffic analytics.

#### Scenario: Chart.js renders traffic data
- **WHEN** Dashboard loads
- **THEN** Chart.js displays traffic analysis chart with 30-day data points

#### Scenario: Chart has view toggle
- **WHEN** user clicks "Views" or "Users" toggle
- **THEN** chart updates to show selected metric

### Requirement: Recent Activity List
The system SHALL display a list of recent activities.

#### Scenario: Activity list shows entries
- **WHEN** Dashboard renders
- **THEN** shows at least 4 recent activity items with description, user/target, and timestamp

### Requirement: System Users Table
The system SHALL display a table of system users.

#### Scenario: User table renders
- **WHEN** Dashboard loads
- **THEN** displays user table with columns: Member, Role, Status, Activity, Actions

#### Scenario: Table has hover effect
- **WHEN** user hovers over table row
- **THEN** row shows highlight effect

#### Scenario: Actions button
- **WHEN** user clicks edit button in table row
- **THEN** triggers edit action (navigate or open modal)