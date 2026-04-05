## Why

TinyMCE image file picker crashes the Blazor Server process (exit code -1) when users select images via the native browser file dialog. HGO.ASPNetCore.FileManager v1.0.7 was attempted as a replacement but fails completely — all 15 embedded static files return 404, making the component unusable on .NET 10.

elFinder.NetCore v1.6.0 has been integrated into the project as the replacement file manager:
- `FileManagerController.cs` — connector and thumbnail endpoints at `/file-manager`, `/file-manager-connector`, `/file-manager-thumb/{hash}`
- `Views/FileManager/Index.cshtml` — elFinder UI with jQuery
- JS libraries via libman (elfinder, jquery, jquery-ui)

The TinyMCE drag & drop and paste image upload works correctly via HTTP POST to `/api/tinymce/upload-image`. A custom "Browse Files" toolbar button (`elfinder`) has been added to TinyMCE using elFinder's dialog mode (`dialogelfinder`) via a JS config object loaded through `JsConfSrc`.

## What Changes

- Replace HGO.ASPNetCore.FileManager with elFinder.NetCore v1.6.0
- Add elFinder custom toolbar button to TinyMCE via `JsConfSrc` pointing to JS config object
- elFinder opens as jQuery UI dialog (not popup) — avoids browser popup blocking
- Keep drag & drop and paste image upload working as before

## Capabilities

### New Capabilities
- `elfinder-file-picker`: elFinder file manager as TinyMCE custom toolbar button using jQuery UI dialog mode via `JsConfSrc`

### Modified Capabilities
- `admin-post-crud`: TinyMCE editor in post create/edit now has elFinder toolbar button for image browsing

## Impact

- `Web/Web/Web.csproj` — elFinder.NetCore v1.6.0 package
- `Web/Web/libman.json` — elfinder, jquery, jquery-ui libraries
- `Web/Web/Controllers/FileManagerController.cs` — elFinder connector + thumbnail endpoints
- `Web/Web/Views/FileManager/Index.cshtml` — elFinder UI (standalone page)
- `Web/Web/Components/Pages/Admin/Manager.razor` — TinyMCE config with `JsConfSrc="elfinderTinyMceConfig"` and `elfinder` in toolbar
- `Web/Web/wwwroot/js/elfinder-tinymce-config.js` — JS config object with `setup` callback and `elfinderDialog()` function
- `Web/Web/Components/App.razor` — elFinder CSS/JS references
- `Web/Web/Components/Pages/Admin/FileExplorer.razor` — iframe wrapper to `/file-manager`
- `Web/Web/Program.cs` — HGO removed
