# config-button-states Specification

## Purpose
TBD - created by archiving change fix-config-button-states. Update Purpose after archive.
## Requirements
### Requirement: Seed buttons use separate state variables
The system SHALL use two separate boolean variables `_isCreatingSeed` and `_isDeletingSeed` to track the state of each seed button independently.

#### Scenario: Create seed button shows correct state
- **WHEN** user clicks "Tạo Seed Data" button
- **THEN** button text changes to "Đang tạo..." and both buttons become disabled

#### Scenario: Delete seed button shows correct state
- **WHEN** user clicks "Xóa Seed Data" button
- **THEN** button text changes to "Đang xóa..." and both buttons become disabled

#### Scenario: Both buttons enabled when idle
- **WHEN** no seed operation is in progress
- **THEN** both buttons are enabled and show their default labels

### Requirement: SaveVnPayConfig requires confirmation
The system SHALL show a confirmation dialog before saving VNPay configuration to prevent accidental changes.

#### Scenario: Save with confirmation
- **WHEN** user clicks "Lưu" button and confirms in dialog
- **THEN** configuration is saved and success toast is shown

#### Scenario: Save cancelled
- **WHEN** user clicks "Lưu" button but cancels the confirmation dialog
- **THEN** configuration is not changed and no toast is shown

