## ADDED Requirements

### Requirement: Client generates and persists anonymous ID
The system SHALL generate a unique anonymous ID (UUID v4) on the client side and persist it in localStorage for future visits.

#### Scenario: First visit - ID created
- **WHEN** user visits the site for the first time (localStorage has no anon_id)
- **THEN** system generates a new UUID v4 and stores it in localStorage under key "anon_id"

#### Scenario: Returning visit - ID retrieved
- **WHEN** user returns to the site and localStorage contains "anon_id"
- **THEN** system returns the existing ID without generating a new one

### Requirement: JavaScript function exposes getOrCreateAnonId
The system SHALL provide a JavaScript function `getOrCreateAnonId()` that can be called from Blazor to retrieve or create the anonymous ID.

#### Scenario: JS function called from Blazor
- **WHEN** Blazor component invokes the JS function
- **THEN** function returns the anonymous ID string (existing or newly created)