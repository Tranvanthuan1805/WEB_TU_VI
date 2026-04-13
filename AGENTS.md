# AGENTS.md - Project-2026

## Project Overview

.NET 10 Blazor Server + WebAssembly hybrid app with PostgreSQL. Vietnamese-language astrology/horoscope site with admin panel.

**Structure:**
- `Web/Web/` — Server project (API, Blazor Server, Razor Pages, Controllers)
- `Web/Web.Client/` — WASM client project (shared components, admin nav)
- `Web/Web/wwwroot/` — Static assets (CSS, JS, TinyMCE libs)
- `Web/Web/vite-project/` — Tailwind CSS build pipeline

## Build / Run / Test

```bash
# Build
dotnet build Web/Web/Web.csproj

# Run (dev server with hot reload)
dotnet watch run --project Web/Web/Web.csproj

# Run (no hot reload)
dotnet run --project Web/Web/Web.csproj

# EF Core migrations
dotnet ef migrations add <Name> --project Web/Web/Web.csproj
dotnet ef database update --project Web/Web/Web.csproj

# No test framework configured yet
```

## CSS Pipeline

Tailwind v4 built via Vite. Source: `Web/Web/vite-project/src/css/`
- `style.css` — main entry, imports theme.css
- `theme.css` — `@theme inline` mappings + `:root` / `[data-theme="admin"]` variables

```bash
cd Web/Web/vite-project
npm install
npm run dev    # watch mode
npm run build  # production build
```

Output goes to `Web/Web/wwwroot/app.css` (auto-served by `MapStaticAssets()`).

**Theme colors** use CSS custom properties — never hardcode colors. Use Tailwind classes like `bg-primary`, `text-on-surface`, `border-outline-variant`. Admin theme activated via `data-theme="admin"` attribute.

## Code Style

### C# Conventions
- **Target:** .NET 10, nullable enabled, implicit usings enabled
- **Naming:** PascalCase for types/members, camelCase for locals/parameters, `_camelCase` for private fields
- **Async:** All I/O methods async with `Async` suffix. Use `await` consistently.
- **Nullability:** Nullable reference types enabled. Use `?` for nullable, `default!` only for DI-injected fields set by framework.
- **Error handling:** try/catch with specific exceptions. Show user-friendly toast messages. Never swallow exceptions silently.

### Blazor Conventions
- **Render mode:** Pages use `@rendermode InteractiveServer` + `@attribute [StreamRendering]`
- **Components:** PascalCase filenames. Place in `Components/Pages/<area>/` or `Components/Shared/`
- **_Imports.razor:** Per-area imports. Admin area has its own `_Imports.razor` with `@layout AdminLayout`
- **Scoped CSS:** Use `.razor.css` files for component-scoped styles (keyframes only)
- **Event handlers:** Use `InvokeAsync(StateHasChanged)` when calling from non-Blazor events (service callbacks, timers)
- **Toast/ConfirmDialog:** Inject `ToastService` / `ConfirmDialogService` via DI. Services are scoped.

### Database
- **EF Core:** Use `IDbContextFactory<AppDBContext>` (injected as `DbFactory` in _Imports)
- **Pattern:** Always `using var context = DbFactory.CreateDbContext();` per operation
- **Database:** PostgreSQL via Npgsql. Connection string from `appsettings.json` key `DBContext`

### API Controllers
- **Location:** `Web/Web/Controllers/`
- **Pattern:** `[ApiController]` + `[Route("api/...")]`
- **Static files:** `FileServer/` served at `/contents` path

### TinyMCE
- **Package:** TinyMCE.Blazor v2.2.1 + TinyMCE v8.4.0 (self-hosted)
- **Script:** `_content/TinyMCE.Blazor/tinymce-blazor.js` in App.razor
- **Local lib:** `wwwroot/lib/tinymce/tinymce.min.js`
- **Usage:** `<Editor LicenseKey="gpl" ScriptSrc="@Assets[\"lib/tinymce/tinymce.min.js\"]" @bind-Value="..." Field="@(() => ...)" Conf="@config" />`
- **Image upload:** `POST /api/tinymce/upload-image` → saves to `wwwroot/FileServer/img/`

### File Manager
- **Package:** HGO.ASPNetCore.FileManager v1.0.7 (requires jQuery via CDN)
- **Root:** `wwwroot/FileServer`
- **Controller:** `FileManagerController` with `HgoApi` action
- **Page:** Razor Page at `Pages/FileExplorer.cshtml` (route: `/admin/file-explorer`)

### Seed Data
- **Location:** `Web/Web/Data/PostSeeder.cs` (static class)
- **Library:** Bogus v35.6.5
- **Marker:** "[Seed Data]" in title for identification/cleanup

## Key Services

| Service | Scope | Purpose |
|---------|-------|---------|
| `ToastService` | Scoped | Show notifications (success/error/warning/info) |
| `ConfirmDialogService` | Scoped | Async confirmation dialogs |
| `IDbContextFactory<AppDBContext>` | Scoped | Create DbContext instances |
| `IFileManagerCommandsProcessor` | Scoped | HGO file operations |

## Important Paths

| Path | Purpose |
|------|---------|
| `Web/Web/Components/Layout/AdminLayout.razor` | Admin layout (wraps all admin pages) |
| `Web/Web/Components/Layout/MainLayout.razor` | Public site layout |
| `Web/Web/Components/Pages/Admin/` | Admin pages |
| `Web/Web/Components/Pages/User/` | Public pages |
| `Web/Web/Components/Shared/` | Shared components (Toast, ConfirmDialog) |
| `Web/Web/Services/` | Service classes |
| `Web/Web/Utilities/` | Utility classes (AppUtilities.GenerateSlug) |
| `Web/Web.Client/Components/Layout/AdminNavMenu.razor` | Admin navigation menu |
| `Web/Web/vite-project/src/css/theme.css` | Theme CSS variables |

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **Project-2026** (7547 symbols, 22470 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/Project-2026/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/Project-2026/context` | Codebase overview, check index freshness |
| `gitnexus://repo/Project-2026/clusters` | All functional areas |
| `gitnexus://repo/Project-2026/processes` | All execution flows |
| `gitnexus://repo/Project-2026/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
