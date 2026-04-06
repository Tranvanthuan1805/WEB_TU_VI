# bind-after-migration Specification

## Purpose
TBD - created by archiving change fix-bind-after-and-published-availability. Update Purpose after archive.
## Requirements
### Requirement: Use @bind:after for Price and Discount Inputs

The ProductManager editor form SHALL use `@bind:after` instead of `@oninput` for OriginPrice, Price, and Discount inputs to ensure the handler receives the correctly bound value.

#### Scenario: OriginPrice changed
- **WHEN** user changes OriginPrice value and focus leaves the input
- **THEN** `OnOriginPriceChanged` is called with the new value already bound to `_originPriceInput`

#### Scenario: Price changed
- **WHEN** user changes Price value and focus leaves the input
- **THEN** `OnPriceChanged` is called with the new value already bound to `_priceInput`

#### Scenario: Discount changed
- **WHEN** user changes Discount value and focus leaves the input
- **THEN** `OnDiscountChanged` is called with the new value already bound to `_editModel.Discount`

### Requirement: Handler Method Signature

The handler methods SHALL NOT require ChangeEventArgs parameter since `@bind:after` provides the value directly through binding.

#### Scenario: OnOriginPriceChanged signature
- **WHEN** the method is called via `@bind:after`
- **THEN** it has no parameters and reads `_originPriceInput` directly

#### Scenario: OnPriceChanged signature
- **WHEN** the method is called via `@bind:after`
- **THEN** it has no parameters and reads `_priceInput` directly

#### Scenario: OnDiscountChanged signature
- **WHEN** the method is called via `@bind:after`
- **THEN** it has no parameters and reads `_editModel.Discount` directly

