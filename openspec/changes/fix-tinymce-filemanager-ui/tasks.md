## 1. Fix Toast and ConfirmDialog Rendering

- [x] 1.1 Move `<Toast />` and `<ConfirmDialog />` inside `<div data-theme="admin">` in AdminLayout.razor
- [x] 1.2 Verify Toast and ConfirmDialog display correctly with admin theme colors

## 2. Integrate TinyMCE.Blazor with Image Upload

- [x] 2.1 Remove `<script src="tinymce.min.js">` from App.razor
- [x] 2.2 Create TinyMceImageUploadController.cs with POST /api/tinymce/upload-image endpoint
- [x] 2.3 Configure endpoint to validate image type (jpg/jpeg/png/gif/webp) and size (max 5MB)
- [x] 2.4 Save uploaded images to wwwroot/FileServer/img/ with GUID filenames
- [x] 2.5 Return TinyMCE-compatible JSON response { location: "/FileServer/img/{filename}" }
- [x] 2.6 Create wwwroot/FileServer/img/ directory if not exists
- [x] 2.7 Replace InputTextArea with TinyMceBlazor component in Manager.razor editor
- [x] 2.8 Configure TinyMCE plugins: image, link, lists, code, table, anchor
- [x] 2.9 Configure TinyMCE toolbar with image upload button
- [x] 2.10 Set up TinyMCE images_upload_handler to call the upload API endpoint
- [x] 2.11 Bind TinyMCE content to _editorContent / _editModel.Content

## 3. Add HGO.ASPNetCore.FileManager

- [x] 3.1 Add NuGet package HGO.ASPNetCore.FileManager
- [x] 3.2 Register HGO services in Program.cs (AddHgoFileManager, UseHgoFileManager)
- [x] 3.3 Ensure AddControllers() is configured for MVC support
- [x] 3.4 Create FileManagerController.cs with HgoApi action method
- [x] 3.5 Create FileExplorer.razor page at /admin/file-explorer with FileManagerComponent
- [x] 3.6 Configure FileExplorer RootFolder to wwwroot/FileServer
- [x] 3.7 Add jQuery CDN reference to FileExplorer page (before HGO scripts)
- [x] 3.8 Add RenderHgoFileManagerCss and RenderHgoFileManagerJavaScripts calls
- [x] 3.9 Add File Explorer navigation link to AdminNavMenu.razor (both desktop and mobile menus)
