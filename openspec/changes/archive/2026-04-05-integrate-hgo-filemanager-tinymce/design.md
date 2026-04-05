## Context

TinyMCE image file picker crashes Blazor Server (exit code -1) via native `<input type="file">` dialog. HGO.ASPNetCore.FileManager v1.0.7 was attempted but all 15 embedded static files return 404 — middleware incompatible with .NET 10 pipeline.

Current state:
- Drag & drop and paste image uploads work (HTTP POST to `/api/tinymce/upload-image`)
- `TinyMceImageUploadController` has try-catch error handling
- `TinyMCE.Blazor` v2.2.1 + TinyMCE v8.4.0 (self-hosted)
- HGO package installed but non-functional

Constraints:
- Must not break existing drag & drop and paste image upload
- Must work within Blazor Server architecture
- All JS libraries must be local (libman), no CDN dependencies
- Both pages must have `[Authorize(Roles = RoleName.Administrator)]`

## Goals / Non-Goals

**Goals:**
- Replace broken HGO with elFinder.NetCore v1.6.0 for image browsing
- elFinder opens in popup window from TinyMCE's `file_picker_callback`
- Selected image URL returned via `postMessage` to TinyMCE
- All JS libraries served locally via libman
- Keep drag & drop and paste image upload working

**Non-Goals:**
- Not modifying elFinder.NetCore source code
- Not upgrading TinyMCE.Blazor package version
- Not changing the TinyMCE image upload API endpoint
- Not adding new server-side file storage logic

## Decisions

### 1. elFinder.NetCore over HGO
**Decision:** Use elFinder.NetCore v1.6.0 (Nov 2025) instead of HGO v1.0.7.

**Rationale:** elFinder is actively maintained, has .NET 10 compatible demo project, uses local JS libraries (no embedded resources 404 issue), and has built-in TinyMCE integration example with `getFileCallback` → `postMessage`.

**Alternatives considered:**
- Fix HGO static files 404 — not feasible, middleware incompatible with .NET 10
- Custom file browser — more work, less features than elFinder

### 2. Popup window approach
**Decision:** Open elFinder in a popup window via `window.open()` from `file_picker_callback`, communicate via `postMessage`.

**Rationale:** This is the pattern used in elFinder's official TinyMCE demo. Popup is opened from user gesture (click), so browser won't block it. `postMessage` is the standard cross-window communication API.

### 3. Local JS libraries via libman
**Decision:** Use libman to download elFinder, jQuery, jQuery UI to `wwwroot/lib/`.

**Rationale:** No CDN dependency, works offline, consistent with existing TinyMCE libman setup.

### 4. File system root
**Decision:** Use `Path.Combine(ContentRootPath, "FileServer")` as elFinder root, same as current static files configuration.

**Rationale:** Consistent with existing `/contents` static file serving. Images uploaded via TinyMCE go to this directory.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Popup blocked by browser | `window.open()` called from user click event — browsers allow this |
| elFinder theme not matching admin UI | Use default theme; can customize later if needed |
| Thumbnail path mismatch | Configured Root with `/contents/` URL prefix matching static files |
| jQuery conflicts with existing code | elFinder popup is isolated window, no conflict with Blazor page |
