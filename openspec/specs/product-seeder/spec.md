# product-seeder Specification

## Purpose
TBD - created by archiving change update-ticket-quantity-and-add-seeder. Update Purpose after archive.
## Requirements
### Requirement: Product Seed Data Generation

The Seeder SHALL provide a `SeedProductsAsync` method that generates 30 products with realistic e-commerce data. Each product MUST have a name prefixed with `[Seed Data]`, an origin price, a calculated selling price, and a discount percentage.

#### Scenario: Generate 30 products
- **WHEN** `SeedProductsAsync` is called
- **THEN** 30 products are created and saved to the database

#### Scenario: Product name format
- **WHEN** a seed product is created
- **THEN** its name follows the format `[Seed Data] {ProductName}`

#### Scenario: Price calculation from discount
- **WHEN** a product has OriginPrice = 1,000,000 and Discount = 20%
- **THEN** Price is calculated as 800,000 (rounded to whole number)

#### Scenario: No discount scenario
- **WHEN** a product has Discount = 0
- **THEN** Price equals OriginPrice

### Requirement: Product Seed Data Deletion

The Seeder SHALL provide a `DeleteSeedProductsAsync` method that removes all products whose Name contains `[Seed Data]`.

#### Scenario: Delete all seed products
- **WHEN** `DeleteSeedProductsAsync` is called
- **THEN** all products with `[Seed Data]` in their name are removed from the database

#### Scenario: No seed products to delete
- **WHEN** `DeleteSeedProductsAsync` is called and no seed products exist
- **THEN** no error occurs and the method returns 0

### Requirement: Product Seed Data Characteristics

Seed products SHALL have realistic pricing: 60% with discounts (0-50%), 40% with no discount. Quantity SHALL default to -1 (unlimited) or random 10-500. Published rate SHALL be approximately 70%.

#### Scenario: Discount distribution
- **WHEN** 30 seed products are generated
- **THEN** approximately 18 products have Discount > 0 and 12 have Discount = 0

#### Scenario: Quantity variety
- **WHEN** seed products are generated
- **THEN** some have Quantity = -1 (unlimited) and others have Quantity between 10-500

#### Scenario: Published distribution
- **WHEN** seed products are generated
- **THEN** approximately 70% have Published = true

