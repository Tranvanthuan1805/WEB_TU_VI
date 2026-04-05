# elfinder-file-picker Specification

## Purpose

Enable image browsing and uploading in TinyMCE editor via elFinder file manager popup, replacing the native browser file picker that crashes Blazor Server.

## Requirements

### Requirement: Admin can browse images via elFinder popup from TinyMCE
When the admin clicks the "Browse" button in TinyMCE's Image dialog, a popup window SHALL open displaying the elFinder file manager. The popup SHALL show all files in the FileServer directory. The admin SHALL be able to navigate folders, upload new files, and select existing images.

#### Scenario: Open file picker from TinyMCE Image dialog
- **WHEN** admin clicks "Browse" in TinyMCE's Image dialog
- **THEN** a popup window opens showing elFinder file manager with files from FileServer

#### Scenario: File picker popup has standard window controls
- **WHEN** the file picker popup is open
- **THEN** admin can close it using the browser window close button

### Requirement: Selected image URL is inserted into TinyMCE
When the admin double-clicks an image in elFinder, the image URL SHALL be sent to the parent window via `postMessage` and inserted into the "Source" field of the open TinyMCE Image dialog. The popup window SHALL close automatically after selection.

#### Scenario: Double-click image inserts URL
- **WHEN** admin double-clicks an image in elFinder
- **THEN** the image URL is inserted into TinyMCE's Image dialog Source field
- **AND** the file picker popup closes

#### Scenario: Selected URL uses correct path format
- **WHEN** an image is selected from elFinder
- **THEN** the URL uses the format `/contents/{filename}` matching the StaticFiles configuration

### Requirement: elFinder supports file upload
The elFinder file manager displayed in the popup SHALL support uploading new files. Uploaded files SHALL be saved to the FileServer directory and immediately available for selection.

#### Scenario: Upload new file from elFinder
- **WHEN** admin uploads a file via elFinder's upload feature
- **THEN** the file is saved to FileServer and appears in the file list

### Requirement: Drag & drop and paste image upload remain functional
The existing drag & drop and paste image upload functionality in TinyMCE SHALL continue to work unchanged. These features use the `/api/tinymce/upload-image` endpoint via HTTP POST and are not affected by the file picker change.

#### Scenario: Drag & drop image uploads successfully
- **WHEN** admin drags an image file into the TinyMCE editor
- **THEN** the image is uploaded via `/api/tinymce/upload-image` and inserted into the editor

#### Scenario: Paste image uploads successfully
- **WHEN** admin pastes an image from clipboard into the TinyMCE editor
- **THEN** the image is uploaded via `/api/tinymce/upload-image` and inserted into the editor

### Requirement: File picker is restricted to administrators
The file picker page and the elFinder connector endpoint SHALL only be accessible to users with the Administrator role. Both the Razor Page and the controller SHALL have `[Authorize(Roles = RoleName.Administrator)]`.

#### Scenario: Non-admin cannot access file picker
- **WHEN** a non-admin user navigates to `/admin/elfinder/browse`
- **THEN** access is denied

### Requirement: File picker integrates with TinyMCE Image dialog
The `file_picker_callback` SHALL open a popup window to the elFinder browse page. When an image is selected via elFinder's `getFileCallback`, a `postMessage` SHALL be sent to the parent window. The parent window SHALL listen for the message, extract the file URL, and pass it to the stored TinyMCE callback.

#### Scenario: Callback receives image URL via postMessage
- **WHEN** image is selected in elFinder
- **THEN** `postMessage({ mceAction: 'fileSelected', file: { url: '...' } })` is sent to parent
- **AND** TinyMCE updates the Image dialog Source field with the URL

### Requirement: JS libraries are served locally via libman
All JavaScript and CSS libraries required for elFinder (elFinder, jQuery, jQuery UI) SHALL be downloaded and served from `wwwroot/lib/` using libman. No CDN dependencies SHALL be used.

#### Scenario: elFinder libraries load from local path
- **WHEN** the file picker popup loads
- **THEN** all JS/CSS files are loaded from `/lib/elfinder/`, `/lib/jquery/`, `/lib/jquery-ui/`
