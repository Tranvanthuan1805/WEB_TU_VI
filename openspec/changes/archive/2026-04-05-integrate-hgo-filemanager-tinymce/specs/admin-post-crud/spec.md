# admin-post-crud Specification Delta

## Purpose

Delta spec for TinyMCE editor image file picker integration with elFinder.

## Modified Requirements

### Modified Requirement: Admin can create a new post
The admin SHALL be able to create a new post via a modal form. The form SHALL include fields: Title, Content (TinyMCE rich text editor), Slug (auto-generated but editable), Description (auto-generated but editable), and Published (checkbox).

**ADDED:** The TinyMCE editor SHALL support image insertion via elFinder file manager. When the admin clicks "Browse" in TinyMCE's Image dialog, a popup window opens with elFinder for browsing and uploading files. The selected image URL is inserted into the Image dialog via postMessage. Drag & drop and paste image upload SHALL continue to work via the `/api/tinymce/upload-image` endpoint.

#### Scenario: Browse images via elFinder in TinyMCE
- **WHEN** admin clicks "Browse" in TinyMCE's Image dialog during post creation
- **THEN** a popup window opens showing elFinder file manager
- **AND** admin can select or upload an image
- **AND** the image URL is inserted into the Image dialog

### Modified Requirement: Admin can edit an existing post
The admin SHALL be able to edit an existing post via the same modal form pre-populated with current values.

**ADDED:** The TinyMCE editor SHALL support image insertion via elFinder during post editing, with the same behavior as post creation.

#### Scenario: Browse images via elFinder in TinyMCE during edit
- **WHEN** admin clicks "Browse" in TinyMCE's Image dialog during post editing
- **THEN** a popup window opens showing elFinder file manager
- **AND** admin can select or upload an image
- **AND** the image URL is inserted into the Image dialog
