## ADDED Requirements

### Requirement: TinyMCE rich text editor in Post editor
The Manager.razor post editor SHALL use the TinyMCE.Blazor component instead of a plain InputTextArea. The editor SHALL be configured with plugins: image, link, lists, code, table, anchor. The toolbar SHALL include: undo redo, bold italic, alignment options, image, link, and code buttons. The editor content SHALL be bound two-way to the post Content field.

#### Scenario: TinyMCE editor renders in create mode
- **WHEN** admin opens the create post form
- **THEN** a TinyMCE rich text editor is displayed with configured toolbar and plugins

#### Scenario: TinyMCE editor renders in edit mode
- **WHEN** admin opens the edit post form for an existing post
- **THEN** the TinyMCE editor displays the existing post content with full formatting

#### Scenario: Editor content is saved
- **WHEN** admin enters content in TinyMCE and saves the post
- **THEN** the HTML content from TinyMCE is saved to the post Content field

### Requirement: Image upload handler for TinyMCE
The system SHALL provide an API endpoint at `POST /api/tinymce/upload-image` that accepts image file uploads from TinyMCE. The endpoint SHALL validate file type (jpg, jpeg, png, gif, webp) and file size (max 5MB). Uploaded images SHALL be saved to `wwwroot/FileServer/img/` with a GUID-based filename to prevent collisions. The endpoint SHALL return JSON `{ "location": "/FileServer/img/{filename}" }` in the format TinyMCE expects. The directory `wwwroot/FileServer/img/` SHALL be created automatically if it does not exist.

#### Scenario: Successful image upload
- **WHEN** TinyMCE sends an image file "photo.jpg" (2MB) to /api/tinymce/upload-image
- **THEN** the file is saved as a GUID-named file in wwwroot/FileServer/img/ and the response contains `{ "location": "/FileServer/img/{guid}.jpg" }`

#### Scenario: Invalid file type rejected
- **WHEN** a non-image file "document.pdf" is uploaded
- **THEN** the endpoint returns a 400 Bad Request with an error message

#### Scenario: File too large rejected
- **WHEN** an image file larger than 5MB is uploaded
- **THEN** the endpoint returns a 400 Bad Request with an error message

#### Scenario: Image inserted into editor
- **WHEN** an image is successfully uploaded via TinyMCE
- **THEN** the image is inserted into the editor content at the cursor position

### Requirement: Remove redundant TinyMCE script from App.razor
The manual `<script src="tinymce.min.js">` tag SHALL be removed from App.razor. The TinyMCE.Blazor package SHALL handle script loading automatically.

#### Scenario: No duplicate TinyMCE loading
- **WHEN** the application starts
- **THEN** TinyMCE is loaded only once by the TinyMCE.Blazor package, not by App.razor
