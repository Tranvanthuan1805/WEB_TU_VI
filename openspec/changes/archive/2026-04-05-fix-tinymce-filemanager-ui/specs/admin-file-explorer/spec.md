## ADDED Requirements

### Requirement: HGO.ASPNetCore.FileManager service registration
The application SHALL register HGO.ASPNetCore.FileManager services in Program.cs using `builder.Services.AddHgoFileManager()` and `app.UseHgoFileManager()`. The application SHALL include `AddControllers()` or `AddControllersWithViews()` to support the MVC controller pattern required by the library.

#### Scenario: Services registered successfully
- **WHEN** the application starts
- **THEN** HGO FileManager services are available in the DI container

### Requirement: File Manager API controller
The system SHALL provide an MVC controller with a `HgoApi` action method that processes file manager commands. The controller SHALL inject `IFileManagerCommandsProcessor` and delegate all commands to `_processor.ProcessCommandAsync()`. The endpoint SHALL handle both GET and POST requests.

#### Scenario: Process file manager command
- **WHEN** the file manager component sends a command to the HgoApi endpoint
- **THEN** the command is processed and the result is returned

### Requirement: File Explorer admin page
The system SHALL provide an admin page at route `/admin/file-explorer` that displays the HGO.ASPNetCore.FileManager component. The component SHALL be configured with RootFolder pointing to `wwwroot/FileServer`. The page SHALL include jQuery reference (required dependency) and HGO FileManager CSS/JS references. The page SHALL use `@rendermode InteractiveServer` and be restricted to Administrator role.

#### Scenario: View file explorer page
- **WHEN** admin navigates to /admin/file-explorer
- **THEN** the HGO FileManager component is displayed showing files in wwwroot/FileServer

#### Scenario: File manager operations work
- **WHEN** admin uses the file manager to upload, rename, delete, or download files
- **THEN** the operations succeed on files within wwwroot/FileServer

### Requirement: jQuery dependency
jQuery SHALL be available on the File Explorer page. It SHALL be loaded via CDN before the HGO FileManager JavaScript files. The CDN URL SHALL be `https://code.jquery.com/jquery-3.7.1.min.js` or a compatible version.

#### Scenario: jQuery loaded for file manager
- **WHEN** the File Explorer page loads
- **THEN** jQuery is available before HGO FileManager scripts execute

### Requirement: File Explorer navigation link
The AdminNavMenu SHALL include a navigation link to the File Explorer page at `/admin/file-explorer`. The link SHALL display an appropriate icon (folder or file) and label "Quản lý file" or "File Manager".

#### Scenario: File Explorer visible in admin navigation
- **WHEN** admin views the navigation menu
- **THEN** a link to File Explorer is displayed between existing navigation items
