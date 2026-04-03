# recent-posts-sidebar Specification

## Purpose
TBD - created by archiving change post-crud. Update Purpose after archive.
## Requirements
### Requirement: Display recent posts in sidebar
The MainLayout sidebar SHALL display the 5 most recent published posts in the "Bài viết mới nhất" section. Each post entry SHALL show: Title (as link to /bai-viet/{slug}) with class `text-sm font-headline text-primary group-hover:text-primary-container transition-colors mb-1`, and Short Description (italic) with class `text-[10px] text-on-secondary-container italic`. The data SHALL be loaded from the database, not hardcoded.

#### Scenario: Display 5 recent posts
- **WHEN** the MainLayout renders and there are at least 5 published posts
- **THEN** the 5 most recent published posts are displayed in the sidebar

#### Scenario: Fewer than 5 posts available
- **WHEN** the MainLayout renders and there are only 3 published posts
- **THEN** all 3 posts are displayed in the sidebar

#### Scenario: No published posts
- **WHEN** the MainLayout renders and there are no published posts
- **THEN** the sidebar section shows a placeholder or is hidden

#### Scenario: Post title links to detail page
- **WHEN** user clicks a post title in the sidebar
- **THEN** the user navigates to /bai-viet/{slug} for that post

