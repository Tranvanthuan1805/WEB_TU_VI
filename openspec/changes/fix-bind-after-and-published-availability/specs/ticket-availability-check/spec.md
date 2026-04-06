## ADDED Requirements

### Requirement: Ticket Availability Check

The TicketManager SHALL provide a helper method `IsTicketAvailable()` that determines if a ticket is available for use. A ticket is available when QuantityUsed is less than Quantity.

#### Scenario: Ticket with remaining uses
- **WHEN** Ticket has Quantity = 100 and QuantityUsed = 30
- **THEN** IsTicketAvailable() returns true

#### Scenario: Ticket with no remaining uses
- **WHEN** Ticket has Quantity = 100 and QuantityUsed = 100
- **THEN** IsTicketAvailable() returns false

### Requirement: Published Checkbox Disabled When Out of Uses

The TicketManager editor form SHALL disable the Published checkbox when the ticket is not available (out of uses). The checkbox SHALL NOT be editable when disabled.

#### Scenario: Create form with out of uses
- **WHEN** user enters Quantity > 0 and QuantityUsed >= Quantity
- **THEN** Published checkbox is disabled

#### Scenario: Edit form with out of uses
- **WHEN** editing an existing ticket that has used up all its quantity
- **THEN** Published checkbox is disabled

### Requirement: Hint Text for Disabled Published

When the Published checkbox is disabled due to being used up, a hint message SHALL be displayed: "Không thể xuất bản — vé đã hết lượt"

#### Scenario: Used up ticket hint display
- **WHEN** ticket has QuantityUsed >= Quantity
- **THEN** hint text "Không thể xuất bản — vé đã hết lượt" is shown

### Requirement: Active Count Uses Availability Check

The statistics row "Đang hoạt động" SHALL count tickets where IsTicketAvailable() returns true, not just where Published = true.

#### Scenario: Active count calculation
- **WHEN** UpdateCounts() is called
- **THEN** _activeCount equals count of tickets where IsTicketAvailable() is true