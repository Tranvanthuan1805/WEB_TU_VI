## Why

Three issues were identified in the post-crud implementation:

1. **TinyMCE not functional**: The Post editor in Manager.razor uses a plain `<InputTextArea>` instead of the TinyMCE.Blazor component. The TinyMCE JS script is loaded but never initialized, so users cannot use rich text editing or insert images.
2. **No file management**: There is no way for admins to browse, upload, or manage files in `wwwroot/FileServer`. A file manager page is needed for managing uploaded assets.
3. **Toast and ConfirmDialog not rendering**: The Toast and ConfirmDialog components are placed outside the `data-theme="admin"` container in AdminLayout, so they don't inherit theme CSS variables and may not display correctly.

## What Changes

- Replace plain `<InputTextArea>` with `<TinyMceBlazor>` component in Manager.razor editor
- Add TinyMCE image upload handler pointing to a new API endpoint that saves images to `wwwroot/FileServer/img/`
- Remove redundant TinyMCE script tag from App.razor (TinyMCE.Blazor handles loading)
- Add HGO.ASPNetCore.FileManager NuGet package and configure services
- Create new File Explorer admin page at `/admin/file-explorer`
- Add jQuery dependency (required by HGO.FileManager)
- Move Toast and ConfirmDialog components inside the admin theme container in AdminLayout
- Create navigation link for File Explorer in AdminNavMenu

## Capabilities

### New Capabilities
- `tinymce-image-upload`: TinyMCE image upload API endpoint and handler, saving images to wwwroot/FileServer/img/
- `admin-file-explorer`: HGO.ASPNetCore.FileManager integration for browsing/managing files in wwwroot/FileServer
- `shared-ui-fix`: Fix Toast and ConfirmDialog rendering by placing them inside the admin theme container

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Packages added**: HGO.ASPNetCore.FileManager (NuGet), jQuery (via libman or CDN)
- **Files created**: TinyMceImageUploadController.cs, FileManagerController.cs, FileExplorer.razor
- **Files modified**: Manager.razor (TinyMCE component), App.razor (remove tinymce script), AdminLayout.razor (Toast/ConfirmDialog placement), Program.cs (HGO services)
- **Routes added**: `/admin/file-explorer` (File Explorer page), `/api/tinymce/upload-image` (image upload endpoint)
- **Database**: No schema changes
