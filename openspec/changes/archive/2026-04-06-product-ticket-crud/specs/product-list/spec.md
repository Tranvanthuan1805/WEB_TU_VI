# Product List Specification

## ADDED Requirements

### Requirement: Product list displays published products only
The system SHALL display only products where Published=true.

#### Scenario: Display published products
- **WHEN** user navigates to /san-pham
- **THEN** system displays only products with Published=true

### Requirement: Responsive layout
The system SHALL display products in responsive grid: 3 columns desktop, 2 columns tablet, 1 column mobile.

#### Scenario: Desktop layout
- **WHEN** viewport width >= 1024px
- **THEN** system displays 3-column grid

#### Scenario: Tablet layout
- **WHEN** viewport width 640px-1023px
- **THEN** system displays 2-column grid

#### Scenario: Mobile layout
- **WHEN** viewport width < 640px
- **THEN** system displays 1-column card layout

### Requirement: Price display with discount
The system SHALL display OriginPrice (strikethrough) + Price + Discount badge when Discount > 0.

#### Scenario: Display with discount
- **WHEN** product has OriginPrice=100000, Price=80000, Discount=20
- **THEN** system displays: <del>100.000₫</del> 80.000₫ -20%

#### Scenario: Display without discount
- **WHEN** product has OriginPrice=100000, Price=100000, Discount=0
- **THEN** system displays: 100.000₫

### Requirement: Quantity and ticket display
The system SHALL display Quantity, QuantitySold, and NumberofTickets.

#### Scenario: Display with limited quantity
- **WHEN** product has Quantity=50, QuantitySold=10, NumberofTickets=5
- **THEN** system displays: Còn: 50 | Đã bán: 10 | Vé/sp: 5

#### Scenario: Display with unlimited quantity
- **WHEN** product has Quantity=-1, QuantitySold=10, NumberofTickets=5
- **THEN** system displays: Còn: ∞ | Đã bán: 10 | Vé/sp: 5

### Requirement: Product card clickable
The system SHALL make each product card navigate to product detail page.

#### Scenario: Click product card
- **WHEN** user clicks product card
- **THEN** system navigates to /san-pham/{slug}

### Requirement: Sortable columns
The system SHALL allow sorting by Name, Price, Discount, Quantity.

#### Scenario: Sort by price
- **WHEN** user clicks Price column header
- **THEN** system sorts products by Price ascending/descending
