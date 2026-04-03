# public-post-detail Specification

## Purpose
TBD - created by archiving change post-crud. Update Purpose after archive.
## Requirements
### Requirement: Public post detail page
The system SHALL provide a public page at route `/bai-viet/{slug}` that displays the full content of a single post. The page SHALL display: Title, Content (rendered as HTML), DateUpdated. If the post does not exist or is not published, the page SHALL show a 404/not found message.

#### Scenario: View published post detail
- **WHEN** user navigates to /bai-viet/my-post-slug for a published post
- **THEN** the post title, content (rendered HTML), and date are displayed

#### Scenario: Unpublished post returns not found
- **WHEN** user navigates to /bai-viet/draft-post-slug for an unpublished post
- **THEN** a not found message is displayed

#### Scenario: Non-existent slug returns not found
- **WHEN** user navigates to /bai-viet/nonexistent-slug
- **THEN** a not found message is displayed

### Requirement: Post content rendering
The Content field SHALL be rendered as raw HTML (from TinyMCE). The rendering SHALL be safe (no script injection). Styling SHALL use Tailwind prose-like classes or theme colors.

#### Scenario: Render HTML content
- **WHEN** a post has content with HTML formatting from TinyMCE
- **THEN** the HTML is rendered correctly with proper styling

