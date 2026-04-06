# ticket-seeder Specification

## Purpose
TBD - created by archiving change update-ticket-quantity-and-add-seeder. Update Purpose after archive.
## Requirements
### Requirement: Ticket Seed Data Generation

The Seeder SHALL provide a `SeedTicketsAsync` method that generates 50 tickets with unique codes. Each ticket MUST have a code prefixed with `[SEED]-`, a quantity >= 1, and a quantity used that does not exceed the total quantity.

#### Scenario: Generate 50 tickets
- **WHEN** `SeedTicketsAsync` is called
- **THEN** 50 tickets are created and saved to the database

#### Scenario: Ticket code format
- **WHEN** a seed ticket is created
- **THEN** its code follows the format `[SEED]-XXXXXXXXXXXX` where X is uppercase alphanumeric (total length >= 8)

#### Scenario: Quantity used does not exceed quantity
- **WHEN** a seed ticket is created with Quantity = 100
- **THEN** QuantityUsed is between 0 and 100

### Requirement: Ticket Seed Data Deletion

The Seeder SHALL provide a `DeleteSeedTicketsAsync` method that removes all tickets whose Code contains `[SEED]`.

#### Scenario: Delete all seed tickets
- **WHEN** `DeleteSeedTicketsAsync` is called
- **THEN** all tickets with `[SEED]` in their code are removed from the database

#### Scenario: No seed tickets to delete
- **WHEN** `DeleteSeedTicketsAsync` is called and no seed tickets exist
- **THEN** no error occurs and the method returns 0

### Requirement: Ticket Seed Data Characteristics

Seed tickets SHALL have realistic data: Quantity between 50-1000, QuantityUsed between 0-50, and approximately 80% published.

#### Scenario: Quantity range
- **WHEN** seed tickets are generated
- **THEN** each ticket has Quantity between 50 and 1000

#### Scenario: QuantityUsed range
- **WHEN** seed tickets are generated
- **THEN** each ticket has QuantityUsed between 0 and 50

#### Scenario: Published distribution
- **WHEN** seed tickets are generated
- **THEN** approximately 80% have Published = true

