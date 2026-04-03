## Why

The application needs a complete Post management system for publishing articles/blog content. Currently there is no CRUD interface for managing posts, no public-facing post listing, and no seed data for development/testing. The Post model exists but is not wired into any user-facing features.

## What Changes

- Add full CRUD operations for Post model in admin Manager page with search, sort, filter, and pagination
- Add shared UI components: Toast notifications and Confirmation dialog (used across admin)
- Add seed data generation using Bogus library (50 posts with "[Seed Data]" marker) with create/delete seed buttons in Config page
- Add public post listing page (`/bai-viet`) showing only published posts with search and pagination
- Add public post detail page (`/bai-viet/{slug}`) for reading individual posts
- Update MainLayout to display 5 most recent published posts in the sidebar
- Auto-generate slug from title, short description from content, and manage timestamps automatically

## Capabilities

### New Capabilities
- `admin-post-crud`: Full CRUD operations for posts in admin panel with search, sort, filter by published status, and configurable pagination (10-20 items per page)
- `shared-ui-components`: Reusable Toast notification and Confirmation dialog components for admin interactions
- `post-seeding`: Seed data generation and cleanup using Bogus library, triggered from admin Config page
- `public-post-listing`: Public-facing page listing published posts with search and pagination
- `public-post-detail`: Public-facing page for viewing individual post content by slug
- `recent-posts-sidebar`: Display 5 most recent published posts in MainLayout sidebar

### Modified Capabilities
<!-- No existing specs to modify -->

## Impact

- **Files created**: Toast.razor, ConfirmDialog.razor, ToastService.cs, PostSeeder.cs, PostList.razor, PostDetail.razor
- **Files modified**: Admin/Manager.razor (replace mock data with real CRUD), Admin/Config.razor (add seed buttons), MainLayout.razor (recent posts)
- **Database**: Uses existing Posts DbSet in AppDBContext - no schema changes needed
- **Dependencies**: Bogus library already installed (v35.6.5), TinyMCE already installed for rich text editing
- **Routing**: New public routes `/bai-viet` and `/bai-viet/{slug}` added
