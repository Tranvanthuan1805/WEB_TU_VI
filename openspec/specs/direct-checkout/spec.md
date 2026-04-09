# direct-checkout Specification

## Purpose
TBD - created by archiving change vnpay-checkout-flow. Update Purpose after archive.
## Requirements
### Requirement: Direct checkout via URL parameter
The system SHALL allow direct checkout by passing `productId` as a query parameter to the checkout page.

#### Scenario: Direct checkout with valid product
- **WHEN** user navigates to `/checkout?productId=X` where X is a valid published product
- **THEN** page displays product details (name, price, discount, quantity, tickets)
- **AND** quantity selector shows default value of 1
- **AND** payment button is enabled

#### Scenario: Direct checkout with invalid productId
- **WHEN** user navigates to `/checkout?productId=X` where X does not exist
- **THEN** page displays "Không tìm thấy sản phẩm" message

#### Scenario: Direct checkout with unpublished product
- **WHEN** user navigates to `/checkout?productId=X` where product exists but Published = false
- **THEN** page displays "Không tìm thấy sản phẩm" message

#### Scenario: Direct checkout with unavailable product
- **WHEN** user navigates to `/checkout?productId=X` where product has zero available quantity
- **THEN** page displays "Không tìm thấy sản phẩm" message

#### Scenario: Checkout without productId
- **WHEN** user navigates to `/checkout` without query parameter
- **THEN** page displays "Không tìm thấy sản phẩm" message

