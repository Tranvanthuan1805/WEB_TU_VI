# Product CRUD Specification

## ADDED Requirements

### Requirement: Product list displays with all required columns
The system SHALL display all products in a sortable table with columns: Name, OriginPrice, Price, Discount, Quantity, QuantitySold, Published, DateCreated, DateUpdated.

#### Scenario: Display product table
- **WHEN** admin navigates to /admin/products
- **THEN** system displays table with all columns

#### Scenario: Sort by column
- **WHEN** admin clicks column header
- **THEN** system sorts data by that column ascending/descending

### Requirement: Create new product
The system SHALL allow admin to create new product with Name, OriginPrice, Price, Discount, Quantity, NumberofTickets.

#### Scenario: Create product with all fields
- **WHEN** admin fills all required fields and clicks "Tạo mới"
- **THEN** system creates new product with DateCreated = DateTime.UtcNow

#### Scenario: Create product with only OriginPrice
- **WHEN** admin enters only OriginPrice, leaves Price empty
- **THEN** system sets Price = OriginPrice

#### Scenario: Create product with only Price
- **WHEN** admin enters only Price, leaves OriginPrice empty
- **THEN** system sets OriginPrice = Price

### Requirement: Price calculation
The system SHALL calculate Price/OriginPrice/Discount based on input combinations.

#### Scenario: Calculate discount from OriginPrice and Price
- **WHEN** admin enters OriginPrice=100000 and Price=80000
- **THEN** system calculates Discount=20%

#### Scenario: Calculate Price from OriginPrice and Discount
- **WHEN** admin enters OriginPrice=100000 and Discount=20
- **THEN** system calculates Price=80000

#### Scenario: Calculate OriginPrice from Price and Discount
- **WHEN** admin enters Price=80000 and Discount=20
- **THEN** system calculates OriginPrice=100000

### Requirement: Quantity management
The system SHALL handle Quantity=-1 as unlimited quantity.

#### Scenario: Display unlimited quantity
- **WHEN** product has Quantity=-1
- **THEN** system displays "∞" or "Không giới hạn"

### Requirement: Auto-published status
The system SHALL auto-set Published=false when QuantitySold >= Quantity (only when Quantity > 0).

#### Scenario: Auto-unpublish when out of stock
- **WHEN** product has Quantity=10 and QuantitySold=10
- **THEN** system sets Published=false

#### Scenario: Keep published when in stock
- **WHEN** product has Quantity=10 and QuantitySold=5
- **THEN** system keeps Published value from input

### Requirement: Edit product
The system SHALL allow admin to edit existing product.

#### Scenario: Update product
- **WHEN** admin modifies product and clicks "Cập nhật"
- **THEN** system updates product with DateUpdated=DateTime.UtcNow

### Requirement: Delete product
The system SHALL allow admin to delete product with confirmation.

#### Scenario: Delete product
- **WHEN** admin clicks delete and confirms
- **THEN** system removes product from database
