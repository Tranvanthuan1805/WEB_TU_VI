## 1. elFinder Backend & Frontend (Already Done)

- [x] 1.1 `FileManagerController.cs` — connector + thumbnail endpoints with `[Authorize(Roles = RoleName.Administrator)]` at `/file-manager`, `/file-manager-connector`, `/file-manager-thumb/{hash}`
- [x] 1.2 `Views/FileManager/Index.cshtml` — elFinder UI with jQuery
- [x] 1.3 JS libraries via libman (elfinder, jquery, jquery-ui)
- [x] 1.4 `elFinder.NetCore` v1.6.0 package in `Web.csproj`
- [x] 1.5 HGO removed from `Program.cs`
- [x] 1.6 `FileExplorer.razor` created with iframe src to `/file-manager`

## 2. elFinder TinyMCE Integration via JsConfSrc

- [x] 2.1 Create `wwwroot/js/elfinder-tinymce-config.js` — JS config object `window.elfinderTinyMceConfig` with `setup` callback registering custom toolbar button
- [x] 2.2 Add `elfinderDialog()` function using jQuery UI `dialogelfinder` mode (not popup)
- [x] 2.3 Add `getFileCallback` in dialog config → `editor.insertContent('<img src="..." />')`
- [x] 2.4 Add elFinder CSS/JS references to `App.razor` — `elfinder.full.css`, `theme.min.css`, `elfinder-tinymce-config.js`, `elfinder.min.js`

## 3. TinyMCE Config Update

- [x] 3.1 Remove `file_picker_callback` from `_tinymceConfig` in `Manager.razor`
- [x] 3.2 Add `JsConfSrc="elfinderTinyMceConfig"` to TinyMCE Editor component
- [x] 3.3 Add `elfinder` to toolbar string in `_tinymceConfig`
- [x] 3.4 Build project: `dotnet build Web/Web/Web.csproj` — 0 errors
- [ ] 3.5 Test: drag & drop image into TinyMCE → uploads successfully
- [ ] 3.6 Test: paste image into TinyMCE → uploads successfully
- [ ] 3.7 Test: click elFinder toolbar button → jQuery UI dialog opens
- [ ] 3.8 Test: select image in elFinder dialog → `<img>` inserted into TinyMCE editor
- [ ] 3.9 Test: no server crash on any file selection method
