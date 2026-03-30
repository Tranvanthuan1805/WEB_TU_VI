## ADDED Requirements

### Requirement: Header navigation component

The system SHALL provide a separate NavMenu component for header navigation.

#### Scenario: NavMenu displays brand name
- **WHEN** NavMenu is rendered
- **THEN** the header SHALL display "Lá Số Tử Vi" brand name in yellow/gold color

#### Scenario: NavMenu displays navigation menu
- **WHEN** NavMenu is rendered on desktop
- **THEN** the header SHALL display navigation menu with items:
  - Trang chủ (Home)
  - Bài viết (Articles)

#### Scenario: NavMenu has mobile hamburger menu
- **WHEN** NavMenu is rendered on mobile
- **THEN** a hamburger icon SHALL be displayed
- **AND** clicking it SHALL toggle a mobile dropdown menu

#### Scenario: NavMenu is sticky
- **WHEN** NavMenu is rendered
- **THEN** the header SHALL have `sticky` positioning at the top of the page

#### Scenario: NavMenu has dark background
- **WHEN** NavMenu is rendered
- **THEN** the header SHALL have dark background color (#131013)

### Requirement: Footer component

The system SHALL provide a separate Footer component.

#### Scenario: Footer displays brand
- **WHEN** Footer is rendered
- **THEN** the footer SHALL display "Lá Số Tử Vi" brand name

#### Scenario: Footer displays copyright
- **WHEN** Footer is rendered
- **THEN** the footer SHALL display copyright text "© 2026 Lá Số Tử Vi. Khám phá vận mệnh – Thấu hiểu chính mình."

#### Scenario: Footer displays navigation links
- **WHEN** Footer is rendered
- **THEN** the footer SHALL display links:
  - Contact Us
  - Privacy Policy
  - Terms of Service
  - Disclaimer

#### Scenario: Footer has dark background
- **WHEN** Footer is rendered
- **THEN** the footer SHALL have dark background color (#0a0a0a)

### Requirement: MainLayout integrates components

The system SHALL integrate NavMenu and Footer components.

#### Scenario: MainLayout includes NavMenu
- **WHEN** MainLayout is rendered
- **THEN** the NavMenu component SHALL be included

#### Scenario: MainLayout includes Footer
- **WHEN** MainLayout is rendered
- **THEN** the Footer component SHALL be included

#### Scenario: Main content wraps page body
- **WHEN** MainLayout is rendered
- **THEN** the main content area SHALL render the page Body using @Body

#### Scenario: Error UI remains functional
- **WHEN** an unhandled error occurs
- **THEN** the Blazor error UI SHALL still be displayed with reload option
