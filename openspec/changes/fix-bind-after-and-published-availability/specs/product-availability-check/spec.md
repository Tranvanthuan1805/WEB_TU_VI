## ADDED Requirements

### Requirement: Product Availability Check

The ProductManager SHALL provide a helper method `IsProductAvailable()` that determines if a product is available for purchase. A product is available when Quantity is unlimited (-1) OR QuantitySold is less than Quantity.

#### Scenario: Unlimited quantity product
- **WHEN** Product has Quantity = -1
- **THEN** IsProductAvailable() returns true

#### Scenario: Product with remaining stock
- **WHEN** Product has Quantity = 100 and QuantitySold = 50
- **THEN** IsProductAvailable() returns true

#### Scenario: Product out of stock
- **WHEN** Product has Quantity = 100 and QuantitySold = 100
- **THEN** IsProductAvailable() returns false

### Requirement: Published Checkbox Disabled When Out of Stock

The ProductManager editor form SHALL disable the Published checkbox when the product is not available (out of stock). The checkbox SHALL NOT be editable when disabled.

#### Scenario: Create form with out of stock
- **WHEN** user enters Quantity > 0 and QuantitySold >= Quantity
- **THEN** Published checkbox is disabled

#### Scenario: Edit form with out of stock
- **WHEN** editing an existing product that is out of stock
- **THEN** Published checkbox is disabled

### Requirement: Hint Text for Disabled Published

When the Published checkbox is disabled due to out of stock, a hint message SHALL be displayed: "Không thể xuất bản — sản phẩm đã hết hàng"

#### Scenario: Out of stock hint display
- **WHEN** product is out of stock
- **THEN** hint text "Không thể xuất bản — sản phẩm đã hết hàng" is shown

### Requirement: Active Count Uses Availability Check

The statistics row "Đang hoạt động" SHALL count products where IsProductAvailable() returns true, not just where Published = true.

#### Scenario: Active count calculation
- **WHEN** UpdateCounts() is called
- **THEN** _activeCount equals count of products where IsProductAvailable() is true