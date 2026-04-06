# Ticket CRUD Specification

## ADDED Requirements

### Requirement: Ticket list displays with all required columns
The system SHALL display all tickets in a sortable table with columns: Code, Quantity, QuantityUsed, Remaining, Published, DateCreated, DateUpdated.

#### Scenario: Display ticket table
- **WHEN** admin navigates to /admin/tickets
- **THEN** system displays table with all columns

#### Scenario: Sort by column
- **WHEN** admin clicks column header
- **THEN** system sorts data by that column ascending/descending

### Requirement: Create new ticket
The system SHALL allow admin to create new ticket with Code (auto-generate if empty) and Quantity.

#### Scenario: Create ticket with Code
- **WHEN** admin enters Code and Quantity, clicks "Tạo mới"
- **THEN** system creates new ticket with DateCreated=DateTime.UtcNow

#### Scenario: Create ticket with auto-generate Code
- **WHEN** admin leaves Code empty, enters Quantity
- **THEN** system generates 16-character uppercase hex code (e.g., "A1B2C3D4E5F6G7H8")

### Requirement: Quantity management
The system SHALL handle Quantity=-1 as unlimited.

#### Scenario: Display unlimited quantity
- **WHEN** ticket has Quantity=-1
- **THEN** system displays "∞" or "Không giới hạn"

#### Scenario: Calculate remaining
- **WHEN** ticket has Quantity=100 and QuantityUsed=30
- **THEN** system displays Remaining=70

### Requirement: Auto-published status
The system SHALL auto-set Published=false when QuantityUsed >= Quantity (only when Quantity > 0).

#### Scenario: Auto-unpublish when all used
- **WHEN** ticket has Quantity=100 and QuantityUsed=100
- **THEN** system sets Published=false

#### Scenario: Keep published when available
- **WHEN** ticket has Quantity=100 and QuantityUsed=50
- **THEN** system keeps Published value from input

### Requirement: Edit ticket
The system SHALL allow admin to edit existing ticket.

#### Scenario: Update ticket
- **WHEN** admin modifies ticket and clicks "Cập nhật"
- **THEN** system updates ticket with DateUpdated=DateTime.UtcNow

### Requirement: Delete ticket
The system SHALL allow admin to delete ticket with confirmation.

#### Scenario: Delete ticket
- **WHEN** admin clicks delete and confirms
- **THEN** system removes ticket from database
