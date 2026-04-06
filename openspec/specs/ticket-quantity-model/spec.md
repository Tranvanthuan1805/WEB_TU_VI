# ticket-quantity-model Specification

## Purpose
TBD - created by archiving change update-ticket-quantity-and-add-seeder. Update Purpose after archive.
## Requirements
### Requirement: Ticket Quantity Default Value

The Ticket model SHALL enforce a minimum Quantity of 1. The default value for Quantity MUST be 1. The value -1 (unlimited) SHALL NOT be supported for tickets.

#### Scenario: New ticket creation default
- **WHEN** a new Ticket instance is created without specifying Quantity
- **THEN** Quantity defaults to 1

#### Scenario: Quantity validation rejects invalid values
- **WHEN** a ticket is created or updated with Quantity less than 1
- **THEN** the model validation SHALL reject the value with an error message

### Requirement: Ticket Quantity Range Constraint

The Ticket model SHALL apply `[Range(1, int.MaxValue)]` validation on the Quantity field. Values below 1 MUST fail validation.

#### Scenario: Valid quantity accepted
- **WHEN** Quantity is set to a value >= 1
- **THEN** the model validation passes

#### Scenario: Invalid quantity rejected
- **WHEN** Quantity is set to 0 or negative values
- **THEN** the model validation fails with error "Giá trị từ 1 đến 2147483647"

