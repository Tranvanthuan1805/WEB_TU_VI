## Context

The project is a .NET 10 Blazor Server + WebAssembly application with PostgreSQL database. The Post model already exists in `Web/Web/Models/Post.cs` with fields: PostId, Title, Description, Slug, Content, Published, DateCreated, DateUpdated. The AppDBContext already has a `DbSet<Post> Posts`. The Bogus library (v35.6.5) and TinyMCE.Blazor (v2.2.1) are already installed.

The admin area uses a custom AdminLayout with theme variables defined in `theme.css`. The current Manager.razor page uses mock data. The MainLayout sidebar has a hardcoded "Bài viết mới nhất" section.

## Goals / Non-Goals

**Goals:**
- Complete CRUD for Post in admin with real database operations
- Shared Toast and ConfirmDialog components for admin UX
- Seed data generation for development/testing
- Public post listing and detail pages
- Recent posts in sidebar dynamically loaded

**Non-Goals:**
- No image upload/media management for posts
- No rich text editor for Description field (auto-generated only)
- No post categories/tags system
- No user-level post ownership (all posts are global)
- No WYSIWYG preview before publishing

## Decisions

**1. Component Architecture for Shared UI**
- Toast and ConfirmDialog as standalone Razor components under `Components/Shared/`
- ToastService uses a simple event-based pattern (Action<string, string>) rather than a full DI service
- ConfirmDialog returns `Task<bool>` via TaskCompletionSource for async confirmation
- Decision rationale: Keeps it simple, no external library needed, fits Blazor Server model

**2. Admin CRUD State Management**
- Manager.razor uses component-level state with direct EF Core queries via injected AppDBContext
- No separate service layer for Post CRUD - direct DbContext access in component @code block
- Decision rationale: Simple admin page, no need for abstraction layer; keeps code minimal

**3. Slug Generation**
- Slug auto-generated on create using `AppUtilities.GenerateSlug(Title)`
- Slug field remains editable by admin (can customize)
- On edit, slug is NOT auto-regenerated if title changes (preserves existing URL)
- Decision rationale: Prevents broken links; admin has full control

**4. Short Description Generation**
- Generated from Content field: strip HTML tags, take first 300 characters, append "..."
- Generated client-side in component before save
- Description field is also manually editable
- Decision rationale: Content is the source of truth; description is a convenience excerpt

**5. Seed Data Approach**
- PostSeeder is a static helper class in `Web/Web/Data/PostSeeder.cs`
- Not registered as DI service - called directly from Config.razor
- Uses Bogus Faker with Vietnamese-aware data generation
- Seed marker "[Seed Data]" in title for identification and cleanup
- Decision rationale: User explicitly requested "chỉ là function" - simple static methods

**6. Public Page Rendering**
- PostList.razor and PostDetail.razor use `@rendermode InteractiveServer` for interactivity
- PostDetail uses `@page "/bai-viet/{slug}"` route parameter
- 404 handling via existing NotFound.razor for missing/unpublished posts
- Decision rationale: Server rendering for SEO-friendly public pages

**7. Pagination Pattern**
- In-memory pagination using LINQ Skip/Take after DB query
- Page size input: number input with min=10, max=20 constraints
- Default sort: DateUpdated DESC
- Sortable columns: Title, DateCreated, DateUpdated
- Decision rationale: Simple and effective for expected data volumes

## Risks / Trade-offs

**[Risk] HTML content in short description** → Mitigation: Strip HTML tags before truncating using regex `Regex.Replace(content, "<[^>]+>", "")`

**[Risk] Slug collision on create** → Mitigation: Append incremental number if slug exists (e.g., `my-post`, `my-post-1`, `my-post-2`)

**[Risk] Large content in pagination query** → Mitigation: Only fetch needed fields for list view (PostId, Title, Slug, Published, DateCreated, DateUpdated); full content only on detail view

**[Risk] Toast state across component renders** → Mitigation: Use a shared service pattern with event callbacks; Toast component listens to service events

**[Trade-off] No service layer for Post CRUD** → Simpler code but harder to test in isolation; acceptable for admin-only usage

**[Trade-off] In-memory pagination** → Could be inefficient at very large datasets (>10k posts); acceptable for blog-scale content
