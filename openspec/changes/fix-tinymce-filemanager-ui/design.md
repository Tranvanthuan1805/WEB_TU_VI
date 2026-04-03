## Context

The project is a .NET 10 Blazor Server + WebAssembly application with PostgreSQL database. The post-crud change was implemented but three issues were found:

1. **TinyMCE not working**: Manager.razor uses plain `<InputTextArea>` with id `tinymce-editor` but TinyMCE is never initialized. The `TinyMCE.Blazor` package (v2.2.1) is already installed but unused. The `tinymce.min.js` script is loaded in App.razor line 26 but does nothing without the Blazor component wrapper.

2. **No file manager**: Admins have no way to browse or manage files in `wwwroot/FileServer`. The `HGO.ASPNetCore.FileManager` package needs to be added.

3. **Toast/ConfirmDialog placement**: AdminLayout.razor places `<Toast />` and `<ConfirmDialog />` at lines 13-14 **outside** the `<div data-theme="admin">` container (lines 4-11). These components use Tailwind theme classes like `bg-surface-container-low` which depend on CSS custom properties defined in `[data-theme="admin"]`. Being outside the container means they get no theme styling.

The AdminNavMenu is in Web.Client project (not Web), so navigation link changes must be made there.

## Goals / Non-Goals

**Goals:**
- TinyMCE rich text editor works in Manager.razor with image upload support
- Images uploaded via TinyMCE saved to `wwwroot/FileServer/img/`
- Admin File Explorer page using HGO.ASPNetCore.FileManager for managing `wwwroot/FileServer`
- Toast and ConfirmDialog render correctly with admin theme styling

**Non-Goals:**
- No video/audio upload support in TinyMCE (images only)
- No file type restrictions beyond image validation for TinyMCE uploads
- File Manager is read/write for all files under FileServer (no granular permissions)
- No changes to post-crud database logic or business rules

## Decisions

**1. TinyMCE.Blazor over manual initialization**
- Use `TinyMCE.Blazor` package component instead of manual JS interop
- The package is already installed and handles script loading, initialization, and content binding
- Remove the manual `<script src="tinymce.min.js">` from App.razor to avoid double-loading
- Decision rationale: Cleaner Blazor integration, less maintenance, proper two-way binding

**2. Image upload via custom API endpoint**
- Create `TinyMceImageUploadController` with endpoint `POST /api/tinymce/upload-image`
- TinyMCE's `images_upload_handler` calls this endpoint via JS interop
- Endpoint returns `{ location: "/FileServer/img/{filename}" }` (TinyMCE standard format)
- Files saved with GUID names to avoid collisions: `{Guid.NewGuid():N}{extension}`
- Decision rationale: Server-side Blazor can't directly handle TinyMCE's JS upload flow; API endpoint is the cleanest bridge

**3. HGO.ASPNetCore.FileManager integration**
- Use MVC controller pattern for HGO API endpoint (required by the library)
- RootFolder set to `Path.Combine(env.ContentRootPath, "wwwroot", "FileServer")`
- File Explorer page uses `@await Component.InvokeAsync("FileManagerComponent", ...)` 
- jQuery added via CDN (simpler than libman for a single dependency)
- Decision rationale: HGO.FileManager requires jQuery and MVC controller pattern; CDN is simplest for jQuery

**4. Toast/ConfirmDialog inside theme container**
- Move `<Toast />` and `<ConfirmDialog />` inside the `<div data-theme="admin">` in AdminLayout
- This ensures they inherit all CSS custom properties from the admin theme
- Decision rationale: Minimal change, no CSS rewrite needed

**5. TinyMCE configuration**
- Plugins: `image link lists code table anchor`
- Toolbar: `undo redo | bold italic | alignleft aligncenter alignright | image link | code`
- Max image size: 5MB
- Allowed image types: jpg, jpeg, png, gif, webp
- Decision rationale: Standard editor feature set for blog/article content

## Risks / Trade-offs

**[Risk] TinyMCE.Blazor script conflict** → The manual `tinymce.min.js` in App.razor may conflict with the package's built-in loading. Mitigation: Remove the manual script tag from App.razor.

**[Risk] jQuery version conflicts** → If other parts of the app use jQuery, version mismatch could occur. Mitigation: Check existing jQuery usage; use a compatible version. Currently no jQuery in the project.

**[Risk] HGO.FileManager MVC dependency** → The library requires `AddControllersWithViews()` and MVC routing. Mitigation: The project already uses `MapRazorComponents()`, adding `AddControllers()` should not conflict.

**[Risk] FileServer directory not created** → If `wwwroot/FileServer/img/` doesn't exist, uploads fail. Mitigation: Create directory on first upload if it doesn't exist.

**[Trade-off] GUID filenames** → User-unfriendly filenames but zero collision risk. Acceptable for admin-managed assets.

**[Trade-off] CDN for jQuery** → Requires internet connection for admin pages. Acceptable since admin is internet-facing.
