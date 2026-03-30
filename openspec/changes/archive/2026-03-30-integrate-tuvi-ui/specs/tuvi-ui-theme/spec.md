## ADDED Requirements

### Requirement: Custom Tailwind dark theme colors

The system SHALL provide custom Tailwind CSS color palette matching The Celestial Manuscript dark theme design.

#### Scenario: Background colors defined
- **WHEN** Tailwind CSS is configured
- **THEN** the following background colors SHALL be available:
  - `background`: #131013 (main background)
  - `surface`: #131013 (card/panel background)
  - `surface-container-lowest`: #0e0e0e
  - `surface-container-low`: #1c1b1b
  - `surface-container`: #201f1f
  - `surface-container-high`: #2a2a2a
  - `surface-bright`: #393939
  - `surface-variant`: #353534
  - `surface-dim`: #131013

#### Scenario: Primary colors defined
- **WHEN** Tailwind CSS is configured
- **THEN** the following primary colors SHALL be available:
  - `primary`: #fff6df (main primary text)
  - `primary-container`: #ffd700 (gold accent)
  - `primary-fixed`: #ffe16d
  - `primary-fixed-dim`: #e9c400
  - `on-primary`: #3a3000
  - `on-primary-container`: #705e00

#### Scenario: Text colors defined
- **WHEN** Tailwind CSS is configured
- **THEN** the following text colors SHALL be available:
  - `on-surface`: #e5e2e1 (main text)
  - `on-surface-variant`: #d0c6ab (muted text)

#### Scenario: Border colors defined
- **WHEN** Tailwind CSS is configured
- **THEN** the following border colors SHALL be available:
  - `outline`: #999077
  - `outline-variant`: #4d4732

#### Scenario: Secondary colors defined
- **WHEN** Tailwind CSS is configured
- **THEN** the following secondary colors SHALL be available:
  - `secondary`: #ffb4a8
  - `on-secondary`: #690000
  - `secondary-container`: #920703
  - `error`: #ffb4ab

### Requirement: Custom font families

The system SHALL provide custom font families for the dark theme.

#### Scenario: Font families configured
- **WHEN** Tailwind CSS is configured
- **THEN** the following font families SHALL be available:
  - `font-headline`: Noto Serif (for headings)
  - `font-body`: Manrope (for body text)
  - `font-label`: Manrope (for labels/buttons)

#### Scenario: Material Symbols configured
- **WHEN** Tailwind CSS is configured  
- **THEN** Material Symbols Outlined font SHALL be available via CSS class `material-symbols-outlined`

### Requirement: Border radius configuration

The system SHALL provide border radius tokens matching the design.

#### Scenario: Border radius configured
- **WHEN** Tailwind CSS is configured
- **THEN** the following border radius tokens SHALL be available:
  - `default`: 0.125rem
  - `lg`: 0.25rem
  - `xl`: 0.5rem
  - `full`: 0.75rem
