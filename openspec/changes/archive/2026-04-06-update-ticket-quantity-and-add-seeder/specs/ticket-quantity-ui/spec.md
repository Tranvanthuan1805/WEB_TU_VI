## ADDED Requirements

### Requirement: Ticket Quantity Display

The TicketManager UI SHALL display ticket quantities as plain numeric values. The concept of "unlimited" (∞) SHALL NOT be shown for tickets.

#### Scenario: Normal quantity display
- **WHEN** a ticket with Quantity = 100 is displayed in the table
- **THEN** the quantity column shows "100"

#### Scenario: Remaining quantity calculation
- **WHEN** a ticket with Quantity = 100 and QuantityUsed = 30 is displayed
- **THEN** the remaining column shows "70"

### Requirement: Ticket Quantity Input

The TicketManager editor form SHALL provide a numeric input for Quantity with placeholder text "Nhập số lượng..." and hint text "Số lượng vé có thể sử dụng". The input SHALL NOT suggest -1 for unlimited.

#### Scenario: Create form quantity input
- **WHEN** the user opens the create ticket form
- **THEN** the quantity input shows placeholder "Nhập số lượng..." and hint "Số lượng vé có thể sử dụng"

#### Scenario: Edit form quantity prefill
- **WHEN** the user edits an existing ticket with Quantity = 50
- **THEN** the quantity input is pre-filled with 50

### Requirement: Ticket Unsaved Changes Detection

The TicketManager SHALL detect unsaved changes by checking if Code is non-empty OR Quantity differs from the default value of 1.

#### Scenario: Changes detected
- **WHEN** user modifies quantity from default 1 to another value
- **THEN** HasUnsavedChanges() returns true and close prompts confirmation

#### Scenario: No changes detected
- **WHEN** user opens create form and tries to close without entering data
- **THEN** HasUnsavedChanges() returns false and close proceeds without confirmation

### Requirement: Removed Unlimited Logic

All references to Quantity == -1 and the "∞" symbol SHALL be removed from TicketManager.razor. This includes table display cells, remaining calculation, and input hints.

#### Scenario: Table quantity cell
- **WHEN** the table renders a ticket row
- **THEN** the quantity cell displays the numeric value without checking for -1

#### Scenario: Remaining cell calculation
- **WHEN** the remaining cell renders
- **THEN** it calculates Quantity - QuantityUsed directly without checking for -1
