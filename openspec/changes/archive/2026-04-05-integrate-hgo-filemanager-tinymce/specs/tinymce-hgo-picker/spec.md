# tinymce-hgo-picker Specification

## Purpose

Enable image browsing and uploading in TinyMCE editor via HGO File Manager, replacing the native browser file picker that crashes Blazor Server.

## Requirements

### Requirement: Admin can browse images via HGO File Manager from TinyMCE
When the admin clicks the "Browse" button in TinyMCE's Image dialog, a modal SHALL open displaying the HGO File Manager. The modal SHALL show all images in the FileServer directory. The admin SHALL be able to navigate folders, upload new images, and select existing images.

#### Scenario: Open file picker from TinyMCE Image dialog
- **WHEN** admin clicks "Browse" in TinyMCE's Image dialog
- **THEN** a modal opens showing HGO File Manager with images from FileServer

#### Scenario: File picker modal has close button
- **WHEN** the file picker modal is open
- **THEN** admin can close it by clicking the close button or pressing Escape

### Requirement: Selected image URL is inserted into TinyMCE
When the admin double-clicks an image in HGO File Manager, the image URL SHALL be sent to the parent page and inserted into the "Source" field of the open TinyMCE Image dialog. The file picker modal SHALL close automatically after selection.

#### Scenario: Double-click image inserts URL
- **WHEN** admin double-clicks an image in HGO File Manager
- **THEN** the image URL (e.g., `/contents/image-name.jpg`) is inserted into TinyMCE's Image dialog Source field
- **AND** the file picker modal closes

#### Scenario: Selected URL uses correct path format
- **WHEN** an image is selected from HGO File Manager
- **THEN** the URL uses the format `/contents/{filename}` matching the StaticFiles configuration

### Requirement: HGO File Manager supports image upload
The HGO File Manager displayed in the file picker modal SHALL support uploading new images. Uploaded images SHALL be saved to the FileServer directory and immediately available for selection.

#### Scenario: Upload new image from file picker
- **WHEN** admin uploads an image via HGO File Manager's upload feature
- **THEN** the image is saved to FileServer and appears in the file list

### Requirement: Drag & drop and paste image upload remain functional
The existing drag & drop and paste image upload functionality in TinyMCE SHALL continue to work unchanged. These features use the `/api/tinymce/upload-image` endpoint via HTTP POST and are not affected by the file picker change.

#### Scenario: Drag & drop image uploads successfully
- **WHEN** admin drags an image file into the TinyMCE editor
- **THEN** the image is uploaded via `/api/tinymce/upload-image` and inserted into the editor

#### Scenario: Paste image uploads successfully
- **WHEN** admin pastes an image from clipboard into the TinyMCE editor
- **THEN** the image is uploaded via `/api/tinymce/upload-image` and inserted into the editor

### Requirement: File picker is restricted to administrators
The file picker page and the HGO File Manager SHALL only be accessible to users with the Administrator role. Both the Blazor wrapper page and the standalone Razor Page SHALL have `[Authorize(Roles = RoleName.Administrator)]`.

#### Scenario: Non-admin cannot access file picker
- **WHEN** a non-admin user navigates to `/admin/file-explorer`
- **THEN** access is denied

### Requirement: File picker modal integrates with TinyMCE Image dialog
The file picker callback SHALL store a reference to the TinyMCE callback function. When an image is selected, the callback SHALL be invoked with the image URL, which TinyMCE uses to populate the Image dialog.

#### Scenario: Callback receives image URL
- **WHEN** image is selected in HGO File Manager
- **THEN** the stored TinyMCE callback is invoked with the image URL
- **AND** TinyMCE updates the Image dialog Source field
