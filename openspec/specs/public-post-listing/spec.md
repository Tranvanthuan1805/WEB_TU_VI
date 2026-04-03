# public-post-listing Specification

## Purpose
TBD - created by archiving change post-crud. Update Purpose after archive.
## Requirements
### Requirement: Public post listing page
The system SHALL provide a public page at route `/bai-viet` that lists all published posts. The page SHALL display posts sorted by DateUpdated descending by default. The page SHALL include a search input to filter by title (case-insensitive). The page SHALL include pagination with configurable page size (10-20 items, default 10). Only posts with Published = true SHALL be displayed.

#### Scenario: View published posts
- **WHEN** user navigates to /bai-viet
- **THEN** only published posts are displayed, sorted by DateUpdated descending

#### Scenario: Search published posts
- **WHEN** user enters "test" in the search input on /bai-viet
- **THEN** only published posts with titles containing "test" are displayed

#### Scenario: Pagination on public listing
- **WHEN** there are more than 10 published posts and user navigates to /bai-viet
- **THEN** the first 10 posts are displayed with pagination controls

### Requirement: Post item display in listing
Each post in the listing SHALL display: Title (as link to detail page), Short Description (italic, truncated), and DateUpdated. The title link SHALL navigate to `/bai-viet/{slug}`. Styling SHALL use Tailwind theme colors from theme.css.

#### Scenario: Post item renders correctly
- **WHEN** a published post exists in the listing
- **THEN** the title, short description, and date are displayed with proper styling

