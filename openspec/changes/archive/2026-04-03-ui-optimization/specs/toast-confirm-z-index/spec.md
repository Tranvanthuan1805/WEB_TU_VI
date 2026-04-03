## MODIFIED Requirements

### Requirement: Toast and ConfirmDialog z-index
The Toast and ConfirmDialog components SHALL use `z-[9999]` CSS class to ensure they render above all overlay modals (editor modal uses `z-100`). Both components SHALL be visible at all times regardless of which modal is open.

#### Scenario: Toast visible above editor modal
- **WHEN** an editor modal is open and a toast notification is triggered
- **THEN** the toast renders above the editor modal overlay

#### Scenario: ConfirmDialog visible above editor modal
- **WHEN** an editor modal is open and a confirmation dialog is triggered
- **THEN** the confirmation dialog renders above the editor modal overlay
