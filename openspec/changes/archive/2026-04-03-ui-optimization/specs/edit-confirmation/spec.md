## ADDED Requirements

### Requirement: Confirmation before saving edited posts
When saving an edited post in the admin Manager, the system SHALL display a confirmation dialog with the message "Xác nhận cập nhật" before persisting changes. The save SHALL only proceed if the user confirms. Creating a new post SHALL NOT require confirmation (no existing data to overwrite).

#### Scenario: Edit save requires confirmation
- **WHEN** admin edits an existing post and clicks "Cập nhật"
- **THEN** a confirmation dialog appears asking "Xác nhận cập nhật"

#### Scenario: Confirmed edit proceeds to save
- **WHEN** admin confirms the update dialog
- **THEN** the post is saved and a success toast is displayed

#### Scenario: Cancelled edit does not save
- **WHEN** admin cancels the update dialog
- **THEN** the post is NOT saved and the editor remains open

#### Scenario: Create mode skips confirmation
- **WHEN** admin creates a new post and clicks "Tạo mới"
- **THEN** the post is saved directly without a confirmation dialog
