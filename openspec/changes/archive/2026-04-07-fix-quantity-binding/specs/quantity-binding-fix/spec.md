## ADDED Requirements

### Requirement: UI re-renders when Quantity changes
When user modifies Quantity value in Product or Ticket edit form, the UI SHALL re-render to update IsAvailable state and Published checkbox disabled state.

#### Scenario: Product Quantity decreased to sold out
- **WHEN** user changes Product Quantity from 10 to 5 when QuantitySold = 5
- **AND** form is in edit mode
- **THEN** IsAvailable becomes false
- **AND** Published checkbox becomes disabled

#### Scenario: Product Quantity increased from sold out
- **WHEN** user changes Product Quantity from 5 to 10 when QuantitySold = 5
- **AND** form is in edit mode
- **THEN** IsAvailable becomes true
- **AND** Published checkbox enabled state reflects _published value

#### Scenario: Ticket Quantity depleted
- **WHEN** user changes Ticket Quantity from 10 to 3 when QuantityUsed = 7
- **AND** form is in edit mode
- **THEN** IsAvailable becomes false
- **AND** Published checkbox becomes disabled