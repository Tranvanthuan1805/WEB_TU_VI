## ADDED Requirements

### Requirement: Page number jump input
Both the admin Manager page and the public PostList page SHALL provide a numeric input field for jumping directly to any page. The input SHALL have `min="1"` and `max` set to total pages. On blur or Enter key (`@bind:after`), the system SHALL clamp the value to the valid range (1 to totalPages) and navigate to that page. Values below 1 SHALL be clamped to 1. Values above totalPages SHALL be clamped to totalPages.

#### Scenario: Jump to valid page number
- **WHEN** user enters "5" in the page input and presses Enter
- **THEN** the page navigates to page 5

#### Scenario: Value below 1 clamped to 1
- **WHEN** user enters "0" in the page input
- **THEN** the value is clamped to 1 and page navigates to page 1

#### Scenario: Value above totalPages clamped to totalPages
- **WHEN** user enters "999" in the page input and totalPages is 20
- **THEN** the value is clamped to 20 and page navigates to page 20

#### Scenario: Page jump input in admin Manager
- **WHEN** admin views the Manager page with multiple pages
- **THEN** a numeric page jump input is displayed in the table footer

#### Scenario: Page jump input in public PostList
- **WHEN** user views the PostList page with multiple pages
- **THEN** a numeric page jump input is displayed in the pagination area
