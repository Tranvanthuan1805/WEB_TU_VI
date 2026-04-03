## 1. Shared UI Components

- [x] 1.1 Create ToastService.cs in Web/Web/Services/ with ShowSuccess, ShowError, ShowWarning, ShowInfo methods and event-based notification
- [x] 1.2 Create Toast.razor component in Web/Web/Components/Shared/ with auto-dismiss (3s), manual close, 4 types (success/error/warning/info), theme-colored styling
- [x] 1.3 Create ConfirmDialog.razor component in Web/Web/Components/Shared/ with title/message/confirmText parameters, overlay click to cancel, returns Task<bool>
- [x] 1.4 Register ToastService in Program.cs as scoped service

## 2. Post CRUD in Admin Manager

- [x] 2.1 Update Manager.razor @code to inject AppDBContext and load posts from database on initialization
- [x] 2.2 Implement search by title (case-insensitive partial match) with pagination reset
- [x] 2.3 Implement sort by Title, DateCreated, DateUpdated with toggle asc/desc, default DateUpdated DESC
- [x] 2.4 Implement filter by Published status (All/Published/Draft) with pagination reset
- [x] 2.5 Implement pagination with configurable page size (10-20) via numeric input
- [x] 2.6 Create edit modal form with TinyMCE for Content, Title, Slug, Description, Published fields
- [x] 2.7 Implement auto-generate slug from title using AppUtilities.GenerateSlug() on create (if slug empty)
- [x] 2.8 Implement auto-generate short description from content (strip HTML, first 300 chars + "...") on create/edit
- [x] 2.9 Implement auto-set DateCreated/DateUpdated on create, DateUpdated on edit
- [x] 2.10 Implement create post save with validation and toast notification
- [x] 2.11 Implement edit post save with slug preservation and toast notification
- [x] 2.12 Implement confirmation dialog on cancel edit/create with unsaved changes
- [x] 2.13 Implement delete post with ConfirmDialog confirmation and toast notification
- [x] 2.14 Update stats section to show real published/draft counts from database

## 3. Post Seed Data

- [x] 3.1 Create PostSeeder.cs in Web/Web/Data/ with SeedPosts() and DeleteSeedPosts() static methods using Bogus
- [x] 3.2 Implement SeedPosts() to delete existing "[Seed Data]" posts then create 50 new ones with auto-generated fields
- [x] 3.3 Implement DeleteSeedPosts() to delete all posts with "[Seed Data]" in title and return count
- [x] 3.4 Add "Tạo Seed Data" and "Xóa Seed Data" buttons to Config.razor
- [x] 3.5 Wire seed buttons to PostSeeder methods with toast notifications showing count

## 4. Public Post Listing Page

- [x] 4.1 Create PostList.razor in Web/Web/Components/Pages/ with route /bai-viet
- [x] 4.2 Implement database query for published-only posts sorted by DateUpdated DESC
- [x] 4.3 Implement search by title with pagination reset
- [x] 4.4 Implement pagination with configurable page size (10-20)
- [x] 4.5 Style post items with title link, short description, date using theme colors

## 5. Public Post Detail Page

- [x] 5.1 Create PostDetail.razor in Web/Web/Components/Pages/ with route /bai-viet/{slug}
- [x] 5.2 Implement database query for post by slug with published check
- [x] 5.3 Implement not found display for missing or unpublished posts
- [x] 5.4 Render Content as raw HTML with proper styling using theme colors

## 6. Recent Posts Sidebar

- [x] 6.1 Update MainLayout.razor to inject AppDBContext
- [x] 6.2 Query 5 most recent published posts for sidebar display
- [x] 6.3 Replace hardcoded "Bài viết mới nhất" section with dynamic data using specified CSS classes
- [x] 6.4 Handle case of fewer than 5 or zero published posts
